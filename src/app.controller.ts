import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Authorisation } from './decorators/authorisation.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Authorisation.isPublic()
  @Get()
  welcomeMessage(): string {
    return this.appService.getWelcomeMessage()
  }
}
