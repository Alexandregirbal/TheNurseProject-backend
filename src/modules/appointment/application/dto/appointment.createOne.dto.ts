import { IsMongoId, IsOptional, IsString } from 'class-validator'

export class AppointmentCreateOneDto {
  @IsMongoId()
  patientId: string

  @IsString()
  timeStart: string

  @IsString()
  timeEnd: string

  @IsString()
  date: string

  @IsString()
  @IsOptional()
  details: string
}
