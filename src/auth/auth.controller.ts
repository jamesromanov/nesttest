import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginAuthDto } from 'src/dtos/login-user.auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // [POST] register user
  @ApiOperation({
    summary: 'user register',
    description: 'user registration',
  })
  @ApiCreatedResponse({ description: 'Successfully registered' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadGatewayResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('register')
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }
  //  [POST] login user
  @ApiOperation({
    summary: 'user login',
    description: 'user login by email and password',
  })
  @ApiCreatedResponse({ description: 'Successfully logged in' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadGatewayResponse({ description: 'Invalid data entered' })
  @ApiConflictResponse({ description: 'Conflict error' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('login')
  login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginAuthDto, res);
  }
}
