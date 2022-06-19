import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Patient } from '../../domain/patient.schema'
import { PatientUpdateOneDto } from '../dto/patient.updateOne.dto'
import { PatientService } from '../patient.service'

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get(':patientId')
  @Authorisation.isMember()
  getOne(@Param('patientId') patientId: string): Promise<Patient> {
    return this.patientService.getOne(patientId)
  }

  @Patch(':patientId')
  @Authorisation.isMember()
  updateOne(@Body() body: PatientUpdateOneDto, @Param('patientId') patientId: string): Promise<Patient> {
    return this.patientService.updateOne(patientId, body)
  }

  @Delete(':patientId')
  @Authorisation.isMember()
  deleteOne(@Param('patientId') patientId: string): Promise<Patient> {
    return this.patientService.deleteOne(patientId)
  }
}
