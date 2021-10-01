import { Module } from '@nestjs/common';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { GovernanceController } from './governance.controller';
import { GovernanceService } from './governance.service';

@Module({
    imports: [
        BlockchainModule
    ],
    controllers: [GovernanceController],
    providers: [GovernanceService],
    exports: [GovernanceService]
})
export class GovernanceModule {
}
