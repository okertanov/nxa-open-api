import { Module } from '@nestjs/common';
import { ContractsModule } from '../contracts/contracts.module';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';

@Module({
    imports: [
        ContractsModule,
    ],
    controllers: [AssetsController],
    providers: [AssetsService],
    exports: [AssetsService]
})
export class AssetsModule {
}
