import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(dto);
    const maxAge = 3600 * 24; // 1 day

    res.setHeader(
      'Set-Cookie',
      `access_token=${access_token}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Strict`,
    );

    res.send({ access_token });
  }

  @UseGuards(JwtGuard)
  @Get('check')
  async check() {
    return { message: 'OK' };
  }
}
