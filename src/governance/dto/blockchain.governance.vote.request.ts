import { ApiProperty } from "@nestjs/swagger";

export class BlockchainGovernanceVoteRequestDto {
    @ApiProperty()
    voterAddress: string;

    @ApiProperty()
    voterPublicKey: string;

    @ApiProperty()
    candidatePublicKey: string;
}