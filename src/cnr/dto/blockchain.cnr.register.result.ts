import { ApiProperty } from "@nestjs/swagger";

export class BlockchainCnrRegisterResultDto {
    @ApiProperty()
    cname: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    txHash: string;

    constructor(
        cname: string,
        address: string,
        txHash: string
    ) {
        this.cname = cname;
        this.address = address;
        this.txHash = txHash;
    }
}