import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Scheduled } from '../../domain/scheduled.schema'
import { ScheduledCreateOneDto } from '../dto/scheduled.createOne.dto'
import { ScheduledUpdateOneDto } from '../dto/scheduled.updateOne.dto'
import { ScheduledService } from '../scheduled.service'

@Controller('scheduled')
export class ScheduledController {
  constructor(private readonly scheduledService: ScheduledService) {}

  @Get(':scheduledId')
  @Authorisation.isPrivate()
  getOne(@Param('patientId') scheduledId: string): Promise<Scheduled> {
    return this.scheduledService.getOne(scheduledId)
  }

  @Post('')
  @Authorisation.isPrivate()
  createOne(@Body() body: ScheduledCreateOneDto): Promise<Scheduled> {
    return this.scheduledService.createOne({ dto: body })
  }

  @Patch(':scheduledId')
  @Authorisation.isPrivate()
  updateOne(@Param('scheduledId') scheduledId: string, @Body() body: ScheduledUpdateOneDto): Promise<Scheduled> {
    return this.scheduledService.updateOne({ scheduledId, dto: body })
  }

  @Delete(':scheduledId')
  @Authorisation.isPrivate()
  deleteOne(@Param('scheduledId') scheduledId: string): Promise<Scheduled> {
    return this.scheduledService.deleteOne(scheduledId)
  }
}
