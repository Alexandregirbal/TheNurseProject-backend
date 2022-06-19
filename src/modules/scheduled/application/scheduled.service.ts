import { Injectable } from '@nestjs/common'
import { PatientManager } from 'src/modules/patient/domain/patient.manager'
import { RoundManager } from 'src/modules/round/domain/round.manager'
import { ScheduledManager } from '../domain/scheduled.manager'
import { Scheduled } from '../domain/scheduled.schema'
import { ScheduledCreateOneDto } from './dto/scheduled.createOne.dto'
import { ScheduledUpdateOneDto } from './dto/scheduled.updateOne.dto'

@Injectable()
export class ScheduledService {
  constructor(
    private patientManager: PatientManager,
    private scheduledManager: ScheduledManager,
    private roundManager: RoundManager,
  ) {}

  async createOne(params: { dto: ScheduledCreateOneDto }): Promise<Scheduled> {
    const { dto } = params
    const patient = await this.patientManager.findOneById(dto.patient)
    const round = await this.roundManager.findOneById(dto.round)
    return await this.scheduledManager.createOne({ ...dto, patient, round })
  }

  async getOne(scheduledId: string): Promise<Scheduled> {
    return this.scheduledManager.findOneById(scheduledId)
  }

  async updateOne(params: { scheduledId: string; dto: ScheduledUpdateOneDto }): Promise<Scheduled> {
    const { scheduledId, dto } = params
    const patient = await this.patientManager.findOneById(dto.patient)
    const round = await this.roundManager.findOneById(dto.round)
    const scheduled = await this.scheduledManager.findOneById(scheduledId)
    return this.scheduledManager.updateOne(scheduled, { ...dto, patient, round })
  }

  async deleteOne(scheduledId: string): Promise<Scheduled> {
    return this.scheduledManager.deleteOne(scheduledId)
  }
}
