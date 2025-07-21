import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/dtos/update-task.dto';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { NotFoundError, reduce } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private userService: UsersService,
    private redis: RedisService,
  ) {}
  // create task
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
  // get all tasks
  async findAll() {
    const taskCache = await this.redis.get(`tasks:all`);
    if (taskCache) return JSON.parse(taskCache);

    const tasks = await this.taskModel.find({ isActive: true });
    if (tasks.length === 0) throw new NotFoundException('No tasks found');
    await this.redis.set(`tasks:all`, tasks, 60);
    return tasks;
  }
  // get task by id
  async findOne(id: string) {
    const taskCache = await this.redis.get(`task:id:${id}`);
    console.log(taskCache);
    if (taskCache) return JSON.parse(taskCache);
    const taskExists = await this.taskModel.findOne({
      _id: id,
      isActive: true,
    });
    if (!taskExists) throw new NotFoundException('No tasks found');
    await this.redis.set(`task:id:${id}`, taskExists, 60);
    return taskExists;
  }
  //  update task by id
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const tasksExists = await this.findOne(id);
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      tasksExists._id,
      updateTaskDto,
      {
        new: true,
      },
    );
    await this.redis.del(`task:id:${id}`);
    return updatedTask;
  }
  // delete task by id
  async remove(id: string) {
    const tasksExists = await this.findOne(id);
    await this.update(tasksExists.id, { isActive: false });
    await this.redis.del(`task:id:${id}`);
    await this.redis.del(`tasks:all`);
    return 'Successfully deleted';
  }
}
