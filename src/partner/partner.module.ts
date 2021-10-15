import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BecomePartnerRepository } from '../repository/become.partner.repository';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BecomePartnerRepository]),
    ],
    controllers: [
        PartnerController
    ],
    providers: [
        PartnerService
    ],
})
export class PartnerModule {
}
