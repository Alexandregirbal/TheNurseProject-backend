import { Module } from '@nestjs/common'
import { PatientDomainModule } from 'src/modules/patient/domain/patient.domain.module'
import { UserDomainModule } from 'src/modules/user/domain/user.domain.module'
import { CompanyDomainModule } from '../domain/company.domain.module'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'

@Module({
  imports: [CompanyDomainModule, UserDomainModule, PatientDomainModule],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [],
})
export class CompanyApplicationModule {}
