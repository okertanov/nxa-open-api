import { ApiProperty } from "@nestjs/swagger";

export class BlockchainCnrRegisterResultDto {
    @ApiProperty()
    cname: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    rawTx: string;

    constructor(
        cname: string,
        address: string,
        rawTx: string
    ) {
        this.cname = cname;
        this.address = address;
        this.rawTx = rawTx;
    }
}