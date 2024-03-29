import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PatientManager } from './patient.manager'
import { Patient, PatientSchema } from './patient.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }])],
  providers: [PatientManager],
  exports: [PatientManager],
})
export class PatientDomainModule {}
