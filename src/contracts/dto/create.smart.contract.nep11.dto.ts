import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSmartContractNep11Dto {
    @ApiProperty()
    ownerAddress: string;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    symbol: string;

    @ApiPropertyOptional()
    tokenUrl?: string;

    @ApiPropertyOptional()
    iconUrl?: string;

    @ApiPropertyOptional()
    description?: string;

    @ApiPropertyOptional()
    metadata?: any;
}