import { Type } from 'class-transformer'
import { IsArray, IsDate, IsEnum, IsMongoId, IsNumber, IsObject, IsOptional, ValidateNested } from 'class-validator'
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

export class ScheduledUpdateOneDto {
  @IsMongoId()
  @IsOptional()
  patient: string

  @IsMongoId()
  @IsOptional()
  round: string

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate: Date

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate: Date | undefined

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AppointmentScheduled)
  @IsOptional()
  weekDays: AppointmentScheduled[]

  @IsEnum({ enum: AppointmentObject.Category })
  category: AppointmentObject.Category
}
