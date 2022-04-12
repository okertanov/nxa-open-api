import { ApiProperty } from "@nestjs/swagger";

export class BlockchainGovernanceVoteStatusDto {
    @ApiProperty()
    voterAddress: string;

    @ApiProperty()
    votedFor: string;

    @ApiProperty()
    date: Date;
}
