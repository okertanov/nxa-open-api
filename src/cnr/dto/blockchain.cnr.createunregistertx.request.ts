import { ApiProperty } from "@nestjs/swagger";

export class BlockchainCnrCreateUnregisterTxRequestDto {
    @ApiProperty()
    cname: string;
    @ApiProperty()
    signerPubKey: string;
}