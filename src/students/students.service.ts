import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dtos/create-student.dto';

@Injectable()
export class StudentsService {
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }
}
