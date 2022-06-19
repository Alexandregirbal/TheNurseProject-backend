import { Injectable } from '@nestjs/common'
import { CompanyManager } from 'src/modules/company/domain/company.manager'
import { ContactManager } from '../domain/contact.manager'
import { Contact } from '../domain/contact.schema'
import { ContactCreateOneDto } from './dto/contact.createOne.dto'

@Injectable()
export class ContactService {
  constructor(private contactManager: ContactManager, private companyManager: CompanyManager) {}

  async createOne(dto: ContactCreateOneDto, companyId: string): Promise<Contact> {
    const company = await this.companyManager.findOneById(companyId)

    return this.contactManager.createOne({ ...dto, company })
  }

  async getOne(contactId: string): Promise<Contact> {
    return this.contactManager.findOneById(contactId)
  }
}
