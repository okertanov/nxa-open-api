import { Controller, Get, Logger, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainSmartContract } from '../blockchain/types/blockchain.smart.contract';
import { ContractsService } from './contracts.service';

@ApiTags('Smart Contracts')
@Controller('/contracts')
export class ContractsController {
    private readonly logger = new Logger(ContractsController.name);

    constructor(private readonly contractsService: ContractsService) {
    }

    @Get('/native')
    @ApiOperation({ summary: 'Get Native smart contracts' })
    @ApiResponse({ status: 200, description: 'The Native smart contracts', type: BlockchainSmartContract, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBlockchainNodes(
        @Req() req: Request
    ): Promise<BlockchainSmartContract[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.contractsService.getNativeContracts();
    }
}
