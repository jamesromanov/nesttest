import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from 'src/dtos/update-student.dto';

@Injectable()
export class StudentService {
  constructor() {}
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

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
