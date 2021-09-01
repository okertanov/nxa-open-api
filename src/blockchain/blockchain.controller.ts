import { Controller, Get, Logger, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainService } from './blockchain.service';
import { BlockchainInfoDto } from './dto/blockchain.info.dto';
import { BlockchainBlock } from './types/blockchain.block';
import { BlockchainTransaction } from './types/blockchain.transaction';

@ApiTags('Blockchain')
@Controller('/blockchain')
export class BlockchainController {
    private readonly logger = new Logger(BlockchainController.name);

    constructor(private readonly blockchainService: BlockchainService) {
    }

    @Get('/info')
    @ApiOperation({ summary: 'Get Blockchain system info' })
    @ApiResponse({ status: 200, description: 'The Blockchain system info', type: BlockchainInfoDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getInfo(
        @Req() req: Request
    ): Promise<BlockchainInfoDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.blockchainService.getInfo();
    }

    @Get('/block/genesis')
    @ApiOperation({ summary: 'Get Blockchain Genesis block' })
    @ApiResponse({ status: 200, description: 'The Blockchain Genesis block', type: BlockchainBlock })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getGenesisBlock(
        @Req() req: Request
    ): Promise<BlockchainBlock> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.blockchainService.getGenesisBlock();
    } 

    @Get('/block/latest')
    @ApiOperation({ summary: 'Get Blockchain latest block' })
    @ApiResponse({ status: 200, description: 'The Blockchain latest block', type: BlockchainBlock })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getLatestBlock(
        @Req() req: Request
    ): Promise<BlockchainBlock> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.blockchainService.getLatestBlock();
    } 

    @Get('/block/:id')
    @ApiOperation({ summary: 'Get Blockchain block by id' })
    @ApiResponse({ status: 200, description: 'The Blockchain block by id', type: BlockchainBlock })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBlockById(
        @Req() req: Request,
        @Param('id') id: string,
    ): Promise<BlockchainBlock> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.blockchainService.getBlockById(id);
    } 

    @Get('/block/hash/:hash')
    @ApiOperation({ summary: 'Get Blockchain block by id' })
    @ApiResponse({ status: 200, description: 'The Blockchain block by id', type: BlockchainBlock })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBlockByHash(
        @Req() req: Request,
        @Param('hash') hash: string,
    ): Promise<BlockchainBlock> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.blockchainService.getBlockByHash(hash);
    }

    @Get('/block/:id/transactions')
    @ApiOperation({ summary: 'Get Blockchain transactions by block id' })
    @ApiResponse({ status: 200, description: 'The Blockchain transactions by block id', type: BlockchainTransaction, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBlockTransactionsByBlockId(
        @Req() req: Request,
        @Param('id') id: string,
    ): Promise<BlockchainTransaction[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.blockchainService.getBlockTransactionsByBlockId(id);
    }

    @Get('/block/hash/:hash/transactions')
    @ApiOperation({ summary: 'Get Blockchain transactions by block hash' })
    @ApiResponse({ status: 200, description: 'The Blockchain transactions by block hash', type: BlockchainTransaction, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBlockTransactionsByBlockHash(
        @Req() req: Request,
        @Param('hash') hash: string,
    ): Promise<BlockchainTransaction[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.blockchainService.getBlockTransactionsByBlockHash(hash);
    }

    @Get('/transaction/hash/:hash')
    @ApiOperation({ summary: 'Get Blockchain transaction by hash' })
    @ApiResponse({ status: 200, description: 'The Blockchain transaction by hash', type: BlockchainTransaction })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getTransactionByHash(
        @Req() req: Request,
        @Param('hash') hash: string,
    ): Promise<BlockchainTransaction> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.blockchainService.getTransactionByHash(hash);
    }
}