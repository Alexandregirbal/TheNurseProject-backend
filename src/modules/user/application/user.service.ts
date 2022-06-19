import { Injectable } from '@nestjs/common'
import { CompanyManager } from 'src/modules/company/domain/company.manager'
import { PatientManager } from 'src/modules/patient/domain/patient.manager'
import { Patient } from 'src/modules/patient/domain/patient.schema'
import { UserException } from '../domain/throwables/user.exception'
import { UserManager } from '../domain/user.manager'
import { UserObject } from '../domain/user.object'
import { User } from '../domain/user.schema'
import { UserCreateOneDto as UserCreateOneDto } from './dto/user.createOne.dto'

@Injectable()
export class UsersService {
  constructor(
    private userManager: UserManager,
    private companyManager: CompanyManager,
    private patientManager: PatientManager,
  ) {}

  async createOne(dto: UserCreateOneDto): Promise<User> {
    return this.userManager.createOne(dto)
  }

  async findOneByEmail(email: string): Promise<Omit<User, 'password'>> {
    return this.userManager.findOneByEmail(email)
  }
  async findOneById(userId: string): Promise<Omit<User, 'password'>> {
    return this.userManager.findUser(userId)
  }

  async addOneCompany(userId: string, companyId: string): Promise<Omit<User, 'password'>> {
    const user = await this.userManager.findOneById(userId)
    const company = await this.companyManager.findOneById(companyId)

    if (user.companies.some((userCompany) => company._id.equals(userCompany._id))) {
      throw new UserException(UserObject.ExceptionKey.ALREADY_IN_COMPANY)
    }

    this.companyManager.addOneUser(company, user)
    return this.userManager.addOneCompany(user, company)
  }

  async findPatients(userId: string): Promise<Array<Patient>> {
    const user = await this.userManager.findOneById(userId)
    let patientsToReturn: Array<Patient> = []
    for (const companyId of user.companies as Array<string>) {
      const company = await this.companyManager.findOneById(companyId)
      const patients = await this.patientManager.findByIds(company.patients as Array<string>)
      patientsToReturn = patientsToReturn.concat(patients)
    }
    return patientsToReturn
  }
}
