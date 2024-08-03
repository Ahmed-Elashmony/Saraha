import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SendEmail {
  constructor(private readonly mailService: MailerService) {}
  async sendMail(to: string, subject: string, html: string): Promise<void> {
    {
      try {
        await this.mailService.sendMail({
          from: '24menn@gmail.com',
          to,
          subject,
          html,
        });
      } catch (error) {
        throw new BadRequestException('Sending Email Error', error);
      }
    }
  }
}
