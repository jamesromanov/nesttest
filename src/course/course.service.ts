import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { UpdateCourseDto } from 'src/dtos/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { Model } from 'mongoose';
import { RedisService } from 'src/redis/redis.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    private redis: RedisService,
  ) {}
  // course create
  async create(createCourseDto: CreateCourseDto) {
    const course = await this.courseModel.create(createCourseDto);
    return course;
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }

  async findMany(ids: string[]) {
    const coursesExists = await this.courseModel.find({ _id: ids });

    console.log(coursesExists);
    if (coursesExists.length === 0)
      throw new NotFoundException('No courses found');
    return coursesExists;
  }
}
