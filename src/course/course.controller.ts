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

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  // [POST] task create
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
  // [GET] task get
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

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
