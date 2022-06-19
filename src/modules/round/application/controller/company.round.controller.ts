import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Round } from '../../domain/round.schema'
import { RoundCreateOneDto } from '../dto/round.createOne.dto'
import { RoundService } from '../round.service'

@Controller('companies/:companyId/rounds')
export class CompanyRoundController {
  constructor(private readonly roundService: RoundService) {}

  @Post()
  @Authorisation.isOwner()
  async createOne(@Body() body: RoundCreateOneDto, @Param('companyId') companyId: string): Promise<Round> {
    const round = await this.roundService.createOne(body, companyId)

    return round
  }

  @Get()
  @Authorisation.isOwner()
  async getAll(@Param('companyId') companyId: string): Promise<Round[]> {
    const rounds = await this.roundService.getAll(companyId)

    return rounds
  }
}
