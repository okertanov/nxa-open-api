import { ApiProperty } from "@nestjs/swagger";

export class CreateSmartContractSourceDto {
    @ApiProperty()
    ownerAddress: string;

    @ApiProperty()
    source: string;
}