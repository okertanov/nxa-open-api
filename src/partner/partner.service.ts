import { Injectable } from '@nestjs/common';
import { BecomePartnerRepository } from '../repository/become.partner.repository';
import { BecomePartnerDto } from './dto/become.partner.dto';

@Injectable()
export class PartnerService {
    constructor(
        private readonly repository: BecomePartnerRepository
    ) {
    }

    async registerBecomePartnerRequest(body: BecomePartnerDto): Promise<BecomePartnerDto> {
        const entity = this.repository.create(body);
        const saved = await this.repository.save(entity);
        return BecomePartnerDto.fromEntity(saved);
    }
}
