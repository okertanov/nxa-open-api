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
    symbol: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    decimals: number;
    
    @ApiPropertyOptional()
    scriptHash: string;

    @ApiPropertyOptional()
    address: string;

    @ApiPropertyOptional()
    ownerAddress?: string;

    @ApiPropertyOptional()
    iconUrl?: string;

    @ApiPropertyOptional({ type: () => BlockchainSmartContract })
    contract?: BlockchainSmartContract;

    @ApiPropertyOptional()
    transaction?: BlockchainTransaction;

    constructor(
        type: BlockchainTokenType,
        symbol: string,
        name: string,
        decimals: number,
        scriptHash: string,
        address: string,
        ownerAddress?: string,
        iconUrl?: string,
        contract?: BlockchainSmartContract,
        transaction?: BlockchainTransaction
    ) {
        this.type = type;
        this.symbol = symbol;
        this.name = name;
        this.decimals = decimals;
        this.scriptHash = scriptHash;
        this.address = address;
        this.ownerAddress = ownerAddress;
        this.iconUrl = iconUrl;
        this.contract = contract;
        this.transaction = transaction;
    }
}