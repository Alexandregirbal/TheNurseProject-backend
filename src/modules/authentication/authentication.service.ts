import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from 'src/modules/authentication/dto/register.dto'
import { User } from 'src/modules/user/domain/user.schema'
import { PasswordUtil } from 'src/utils/password.util'
import { UserManager } from '../user/domain/user.manager'
import { LoginResponse } from './authentication.interface'

@Injectable()
export class AuthenticationService {
  constructor(private readonly userManager: UserManager, private readonly jwtService: JwtService) {}

  async register(register: RegisterDto): Promise<LoginResponse> {
    const userExisting = await this.userManager.findOneByPartial({ email: register.email })

    if (userExisting !== null) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    const user = await this.userManager.createOne(register)

    delete user.password

    const accessToken = this.signToken(user)

    return { accessToken }
  }

  async login(user: any): Promise<LoginResponse> {
    if (!user) {
      throw new UnauthorizedException('Combination username/password mismatch.')
    }

    const token = this.signToken(user)
    return { accessToken: token }
  }

  async validateUser(email: string, plainPassword: string): Promise<Omit<User, 'password'>> {
    const user = await this.userManager.findOneByPartial({ email })

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
    }

    const isPasswordMatching = await PasswordUtil.checkPassword(plainPassword, user.password)

    if (isPasswordMatching) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  signToken(user: User): string {
    const payload: Partial<User> = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionType: user.subscriptionType,
      isAdmin: user.isAdmin,
    }
    return this.jwtService.sign(payload)
  }
}
