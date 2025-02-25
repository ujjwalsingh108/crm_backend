import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from "./leads.service"
import { LeadsController } from "./leads.controller";
import { Leads } from "./entities/lead.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Leads])], 
    controllers: [LeadsController],
    providers: [LeadsService],
})
export class LeadsModule {}