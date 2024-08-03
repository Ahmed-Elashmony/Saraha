import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SendEmail } from './sendEmail';
dotenv.config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
          user: process.env.Email,
          pass: process.env.Email_Password,
        },
        tls: {
          rejectUnauthorized: false, // Use only for development/testing
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@yourdomain.com>',
      },
    }),
  ],
  providers: [SendEmail],
  exports: [SendEmail],
})
export class SendEmailModule {}
