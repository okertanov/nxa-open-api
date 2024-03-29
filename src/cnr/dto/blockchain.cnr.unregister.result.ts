import { ApiProperty } from "@nestjs/swagger";

export class BlockchainCnrUnregisterResultDto {
    @ApiProperty()
    cname: string;
    @ApiProperty()
    txHash: string;

    constructor(
        cname: string,
        txHash: string
    ) {
        this.cname = cname;
        this.txHash = txHash;
    }
}