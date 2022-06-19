import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { HttpUtil } from 'src/utils/http.util'
import { AuthorisationPermission } from './authorisation.permission'

@Injectable()
export class AuthorisationGuard implements CanActivate {
  constructor(private reflector: Reflector, private authorisationPermission: AuthorisationPermission) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await HttpUtil.getRequest(context)

    const permission = Authorisation.getPermission(this.reflector, context)

    return this.authorisationPermission.hasAccess(request, permission)
  }
}
