import { ApiProperty } from "@nestjs/swagger";

export class BlockchainGovernanceRegistrationRequestDto {
    @ApiProperty()
    registrarAddress: string;

    @ApiProperty()
    candidatePublicKey: string;
}