import { Module } from '@nestjs/common';
import { ContractsModule } from '../contracts/contracts.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
    imports: [
        BlockchainModule,
        ContractsModule
    ],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [WalletService]
})
export class WalletModule {
}
