import { Transform } from 'class-transformer'
import { Types } from 'mongoose'

export abstract class AbstractDocument {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId
}
