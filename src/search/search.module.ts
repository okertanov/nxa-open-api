
import { Module } from '@nestjs/common';
import { ContractsModule } from '../contracts/contracts.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
    imports: [
        BlockchainModule,
        ContractsModule
    ],
    controllers: [
        SearchController
    ],
    providers: [
        SearchService
    ],
    exports: [
        SearchService
    ]
})
export class SearchModule {
}
