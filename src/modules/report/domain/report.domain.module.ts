import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ReportManager } from './report.manager'
import { Report, ReportSchema } from './report.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }])],
  providers: [ReportManager],
  exports: [ReportManager],
})
export class ReportDomainModule {}
