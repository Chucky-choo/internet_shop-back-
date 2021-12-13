import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: { sub: number; phoneNumber: string }) {
    const data = { id: payload.sub, phoneNumber: payload.phoneNumber };
    const user = await this.usersService.findById(data.id);

    if (!user) {
      throw new UnauthorizedException('у вас нема доступу до цієї сторінки');
    }
    const { password, ...res } = user;
    return res;
  }
}
