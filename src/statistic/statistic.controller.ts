import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainStatisticDto } from './dto/blockchain.statistic.dto';
import { StatisticService } from './statistic.service';

@ApiTags('Statistic')
@Controller('/statistic')
export class StatisticController {
    private readonly logger = new Logger(StatisticController.name);

    constructor(private readonly statisticService: StatisticService) {
    }

    @Get('/')
    @ApiOperation({ summary: 'Get Blockchain statistic' })
    @ApiResponse({ status: 200, description: 'The Blockchain statistic', type: BlockchainStatisticDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBlockchainStatistic(
        @Req() req: Request
    ): Promise<BlockchainStatisticDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.statisticService.getBlockchainStatistic();
    }
}
