import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSmartContractNep17Dto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    symbol: string;

    @ApiProperty()
    decimals: number;

    @ApiProperty()
    initial: string;

    @ApiPropertyOptional()
    tokenUrl?: string;

    @ApiPropertyOptional()
    iconUrl?: string;

    @ApiPropertyOptional()
    description?: string;
}