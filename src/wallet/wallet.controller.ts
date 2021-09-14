import { Controller, Get, Logger, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainTransfer } from '../blockchain/types/blockchain.transfer';
import { BlockchainBalanceDto } from './dto/blockchain.balance.dto';
import { WalletService } from './wallet.service';

@ApiTags('Wallet')
@Controller('/wallet')
export class WalletController {
    private readonly logger = new Logger(WalletController.name);

    constructor(private readonly walletService: WalletService) {
    }

    @Get('/balance/:address')
    @ApiOperation({ summary: 'Get an address balance for all non-zero tokens' })
    @ApiResponse({ status: 200, description: 'An address balance for all non-zero tokens', type: BlockchainBalanceDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAddressBalances(
        @Req() req: Request,
        @Param('address') address: string
    ): Promise<BlockchainBalanceDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.walletService.getAddressBalances(address);
    }

    @Get('/balance/:address/dvita')
    @ApiOperation({ summary: 'Get an address balance for DVITA' })
    @ApiResponse({ status: 200, description: 'An address balance for DVITA', type: BlockchainBalanceDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getDvitaBalance(
        @Req() req: Request,
        @Param('address') address: string
    ): Promise<BlockchainBalanceDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.walletService.getDvitaBalance(address);
    }

    @Get('/balance/:address/dvg')
    @ApiOperation({ summary: 'Get an address balance for DVG' })
    @ApiResponse({ status: 200, description: 'An address balance for DVG', type: BlockchainBalanceDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getDvgBalance(
        @Req() req: Request,
        @Param('address') address: string
    ): Promise<BlockchainBalanceDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.walletService.getDvgBalance(address);
    }

    @Get('/balance/:address/token/:hash')
    @ApiOperation({ summary: 'Get an address balance for a token hash' })
    @ApiResponse({ status: 200, description: 'An address balance for a token hash', type: BlockchainBalanceDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getTokenBalance(
        @Req() req: Request,
        @Param('address') address: string,
        @Param('hash') hash: string
    ): Promise<BlockchainBalanceDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.walletService.getTokenBalance(address, hash);
    }

    @Get('/transfers/:address')
    @ApiOperation({ summary: 'Get the transfers e.g in/out transfers by address' })
    @ApiResponse({ status: 200, description: 'The transfers by address', type: BlockchainTransfer, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getTransfersByAddress(
        @Req() req: Request,
        @Param('address') address: string
    ): Promise<BlockchainTransfer[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.walletService.getTransfersByAddress(address);
    }
}
