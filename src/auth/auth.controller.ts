import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { PickType } from '@nestjs/mapped-types';
import { logInUserDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in') // basicGuard를 사용하지 않고 logInDto를 활용한 방법
  async signIn(@Body() loginUserDto: logInUserDto) {
    
    const token = await this.authService.signIn(loginUserDto);

    return token
  }

}
