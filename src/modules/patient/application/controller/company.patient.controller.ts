import { Body, Controller, Param, Post } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Patient } from '../../domain/patient.schema'
import { PatientCreateOneDto } from '../dto/patient.createOne.dto'
import { PatientService } from '../patient.service'

@Controller('companies/:companyId/patients')
export class CompanyPatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Authorisation.isOwner()
  async createOne(@Body() body: PatientCreateOneDto, @Param('companyId') companyId: string): Promise<Patient> {
    const patient = await this.patientService.createOne(body, companyId)

    return patient
  }
}
