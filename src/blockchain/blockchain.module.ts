import { Module } from '@nestjs/common';
import { BlockchainAccessService } from './blockchain.access.service';
import { BlockchainController } from './blockchain.controller';
import { BlockchainGovernanceService } from './blockchain.governance.service';
import { BlockchainService } from './blockchain.service';
import { NeoBlockchainProvider } from './providers/neo/neo.blockchain.provider';
import { NxaBlockchainExtProvider } from './providers/nxa/nxa.blockchain.ext.provider';
import { NxaBlockchainProvider } from './providers/nxa/nxa.blockchain.provider';
import { BlockchainCnrService } from './blockchain.cnr.service';

@Module({
    imports: [
    ],
    controllers: [BlockchainController],
    providers: [
        NeoBlockchainProvider,
        NxaBlockchainProvider,
        NxaBlockchainExtProvider,
        BlockchainAccessService,
        BlockchainGovernanceService,
        BlockchainService,
        BlockchainCnrService
    ],
    exports: [
        BlockchainAccessService,
        BlockchainGovernanceService,
        BlockchainService,
        BlockchainCnrService
    ]
})
export class BlockchainModule {
}
