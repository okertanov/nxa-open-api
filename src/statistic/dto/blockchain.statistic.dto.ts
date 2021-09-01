import { ApiProperty } from "@nestjs/swagger";

export class BlockchainStatisticDto {
    @ApiProperty()
    tokens: number;

    @ApiProperty()
    contracts: number;
}
