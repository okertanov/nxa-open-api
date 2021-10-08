import { ApiProperty } from "@nestjs/swagger";

export class CreateSmartContractNep11Dto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    symbol: string;

    @ApiProperty()
    decimals: string;
}