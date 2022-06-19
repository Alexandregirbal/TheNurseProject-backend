import { Controller, Get, Param } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Appointment } from '../../domain/appointment.schema'
import { AppointmentService } from '../appointment.service'

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get(':appointmentId')
  @Authorisation.isMember()
  getOne(@Param('appointmentId') appointmentId: string): Promise<Appointment> {
    return this.appointmentService.getOne(appointmentId)
  }
}
