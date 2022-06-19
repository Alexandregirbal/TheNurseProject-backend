import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AbstractManager } from 'src/modules/abstract/abstract.manager'
import { Company } from 'src/modules/company/domain/company.schema'
import { PasswordUtil } from 'src/utils/password.util'
import { User, UserDocument } from './user.schema'

@Injectable()
export class UserManager extends AbstractManager<User> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel)
  }

  async createOne(entityPartial: Partial<User>): Promise<User> {
    const password = await PasswordUtil.hashPassword(entityPartial.password)

    const user = await this.userModel.create({ ...entityPartial, password })

    return user
  }

  async addOneCompany(user: User, company: Company): Promise<Omit<User, 'password'>> {
    return this.addToRelation(user, 'companies', company)
  }

  async findUsers(userIds: Array<string>): Promise<Array<Omit<User, 'password'>>> {
    const users = await this.findByIds(userIds)
    return users.map((user) => {
      const { password, ...rest } = user
      return rest
    })
  }

  async findUser(userId: string): Promise<Omit<User, 'password'>> {
    const { password, ...user } = await this.findOneById(userId)
    return user
  }

  async findOneByEmail(email: string): Promise<Omit<User, 'password'>> {
    const { password, ...user } = await this.findOneByPartial({ email })
    return user
  }
}
