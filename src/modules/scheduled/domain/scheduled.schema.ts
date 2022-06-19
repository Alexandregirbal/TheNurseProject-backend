import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { Document, Schema } from 'mongoose'
import { Entity } from 'src/decorators/schema.decorator'
import { AbstractDocument } from 'src/modules/abstract/abstract.schema'
import { AppointmentObject } from 'src/modules/appointment/domain/appointment.object'
import { Appointment } from 'src/modules/appointment/domain/appointment.schema'
import { Patient } from 'src/modules/patient/domain/patient.schema'
import { Round } from 'src/modules/round/domain/round.schema'
import { AppointmentScheduled } from 'src/modules/scheduled/domain/scheduled.object'

export type ScheduledDocument = Scheduled & Document

@Entity()
export class Scheduled extends AbstractDocument {
  @Prop({ type: Schema.Types.ObjectId, ref: 'Patient' })
  @Type(() => Patient)
  patient: Patient

  @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }] })
  @Type(() => Appointment)
  appointmentsHistory: Appointment[] | string[]

  @Prop({ type: Schema.Types.ObjectId, ref: 'Appointment' })
  @Type(() => Appointment)
  lastAppointment: Appointment

  @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Round' }] })
  @Type(() => Round)
  round: Round

  @Prop()
  startDate: Date

  @Prop()
  endDate: Date | undefined

  @Prop()
  weekDays: AppointmentScheduled[]

  @Prop({ enum: AppointmentObject.Category })
  category: AppointmentObject.Category
}

export const ScheduledSchema = SchemaFactory.createForClass(Scheduled)
