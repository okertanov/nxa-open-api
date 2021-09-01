import { ApiProperty } from "@nestjs/swagger";

//
// BlockchainTransaction
// See neo/Network/P2P/Payloads/Transaction.cs
//
export class BlockchainTransaction {
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
}
