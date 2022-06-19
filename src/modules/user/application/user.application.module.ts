import { Module } from '@nestjs/common'
import { CompanyDomainModule } from 'src/modules/company/domain/company.domain.module'
import { PatientDomainModule } from 'src/modules/patient/domain/patient.domain.module'
import { UserDomainModule } from '../domain/user.domain.module'
import { CompanyUserController } from './controller/company.user.controller'
import { UsersController } from './controller/user.controller'
import { UsersService } from './user.service'

@Module({
  imports: [UserDomainModule, CompanyDomainModule, PatientDomainModule],
  controllers: [UsersController, CompanyUserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserApplicationModule {}
