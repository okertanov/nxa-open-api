import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PlainBody } from '../shared/decorators/plain.body';
import { BroadcastTransactionDto } from './dto/broadcast.transaction.dto';
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
    @ApiResponse({ status: 400, description: 'Bad Request', type: TransactionStatusDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiConsumes('text/plain', 'application/json')
    async postTransaction(
        @Req() req: Request,
        @Body() body: BroadcastTransactionDto,
        @PlainBody() plainBody: string
    ): Promise<TransactionStatusDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(plainBody)}`);
        return this.transactionService.broadcastTransactionRaw(plainBody);
    }

    @Put('/:hash')
    @ApiOperation({ summary: 'Modify unannounced Transaction by its hash' })
    @ApiResponse({ status: 200, description: 'Modified unannounced Transaction status', type: TransactionStatusDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async modifyTransaction(
        @Req() req: Request,
        @Param('hash') hash: string,
        @Body() body: BroadcastTransactionDto,
        @PlainBody() plainBody: string
    ): Promise<TransactionStatusDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(plainBody)}`);
        return this.transactionService.modifyTransaction(hash, plainBody);
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
