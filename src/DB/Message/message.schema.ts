import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true, lowercase: true })
  from: string;

  @Prop({ required: true, lowercase: true })
  to: string;
}
const messageSchema = SchemaFactory.createForClass(Message);
export const messageDBModule = MongooseModule.forFeature([
  {
    name: Message.name,
    schema: messageSchema,
  },
]);
