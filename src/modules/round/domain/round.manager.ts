import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AbstractManager } from 'src/modules/abstract/abstract.manager'
import { Round, RoundDocument } from './round.schema'

@Injectable()
export class RoundManager extends AbstractManager<Round> {
  constructor(@InjectModel(Round.name) private roundModel: Model<RoundDocument>) {
    super(roundModel)
  }
}
