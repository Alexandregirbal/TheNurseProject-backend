import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PatientDomainModule } from 'src/modules/patient/domain/patient.domain.module'
import { RoundDomainModule } from 'src/modules/round/domain/round.domain.module'
import { ScheduledDomainModule } from '../domain/scheduled.domain.module'
import { Scheduled, ScheduledSchema } from '../domain/scheduled.schema'
import { ScheduledController } from './controller/scheduled.controller'
import { ScheduledService } from './scheduled.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scheduled.name, schema: ScheduledSchema }]),
    PatientDomainModule,
    RoundDomainModule,
    ScheduledDomainModule,
  ],
  controllers: [ScheduledController],
  providers: [ScheduledService],
  exports: [],
})
export class ScheduledApplicationModule {}
