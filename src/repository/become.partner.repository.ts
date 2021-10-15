import { EntityRepository, Repository } from 'typeorm';
import { BecomePartnerEntity } from '../entity/become.partner.entity';

@EntityRepository(BecomePartnerEntity)
export class BecomePartnerRepository extends Repository<BecomePartnerEntity> {
}