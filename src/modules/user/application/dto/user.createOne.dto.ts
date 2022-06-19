import { Type } from 'class-transformer'
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator'

export class UserCreateOneDto {
  @IsEmail()
  email: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date

  @IsString()
  password: string

  @IsString()
  @IsOptional()
  phone: string
}
