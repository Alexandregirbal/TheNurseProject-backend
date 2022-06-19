import { Body, Controller, Param, Post } from '@nestjs/common'
import { Authorisation } from 'src/decorators/authorisation.decorator'
import { Contact } from '../../domain/contact.schema'
import { ContactService } from '../contact.service'
import { ContactCreateOneDto } from '../dto/contact.createOne.dto'

@Controller('companies/:companyId/contacts')
export class CompanyContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @Authorisation.isOwner()
  async createOne(@Body() body: ContactCreateOneDto, @Param('companyId') companyId: string): Promise<Contact> {
    const contact = await this.contactService.createOne(body, companyId)

    return contact
  }
}
