import { Body, Controller, Get, Logger, Param, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainAssetDto } from '../assets/dto/blockchain.asset.dto';
import { BlockchainSmartContract } from '../blockchain/types/blockchain.smart.contract';
import { BlockchainBlock } from '../blockchain/types/blockchain.block';
import { BlockchainTransaction } from '../blockchain/types/blockchain.transaction';
import { ExplorerService } from './explorer.service';

@ApiTags('Explorer')
@Controller('/explorer')
export class ExplorerController {
    private readonly logger = new Logger(ExplorerController.name);

    constructor(private readonly explorerService: ExplorerService) {
    }

    @Get('/blocks')
    @ApiOperation({ summary: 'Get paginated blocks for explorer' })
    @ApiResponse({ status: 200, description: 'The paginated blocks for explorer', type: BlockchainBlock, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBlocks(
        @Req() req: Request,
        @Query('from') from: number,
        @Query('limit') limit: number,
        @Query('order') order: 'ascending' | 'descending',
    ): Promise<BlockchainBlock[]> {
        this.logger.verbose(`${req.method} : ${req.url} : ${from} : ${limit}`);
        return this.explorerService.getBlocks(from, limit, order);
    }

    @Get('/block/:hash')
    @ApiOperation({ summary: 'Get block by hash for explorer' })
    @ApiResponse({ status: 200, description: 'The block by hash for explorer', type: BlockchainBlock })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBlock(
        @Req() req: Request,
        @Param('hash') hash: string
    ): Promise<BlockchainBlock> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.explorerService.getBlock(hash);
    }

    @Get('/transactions')
    @ApiOperation({ summary: 'Get paginated transactions for explorer' })
    @ApiResponse({ status: 200, description: 'The paginated transactions for explorer', type: BlockchainTransaction, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getTransactions(
        @Req() req: Request,
        @Query('from') from: number,
        @Query('limit') limit: number,
        @Query('order') order: 'ascending' | 'descending',
    ): Promise<BlockchainTransaction[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.explorerService.getTransactions(from, limit, order);
    }

    @Get('/transaction/:hash')
    @ApiOperation({ summary: 'Get transaction by hash for explorer' })
    @ApiResponse({ status: 200, description: 'The transaction by hash for explorer', type: BlockchainTransaction })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getTransaction(
        @Req() req: Request,
        @Param('hash') hash: string
    ): Promise<BlockchainTransaction> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.explorerService.getTransaction(hash);
    }

    @Get('/contracts')
    @ApiOperation({ summary: 'Get paginated contracts for explorer' })
    @ApiResponse({ status: 200, description: 'The paginated contracts for explorer', type: BlockchainSmartContract, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getContracts(
        @Req() req: Request
    ): Promise<BlockchainSmartContract[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.explorerService.getContracts();
    }

    @Get('/contract/:hash')
    @ApiOperation({ summary: 'Get contract for explorer' })
    @ApiResponse({ status: 200, description: 'The contract by hash for explorer', type: BlockchainSmartContract })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getContract(
        @Req() req: Request,
        @Param('hash') hash: string
    ): Promise<BlockchainSmartContract> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.explorerService.getContract(hash);
    }

    @Get('/tokens')
    @ApiOperation({ summary: 'Get paginated tokens for explorer' })
    @ApiResponse({ status: 200, description: 'The paginated tokens for explorer', type: BlockchainAssetDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getTokens(
        @Req() req: Request
    ): Promise<BlockchainAssetDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.explorerService.getTokens();
    }

    @Get('/token/:hash')
    @ApiOperation({ summary: 'Get token for explorer' })
    @ApiResponse({ status: 200, description: 'The token by hash for explorer', type: BlockchainAssetDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getToken(
        @Req() req: Request,
        @Param('hash') hash: string
    ): Promise<BlockchainAssetDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.explorerService.getToken(hash);
    }
}