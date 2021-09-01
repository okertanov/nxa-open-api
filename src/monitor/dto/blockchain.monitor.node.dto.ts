import { ApiProperty } from "@nestjs/swagger";

export class BlockchainMonitorNodeDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    ip: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    version: string;

    @ApiProperty()
    alive: boolean;
}
