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
    await this.redis.del(`courses:all`);
    return course;
  }
  // get available courses
  async findAll() {
    const coursesCache = await this.redis.get(`courses:all`);
    if (coursesCache) return JSON.parse(coursesCache);
    const courses = await this.courseModel.find();
    await this.redis.set(`courses:all`, courses, 60);
    return courses;
  }
  // findone course by id
  async findOne(id: string) {
    const courseCache = await this.redis.get(`course:id:${id}`);
    if (courseCache) JSON.parse(courseCache);
    const course = await this.courseModel.findById(id);
    await this.redis.set(`course:id:${id}`, course, 60);
    return course;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }

  async findMany(ids: string[] | string) {
    const coursesExists = await this.courseModel.findById(ids);

    console.log(coursesExists);
    if (!coursesExists) throw new NotFoundException('No courses found');
    return coursesExists;
  }
}
