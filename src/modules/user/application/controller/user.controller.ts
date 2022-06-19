import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { RequestUser } from 'src/decorators/endpoint.decorator'
import { Patient } from 'src/modules/patient/domain/patient.schema'
import { User } from '../../domain/user.schema'
import { UserCreateOneDto } from '../dto/user.createOne.dto'
import { UsersService } from '../user.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Authorisation.isPrivate()
  findOneByEmail(@Query('email') email: string): Promise<Omit<User, 'password'>> {
    return this.userService.findOneByEmail(email)
  }

  @Get('/me')
  @Authorisation.isPrivate()
  findOwnProfil(@RequestUser() user: User): Promise<Omit<User, 'password'>> {
    return this.userService.findOneById(user._id.toString())
  }

  @Get('/me/patients')
  @Authorisation.isPrivate()
  findPatients(@RequestUser() user: User): Promise<Array<Patient>> {
    return this.userService.findPatients(user._id.toString())
  }

  @Post()
  @Authorisation.isPrivate()
  createOne(@Body() body: UserCreateOneDto): Promise<User> {
    return this.userService.createOne(body)
  }
}
