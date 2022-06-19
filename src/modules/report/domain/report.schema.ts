import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { Document, Schema } from 'mongoose'
import { Entity } from 'src/decorators/schema.decorator'
import { AbstractDocument } from 'src/modules/abstract/abstract.schema'
import { Appointment } from 'src/modules/appointment/domain/appointment.schema'

export type ReportDocument = Report & Document

@Entity()
export class Report extends AbstractDocument {
  @Prop()
  notes: string

  @Prop({ type: Schema.Types.ObjectId, ref: 'Appointment' })
  @Type(() => Appointment)
  appointment: Appointment | string
}

export const ReportSchema = SchemaFactory.createForClass(Report)
