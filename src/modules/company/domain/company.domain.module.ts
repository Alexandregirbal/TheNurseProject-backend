import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CompanyManager } from './company.manager'
import { Company, CompanySchema } from './company.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
  providers: [CompanyManager],
  exports: [CompanyManager],
})
export class CompanyDomainModule {}
