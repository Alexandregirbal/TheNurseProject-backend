import { Body, Controller, Get, Post } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { RequestUser } from 'src/decorators/endpoint.decorator'
import { User } from 'src/modules/user/domain/user.schema'
import { Appointment } from '../../domain/appointment.schema'
import { AppointmentService } from '../appointment.service'
import { AppointmentCreateOneDto } from '../dto/appointment.createOne.dto'

@Controller('users/:userId/appointments')
export class UserAppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @Authorisation.isPrivate()
  createOne(@Body() body: AppointmentCreateOneDto, @RequestUser() user: User): Promise<Appointment> {
    return this.appointmentService.createOne(body, user)
  }

  @Get()
  @Authorisation.isPrivate()
  getToday(@RequestUser() user: User): Promise<Appointment[]> {
    return this.appointmentService.getToday(user)
  }
}
