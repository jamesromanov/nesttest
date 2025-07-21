import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, Types } from 'mongoose';
import { TaskStatus } from 'src/enums/task.status.enum';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Task {
  // task title
  @Prop()
  title: string;
  // task description
  @Prop()
  description: string;
  // task status
  @Prop({ enum: TaskStatus, type: String })
  status: TaskStatus;
  // task due data
  @Prop()
  dueDate: Date;
  // user who created task
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: User;
  // task created time
  @Prop({ default: now() })
  createdAt: Date;
  // task updated time
  @Prop({ default: now() })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
