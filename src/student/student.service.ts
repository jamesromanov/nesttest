import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from 'src/dtos/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './entities/student.entity';
import { Model } from 'mongoose';
import { RedisService } from 'src/redis/redis.service';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private redis: RedisService,
    private courseService: CourseService,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentModel.create(createStudentDto);
    return student;
  }

  async enrollStudent(studentId: string, courseId: string) {}
  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
