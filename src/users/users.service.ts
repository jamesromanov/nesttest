import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { NotFoundError } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';
import { PassThrough } from 'stream';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { compareSync } from 'bcrypt';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private redis: RedisService,
    private courseService: CourseService,
  ) {}
  // creating user
  async create(createUserDto: CreateUserDto, courseId?: string) {
    if (courseId) {
      const userExists = await this.userModel.findOne({
        courses: courseId,
        email: createUserDto.email,
      });
      if (userExists) throw new BadRequestException('Allready enrolled');
      await this.courseService.findOne(courseId);
    }
    const user = await this.userModel.create({
      ...createUserDto,
      courses: courseId,
    });
    return user.toJSON();
  }
  // get all users
  async findAll() {
    const usersCache = await this.redis.get(`all:users`);
    if (usersCache) return JSON.parse(usersCache);
    const users = await this.userModel.find();
    if (users.length === 0) throw new NotFoundException('No users found');
    await this.redis.set(`all:users`, users, 60);
    return users;
  }

  // get user by id
  async findOne(id: string) {
    const userCache = await this.redis.get(`user:id:${id}`);
    if (userCache) JSON.parse(userCache);
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('No users found');
    await this.redis.set(`user:id:${id}`, user, 60);
    return user.toJSON();
  }

  //  update user by id
  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.findOne(id);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userExists._id,
      updateUserDto,
      {
        new: true,
      },
    );
    await this.redis.del(`user:id:${id}`);
    await this.redis.del(`all:users`);

    return updatedUser;
  }

  // delete user by id
  async remove(id: string) {
    const userExists = await this.findOne(id);
    console.log(await this.update(id, { isActive: false }));
    await this.redis.del(`user:id:${id}`);
    await this.redis.del(`all:users`);

    return 'successfully deleted';
  }

  // user find by email
  async findByEmail(email: string) {
    const userCache = await this.redis.get(`user:email:${email}`);
    if (userCache) JSON.parse(userCache);
    const userExists = await this.userModel.findOne({ email });
    if (!userExists) throw new NotFoundError('User not found');
    await this.redis.set(`user:email:${email}`, userExists, 60);
    return userExists;
  }

  // user find by course id
  async getUserByCourseId(courseId: string) {
    // const userExists = await
  }
}
