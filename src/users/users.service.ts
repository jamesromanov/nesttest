import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { NotFoundError } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';
import { PassThrough } from 'stream';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private redis: RedisService,
  ) {}
  // creating user
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user.toJSON();
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
  async findOne(id: string) {
    const userCache = await this.redis.get(`user:id:${id}`);
    console.log(userCache);
    if (userCache) JSON.parse(userCache);
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('No users found');
    await this.redis.set(`user:id:${id}`, user, 60);
    return user.toJSON();
  }

  //  update user by id
  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.findOne(id);
    const upatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
      },
    );

    return upatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
