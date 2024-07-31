import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { JoivalidationPipe } from 'src/pipes/joivalidation/joivalidation.pipe';
import { signInSchema, signUpSchema, updateSchema } from './user.joi';
import { UserService } from './user.service';

@Controller('user') // APP.USE(USER)
export class UserController {
  constructor(private readonly _userSerives: UserService) {}

  @Post('sign-up')
  @UsePipes(new JoivalidationPipe(signUpSchema))
  signUp(@Body() body: any, @Res() res: any): object {
    return this._userSerives.signUp(body, res);
  }

  @Post('sign-in')
  @UsePipes(new JoivalidationPipe(signInSchema))
  singIn(@Body() body: any, @Res() res: Response): object {
    // generate token
    return this._userSerives.singIn(body, res);
  }

  @Get('profile')
  @UseGuards(AuthenticationGuard)
  profile(@Req() req: Request) {
    return this._userSerives.profile(req);
  }

  @Patch()
  @UseGuards(AuthenticationGuard)
  @UsePipes(new JoivalidationPipe(updateSchema))
  updateProfile(@Body() body: any) {
    return this._userSerives.updateProfile(body);
  }
}
