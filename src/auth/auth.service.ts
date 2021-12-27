import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleEntity } from 'src/roles/entities/roles.entity';
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

  generateJwtToken(data: {
    phoneNumber: string;
    id: number;
    roles: RoleEntity[];
  }) {
    const payload = {
      phoneNumber: data.phoneNumber,
      sub: data.id,
      roles: data.roles,
    };
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
      console.error(e);
      throw new ForbiddenException('Помилка при регістрації');
    }
  }
}
