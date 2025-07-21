import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  IsStrongPassword,
  Matches,
  min,
  Min,
  MinLength,
} from 'class-validator';
import { Course } from 'src/course/entities/course.entity';
import { UserRole } from 'src/enums/user.role';

export class CreateUserDto {
  // user first name
  @ApiProperty({
    type: 'string',
    default: 'someone',
    description: 'User firstname',
  })
  @IsString()
  @MinLength(2)
  firstName: string;

  // user last name
  @ApiProperty({
    type: 'string',
    default: 'someone',
    description: 'User lastname',
  })
  @IsString()
  @MinLength(2)
  lastName: string;

  // user age
  @ApiProperty({
    type: 'number',
    default: 16,
    description: 'User age',
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(15)
  age: number;

  // user email
  @ApiProperty({
    type: 'string',
    default: 'exmaple@gmail.com',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, {
    message: 'Email is invalid.',
  })
  email: string;

  // user password
  @ApiProperty({
    type: 'string',
    default: 'StrongPassword:!',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({ minLength: 6 })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must include one upperCase one lowercase one character one number.',
  })
  password: string;

  // user role
  @ApiProperty({
    type: 'string',
    default: UserRole.ADMIN,
    description: 'Admin role',
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Roles must be ADMIN or USER' })
  role?: UserRole;

  @ApiProperty({
    type: 'string',
    description: 'User courses',
    default: 'course id optional',
  })
  @IsString()
  @IsOptional()
  courses: Course[];
}
