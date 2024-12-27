import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/singInDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('employee/login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.employeeSignIn(signInDto.email, signInDto.password);
  }
}