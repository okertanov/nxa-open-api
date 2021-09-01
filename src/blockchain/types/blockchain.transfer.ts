import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainTransfer
//
export class BlockchainTransfer {
    @ApiProperty()
    blockHash: string;

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

    @ApiPropertyOptional()
    transaction?: BlockchainTransaction;
}
