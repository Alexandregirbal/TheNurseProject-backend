import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AbstractManager } from 'src/modules/abstract/abstract.manager'
import { Contact, ContactDocument } from './contact.schema'

@Injectable()
export class ContactManager extends AbstractManager<Contact> {
  constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>) {
    super(contactModel)
  }
}
