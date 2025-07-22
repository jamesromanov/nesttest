import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    type: 'string',
    default: 'someone',
    description: 'Student name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    type: 'string',
    default: 'exmaple@gmail.com',
    description: 'Student email',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, {
    message: 'Email is invalid.',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Student password',
    default: 'StrongPassword!1:',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must include one upperCase one lowercase one character one number.',
  })
  password: string;
}
