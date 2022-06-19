import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator'
import { PatientObject } from '../../domain/patient.object'

export class ContactEmergencyDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  phone: string
}

export class PatientCreateOneDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  @IsOptional()
  phone: string

  @IsString()
  @IsOptional()
  address: string

  @IsString()
  @IsOptional()
  dateOfBirth: Date

  @IsEnum(PatientObject.Sex)
  @IsOptional()
  sex: PatientObject.Sex

  @IsString()
  @IsOptional()
  city: string

  @IsString()
  @IsOptional()
  country: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactEmergencyDto)
  @IsOptional()
  contactsEmergency: ContactEmergencyDto[]
}
