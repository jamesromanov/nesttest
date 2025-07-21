import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // [POST] user create
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // [GET] get all users
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get all users for the admins',
    description: 'get all users for the admins',
  })
  @ApiOkResponse({ description: 'Successfully returned' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  // [GET] get user by their id
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  // [PUT] update user by their id
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
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  // [DELETE] delete user by id

  @Delete(':id')
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
}
