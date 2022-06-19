import { Injectable } from '@nestjs/common'
import { CompanyManager } from 'src/modules/company/domain/company.manager'
import { PatientManager } from '../domain/patient.manager'
import { Patient } from '../domain/patient.schema'
import { PatientCreateOneDto } from './dto/patient.createOne.dto'
import { PatientUpdateOneDto } from './dto/patient.updateOne.dto'

@Injectable()
export class PatientService {
  constructor(private patientManager: PatientManager, private companyManager: CompanyManager) {}

  async createOne(dto: PatientCreateOneDto, companyId: string): Promise<Patient> {
    const company = await this.companyManager.findOneById(companyId)
    const patient = await this.patientManager.createOne({ ...dto, company })
    await this.companyManager.addOnePatient(company, patient)
    return patient
  }

  async getOne(patientId: string): Promise<Patient> {
    return this.patientManager.findOneById(patientId)
  }

  async updateOne(patientId: string, dto: PatientUpdateOneDto): Promise<Patient> {
    const patient = await this.patientManager.findOneById(patientId)

    return this.patientManager.updateOne(patient, dto)
  }

  async deleteOne(patientId: string): Promise<Patient> {
    return this.patientManager.deleteOne(patientId)
  }
}
