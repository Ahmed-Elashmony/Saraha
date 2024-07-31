import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendEmail } from './sendEmail';
import { SendEmailModule } from './sendEmail.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
    forwardRef(() => UserModule),
    forwardRef(() => SendEmailModule),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, SendEmail],
  exports: [SendEmail],
})
export class AppModule {}
