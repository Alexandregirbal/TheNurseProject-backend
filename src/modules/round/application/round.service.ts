import { Injectable } from '@nestjs/common'
import { CompanyManager } from 'src/modules/company/domain/company.manager'
import { RoundManager } from '../domain/round.manager'
import { Round } from '../domain/round.schema'
import { RoundCreateOneDto } from './dto/round.createOne.dto'

@Injectable()
export class RoundService {
  constructor(private roundManager: RoundManager, private companyManager: CompanyManager) {}

  async createOne(dto: RoundCreateOneDto, companyId: string): Promise<Round> {
    const company = await this.companyManager.findOneById(companyId)

    return this.roundManager.createOne({ ...dto, company })
  }

  async getOne(roundId: string): Promise<Round> {
    return this.roundManager.findOneById(roundId)
  }

  async getAll(companyId: string): Promise<Round[]> {
    return this.roundManager.findManyByPartial({ company: companyId })
  }
}
