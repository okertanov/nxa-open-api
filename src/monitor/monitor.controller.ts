import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainMonitorNodeDto } from './dto/blockchain.monitor.node.dto';
import { MonitorService } from './monitor.service';

@ApiTags('Monitor')
@Controller('/monitor')
export class MonitorController {
    private readonly logger = new Logger(MonitorController.name);

    constructor(private readonly monitorService: MonitorService) {
    }

    @Get('/nodes')
    @ApiOperation({ summary: 'Get Blockchain nodes' })
    @ApiResponse({ status: 200, description: 'The Blockchain nodes', type: BlockchainMonitorNodeDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBlockchainNodes(
        @Req() req: Request
    ): Promise<BlockchainMonitorNodeDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.monitorService.getBlockchainNodes();
    }
}
