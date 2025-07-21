import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from 'src/enums/task.status.enum';
import { User } from 'src/users/entities/user.entity';

export class CreateTaskDto {
  // Task title
  @ApiProperty({
    type: 'string',
    description: 'Task title',
    default: 'new course title',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  title: string;

  // Task description
  @ApiProperty({
    type: 'string',
    description: 'Task description',
    default: 'description task',
  })
  @IsString()
  @IsOptional()
  description: string;

  // Task status

  @ApiProperty({
    type: 'string',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus)
  @IsString()
  status: TaskStatus;

  // Task due data
  @ApiProperty({
    type: 'string',
    default: '23-12-2023',
    description: 'Task due date',
  })
  @IsString()
  dueDate: Date;

  // user who created task
  @ApiProperty({
    type: 'string',
    default: 'user id',
    description: 'Task id',
  })
  @IsString()
  createdBy: User;
}
