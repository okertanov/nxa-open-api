import { ApiProperty } from "@nestjs/swagger";

export class TransactionFeesDto {
    @ApiProperty()
    script: string;

    @ApiProperty()
    length: number;

    @ApiProperty()
    systemFee: string;

    @ApiProperty()
    networkFee: string;

    constructor(script: string, length: number, systemFee: string, networkFee: string) {
        this.script = script;
        this.length = length;
        this.systemFee = systemFee;
        this.networkFee = networkFee;
    }
}