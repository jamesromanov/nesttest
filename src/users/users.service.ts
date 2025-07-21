import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { NotFoundError } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';
import { PassThrough } from 'stream';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private redis: RedisService,
  ) {}
  // creating user
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user;
  }
  // get all users
  async findAll() {
    const usersCache = await this.redis.get(`all:users`);
    if (usersCache) return JSON.parse(usersCache);
    const users = await this.userModel.find({ isActive: true });
    if (users.length === 0) throw new NotFoundException('No users found');
    await this.redis.set(`all:users`, users, 60);
    return users;
  }

  // get user by id
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
