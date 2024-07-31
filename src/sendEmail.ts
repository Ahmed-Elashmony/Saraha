import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmail {
  constructor(private readonly mailService: MailerService) {}
  sendMail(text: string, receiever: string, about: string) {
    const message = text;

    console.log(receiever);

    this.mailService.sendMail({
      from: 'Saraha',
      to: receiever,
      subject: about,
      text: message,
    });
  }
}
