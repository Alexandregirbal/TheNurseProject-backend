import { Injectable } from '@nestjs/common'
import { PatientManager } from 'src/modules/patient/domain/patient.manager'
import { Patient } from 'src/modules/patient/domain/patient.schema'
import { UserManager } from 'src/modules/user/domain/user.manager'
import { User } from 'src/modules/user/domain/user.schema'
import { CompanyManager } from '../domain/company.manager'
import { Company } from '../domain/company.schema'
import { CompanyCreateOneDto } from './dto/company.createOne.dto'

@Injectable()
export class CompanyService {
  constructor(
    private companyManager: CompanyManager,
    private userManager: UserManager,
    private patientManager: PatientManager,
  ) {}

  async createOne(dto: CompanyCreateOneDto, user: User): Promise<Company> {
    const newCompany = await this.companyManager.addOneUser(await this.companyManager.createOne(dto), user)
    await this.userManager.addOneCompany(user, newCompany)
    return newCompany
  }

  async getOne(companyId: string): Promise<Company> {
    return this.companyManager.findOneById(companyId)
  }

  async getUsers(companyId: string): Promise<Array<Omit<User, 'password'>>> {
    const company = await this.companyManager.findOneById(companyId)
    return this.userManager.findUsers(company.users.map((user) => user.toString()))
  }

  async getPatients(companyId: string): Promise<Array<Patient>> {
    const company = await this.companyManager.findOneById(companyId)

    if (company.patients.length > 0)
      return await this.patientManager.findPatients(company.patients.map((patient) => patient.toString()))

    return []
  }
}
