import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Company } from './entity/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: TreeRepository<Company>,
  ) {}

  async create(name: string, parentId?: number): Promise<Company> {
    const company = new Company();
    company.name = name;
    if (parentId) {
      const parent = await this.companyRepository.findOneBy({ id: parentId });
      company.parent = parent;
    }
    return this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.findTrees();
  }

  async findDescendants(id: number): Promise<Company[]> {
    const company = await this.companyRepository.findOneBy({ id });
    return this.companyRepository.findDescendants(company);
  }
}
