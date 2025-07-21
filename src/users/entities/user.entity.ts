import { Prop, Schema } from '@nestjs/mongoose';

// USER model
@Schema()
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
  @Prop({ required: true})
  password: string;
  // user role
  @Prop({enum :})
}
