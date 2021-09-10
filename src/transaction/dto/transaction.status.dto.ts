import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainTransaction } from "../../blockchain/types/blockchain.transaction";

export enum TransactionStatus {
    NEW = 'NEW',
    ANNOUNCED = 'ANNOUNCED',
    CONFIRMED = 'CONFIRMED',
    FAILED = 'FAILED',
}

export class TransactionStatusDto {
    @ApiProperty()
    status: TransactionStatus;

    @ApiProperty()
    transaction: BlockchainTransaction;

    @ApiPropertyOptional()
    error?: string;

    constructor(status: TransactionStatus, transaction?: BlockchainTransaction, error?: string) {
        this.status = status;
        this.transaction = transaction ?? new BlockchainTransaction();
        this.error = error;
    }
}