import { Controller, Get, Logger, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AssetsService } from './assets.service';
import { BlockchainAssetDto } from './dto/blockchain.asset.dto';

@ApiTags('Assets')
@Controller('/assets')
export class AssetsController {
    private readonly logger = new Logger(AssetsController.name);

    constructor(private readonly assetsService: AssetsService) {
    }

    @Get('/all')
    @ApiOperation({ summary: 'Get Available assets' })
    @ApiResponse({ status: 200, description: 'The Available assets', type: BlockchainAssetDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAllAssets(
        @Req() req: Request
    ): Promise<BlockchainAssetDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.assetsService.getAllAssets();
    }

    @Get('/hash/:hash')
    @ApiOperation({ summary: 'Get Asset by hash' })
    @ApiResponse({ status: 200, description: 'Asset by hash', type: BlockchainAssetDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAssetByHash(
        @Req() req: Request,
        @Param('hash') hash: string
    ): Promise<BlockchainAssetDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.assetsService.getAssetByHash(hash);
    }
}