import { IsString } from 'class-validator'

export class RoundCreateOneDto {
  @IsString()
  name: string
}
