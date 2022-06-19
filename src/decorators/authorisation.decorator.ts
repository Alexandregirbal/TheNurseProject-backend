import { ExecutionContext, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthorisationEnums } from 'src/enums/authorisation.enums'

const KEY_PERMISSIONS = 'KEY_PERMISIONS'

export class Authorisation {
  static getPermission(reflector: Reflector, context: ExecutionContext) {
    const permission = reflector.get<AuthorisationEnums.Key>(KEY_PERMISSIONS, context.getHandler())

    return permission || null
  }

  static isPublic() {
    return SetMetadata(KEY_PERMISSIONS, AuthorisationEnums.Key.PUBLIC)
  }

  static isPrivate() {
    return SetMetadata(KEY_PERMISSIONS, AuthorisationEnums.Key.PRIVATE)
  }

  static isMember() {
    return SetMetadata(KEY_PERMISSIONS, AuthorisationEnums.Key.MEMBER)
  }

  static isOwner() {
    return SetMetadata(KEY_PERMISSIONS, AuthorisationEnums.Key.OWNER)
  }
}
