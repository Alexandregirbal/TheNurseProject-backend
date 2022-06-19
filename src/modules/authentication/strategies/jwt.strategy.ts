import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import config from 'src/config'
import { AuthenticationService } from '../authentication.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config().jwt.secret,
      ignoreExpiration: false,
      // passReqToCallback: false,
    })
  }

  validate(payload: any): any {
    return payload
  }
}
