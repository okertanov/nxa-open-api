import { FaucetActivityEntity } from '../entity/faucet.activity.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(FaucetActivityEntity)
export class FaucetActivityRepository extends Repository<FaucetActivityEntity> {
}