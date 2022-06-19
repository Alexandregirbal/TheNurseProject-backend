import { Injectable } from '@nestjs/common'
import { PatientManager } from 'src/modules/patient/domain/patient.manager'
import { User } from 'src/modules/user/domain/user.schema'
import { AppointmentManager } from '../domain/appointment.manager'
import { Appointment } from '../domain/appointment.schema'
import { AppointmentCreateOneDto } from './dto/appointment.createOne.dto'

@Injectable()
export class AppointmentService {
  constructor(private appointmentManager: AppointmentManager, private patientManager: PatientManager) {}

  async createOne(dto: AppointmentCreateOneDto, user: User): Promise<Appointment> {
    const patient = await this.patientManager.findOneById(dto.patientId)

    return this.appointmentManager.createOne({ ...dto, nurse: user, patient })
  }

  async getOne(appointmentId: string): Promise<Appointment> {
    return this.appointmentManager.findOneById(appointmentId)
  }

  async getToday(user: User): Promise<Appointment[]> {
    return this.appointmentManager.findAllOfToday(user)
  }
}
