import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  // course title
  @ApiProperty({
    type: 'string',
    default: 'Course title',
    description: 'title of the course',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;
  // course description
  @ApiProperty({
    type: 'string',
    default: 'description of the course',
    description: 'Course description',
  })
  @IsString()
  @IsOptional()
  description?: string;
  // course startdate
  @ApiProperty({
    type: 'string',
    default: '2025-03-04',
    description: 'Course created time',
  })
  @IsString()
  @IsOptional()
  startDate?: Date;
  // course enddate
  @ApiProperty({
    type: 'string',
    default: '2026-09-19',
    description: 'Course end date',
  })
  @IsString()
  @IsOptional()
  endDate?: Date;
}
