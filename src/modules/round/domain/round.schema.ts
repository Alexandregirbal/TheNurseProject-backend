import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { Document, Schema } from 'mongoose'
import { Entity } from 'src/decorators/schema.decorator'
import { AbstractDocument } from 'src/modules/abstract/abstract.schema'
import { Company } from 'src/modules/company/domain/company.schema'
import { Scheduled } from 'src/modules/scheduled/domain/scheduled.schema'

export type RoundDocument = Round & Document

@Entity()
export class Round extends AbstractDocument {
  @Prop()
  name: string

  @Prop({ type: Schema.Types.ObjectId, ref: 'Company' })
  @Type(() => Company)
  company: Company | string

  @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Scheduled' }] })
  @Type(() => Scheduled)
  scheduleds: Scheduled[] | string[]
}

export const RoundSchema = SchemaFactory.createForClass(Round)
