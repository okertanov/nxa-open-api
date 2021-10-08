import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SmartContractEntity } from "../../entity/smart.contract.entity";
import { BlockchainToken, BlockchainTokenType } from "./blockchain.token";
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

    static fromEntity(entity: SmartContractEntity): BlockchainSmartContract {
        return new BlockchainSmartContract(
            entity.code,
            entity.name,
            entity.script,
            entity.description,
            entity.scriptHash,
            entity.address,
            entity.ownerAddress,
            BlockchainTransaction.fromHash(entity.txHash),
            new BlockchainToken(
                BlockchainTokenType[entity.type],
                entity.code,
                entity.name,
                entity.decimals,
                entity.scriptHash,
                entity.address,
                entity.ownerAddress
            )
        );
    }
}
