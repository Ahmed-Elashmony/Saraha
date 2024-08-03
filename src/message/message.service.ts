import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagedbService } from 'src/DB/Message/messagedb/messagedb.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _messageModel: MessagedbService,
  ) {}

  async sendMsg(body: any, req: any): Promise<object> {
    body.from = req.user.email;
    await this._messageModel.create(body);
    return { message: 'Done' };
  }

  async getMessage(req: any): Promise<object> {
    const messages = await this._messageModel.find({ to: req.user.email });
    return { message: 'Done', messages };
  }
}
