import { ApiProperty } from "@nestjs/swagger";

export class BlockchainCnrCreateRegisterTxRequestDto {
    @ApiProperty()
    cname: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    signerPubKey: string;
}