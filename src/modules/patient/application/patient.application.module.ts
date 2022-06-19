import { Module } from '@nestjs/common'
import { CompanyDomainModule } from 'src/modules/company/domain/company.domain.module'
import { PatientDomainModule } from '../domain/patient.domain.module'
import { CompanyPatientController } from './controller/company.patient.controller'
import { PatientController } from './controller/patient.controller'
import { PatientService } from './patient.service'

@Module({
  imports: [PatientDomainModule, CompanyDomainModule],
  controllers: [CompanyPatientController, PatientController],
  providers: [PatientService],
  exports: [],
})
export class PatientApplicationModule {}
