import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RoundManager } from './round.manager'
import { Round, RoundSchema } from './round.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Round.name, schema: RoundSchema }])],
  providers: [RoundManager],
  exports: [RoundManager],
})
export class RoundDomainModule {}
