import { Module } from '@nestjs/common';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { CnrController } from './cnr.controller';
import { CnrService } from './cnr.service';

@Module({
    imports: [
        BlockchainModule
    ],
    controllers: [CnrController],
    providers: [CnrService],
    exports: [CnrService]
})
export class CnrModule {
}
