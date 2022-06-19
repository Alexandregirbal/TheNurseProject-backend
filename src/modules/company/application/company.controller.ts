import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { RequestUser } from 'src/decorators/endpoint.decorator'
import { Patient } from 'src/modules/patient/domain/patient.schema'
import { User } from 'src/modules/user/domain/user.schema'
import { Company } from '../domain/company.schema'
import { CompanyService } from './company.service'
import { CompanyCreateOneDto } from './dto/company.createOne.dto'

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Authorisation.isPrivate()
  createOne(@Body() body: CompanyCreateOneDto, @RequestUser() user: User): Promise<Company> {
    return this.companyService.createOne(body, user)
  }

  @Get(':companyId')
  @Authorisation.isMember()
  getOne(@Param('companyId') companyId: string): Promise<Company> {
    return this.companyService.getOne(companyId)
  }

  @Get(':companyId/users')
  @Authorisation.isMember()
  getUsers(@Param('companyId') companyId: string): Promise<Array<Omit<User, 'password'>>> {
    return this.companyService.getUsers(companyId)
  }

  @Get(':companyId/patients')
  @Authorisation.isMember()
  getPatients(@Param('companyId') companyId: string): Promise<Array<Patient>> {
    return this.companyService.getPatients(companyId)
  }
}
