import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from '../dtos/create-student.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({
    summary: 'create student',
    description: 'create student',
  })
  @ApiCreatedResponse({ description: 'student created successully' })
  @ApiBadRequestResponse({ description: 'invalid data entered' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }
}
