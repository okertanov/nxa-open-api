import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartContractRepository } from '../repository/smart.contract.repository';
import { CaasClient } from './compiler/caas.client';
import { SmartContractCompilerService } from './compiler/smart.contract.compiler.service';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([SmartContractRepository]),
    ],
    controllers: [
        ContractsController
    ],
    providers: [
        ContractsService,
        CaasClient,
        SmartContractCompilerService
    ],
    exports: [
        ContractsService,
        SmartContractCompilerService
    ]
})
export class ContractsModule {
}
