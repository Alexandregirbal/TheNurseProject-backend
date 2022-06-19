import { Controller, Get, Param } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Contact } from '../../domain/contact.schema'
import { ContactService } from '../contact.service'

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get(':contactId')
  @Authorisation.isMember()
  getOne(@Param('contactId') contactId: string): Promise<Contact> {
    return this.contactService.getOne(contactId)
  }
}
