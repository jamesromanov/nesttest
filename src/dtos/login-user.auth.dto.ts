import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

// USER login operatoins
export class LoginAuthDto {
  @ApiProperty({
    type: 'string',
    default: 'exmaple@gmail.com',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, {
    message: 'Email is invalid',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    default: 'StrongPassword1:!',
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
}
