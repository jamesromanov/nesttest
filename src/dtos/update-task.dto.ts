import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatus } from 'src/enums/task.status.enum';
import { User } from 'src/users/entities/user.entity';

export class UpdateTaskDto {
  // Task title
  @ApiProperty({
    type: 'string',
    description: 'Task title',
    default: 'new course title',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  title?: string;

  // Task description
  @ApiProperty({
    type: 'string',
    description: 'Task description',
    default: 'description task',
  })
  @IsString()
  @IsOptional()
  description?: string;

  // Task status
  @ApiProperty({
    type: 'string',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  @IsString()
  status?: TaskStatus;

  // Task due data
  @ApiProperty({
    type: 'string',
    default: '23-12-2023',
    description: 'Task due date',
  })
  @IsString()
  @IsOptional()
  dueDate?: Date;

  // user who created task
  @ApiProperty({
    type: 'string',
    default: 'user id',
    description: 'Task id',
  })
  @IsOptional()
  @IsString()
  createdBy?: User;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
