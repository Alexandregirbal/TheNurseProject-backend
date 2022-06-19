import { IsString } from 'class-validator'

export class CompanyCreateOneDto {
  @IsString()
  name: string
}
