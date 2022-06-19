import { Module } from '@nestjs/common'
import { CompanyDomainModule } from 'src/modules/company/domain/company.domain.module'
import { RoundDomainModule } from '../domain/round.domain.module'
import { CompanyRoundController } from './controller/company.round.controller'
import { RoundController } from './controller/round.controller'
import { RoundService } from './round.service'

@Module({
  imports: [RoundDomainModule, CompanyDomainModule],
  controllers: [CompanyRoundController, RoundController],
  providers: [RoundService],
  exports: [],
})
export class RoundApplicationModule {}
