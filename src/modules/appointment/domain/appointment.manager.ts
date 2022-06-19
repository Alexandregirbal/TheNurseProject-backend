import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as moment from 'moment'
import { Model } from 'mongoose'
import { AbstractManager } from 'src/modules/abstract/abstract.manager'
import { User } from 'src/modules/user/domain/user.schema'
import { Appointment, AppointmentDocument } from './appointment.schema'

@Injectable()
export class AppointmentManager extends AbstractManager<Appointment> {
  constructor(@InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>) {
    super(appointmentModel)
  }

  async findAllOfToday(user: User): Promise<Appointment[]> {
    const today = moment().startOf('day')

    return this.appointmentModel.find({
      nurse: user,
      timeStart: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      },
    })
  }
}
