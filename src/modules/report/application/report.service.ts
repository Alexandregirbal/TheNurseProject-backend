import { Injectable } from '@nestjs/common'
import { AppointmentManager } from 'src/modules/appointment/domain/appointment.manager'
import { ReportManager } from '../domain/report.manager'
import { Report } from '../domain/report.schema'
import { ReportCreateOneDto } from './dto/report.createOne.dto'

@Injectable()
export class ReportService {
  constructor(private reportManager: ReportManager, private appointmentManager: AppointmentManager) {}

  async createOne(dto: ReportCreateOneDto, appointmentId: string): Promise<Report> {
    const appointment = await this.appointmentManager.findOneById(appointmentId)

    return this.reportManager.createOne({ ...dto, appointment })
  }

  async getOne(reportId: string): Promise<Report> {
    return this.reportManager.findOneById(reportId)
  }
}
