import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../const";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const userExists = await this.userModel.findOne({
      where: { email: registerUserDto.email },
    });

    if (userExists) {
      throw new ConflictException('email already taken');
    }

    const password = await argon2.hash(registerUserDto.password);
    const user = new User({ ...registerUserDto, password });

    return await user.save();
  }

  async auth(authUserDto: AuthUserDto): Promise<string> {
    const user = await this.userModel.findOne({
      where: { email: authUserDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('account does not exist');
    }

    if (!(await argon2.verify(user.password, authUserDto.password))) {
      throw new UnauthorizedException('bad credentials');
    }

    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: 3600 * 1000 });
  }
}
