import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { classToClassFromExist } from 'class-transformer';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
    private redis: RedisService,
  ) {}
  async create(createAuthDto: CreateUserDto) {
    const user = await this.userService.create(createAuthDto);
    return user;
  }

  // async login(loginAuthDto: LoginUserAuthDto) {
  //   const { email, password } = loginAuthDto;
  //   let user: User;
  //   const userCache = await this.redis.get(`user:${email}`);

  //   const userExists = await this.userService..findUnique({
  //     where: { email, active: true },
  //   });
  //   if (!userExists || userExists.role !== AdminRole.USER)
  //     throw new NotFoundException('Parol yoki email xato');

  //   if (userCache) user = JSON.parse(userCache);
  //   else user = userExists;

  //   const comparePassword = await bcyrpt.compare(password, user.password);
  //   if (!comparePassword) throw new NotFoundException('Parol yoki email xato');

  //   await this.redis.set(`user:${email}`, user, 60);

  //   const payload = {
  //     id: user.id,
  //     role: user.role,
  //   };

  //   const refreshToken = await this.jwt.signAsync(payload, {
  //     secret: process.env.REFRESH_USER_TOKEN_SECRET,
  //     expiresIn: process.env.REFRESH_USER_TOKEN_EXP,
  //   });

  //   const acceesToken = await this.jwt.signAsync(payload, {
  //     secret: process.env.ACCESS_TOKEN_KEY,
  //     expiresIn: process.env.ACCESS_TOKEN_EXP,
  //   });

  //   return { refreshToken, acceesToken };
  // }
}
