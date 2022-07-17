import { Type } from 'class-transformer'
import { IsArray, IsDate, IsEnum, IsMongoId, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'
import { AppointmentObject } from 'src/modules/appointment/domain/appointment.object'

export class Time {
  @IsNumber()
  hour: number

  @IsNumber()
  minute: number
}

export class Schedule {
  @IsObject()
  startTime: Time

  @IsObject()
  endTime: Time
}
export class AppointmentScheduled {
  @IsNumber()
  day: number

  @IsObject()
  schedules: Schedule
}

export class ScheduledCreateOneDto {
  @IsMongoId()
  patient: string

  @IsMongoId()
  round: string

  @IsString()
  @IsOptional()
  startDate: string

  @IsString()
  @IsOptional()
  endDate: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AppointmentScheduled)
  @IsOptional()
  weekDays: AppointmentScheduled[]

  @IsOptional()
  @IsEnum({ enum: AppointmentObject.Category })
  category: AppointmentObject.Category
}
