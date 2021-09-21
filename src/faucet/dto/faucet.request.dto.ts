import { ApiProperty } from "@nestjs/swagger";

export class FaucetRequestDto {
    @ApiProperty()
    address: string;
}