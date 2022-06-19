import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppointmentManager } from './appointment.manager'
import { Appointment, AppointmentSchema } from './appointment.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }])],
  providers: [AppointmentManager],
  exports: [AppointmentManager],
})
export class AppointmentDomainModule {}
