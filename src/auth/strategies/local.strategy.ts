import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ login, password });

    if (!user) {
      throw new ForbiddenException(`Invalid credentials`);
    }

    return user;
  }
}
