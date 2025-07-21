import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compareSync, hashSync } from 'bcrypt';
import { Transform } from 'class-transformer';
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
  @Prop({ required: true, unique: true })
  email: string;
  // user password
  @Prop({
    required: true,
    set: (value: string) => {
      if (value !== undefined) return hashSync(value, 12);
    },
  })
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

  toJson() {
    const { password, refreshToken, ...rest } = this;
    return rest;
  }

  compare(password: string) {
    return compareSync(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
