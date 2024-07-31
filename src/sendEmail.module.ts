import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SendEmail } from './sendEmail';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.Email,
        auth: {
          user: process.env.Email_UserName,
          pass: process.env.Email_Password,
        },
      },
    }),
  ],
  providers: [SendEmail],
  exports: [SendEmail],
})
export class SendEmailModule {}
