import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { RedisService } from 'src/redis/redis.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.TOKEN_EXP,
      },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RedisService],
})
export class AuthModule {}
