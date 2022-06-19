import { Module } from '@nestjs/common'
import { AppointmentDomainModule } from 'src/modules/appointment/domain/appointment.domain.module'
import { CompanyDomainModule } from 'src/modules/company/domain/company.domain.module'
import { ContactDomainModule } from 'src/modules/contact/domain/contact.domain.module'
import { PatientDomainModule } from 'src/modules/patient/domain/patient.domain.module'
import { ReportDomainModule } from 'src/modules/report/domain/report.domain.module'
import { RoundDomainModule } from 'src/modules/round/domain/round.domain.module'
import { UserDomainModule } from 'src/modules/user/domain/user.domain.module'
import { AuthorisationGuard } from './guards/authorisation.guard'
import { AuthorisationPermission } from './guards/authorisation.permission'
import { AuthorisationQuery } from './guards/authorisation.query'

@Module({
  imports: [
    CompanyDomainModule,
    UserDomainModule,
    ContactDomainModule,
    AppointmentDomainModule,
    PatientDomainModule,
    RoundDomainModule,
    ReportDomainModule,
  ],
  providers: [AuthorisationPermission, AuthorisationGuard, AuthorisationQuery],
  exports: [AuthorisationPermission, AuthorisationGuard],
})
export class AuthorisationApplicationModule {}
