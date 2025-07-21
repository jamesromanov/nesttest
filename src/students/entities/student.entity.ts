import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Types } from 'mongoose';
import { Course } from 'src/course/entities/course.entity';

@Schema({ timestamps: true })
export class Student {
  @Prop()
  name: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: [Types.ObjectId], ref: 'COurse' })
  courses: Course[];
  // task created time
  @Prop({ default: now() })
  createdAt: Date;
  // task updated time
  @Prop({ default: now() })
  updatedAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
