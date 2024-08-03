import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  IsConfirm: boolean;

  @Prop({ enum: ['male', 'female'] })
  gender: string;

  @Prop()
  age: number;

  @Prop()
  phone: string;

  @Prop()
  activationCode: string;

  @Prop()
  forgetCode: string;

  @Prop({ default: false })
  online: boolean;

  @Prop({ default: false })
  deleted: boolean;
}
const userSchema = SchemaFactory.createForClass(User);
export const userDBModule = MongooseModule.forFeature([
  {
    name: User.name,
    schema: userSchema,
  },
]);
