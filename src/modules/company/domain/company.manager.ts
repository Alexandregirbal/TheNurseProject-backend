import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AbstractManager } from 'src/modules/abstract/abstract.manager'
import { Patient } from 'src/modules/patient/domain/patient.schema'
import { User } from 'src/modules/user/domain/user.schema'
import { Company, CompanyDocument } from './company.schema'

@Injectable()
export class CompanyManager extends AbstractManager<Company> {
  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {
    super(companyModel)
  }

  async addOneUser(company: Company, user: User): Promise<Company> {
    return this.addToRelation(company, 'users', user)
  }

  async addOnePatient(company: Company, patient: Patient): Promise<Company> {
    return this.addToRelation(company, 'patients', patient)
  }
}
