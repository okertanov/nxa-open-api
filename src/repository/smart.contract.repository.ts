import { EntityRepository, Repository } from 'typeorm';
import { SmartContractEntity } from '../entity/smart.contract.entity';

@EntityRepository(SmartContractEntity)
export class SmartContractRepository extends Repository<SmartContractEntity> {
}