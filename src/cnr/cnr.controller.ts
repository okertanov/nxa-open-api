import { Body, Controller, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainCnrService } from '../blockchain/blockchain.cnr.service';
import { BlockchainCnrResolveResultDto } from "./dto/blockchain.cnr.resolve.result";
import { BlockchainCnrCreateRegisterTxRequestDto } from "./dto/blockchain.cnr.createregistertx.request";
import { BlockchainCnrCreateRegisterTxResultDto } from "./dto/blockchain.cnr.createregistertx.result";
import { BlockchainCnrCreateUnregisterTxRequestDto } from "./dto/blockchain.cnr.createunregistertx.request";
import { BlockchainCnrCreateUnregisterTxResultDto } from "./dto/blockchain.cnr.createunregistertx.result";
import { BlockchainCnrUnregisterRequestDto } from "./dto/blockchain.cnr.unregister.request";
import { BlockchainCnrUnregisterResultDto } from "./dto/blockchain.cnr.unregister.result";
import { BlockchainCnrRegisterRequestDto } from "./dto/blockchain.cnr.register.request";
import { BlockchainCnrRegisterResultDto } from "./dto/blockchain.cnr.register.result";

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

    @Post('/createregistertx')
    @ApiOperation({ summary: 'Create transaction to register a canonical name to an address' })
    @ApiResponse({ status: 200, description: 'Canonical name registration result', type: BlockchainCnrCreateRegisterTxResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async createregistertx(
        @Req() req: Request,
        @Body() body: BlockchainCnrCreateRegisterTxRequestDto
    ): Promise<BlockchainCnrCreateRegisterTxResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);

        return this.blockchainCnrService.createregistertx(body);
    }

    @Post('/createunregistertx')
    @ApiOperation({ summary: 'Create transaction to unregister a canonical name from an address' })
    @ApiResponse({ status: 200, description: 'Canonical name unregistration result', type: BlockchainCnrCreateUnregisterTxResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async createunregistertx(
        @Req() req: Request,
        @Body() body: BlockchainCnrCreateUnregisterTxRequestDto
    ): Promise<BlockchainCnrCreateUnregisterTxResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);

        return this.blockchainCnrService.createunregistertx(body);
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
