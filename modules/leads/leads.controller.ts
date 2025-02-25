import { Controller, Get, Post, Param, Patch, Body } from '@nestjs/common';
import { Leads } from './entities/lead.entity';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/leads.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  async getLeads(): Promise<Leads[]> {
    return this.leadsService.findAll();
  }

  @Post()
  async createLead(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.createLead(createLeadDto);
  }
}
