import { ApiProperty } from "@nestjs/swagger";
import { BlockchainTransaction } from "./blockchain.transaction";

export class BlockchainBlockWhitness {
    @ApiProperty()
    invocation: string;

    @ApiProperty()
    verification: string;

    constructor(
        invocation: string,
        verification: string
    ) {
        this.invocation = invocation;
        this.verification = verification;
    }

    public static fromRaw(rawWhitness: any): BlockchainBlockWhitness {
        return new BlockchainBlockWhitness(
            rawWhitness.invocation,
            rawWhitness.verification
        );
    }

    public static fromRawArray(rawWhitnesses: any[]): BlockchainBlockWhitness[] {
        return rawWhitnesses.map(BlockchainBlockWhitness.fromRaw);
    }
}

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
    size: number;

    @ApiProperty()
    timestamp: number;

    @ApiProperty()
    confirmations: number;

    @ApiProperty()
    witnesses: BlockchainBlockWhitness[];
    
    @ApiProperty()
    transactions: BlockchainTransaction[];

    constructor(
        version: string,
        index: string,
        hash: string,
        size: number,
        timestamp: number,
        confirmations: number,
        witnesses: BlockchainBlockWhitness[],
        transactions?: BlockchainTransaction[]
    ) {
        this.version = version;
        this.index = index;
        this.hash = hash;
        this.size = size;
        this.timestamp = timestamp;
        this.confirmations = confirmations;
        this.witnesses = witnesses;
        this.transactions = transactions ?? [];
    }

    public static fromRaw(rawBlock: any): BlockchainBlock {
        return new BlockchainBlock(
            rawBlock.version.toString(),
            rawBlock.index.toString(),
            rawBlock.hash,
            rawBlock.size,
            rawBlock.time,
            rawBlock.confirmations,
            BlockchainBlockWhitness.fromRawArray(rawBlock.witnesses),
            rawBlock.tx ?
                rawBlock.tx.map(tx => BlockchainTransaction.fromRaw(rawBlock.hash, rawBlock.index.toString(), rawBlock.time, tx)) :
                []
        );
    }
}
