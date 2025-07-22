import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from 'src/dtos/update-student.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from 'src/enums/user.role';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  // [POST] register student
  @ApiOperation({
    summary: 'register student',
    description: 'registering student',
  })
  @ApiCreatedResponse({ description: 'Successfully created!' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict response' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('students/register')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }
  // [POST] enroll student with course id
  @ApiOperation({
    summary: 'enroll student',
    description: 'enroll student',
  })
  @ApiCreatedResponse({ description: 'Successfully enrolled!' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict response' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('courses/:courseId/register/:studentId')
  enrollStudent(
    @Param('courseId') couerseId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.studentService.enrollStudent(studentId, couerseId);
  }
  // [GET] get courses students
  @ApiOperation({
    summary: 'get enrolled students',
    description: 'get entrolled students',
  })
  @ApiCreatedResponse({ description: 'Successfully returned!' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict response' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/students/:id/courses/get')
  findById(@Param('id') id: string) {
    return this.studentService.findById(id);
  }
}
