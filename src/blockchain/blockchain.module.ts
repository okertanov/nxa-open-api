import { Module } from '@nestjs/common';
import { BlockchainAccessService } from './blockchain.access.service';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';
import { NeoBlockchainProvider } from './providers/neo/neo.blockchain.provider';
import { NxaBlockchainExtProvider } from './providers/nxa/nxa.blockchain.ext.provider';
import { NxaBlockchainProvider } from './providers/nxa/nxa.blockchain.provider';

@Module({
    imports: [
    ],
    controllers: [BlockchainController],
    providers: [
        NeoBlockchainProvider,
        NxaBlockchainProvider,
        NxaBlockchainExtProvider,
        BlockchainAccessService,
        BlockchainService
    ],
    exports: [
        BlockchainAccessService,
        BlockchainService
    ]
})
export class BlockchainModule {
}
