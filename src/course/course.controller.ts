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
import { JwtGuard } from 'src/guards/jwt.guard';
import { Roles } from 'src/guards/roles';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from 'src/enums/user.role';

@ApiBearerAuth()
@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  // [POST] course create
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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
  // [GET] course get
  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'get courses', description: 'get courses' })
  @ApiCreatedResponse({ description: 'reqturned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data enetered' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('course')
  findAll() {
    return this.courseService.findAll();
  }
  // [GET] course get by id
  @UseGuards(JwtGuard)
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
  // [PATCH] update course by id
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'update course by id',
    description: 'update course by id',
  })
  @ApiTags('Course')
  @ApiCreatedResponse({ description: 'updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data enetered' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }
  // [DELETE] delete course by id
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'delete course by id',
    description: 'delete course by id',
  })
  @ApiTags('Course')
  @ApiCreatedResponse({ description: 'deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data enetered' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
