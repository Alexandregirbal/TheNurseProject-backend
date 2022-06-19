import { IsString } from 'class-validator'

export class ContactCreateOneDto {
  @IsString()
  firstName: string
}
