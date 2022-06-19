import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { AuthorisationEnums } from 'src/enums/authorisation.enums'
import { UserManager } from 'src/modules/user/domain/user.manager'
import { UserObject } from 'src/modules/user/domain/user.object'
import { User } from 'src/modules/user/domain/user.schema'
import { AuthorisationQuery } from './authorisation.query'

@Injectable()
export class AuthorisationPermission {
  constructor(private userManager: UserManager, private authorisationQuery: AuthorisationQuery) {}

  async hasAccess(request: Request, permission: AuthorisationEnums.Key): Promise<boolean> {
    if (permission === AuthorisationEnums.Key.PUBLIC) {
      return true
    }

    const userPartial = request.user as Partial<User>
    const user = await this.findOneUser(userPartial._id.toString())

    if (user?.isAdmin) {
      return true
    }

    switch (permission) {
      case AuthorisationEnums.Key.PRIVATE:
        return true
      case AuthorisationEnums.Key.MEMBER:
        return this.isInCompany(user, request)
      case AuthorisationEnums.Key.OWNER:
        return this.isInCompanyAndAssociate(user, request)
      default:
        return false
    }
  }

  private async isInCompanyAndAssociate(user: User, request: Request): Promise<boolean> {
    const isInCompany = await this.isInCompany(user, request)
    const isOwner = await this.isOwner(user)
    return isInCompany && isOwner
  }

  private async isInCompany(user: User, request: Request): Promise<boolean> {
    const company = await this.authorisationQuery.findOneCompanyFromRequest(request)

    return user?.companies.some((userCompany) => company._id.equals(userCompany._id))
  }

  private async isOwner(user: User): Promise<boolean> {
    return user?.type === UserObject.Type.ASSOCIATE
  }

  private async findOneUser(id: string): Promise<User> {
    return this.userManager.findOneById(id)
  }
}
