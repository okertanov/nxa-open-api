import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainSmartContract
// See neo/SmartContract/Contract.cs
//
export class BlockchainSmartContract {
    @ApiProperty()
    script: string;

    @ApiPropertyOptional()
    scriptHash?: string;

    @ApiPropertyOptional()
    address?: string;

    @ApiPropertyOptional()
    ownerAddress?: string;

    @ApiPropertyOptional()
    transaction?: BlockchainTransaction;
}
