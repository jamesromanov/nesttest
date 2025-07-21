import { Prop, Schema } from '@nestjs/mongoose';
import { now } from 'mongoose';
import { UserRole } from 'src/enums/user.role';

// USER model
@Schema({ timestamps: true })
export class User {
  // user first name
  @Prop()
  firstName: string;
  // user last name
  @Prop()
  lastName: string;
  // user age
  @Prop({ required: false })
  age: number;
  // user email
  @Prop({ required: true })
  email: string;
  // user password
  @Prop({ required: true })
  password: string;
  // user role
  @Prop({ enum: UserRole, type: String })
  role: UserRole;
  // user status
  @Prop({ default: true })
  isActive: boolean = true;
  // user refresh token
  @Prop({ default: null })
  refreshToken: string;
  // user created time
  @Prop({ default: now() })
  createdAt: Date;
  // user updated time
  @Prop({ default: now() })
  updatedAt: Date;
}
