import { ApiProperty } from "@nestjs/swagger";

export class CreateSmartContractSourceDto {
    @ApiProperty()
    source: string;
}