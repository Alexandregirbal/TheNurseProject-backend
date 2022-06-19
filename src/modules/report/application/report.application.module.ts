import { Module } from '@nestjs/common'
import { AppointmentDomainModule } from 'src/modules/appointment/domain/appointment.domain.module'
import { ReportDomainModule } from '../domain/report.domain.module'
import { AppointmentReportController } from './controller/appointment.report.controller'
import { ReportController } from './controller/report.controller'
import { ReportService } from './report.service'

@Module({
  imports: [ReportDomainModule, AppointmentDomainModule],
  controllers: [AppointmentReportController, ReportController],
  providers: [ReportService],
  exports: [],
})
export class ReportApplicationModule {}
