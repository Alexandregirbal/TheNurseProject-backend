import { Module } from '@nestjs/common'
import { CompanyDomainModule } from 'src/modules/company/domain/company.domain.module'
import { ContactDomainModule } from '../domain/contact.domain.module'
import { ContactService } from './contact.service'
import { CompanyContactController } from './controller/company.contact.controller'
import { ContactController } from './controller/contact.controller'

@Module({
  imports: [ContactDomainModule, CompanyDomainModule],
  controllers: [CompanyContactController, ContactController],
  providers: [ContactService],
  exports: [],
})
export class ContactApplicationModule {}
