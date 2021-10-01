import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainToken } from "./blockchain.token";
import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainSmartContract
// See neo/SmartContract/Contract.cs
//
export class BlockchainSmartContract {
    @ApiProperty()
    code: string;

    @ApiPropertyOptional()
    name?: string;

    @ApiPropertyOptional()
    script?: string; 

    @ApiPropertyOptional()
    description?: string;

    @ApiPropertyOptional()
    scriptHash?: string;

    @ApiPropertyOptional()
    address?: string;

    @ApiPropertyOptional()
    ownerAddress?: string;

    @ApiPropertyOptional()
    transaction?: BlockchainTransaction;

    @ApiPropertyOptional({ type: () => BlockchainToken })
    token?: BlockchainToken;

    constructor(
        code: string,
        name?: string,
        script?: string,
        description?: string,
        scriptHash?: string,
        address?: string,
        ownerAddress?: string,
        transaction?: BlockchainTransaction,
        token?: BlockchainToken
    ) {
        this.code = code;
        this.script = script;
        this.name = name;
        this.description = description;
        this.scriptHash = scriptHash;
        this.address = address;
        this.ownerAddress = ownerAddress;
        this.transaction = transaction;
        this.token = token;
    }
}
