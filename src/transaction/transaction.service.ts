import { Injectable } from '@nestjs/common';
import { TransactionStatusDto } from './dto/transaction.status.dto';

@Injectable()
export class TransactionService {
    async getTransactionStatus(hash: string): Promise<TransactionStatusDto> {
        const txStatus = new TransactionStatusDto();
        return txStatus;
    }

    async broadcastTransactionRaw(body: unknown): Promise<TransactionStatusDto> {
        const txStatus = new TransactionStatusDto();
        return txStatus;
    }

    async modifyTransaction(hash: string, body: unknown): Promise<TransactionStatusDto> {
        const txStatus = new TransactionStatusDto();
        return txStatus;
    }

    async deleteTransaction(hash: string): Promise<TransactionStatusDto> {
        const txStatus = new TransactionStatusDto();
        return txStatus;
    }
}