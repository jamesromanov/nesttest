import { Param } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
