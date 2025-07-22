import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from '../../dtos/create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
