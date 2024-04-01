import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private saltRounds: number;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.saltRounds = Number(configService.get('CRYPT_SALT'));
  }

  async validateUser(dto: AuthDto): Promise<any> {
    const user = await this.usersService.findOneByLogin(dto.login);

    if (!user) {
      throw new ForbiddenException(
        `User with login "${dto.login}" does not exist`,
      );
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (user && isMatch) {
      return user;
    }

    throw new UnauthorizedException();
  }

  async refresh(refreshToken: string): Promise<any> {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token in body)');
    }

    try {
      const payload = await this.getPayload(refreshToken);
      const tokens = await this.getTokens(payload);
      return tokens;
    } catch {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }

  async getPayload(refreshToken: string) {
    const secret = this.configService.get('JWT_SECRET_REFRESH_KEY');
    const { userId, login } = await this.jwtService.verify(refreshToken, {
      secret,
    });

    const payload = { userId, login };

    return payload || null;
  }

  async getTokens(payload: { userId: string; login: string }): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET_KEY'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
    });

    await this.usersService.updateRefreshToken(payload.userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(dto: AuthDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByLogin(dto.login);

    if (!user) {
      throw new ForbiddenException(
        `User with login "${dto.login}" does not exist`,
      );
    }

    const payload = { userId: user.id, login: user.login };
    const tokens = await this.getTokens(payload);

    return tokens;
  }

  async signUp(dto: AuthDto): Promise<User> {
    const existingUser = await this.usersService.findOneByLogin(dto.login);

    if (existingUser) {
      throw new ForbiddenException(
        `User with login "${dto.login}" aleady exist`,
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, this.saltRounds);

    const newUser = {
      ...dto,
      password: passwordHash,
    };

    return await this.usersService.create(newUser);
  }
}
