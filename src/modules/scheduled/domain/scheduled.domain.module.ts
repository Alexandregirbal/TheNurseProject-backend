import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduledManager } from './scheduled.manager'
import { Scheduled, ScheduledSchema } from './scheduled.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Scheduled.name, schema: ScheduledSchema }])],
  providers: [ScheduledManager],
  exports: [ScheduledManager],
})
export class ScheduledDomainModule {}
