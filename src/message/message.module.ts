import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { messageDBModule } from 'src/DB/Message/message.schema';
import { MessagedbService } from 'src/DB/Message/messagedb/messagedb.service';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { UserModule } from 'src/user/user.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [messageDBModule, UserModule],
  controllers: [MessageController],
  providers: [
    MessageService,
    JwtService,
    MessagedbService,
    AuthenticationGuard,
  ],
})
export class MessageModule {}
