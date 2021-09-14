import { ApiProperty } from "@nestjs/swagger";
import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainBlock
// See neo/Network/P2P/Payloads/Block.cs
//
export class BlockchainBlock {
    @ApiProperty()
    version: string;

    @ApiProperty()
    index: string;

    @ApiProperty()
    hash: string;

    @ApiProperty()
    timestamp: number;
    
    @ApiProperty()
    transactions: BlockchainTransaction[];

    constructor(version: string, index: string, hash: string, timestamp: number, transactions?: BlockchainTransaction[]) {
        this.version = version;
        this.index = index;
        this.hash = hash;
        this.timestamp = timestamp;
        this.transactions = transactions;
    }

    public static fromRaw(rawBlock: any): BlockchainBlock {
        return new BlockchainBlock(
            rawBlock.version,
            rawBlock.index,
            rawBlock.hash,
            rawBlock.timestamp,
            rawBlock.tx ?
                rawBlock.tx.map(tx => BlockchainTransaction.fromRaw(rawBlock.hash, rawBlock.index.toString(), rawBlock.time, tx)) :
                []
        );
    }
}
