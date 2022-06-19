import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { Document, Schema } from 'mongoose'
import { Entity } from 'src/decorators/schema.decorator'
import { AbstractDocument } from 'src/modules/abstract/abstract.schema'
import { Patient } from 'src/modules/patient/domain/patient.schema'
import { User } from 'src/modules/user/domain/user.schema'
import { AppointmentObject } from './appointment.object'

export type AppointmentDocument = Appointment & Document

@Entity()
export class Appointment extends AbstractDocument {
  @Prop({ type: Schema.Types.ObjectId, ref: Patient.name })
  @Type(() => Patient)
  patient: Patient | string

  @Prop({ type: Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  nurse: User

  @Prop({ enum: AppointmentObject.Type, default: AppointmentObject.Type.ONE_TIME })
  type: AppointmentObject.Type

  @Prop()
  parentId: string

  @Prop()
  date: string

  @Prop()
  timeStart: string

  @Prop()
  timeEnd: string

  @Prop()
  details: string
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment)
