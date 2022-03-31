import { ApiProperty } from "@nestjs/swagger";

export class BlockchainCnrResolveResultDto {
    @ApiProperty()
    cname: string;

    @ApiProperty()
    address: string;

    constructor(
        cname: string,
        address: string
    ) {
        this.cname = cname;
        this.address = address;
    }
}