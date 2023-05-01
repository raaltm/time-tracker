import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    const isMatch =
      user instanceof User ? await bcrypt.compare(pass, user.password) : false;
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payLoad = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payLoad, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }
}
