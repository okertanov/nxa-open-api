import { ApiProperty } from "@nestjs/swagger";

export class BlockchainCnrRegisterRequestDto {
    @ApiProperty()
    cname: string;
    @ApiProperty()
    address: string;
}