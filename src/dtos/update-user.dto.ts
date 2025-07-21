import { SerializeOptions } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/enums/user.role';

export class UpdateUserDto {
  // user first name
  @ApiProperty({
    type: 'string',
    default: 'someone',
    description: 'User firstname',
  })
  @IsString()
  @IsOptional()
  @MinLength(2)
  firstName?: string;

  // user last name
  @ApiProperty({
    type: 'string',
    default: 'someone',
    description: 'User lastname',
  })
  @IsString()
  @IsOptional()
  @MinLength(2)
  lastName?: string;

  // user age
  @ApiProperty({
    type: 'number',
    default: 16,
    description: 'User age',
  })
  @IsNumber()
  @IsOptional()
  @Min(15)
  age?: number;

  // user email
  @ApiProperty({
    type: 'string',
    default: 'exmaple@gmail.com',
    description: 'User email',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  @Matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, {
    message: 'Email is invalid.',
  })
  email?: string;

  // user password
  @ApiProperty({
    type: 'string',
    example: 'StrongPassword:!',
    description: 'User password',
  })
  @IsOptional()
  @IsString()
  @IsStrongPassword({ minLength: 6 })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must include one upperCase one lowercase one character one number.',
  })
  password?: string;

  // user role
  @ApiProperty({
    type: 'string',
    default: UserRole.USER,
    description: 'Admin role',
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Roles must be ADMIN or USER' })
  role?: UserRole;

  // user refreshtoken
  @IsString()
  @IsOptional()
  refreshToken?: string;

  // user status
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
