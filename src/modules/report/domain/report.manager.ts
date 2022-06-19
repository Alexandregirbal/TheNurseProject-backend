import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AbstractManager } from 'src/modules/abstract/abstract.manager'
import { Report, ReportDocument } from './report.schema'

@Injectable()
export class ReportManager extends AbstractManager<Report> {
  constructor(@InjectModel(Report.name) private reportModel: Model<ReportDocument>) {
    super(reportModel)
  }
}
