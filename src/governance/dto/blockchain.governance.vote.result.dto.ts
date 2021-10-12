import { ApiProperty } from "@nestjs/swagger";

export class BlockchainGovernanceVoteResultDto {
    @ApiProperty()
    voterAddress: string;

    @ApiProperty()
    candidatePublicKey: string;

    @ApiProperty()
    rawTx: string;

    constructor(
        voterAddress: string,
        candidatePublicKey: string,
        rawTx: string
    ) {
        this.voterAddress = voterAddress;
        this.candidatePublicKey = candidatePublicKey;
        this.rawTx = rawTx;
    }
}
