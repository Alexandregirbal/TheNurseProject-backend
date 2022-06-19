import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ContactManager } from './contact.manager'
import { Contact, ContactSchema } from './contact.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])],
  providers: [ContactManager],
  exports: [ContactManager],
})
export class ContactDomainModule {}
