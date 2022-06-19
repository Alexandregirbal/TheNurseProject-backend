import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AbstractManager } from 'src/modules/abstract/abstract.manager'
import { Scheduled, ScheduledDocument } from './scheduled.schema'

@Injectable()
export class ScheduledManager extends AbstractManager<Scheduled> {
  constructor(@InjectModel(Scheduled.name) private scheduledModel: Model<ScheduledDocument>) {
    super(scheduledModel)
  }
}
