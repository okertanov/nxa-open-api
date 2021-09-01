import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';

@Module({
    imports: [
    ],
    controllers: [BlockchainController],
    providers: [BlockchainService],
    exports: [BlockchainService]
})
export class BlockchainModule {
}
