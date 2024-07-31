import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('/:email') //for params
  @Post()
  // createAcc(
  //   @Body() body: any,
  //   @Query() query: any,
  //   @Param() param: any,
  // ): string {
  createAcc(@Req() req: Request): string {
    console.log(req.body);
    // console.log(body);
    // console.log(query);
    // console.log(param);
    return this.appService.create();
  }

  // @Post('dtoValid')
  // sendData(@Body() body:sendData):string{
  //   return console.log(body);
  // }
}
