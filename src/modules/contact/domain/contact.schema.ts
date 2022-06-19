import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { Document, Schema } from 'mongoose'
import { Entity } from 'src/decorators/schema.decorator'
import { AbstractDocument } from 'src/modules/abstract/abstract.schema'
import { Company } from 'src/modules/company/domain/company.schema'
import { ContactObject } from './contact.object'

export type ContactDocument = Contact & Document

@Entity()
export class Contact extends AbstractDocument {
  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop({ enum: ContactObject.Type })
  type: ContactObject.Type

  @Prop({ type: Schema.Types.ObjectId, ref: 'Company' })
  @Type(() => Company)
  company: Company | string
}

export const ContactSchema = SchemaFactory.createForClass(Contact)
