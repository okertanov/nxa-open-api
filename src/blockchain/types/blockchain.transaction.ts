import { ApiProperty } from "@nestjs/swagger";

//
// BlockchainTransaction
// See neo/Network/P2P/Payloads/Transaction.cs
//
export class BlockchainTransaction {
    public static get Empty() { return new BlockchainTransaction('', '', '', '', '', '', '', '', '', '', '', 0) };

    @ApiProperty()
    blockHash: string;

    @ApiProperty()
    blockIndex: string;

    @ApiProperty()
    index: string;

    @ApiProperty()
    hash: string;

    @ApiProperty()
    size: string;

    @ApiProperty()
    version: string;

    @ApiProperty()
    nonce: string;

    @ApiProperty()
    sender: string;

    @ApiProperty()
    sysfee: string;

    @ApiProperty()
    netfee: string;

    @ApiProperty()
    script: string;

    @ApiProperty()
    timestamp: number;

    constructor(
        blockHash: string,
        blockIndex: string,
        index: string,
        hash: string,
        size: string,
        version: string,
        nonce: string,
        sender: string,
        sysfee: string,
        netfee: string,
        script: string,
        timestamp: number
    
    ) {
        this.blockHash = blockHash;
        this.blockIndex = blockIndex;
        this.index = index;
        this.hash = hash;
        this.size = size;
        this.version = version;
        this.nonce = nonce;
        this.sender = sender;
        this.sysfee = sysfee;
        this.netfee = netfee;
        this.script = script;
        this.timestamp = timestamp;
    }

    public static fromRaw(blockHash: string, blockIndex: string, timestamp: number, rawTx: any): BlockchainTransaction {
        return new BlockchainTransaction(
            blockHash,
            blockIndex,
            rawTx.nonce,
            rawTx.hash,
            rawTx.size,
            rawTx.version,
            rawTx.nonce,
            rawTx.sender,
            rawTx.sysfee,
            rawTx.netfee,
            rawTx.script,
            timestamp
        );
    }
}
