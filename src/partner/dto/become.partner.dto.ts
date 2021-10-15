import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BecomePartnerEntity } from "../../entity/become.partner.entity";

export class BecomePartnerDto {
    @ApiProperty()
    companyName: string;

    @ApiProperty()
    industry: string;
    
    @ApiProperty()
    partnerName: string;

    @ApiProperty()
    position: string;

    @ApiProperty()
    email: string;

    @ApiPropertyOptional()
    description?: string;

    constructor(
        companyName: string,
        industry: string,
        partnerName: string,
        position: string,
        email: string,
        description?: string
    ) {
        this.companyName = companyName;
        this.industry = industry;
        this.partnerName = partnerName;
        this.position = position;
        this.email = email;
        this.description = description;
    }

    public static fromEntity(entity: BecomePartnerEntity): BecomePartnerDto {
        return new BecomePartnerDto(
            entity.companyName,
            entity.industry,
            entity.partnerName,
            entity.position,
            entity.email,
            entity.description
        );
    }
}