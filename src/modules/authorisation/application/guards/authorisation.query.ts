import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { AppointmentManager } from 'src/modules/appointment/domain/appointment.manager'
import { CompanyManager } from 'src/modules/company/domain/company.manager'
import { Company } from 'src/modules/company/domain/company.schema'
import { ContactManager } from 'src/modules/contact/domain/contact.manager'
import { PatientManager } from 'src/modules/patient/domain/patient.manager'
import { ReportManager } from 'src/modules/report/domain/report.manager'
import { RoundManager } from 'src/modules/round/domain/round.manager'

@Injectable()
export class AuthorisationQuery {
  constructor(
    private companyManager: CompanyManager,
    private patientManager: PatientManager,
    private roundManager: RoundManager,
    private contactManager: ContactManager,
    private appointmentManager: AppointmentManager,
    private reportManager: ReportManager,
  ) {}

  async findOneCompanyFromRequest(request: Request): Promise<Company> {
    const params = request.params

    if (params.companyId) {
      return this.getCompanyFromId(params.companyId)
    } else if (params.patientId) {
      return this.getCompanyFromPatientId(params.patientId)
    } else if (params.roundId) {
      return this.getCompanyFromRoundId(params.roundId)
    } else if (params.appointmentId) {
      return this.getCompanyFromAppointmentId(params.appointmentId)
    } else if (params.contactId) {
      return this.getCompanyFromContactId(params.contactId)
    } else if (params.reportId) {
      return this.getCompanyFromReportId(params.reportId)
    }

    return null
  }

  private async getCompanyFromId(companyId: string): Promise<Company> {
    return this.companyManager.findOneById(companyId)
  }

  private async getCompanyFromPatientId(patientId: string): Promise<Company> {
    return this.patientManager
      .findOneById(patientId)
      .then((patient) => this.companyManager.findOneById(patient.company as string))
  }

  private async getCompanyFromRoundId(roundId: string): Promise<Company> {
    return this.roundManager
      .findOneById(roundId)
      .then((round) => this.companyManager.findOneById(round.company as string))
  }

  private async getCompanyFromAppointmentId(appointmentId: string): Promise<Company> {
    return this.appointmentManager
      .findOneById(appointmentId)
      .then((appointment) => this.patientManager.findOneById(appointment.patient as string))
      .then((patient) => this.companyManager.findOneById(patient.company as string))
  }

  private async getCompanyFromContactId(contactId: string): Promise<Company> {
    return this.contactManager
      .findOneById(contactId)
      .then((contact) => this.companyManager.findOneById(contact.company as string))
  }

  private async getCompanyFromReportId(reportId: string): Promise<Company> {
    return this.reportManager
      .findOneById(reportId)
      .then((report) => this.appointmentManager.findOneById(report.appointment as string))
      .then((appointment) => this.patientManager.findOneById(appointment.patient as string))
      .then((patient) => this.companyManager.findOneById(patient.company as string))
  }
}
