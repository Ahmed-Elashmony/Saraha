import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello From Home Page!';
  }

  create(): string {
    return 'Created Succsfully';
  }
}
