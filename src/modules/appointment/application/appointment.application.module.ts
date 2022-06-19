import { Module } from '@nestjs/common'
import { PatientDomainModule } from 'src/modules/patient/domain/patient.domain.module'
import { AppointmentDomainModule } from '../domain/appointment.domain.module'
import { AppointmentService } from './appointment.service'
import { AppointmentController } from './controllers/appointment.controller'
import { UserAppointmentController } from './controllers/user.appointment.controller'

@Module({
  imports: [AppointmentDomainModule, PatientDomainModule],
  controllers: [UserAppointmentController, AppointmentController],
  providers: [AppointmentService],
  exports: [],
})
export class AppointmentApplicationModule {}
