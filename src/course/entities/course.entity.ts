import { Param } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { now } from 'mongoose';

@Schema({ timestamps: true })
export class Course {
  // course title
  @Prop()
  title: string;
  // course description
  @Prop()
  description: string;
  // course startdate
  @Prop()
  startDate: Date;
  // course enddate
  @Prop()
  endDate: Date;
  // course created time
  @Prop({ default: now() })
  createdAt: Date;
  // course updated time
  @Prop({ default: now() })
  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
