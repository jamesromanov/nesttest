import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles';
import { UserRole } from 'src/enums/user.role';
import { userInfo } from 'os';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // [POST] user create
  @ApiOperation({
    summary: 'create user or student admin',
    description: 'create user or admin and  student',
  })
  @ApiCreatedResponse({
    description: 'succeddfully created',
  })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // [POST] create student with course id
  @ApiOperation({
    summary: 'create student',
    description: 'create student',
  })
  @ApiCreatedResponse({
    description: 'succeddfully created',
  })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('courses/:courseId/register')
  createStudent(
    @Param('courseId') courseId: string,
    @Body() createCourseDto: CreateUserDto,
  ) {
    return this.usersService.create(createCourseDto, courseId);
  }
  // [GET] get all users
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get all users for the admins',
    description: 'get all users for the admins',
  })
  @ApiOkResponse({ description: 'Successfully returned' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }
  // [GET] get user by their id
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get user by id for admins and users',
    description: 'get user by their id',
  })
  @ApiOkResponse({ description: 'Successfully returned' })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiBadRequestResponse({
    description: 'Invalid data entered',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  // [PUT] update user by their id
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update user by id admins and users',
    description: 'update users by id ',
  })
  @ApiOkResponse({ description: 'Successfully updated' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: 'Invalid data entered',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put('users/id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  // [DELETE] delete user by id
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('users/id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'delete book by id by their id admins and users',
    description: 'delete book by id admins and users',
  })
  @ApiOkResponse({ description: 'Successfully deleted' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: 'Invalid data entered',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get course by id',
    description: 'get course by id',
  })
  @ApiCreatedResponse({ description: 'reqturned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data enetered' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('students/:id/courses')
  find(@Param('id') id: string) {}
}
