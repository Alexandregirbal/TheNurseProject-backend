import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { Document, Schema } from 'mongoose'
import { Entity } from 'src/decorators/schema.decorator'
import { AbstractDocument } from 'src/modules/abstract/abstract.schema'
import { Patient } from 'src/modules/patient/domain/patient.schema'
import { User } from 'src/modules/user/domain/user.schema'

export type CompanyDocument = Company & Document

@Entity()
export class Company extends AbstractDocument {
  @Prop()
  name: string

  @Prop({ type: [{ type: Schema.Types.ObjectId, ref: User.name }] })
  @Type(() => User)
  users: User[]

  @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Patient' }] })
  @Type(() => Patient)
  patients: Patient[] | string[]
}

export const CompanySchema = SchemaFactory.createForClass(Company)
