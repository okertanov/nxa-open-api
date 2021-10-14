import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

//
// DeploySmartContractDto
//
export class DeploySmartContractDto {
    @ApiProperty()
    nefImageBase64: string;

    @ApiPropertyOptional()
    manifest?: string;

    constructor(
        nefImageBase64: string,
        manifest?: string
    ) {
        this.nefImageBase64 = nefImageBase64;
        this.manifest = manifest;
    }
}
