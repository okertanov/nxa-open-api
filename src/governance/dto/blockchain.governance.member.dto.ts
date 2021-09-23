import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class BlockchainGovernanceMemberDto {
    @ApiProperty()
    address: string;

    @ApiProperty()
    publicKey: string;

    @ApiProperty()
    rank: number;

    @ApiProperty()
    totalVotes: number;

    @ApiProperty()
    isConsensusMaker: boolean;

    @ApiProperty()
    isCouncilMember: boolean;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiPropertyOptional()
    location: string;

    @ApiPropertyOptional()
    site: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    github: string;

    @ApiPropertyOptional()
    telegram: string;
}