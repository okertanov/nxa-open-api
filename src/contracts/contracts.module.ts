import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

@Module({
    imports: [
    ],
    controllers: [ContractsController],
    providers: [ContractsService],
    exports: [ContractsService]
})
export class ContractsModule {
}
