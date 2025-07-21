import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { classToClassFromExist } from 'class-transformer';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { LoginAuthDto } from 'src/dtos/login-user.auth.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/enums/user.role';
import { compare } from 'bcrypt';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
    private redis: RedisService,
    private jwt: JwtService,
  ) {}
  // register user
  async create(createAuthDto: CreateUserDto) {
    const user = await this.userService.create(createAuthDto);
    return user;
  }
  //  login user
  async login(loginAuthDto: LoginAuthDto, res: Response) {
    const { email, password } = loginAuthDto;
    let user: any;
    const userCache = await this.redis.get(`user:${email}`);

    const userExists = await this.userService.findByEmail(email);
    console.log(userExists);
    if (!userExists || userExists.role !== UserRole.USER)
      throw new NotFoundException('Password or email is incorrect');

    if (userCache) user = JSON.parse(userCache);
    else user = userExists;

    const comparePassword = await compare(password, user.password);
    if (!comparePassword)
      throw new NotFoundException('Password or email is incorrect');

    await this.redis.set(`user:${email}`, user, 60);

    const payload = {
      id: user._id,
      role: user.role,
    };

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_EXP,
    });

    await this.userService.update(user._id, { refreshToken });

    res.cookie('jwt', refreshToken, {
      maxAge: eval(process.env.COOKIE_EXP as string),
      httpOnly: false,
    });
    const acceesToken = await this.jwt.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXP,
    });

    return { acceesToken };
  }
}
