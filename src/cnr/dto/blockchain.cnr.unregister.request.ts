import { ApiProperty } from "@nestjs/swagger";

export class BlockchainCnrUnregisterRequestDto {
    @ApiProperty()
    cname: string;
    @ApiProperty()
    privKey: string;
}