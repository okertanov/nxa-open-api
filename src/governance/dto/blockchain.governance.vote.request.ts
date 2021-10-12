import { ApiProperty } from "@nestjs/swagger";

export class BlockchainGovernanceVoteRequestDto {
    @ApiProperty()
    voterAddress: string;

    @ApiProperty()
    candidatePublicKey: string;

    @ApiProperty()
    rawTx: string;
}