import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from '../../dtos/create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
