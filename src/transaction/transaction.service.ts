import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BlockchainTransaction } from '../blockchain/types/blockchain.transaction';
import { BlockchainAccessService } from '../blockchain/blockchain.access.service';
import { TransactionFeesDto } from './dto/transaction.fees.dto';
import { TransactionStatus, TransactionStatusDto } from './dto/transaction.status.dto';

@Injectable()
export class TransactionService {
    private readonly logger = new Logger(TransactionService.name);

    constructor(
        private readonly blockchainAccessService: BlockchainAccessService,
    ) {
    }

    async getTransactionStatus(hash: string): Promise<TransactionStatusDto> {
        try {
            const tx = await this.blockchainAccessService.getTransaction(hash);
            
            const status = tx.blockHash ? TransactionStatus.CONFIRMED : TransactionStatus.ANNOUNCED;
            const txStatus = new TransactionStatusDto(status, BlockchainTransaction.Empty);
            txStatus.transaction = tx;

            return txStatus;
        } catch(e) {
            this.logger.error(e, e.stack);

            const txStatus = new TransactionStatusDto(TransactionStatus.FAILED);
            txStatus.error = e.message ?? 'Unknown error';

            throw new BadRequestException(txStatus, txStatus.error);
        } 
    }

    async broadcastTransactionRaw(body: string): Promise<TransactionStatusDto> {
        try {
            const txHash = await this.blockchainAccessService.broadcastTransaction(body);

            const txStatus = new TransactionStatusDto(TransactionStatus.ANNOUNCED, BlockchainTransaction.Empty);
            txStatus.transaction.hash = txHash;

            return txStatus;
        } catch(e) {
            this.logger.error(e, e.stack);

            const txStatus = new TransactionStatusDto(TransactionStatus.FAILED);
            txStatus.error = e.message ?? 'Unknown error';

            throw new BadRequestException(txStatus, txStatus.error);
        }
    }

    async modifyTransaction(hash: string, body: string): Promise<TransactionStatusDto> {
        const txStatus = new TransactionStatusDto(TransactionStatus.NEW);
        return txStatus;
    }

    async deleteTransaction(hash: string): Promise<TransactionStatusDto> {
        const txStatus = new TransactionStatusDto(TransactionStatus.NEW);
        return txStatus;
    }

    async getTransactionFees(script: string, length: number): Promise<TransactionFeesDto> {
        const systemFee = await this.blockchainAccessService.getSystemFeeForScript(script);
        const networkFee = await this.blockchainAccessService.getNetworkFeeForLength(length);
        const dto = new TransactionFeesDto(script, length, systemFee, networkFee);
        return dto;
    }
}