import { Controller, Param, Patch } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { User } from '../../domain/user.schema'
import { UsersService } from '../user.service'

@Controller('companies/:companyId/users')
export class CompanyUserController {
  constructor(private readonly userService: UsersService) {}

  @Patch(':userId')
  @Authorisation.isPrivate()
  addOnecompany(
    @Param('userId') userId: string,
    @Param('companyId') companyId: string,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.addOneCompany(userId, companyId)
  }
}
