import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Types } from 'mongoose';
import { Course } from 'src/course/entities/course.entity';

@Schema({ timestamps: true })
export class Student {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  // student courses
  @Prop({ type: [Types.ObjectId], ref: 'Course' })
  courses: Course[];
  // student status
  @Prop({ default: true })
  isActive: boolean;
  // student created time
  @Prop({ default: now() })
  createdAt: Date;
  // student updated time
  @Prop({ default: now() })
  updatedAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
