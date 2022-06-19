import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { LocalAuthGuard } from 'src/modules/authentication/authentication.guards'
import { AuthenticationService } from 'src/modules/authentication/authentication.service'
import { RegisterDto } from 'src/modules/authentication/dto/register.dto'
import { LoginResponse } from './authentication.interface'

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Authorisation.isPublic()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() register: RegisterDto): Promise<LoginResponse> {
    return this.authService.register(register)
  }

  @Authorisation.isPublic()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Delete('logout')
  // @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async logout(@Request() req) {
    console.log('Logout here')
    return { message: `${req.user.email} logged out with success.` }
  }
}
