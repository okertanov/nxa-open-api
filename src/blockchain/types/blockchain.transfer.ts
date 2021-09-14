import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainAssetDto } from "../../assets/dto/blockchain.asset.dto";
import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainTransferType
//
export enum BlockchainTransferType {
    RECEIVED = 'RECEIVED',
    SENT = 'SENT',
}

//
// BlockchainTransfer
//
export class BlockchainTransfer {
    @ApiProperty()
    type: BlockchainTransferType;

    @ApiProperty()
    blockIndex: string;

    @ApiProperty()
    txHash: string;

    @ApiProperty()
    from: string;

    @ApiProperty()
    to: string;

    @ApiProperty()
    amount: string;

    @ApiProperty()
    timestamp: number;

    @ApiProperty()
    asset: BlockchainAssetDto;

    constructor(
        type: BlockchainTransferType,
        blockIndex: string,
        txHash: string,
        from: string,
        to: string,
        amount: string,
        timestamp: number,
        asset: BlockchainAssetDto
    ) {
        this.type = type;
        this.blockIndex = blockIndex;
        this.txHash = txHash;
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timestamp = timestamp;
        this.asset = asset;
    }
}
