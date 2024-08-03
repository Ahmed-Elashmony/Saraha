import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { JoivalidationPipe } from 'src/pipes/joivalidation/joivalidation.pipe';
import { sendSchema } from './message.joi';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly _messageService: MessageService) {}

  @Post('')
  @UseGuards(AuthenticationGuard)
  @UsePipes(new JoivalidationPipe(sendSchema))
  sendMsg(@Body() body: any, @Req() req: Request) {
    return this._messageService.sendMsg(body, req);
  }

  @Get('my-messages')
  @UseGuards(AuthenticationGuard)
  getMessages(@Req() req: Request) {
    return this._messageService.getMessage(req);
  }
}
