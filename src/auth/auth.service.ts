import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(phoneNumber: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({
      phoneNumber,
      password,
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken(data: { phoneNumber: string; id: number }) {
    const payload = { phoneNumber: data.phoneNumber, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async login(user: any) {
    const { password, ...userData } = user;

    return {
      userData,
      token: this.generateJwtToken(userData),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const { password, ...userData } = await this.usersService.create(dto);
      return {
        userData,
        token: this.generateJwtToken(userData),
      };
    } catch (e) {
      throw new ForbiddenException('Помилка при регістрації');
    }
  }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjEyMzEyMyIsInN1YiI6MSwiaWF0IjoxNjM4ODgyMDYyLCJleHAiOjE2NDE0NzQwNjJ9.t9lzRbLpxj4r3KxIXuqqZ_EJ2R83PMhuCMV3crBWAvs
