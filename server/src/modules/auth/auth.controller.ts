import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dtos/authRegister.dto';
import { AuthLoginDto } from './dtos/authLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto, @Res() response: Response) {
    return this.authService.register(authRegisterDto, response);
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto, @Res() response: Response) {
    return this.authService.login(authLoginDto, response);
  }

  @Post('logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    return this.authService.logout(request, response);
  }
}
