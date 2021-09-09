import { Module } from '@nestjs/common';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
    imports: [
        BlockchainModule
    ],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [WalletService]
})
export class WalletModule {
}
