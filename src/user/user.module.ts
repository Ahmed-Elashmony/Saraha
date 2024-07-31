import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userDBModule } from 'src/DB/User/user.schema';
import { UserdbService } from 'src/DB/User/userdb/userdb.service';
import { SendEmail } from 'src/sendEmail';
import { SendEmailModule } from 'src/sendEmail.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [userDBModule, forwardRef(() => SendEmailModule)],
  controllers: [UserController],
  providers: [UserService, JwtService, UserdbService, SendEmail],
})
export class UserModule {}
