import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainSmartContract } from "./blockchain.smart.contract";
import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainTokenType
//
export enum BlockchainTokenType {
    NEP5 = 'NEP5',
    NEP17 = 'NEP17',
    NEP11 = 'NEP11'
}

//
// BlockchainToken
//
export class BlockchainToken {
    @ApiProperty()
    type: BlockchainTokenType;

    @ApiProperty()
    name: string;

    @ApiProperty()
    symbol: string;

    @ApiProperty()
    decimals: number;

    @ApiProperty()
    factor: number;
    
    @ApiPropertyOptional()
    address?: string;

    @ApiPropertyOptional()
    ownerAddress?: string;

    @ApiPropertyOptional({ type: () => BlockchainSmartContract })
    contract?: BlockchainSmartContract;

    @ApiPropertyOptional()
    transaction?: BlockchainTransaction;
}