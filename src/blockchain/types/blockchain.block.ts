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
}
