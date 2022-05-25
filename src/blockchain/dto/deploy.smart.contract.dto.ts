import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

//
// DeploySmartContractDto
//
export class DeploySmartContractDto {
    @ApiProperty()
    nefImageBase64: string;

    @ApiPropertyOptional()
    manifest?: string;

    @ApiPropertyOptional()
    payload?: object;

    constructor(
        nefImageBase64: string,
        manifest?: string,
        payload?: object
    ) {
        this.nefImageBase64 = nefImageBase64;
        this.manifest = manifest;
        this.payload = payload;
    }
}
