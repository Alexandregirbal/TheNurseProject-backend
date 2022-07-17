import { Controller, Get, Param } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Round } from '../../domain/round.schema'
import { RoundService } from '../round.service'

@Controller('rounds')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Get(':roundId')
  @Authorisation.isMember()
  getOne(@Param('roundId') roundId: string): Promise<Round> {
    console.log('Test');
    
    return this.roundService.getOne(roundId)
  }
}
