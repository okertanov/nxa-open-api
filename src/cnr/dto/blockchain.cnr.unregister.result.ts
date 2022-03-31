import { ApiProperty } from "@nestjs/swagger";

export class BlockchainCnrUnregisterResultDto {
    @ApiProperty()
    cname: string;
    @ApiProperty()
    rawTx: string;

    constructor(
        cname: string,
        rawTx: string
    ) {
        this.cname = cname;
        this.rawTx = rawTx;
    }
}