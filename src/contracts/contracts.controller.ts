import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainSmartContract } from '../blockchain/types/blockchain.smart.contract';
import { ContractsService } from './contracts.service';
import { CreateSmartContractNep11Dto } from './dto/create.smart.contract.nep11.dto';
import { CreateSmartContractNep17Dto } from './dto/create.smart.contract.nep17.dto';
import { CreateSmartContractSourceDto } from './dto/create.smart.contract.source.dto';

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
    async getNativeContracts(
        @Req() req: Request
    ): Promise<BlockchainSmartContract[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.contractsService.getNativeContracts();
    }

    @Get('/all')
    @ApiOperation({ summary: 'Get All smart contracts' })
    @ApiResponse({ status: 200, description: 'All smart contracts', type: BlockchainSmartContract, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAllContracts(
        @Req() req: Request
    ): Promise<BlockchainSmartContract[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.contractsService.getAllContracts();
    }

    @Post('/create/source')
    @ApiOperation({ summary: 'Create any SC from source' })
    @ApiResponse({ status: 200, description: 'Creates SC from source', type: BlockchainSmartContract })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async createContractFromSource(
        @Req() req: Request,
        @Body() body: CreateSmartContractSourceDto
    ): Promise<BlockchainSmartContract> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);
        return this.contractsService.createContractFromSource(body);
    }

    @Post('/create/token')
    @ApiOperation({ summary: 'Create a NEP17 token' })
    @ApiResponse({ status: 200, description: 'Create a NEP17 token', type: BlockchainSmartContract })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async createTokenContract(
        @Req() req: Request,
        @Body() body: CreateSmartContractNep17Dto
    ): Promise<BlockchainSmartContract> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);
        return this.contractsService.createTokenContract(body);
    }

    @Post('/create/nft')
    @ApiOperation({ summary: 'Create a NEP11 NFT token' })
    @ApiResponse({ status: 200, description: 'Created a NEP11 NFT token', type: BlockchainSmartContract })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postRegisterCandidate(
        @Req() req: Request,
        @Body() body: CreateSmartContractNep11Dto
    ): Promise<BlockchainSmartContract> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);
        return this.contractsService.createNftContract(body);
    }
}
