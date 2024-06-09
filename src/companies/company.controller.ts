import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './entity/company.entity';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companiesService: CompanyService) {}

  @Post()
  async create(
    @Body() body: { name: string; parentId?: number },
  ): Promise<Company> {
    return this.companiesService.create(body.name, body.parentId);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get(':id/descendants')
  async findDescendants(@Param('id') id: number): Promise<Company[]> {
    return this.companiesService.findDescendants(id);
  }

  @Get(':id/ancestors')
  async findAncestors(@Param('id') id: number): Promise<Company[]> {
    return this.companiesService.findAncestors(id);
  }
}
