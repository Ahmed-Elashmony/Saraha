import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../message.schema';

@Injectable()
export class MessagedbService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async findById(id: any): Promise<Message> {
    return await this.messageModel.findById(id);
  }

  async findOne(object: any): Promise<Message> {
    return await this.messageModel.findOne(object);
  }

  async create(object: any): Promise<Message> {
    return await this.messageModel.create(object);
  }

  async find(object: any): Promise<any> {
    return await this.messageModel.find(object).select('-from');
  }

  async findByIdAndUpdate(object1: any, object2: any): Promise<Message> {
    return await this.messageModel.findByIdAndUpdate(object1, object2, {
      new: true,
    });
  }

  async findOneAndUpdate(object1: any, object2: any): Promise<Message> {
    return await this.messageModel.findOneAndUpdate(object1, object2, {
      new: true,
    });
  }
}
