import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { AuthorisationEnums } from 'src/enums/authorisation.enums'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const permission = Authorisation.getPermission(this.reflector, context)
    const isPublic = Authorisation.getPermission(this.reflector, context) === AuthorisationEnums.Key.PUBLIC

    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
}
