import { Module } from '@nestjs/common';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
    imports: [
        BlockchainModule
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [TransactionService]
})
export class TransactionModule {
}
