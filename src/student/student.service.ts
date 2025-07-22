import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from 'src/dtos/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './entities/student.entity';
import { Model } from 'mongoose';
import { RedisService } from 'src/redis/redis.service';
import { CourseService } from 'src/course/course.service';
import { stderr } from 'process';

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

  async enrollStudent(studentId: string, courseId: string) {
    const studentCache = await this.redis.get(`student:courseId:${studentId}`);
    let student: Student;
    if (studentCache) student = JSON.parse(studentCache);
    const studentExists = await this.studentModel.findById(studentId);
    if (!studentExists) throw new NotFoundException('Student not found');
    student = studentExists;
    const courseExist = await this.courseService.findOne(courseId);

    await this.studentModel.findByIdAndUpdate(studentId, {
      courses: courseExist,
    });
    return studentExists;
  }
  async findById(id: string) {
    const studentsCache = await this.redis.get(`student:enrolled:${id}`);
    if (studentsCache) return JSON.parse(studentsCache);

    const studentsExists = await this.studentModel.findById(id);
    if (!studentsExists) throw new NotFoundException('No students found');
    await this.redis.set(`student:enrolled:${id}`, studentsExists, 60);
    return studentsExists;
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
