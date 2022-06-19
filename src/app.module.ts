import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'
import { AppointmentApplicationModule } from './modules/appointment/application/appointment.application.module'
import { AppointmentDomainModule } from './modules/appointment/domain/appointment.domain.module'
import { AppointmentEngineModule } from './modules/appointment/engine/appointment.engine.module'
import { JwtAuthGuard } from './modules/authentication/authentication.guards'
import { AuthenticationModule } from './modules/authentication/authentication.module'
import { AuthorisationApplicationModule } from './modules/authorisation/application/authorisation.application.module'
import { AuthorisationGuard } from './modules/authorisation/application/guards/authorisation.guard'
import { CompanyApplicationModule } from './modules/company/application/company.application.module'
import { CompanyDomainModule } from './modules/company/domain/company.domain.module'
import { ContactApplicationModule } from './modules/contact/application/contact.application.module'
import { ContactDomainModule } from './modules/contact/domain/contact.domain.module'
import { PatientApplicationModule } from './modules/patient/application/patient.application.module'
import { PatientDomainModule } from './modules/patient/domain/patient.domain.module'
import { ReportApplicationModule } from './modules/report/application/report.application.module'
import { ReportDomainModule } from './modules/report/domain/report.domain.module'
import { RoundApplicationModule } from './modules/round/application/round.application.module'
import { RoundDomainModule } from './modules/round/domain/round.domain.module'
import { ScheduledApplicationModule } from './modules/scheduled/application/scheduled.application.module'
import { ScheduledDomainModule } from './modules/scheduled/domain/scheduled.domain.module'
import { UserApplicationModule } from './modules/user/application/user.application.module'
import { UserDomainModule } from './modules/user/domain/user.domain.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [mongoConfiguration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(config().databaseUri),
    UserApplicationModule,
    UserDomainModule,
    AppointmentApplicationModule,
    AppointmentEngineModule,
    AppointmentDomainModule,
    ScheduledApplicationModule,
    ScheduledDomainModule,
    CompanyApplicationModule,
    CompanyDomainModule,
    AuthenticationModule,
    AuthorisationApplicationModule,
    PatientApplicationModule,
    PatientDomainModule,
    RoundApplicationModule,
    RoundDomainModule,
    ContactApplicationModule,
    ContactDomainModule,
    ReportApplicationModule,
    ReportDomainModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorisationGuard,
    },
  ],
})
export class AppModule {}
