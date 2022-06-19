import { Body, Controller, Param, Post } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Report } from '../../domain/report.schema'
import { ReportCreateOneDto } from '../dto/report.createOne.dto'
import { ReportService } from '../report.service'

@Controller('appointments/:appointmentId/reports')
export class AppointmentReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @Authorisation.isOwner()
  async createOne(@Body() body: ReportCreateOneDto, @Param('appointmentId') appointmentId: string): Promise<Report> {
    const report = await this.reportService.createOne(body, appointmentId)

    return report
  }
}
