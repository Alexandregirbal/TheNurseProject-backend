import { IsString } from 'class-validator'

export class ReportCreateOneDto {
  @IsString()
  notes: string
}
