import { ApiProperty } from "@nestjs/swagger";

export class BlockchainGovernanceRegistrationResultDto {
    @ApiProperty()
    registrarAddress: string;

    @ApiProperty()
    candidatePublicKey: string;

    @ApiProperty()
    txHash: string;

    constructor(
        registrarAddress: string,
        candidatePublicKey: string,
        txHash: string
    ) {
        this.registrarAddress = registrarAddress;
        this.candidatePublicKey = candidatePublicKey;
        this.txHash = txHash;
    }
}