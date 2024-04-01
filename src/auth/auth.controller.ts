import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body) {
    const { refreshToken } = body;
    return await this.authService.refresh(refreshToken);
  }
}
