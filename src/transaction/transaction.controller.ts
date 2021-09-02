import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TransactionStatusDto } from './dto/transaction.status.dto';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@Controller('/transaction')
export class TransactionController {
    private readonly logger = new Logger(TransactionController.name);

    constructor(private readonly transactionService: TransactionService) {
    }

    @Get('/status/:hash')
    @ApiOperation({ summary: 'Get current transaction status' })
    @ApiResponse({ status: 200, description: 'The Transaction status', type: TransactionStatusDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getTransactionStatus(
        @Req() req: Request,
        @Param('hash') hash: string
    ): Promise<TransactionStatusDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.transactionService.getTransactionStatus(hash);
    }

    @Post('/broadcast')
    @ApiOperation({ summary: 'Broadcast transaction from raw signed payload' })
    @ApiResponse({ status: 201, description: 'Broadcasted Transaction status', type: TransactionStatusDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postTransaction(
        @Req() req: Request,
        @Body() body: unknown
    ): Promise<TransactionStatusDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.transactionService.broadcastTransactionRaw(body);
    }

    @Put('/:hash')
    @ApiOperation({ summary: 'Modify unannounced Transaction by its hash' })
    @ApiResponse({ status: 200, description: 'Modified unannounced Transaction status', type: TransactionStatusDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async modifyTransaction(
        @Req() req: Request,
        @Param('hash') hash: string,
        @Body() body: unknown
    ): Promise<TransactionStatusDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.transactionService.modifyTransaction(hash, body);
    }

    @Delete('/:hash')
    @ApiOperation({ summary: 'Delete/rollback unannounced Transaction by its hash' })
    @ApiResponse({ status: 200, description: 'Deleted/rolled-back unannounced Transaction status', type: TransactionStatusDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async deleteTransaction(
        @Req() req: Request,
        @Param('hash') hash: string
    ): Promise<TransactionStatusDto> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.transactionService.deleteTransaction(hash);
    }
}
