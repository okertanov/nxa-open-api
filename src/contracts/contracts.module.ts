import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartContractRepository } from '../repository/smart.contract.repository';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SmartContractRepository]),
    ],
    controllers: [ContractsController],
    providers: [ContractsService],
    exports: [ContractsService]
})
export class ContractsModule {
}
