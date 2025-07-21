import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import {
  ApiBadGatewayResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'user register',
    description: 'user registration',
  })
  @ApiCreatedResponse({ description: 'Successfully logged in' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadGatewayResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('register')
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }
}
