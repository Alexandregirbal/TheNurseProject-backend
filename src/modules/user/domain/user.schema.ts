import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { Document, Schema } from 'mongoose'
import { Entity } from 'src/decorators/schema.decorator'
import { AbstractDocument } from 'src/modules/abstract/abstract.schema'
import { Company } from 'src/modules/company/domain/company.schema'
import { UserObject } from './user.object'

export type UserDocument = User & Document

@Entity()
export class User extends AbstractDocument {
  @Prop({ unique: true })
  email: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  dateOfBirth: Date

  @Prop()
  phone: string

  @Prop()
  password: string

  @Prop({ enum: UserObject.SubscriptionType })
  subscriptionType: UserObject.SubscriptionType

  @Prop({ enum: UserObject.Type })
  type: UserObject.Type

  @Prop({ default: false })
  isAdmin: boolean

  @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Company' }] })
  @Type(() => Company)
  companies: Company[] | string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
