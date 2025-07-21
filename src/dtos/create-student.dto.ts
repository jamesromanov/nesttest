import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  isString,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';
import { Course } from 'src/course/entities/course.entity';

export class CreateStudentDto {
  // student name
  @ApiProperty({
    type: 'string',
    description: 'Student name',
    default: 'name of the student',
  })
  @IsString()
  name: string;

  // student email
  @ApiProperty({
    type: 'string',
    description: 'Student email',
    default: 'email@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // student password
  @ApiProperty({
    type: 'string',
    default: 'Strong password of the student',
    description: 'Student password',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must include one upperCase one lowercase one character one number.',
  })
  password: string;

  @ApiProperty({
    type: 'string',
    description: 'Student courses',
    default: 'course id',
  })
  @IsString()
  @IsOptional()
  courses: Course[];
}
