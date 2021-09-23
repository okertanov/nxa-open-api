import { ApiProperty } from "@nestjs/swagger";

export class BlockchainGovernanceVoteRequestDto {
    @ApiProperty()
    voterAddress: string;

    @ApiProperty()
    candidateAddress: string;

    @ApiProperty()
    candidatePublicKey: string;

    @ApiProperty()
    rawTx: string;
}