import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Response } from 'express';
import { UserdbService } from 'src/DB/User/userdb/userdb.service';
import { ConfirmTemp } from 'src/utils/htmlTemp/Temps';
import { SendEmail } from 'src/utils/sendEmail/sendEmail';

@Injectable()
export class UserService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userModel: UserdbService,
    private readonly sendMail: SendEmail,
  ) {}

  async signUp(body: any, res: any): Promise<object> {
    const check = await this._userModel.findOne({ name: body.name });
    if (check) {
      throw new ConflictException(`Name ${body.name} must be unique`);
    }
    const checkE = await this._userModel.findOne({ email: body.email });
    if (checkE) {
      throw new ConflictException(`Email ${body.email} registed before`);
    }
    const activationCode = crypto.randomBytes(64).toString('hex');

    body.activationCode = activationCode;
    // hash password
    const hashPass = await bcrypt.hash(body.password, 8);

    body.password = hashPass;
    await this._userModel.create({ ...body });

    const html = ConfirmTemp(
      `http://localhost:3000/user/confirm-email/${activationCode}`,
    );
    const receiver = body.email;
    const about = 'Confirm Your Email';

    await this.sendMail.sendMail(receiver, about, html);

    return res.json({ message: 'Please Confirm Email, Check Your Gmail' });
  }

  async confimEmail(param: any, res: Response): Promise<any> {
    if (!param) {
      return res.redirect('http://localhost:3000/');
    }

    await this._userModel.findOneAndUpdate(
      {
        activationCode: param,
      },
      {
        IsConfirm: true,
        $unset: { activationCode: 1 },
      },
    );
    return res.json({ message: 'Confirmed Succssfly' });
  }

  async singIn(body: any, res: Response): Promise<object> {
    const user = await this._userModel.findOne({ email: body.email });
    if (!user.IsConfirm) {
      throw new BadRequestException('Confirm Your Email First');
    }
    if (!user) {
      throw new NotFoundException('this email doesnt exists');
    }
    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      throw new BadRequestException('Wrong Password');
    }

    delete user.password;

    const token = this._jwtService.sign(
      { id: user['_id'], email: user.email },
      { secret: 'secertKey' },
    );
    return res.json({ message: 'Done', token });
  }

  async profile(req: any): Promise<object> {
    const { _id } = req.user;
    const user = await this._userModel.findById(_id);
    return { message: 'Done', user };
  }

  async updateProfile(body: any, req: any): Promise<object> {
    const user = await this._userModel.findByIdAndUpdate(req.user._id, body);
    return { message: 'Done', user };
  }

  async forgetPass(param: any): Promise<object> {
    const code = Math.floor(Math.random() * 1000000 + 1);
    console.log(code);

    await this._userModel.findOneAndUpdate(
      { email: param.email },
      { $set: { forgetCode: code } },
    );

    return { message: 'Done', code };
  }

  async resetPass(body: any): Promise<object> {
    const hashPass = await bcrypt.hash(body.password, 8);
    const user = await this._userModel.findOneAndUpdate(
      { forgetCode: body.code },
      { password: hashPass, $unset: { forgetCode: 1 } },
    );
    if (!user) {
      throw new BadRequestException('WRONG CODE');
    }
    return { message: 'Done' };
  }
}
