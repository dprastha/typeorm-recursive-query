import { Module } from '@nestjs/common';
import { CompanyModule } from './companies/company.module';
import { Company } from './companies/entity/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'company_hierarchy',
      entities: [Company],
      synchronize: true, // Don't use this in production
    }),
    CompanyModule,
  ],
})
export class AppModule {}
