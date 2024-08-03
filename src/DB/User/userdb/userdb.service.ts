import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user.schema';

@Injectable()
export class UserdbService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findById(id: any): Promise<User> {
    return await this.userModel.findById(id).select('-password');
  }
  async findOne(object: any): Promise<User> {
    return await this.userModel.findOne(object).lean();
  }
  async create(object: any): Promise<User> {
    return await this.userModel.create(object);
  }
  async findByIdAndUpdate(object1: any, object2: any): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(object1, object2, {
        new: true,
      })
      .select('-password');
  }

  async findOneAndUpdate(object1: any, object2: any): Promise<User> {
    return await this.userModel
      .findOneAndUpdate(object1, object2, {
        new: true,
      })
      .select('-password');
  }
}
