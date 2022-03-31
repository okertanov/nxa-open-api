import { Body, Controller, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainCnrService } from '../blockchain/blockchain.cnr.service';
import { BlockchainCnrResolveResultDto } from "./dto/blockchain.cnr.resolve.result";
import { BlockchainCnrRegisterRequestDto } from "./dto/blockchain.cnr.register.request";
import { BlockchainCnrRegisterResultDto } from "./dto/blockchain.cnr.register.result";
import { BlockchainCnrUnregisterRequestDto } from "./dto/blockchain.cnr.unregister.request";
import { BlockchainCnrUnregisterResultDto } from "./dto/blockchain.cnr.unregister.result";

@ApiTags('CNR')
@Controller('/cnr')
export class CnrController {
    private readonly logger = new Logger(CnrController.name);

    constructor(private readonly blockchainCnrService: BlockchainCnrService) {
    }

    @Get('/resolve/:cname')
    @ApiOperation({ summary: 'Resolve canonical name to according address' })
    @ApiResponse({ status: 200, description: 'Canonical name resolved', type: BlockchainCnrResolveResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async resolveCname(
        @Req() req: Request,
        @Param('cname') cname: string
    ): Promise<BlockchainCnrResolveResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${cname}`);

        return this.blockchainCnrService.resolve(cname);
    }

    @Post('/register')
    @ApiOperation({ summary: 'Register a canonical name to an address' })
    @ApiResponse({ status: 200, description: 'Canonical name registration result', type: BlockchainCnrRegisterResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async registerCname(
        @Req() req: Request,
        @Body() body: BlockchainCnrRegisterRequestDto
    ): Promise<BlockchainCnrRegisterResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);

        return this.blockchainCnrService.register(body);
    }

    @Post('/unregister')
    @ApiOperation({ summary: 'Unregister a canonical name from an address' })
    @ApiResponse({ status: 200, description: 'Canonical name unregistration result', type: BlockchainCnrUnregisterResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async unregisterCname(
        @Req() req: Request,
        @Body() body: BlockchainCnrUnregisterRequestDto
    ): Promise<BlockchainCnrUnregisterResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);

        return this.blockchainCnrService.unregister(body);
    }
}
