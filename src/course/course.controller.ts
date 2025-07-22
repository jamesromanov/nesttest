import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { UpdateCourseDto } from 'src/dtos/update-course.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiProxyAuthenticationRequiredResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'create course', description: 'create course' })
  @ApiCreatedResponse({ description: 'Coursee created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data enetered' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('course')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'get courses', description: 'get courses' })
  @ApiCreatedResponse({ description: 'reqturned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data enetered' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('course')
  findAll() {
    return this.courseService.findAll();
  }

  @ApiOperation({
    summary: 'get course by id',
    description: 'get course by id',
  })
  @ApiTags('Course')
  @ApiCreatedResponse({ description: 'reqturned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data enetered' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('students/id/course')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
