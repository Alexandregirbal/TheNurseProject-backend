import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { Document, Schema } from 'mongoose'
import { Entity } from 'src/decorators/schema.decorator'
import { AbstractDocument } from 'src/modules/abstract/abstract.schema'
import { Company } from 'src/modules/company/domain/company.schema'
import { PatientObject } from './patient.object'

export type PatientDocument = Patient & Document

@Entity()
export class Patient extends AbstractDocument {
  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  phone: string

  @Prop()
  address: string

  @Prop()
  dateOfBirth: Date

  @Prop()
  city: string

  @Prop()
  country: string

  @Prop()
  sex: PatientObject.Sex

  @Prop()
  contactsEmergency: PatientObject.ContactEmergency[]

  @Prop({ type: Schema.Types.ObjectId, ref: Company.name })
  @Type(() => Company)
  company: Company | string
}

export const PatientSchema = SchemaFactory.createForClass(Patient)
