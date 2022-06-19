import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AbstractManager } from 'src/modules/abstract/abstract.manager'
import { Patient, PatientDocument } from './patient.schema'

@Injectable()
export class PatientManager extends AbstractManager<Patient> {
  constructor(@InjectModel(Patient.name) private patientModel: Model<PatientDocument>) {
    super(patientModel)
  }

  async findPatients(patientIds: Array<string>): Promise<Array<Patient>> {
    return await this.findByIds(patientIds)
  }
}
