import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/dtos/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  // [POST] create task
  @ApiOperation({
    summary: 'task create',
    description: 'create task by admin',
  })
  @ApiCreatedResponse({ description: 'Successfully creaeted!' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }
  // [POST] get all tasks
  @ApiOperation({
    summary: 'task get all',
    description: 'task get all tasks by users and admins',
  })
  @ApiCreatedResponse({ description: 'Successfully returned!' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.taskService.findAll();
  }
  // [GET] get task by id
  @ApiOperation({
    summary: 'task create',
    description: 'create task by admin',
  })
  @ApiCreatedResponse({ description: 'Successfully creaeted!' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  // [PUT] update book by id
  @ApiOperation({
    summary: 'task update',
    description: 'update task by their id',
  })
  @ApiCreatedResponse({ description: 'Successfully creaeted!' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }
  // [DELETE] delete task by id
  @ApiOperation({
    summary: 'task create',
    description: 'create task by admin',
  })
  @ApiCreatedResponse({ description: 'Successfully creaeted!' })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiBadRequestResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
