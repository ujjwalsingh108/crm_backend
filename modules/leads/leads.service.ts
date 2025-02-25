import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leads } from './entities/lead.entity';
import { CreateLeadDto } from './dto/leads.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Leads)
    private readonly leadsRepository: Repository<Leads>,
  ) {}

  async findAll(): Promise<Leads[]> {
    try {
      return await this.leadsRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch leads: ' + error);
    }
  }

  async createLead(createLeadDto: CreateLeadDto) {
    try {
      return await this.leadsRepository.save(createLeadDto);
    } catch (error) {
      throw new Error('Failed to create lead: ' + error);
    }
  }
}
