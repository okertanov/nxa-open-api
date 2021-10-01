import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class BlockchainGovernanceMemberDto {
    @ApiProperty()
    publicKey: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    isCouncilMember: boolean;

    @ApiProperty()
    isConsensusMaker: boolean;
  
    @ApiPropertyOptional()
    rank?: number;

    @ApiPropertyOptional()
    totalVotes?: number;

    @ApiPropertyOptional()
    name?: string;

    @ApiPropertyOptional()
    description?: string;

    @ApiPropertyOptional()
    location?: string;

    @ApiPropertyOptional()
    site?: string;

    @ApiPropertyOptional()
    email?: string;

    @ApiPropertyOptional()
    github?: string;

    @ApiPropertyOptional()
    telegram?: string;

    constructor(
        publicKey: string,
        address: string,
        isCouncilMember: boolean,
        isConsensusMaker: boolean,
        rank?: number,
        totalVotes?: number,
        name?: string,
        description?: string,
        location?: string,
        site?: string,
        email?: string,
        github?: string,
        telegram?: string
    ) {
        this.publicKey = publicKey;
        this.address = address;
        this.isCouncilMember = isCouncilMember;
        this.isConsensusMaker = isConsensusMaker;
        this.rank = rank;
        this.totalVotes = totalVotes;
        this.name = name;
        this.description = description;
        this.location = location;
        this.site = site;
        this.email = email;
        this.github = github;
        this.telegram = telegram;
    }
}