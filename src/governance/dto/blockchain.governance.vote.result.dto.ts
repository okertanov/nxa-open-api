import { ApiProperty } from "@nestjs/swagger";

export class BlockchainGovernanceVoteResultDto {
    @ApiProperty()
    voterAddress: string;

    @ApiProperty()
    candidateAddress: string;

    @ApiProperty()
    candidatePublicKey: string;

    @ApiProperty()
    txHash: string;
}
