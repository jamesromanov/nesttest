import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';
import { CourseModule } from 'src/course/course.module';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [
    CourseModule,
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService, RedisService],
  exports: [StudentService],
})
export class StudentModule {}
