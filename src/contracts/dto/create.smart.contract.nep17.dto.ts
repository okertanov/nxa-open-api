import { ApiProperty } from "@nestjs/swagger";

export class CreateSmartContractNep17Dto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    symbol: string;

    @ApiProperty()
    decimals: string;
}