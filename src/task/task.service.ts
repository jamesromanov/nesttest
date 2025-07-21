import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/dtos/update-task.dto';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { reduce } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private userService: UsersService,
    private redis: RedisService,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const userId = createTaskDto.createdBy as any;
    const userExists = await this.userService.findOne(userId);
    const task = await this.taskModel.create({
      ...createTaskDto,
      createdBy: userExists._id,
    });

    await this.redis.del('tasks:all');
    return task;
  }

  findAll() {
    return `This action returnns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
