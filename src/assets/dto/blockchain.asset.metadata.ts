import { ApiPropertyOptional } from "@nestjs/swagger";

export class BlockchainAssetMetadata {
    @ApiPropertyOptional()
    readonly icon?: string;

    @ApiPropertyOptional()
    readonly previewIcon?: string;

    @ApiPropertyOptional()
    readonly description?: string;

    @ApiPropertyOptional()
    readonly homePageUrl?: string;

    @ApiPropertyOptional()
    readonly explorerUrl?: string;

    constructor(
        icon?: string,
        previewIcon?: string,
        description?: string,
        homePageUrl?: string,
        explorerUrl?: string
    ) {
        this.icon = icon;
        this.previewIcon = previewIcon;
        this.description = description;
        this.homePageUrl = homePageUrl;
        this.explorerUrl = explorerUrl;
    }
}