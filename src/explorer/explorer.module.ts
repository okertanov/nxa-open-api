import { Module } from '@nestjs/common';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { ExplorerController } from './explorer.controller';
import { ExplorerService } from './explorer.service';

@Module({
    imports: [
        BlockchainModule
    ],
    controllers: [ExplorerController],
    providers: [ExplorerService],
    exports: [ExplorerService]
})
export class ExplorerModule {
}
