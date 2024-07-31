import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserdbService } from 'src/DB/User/userdb/userdb.service';
import { SendEmail } from 'src/sendEmail';

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
    // hash password
    const hashPass = await bcrypt.hash(body.password, 8);

    body.password = hashPass;
    const user = await this._userModel.create({ ...body });

    const text = 'Confirm Email';
    const receiver = body.email;
    const about = 'Confirm Your Email';

    this.sendMail.sendMail(text, receiver, about);

    return res.json({ message: 'Done', user });
  }

  async singIn(body: any, res: Response): Promise<object> {
    const user = await this._userModel.findOne({ email: body.email });
    if (!user) {
      throw new NotFoundException('this email doesnt exists');
    }
    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      throw new BadRequestException('Wrong Password');
    }

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

  async updateProfile(body: any): Promise<object> {
    const user = await this._userModel.findByIdAndUpdate(body);
    return { message: 'Done', user };
  }
}
