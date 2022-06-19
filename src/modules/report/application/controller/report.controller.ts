import { Controller, Get, Param } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Report } from '../../domain/report.schema'
import { ReportService } from '../report.service'

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':reportId')
  @Authorisation.isMember()
  getOne(@Param('reportId') reportId: string): Promise<Report> {
    return this.reportService.getOne(reportId)
  }
}
