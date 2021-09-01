import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainAssetMetadata } from "./blockchain.asset.metadata";

export class BlockchainAssetDto {
    // TODO: Improve currency code/hash mapper here
    private static readonly DVITA_HASH = '0xb34e1025391e953a918231df11478ec21b039e5f';
    private static readonly DVG_HASH = '0xd2a4cff31913016155e38e474a2c06d08be276cf';

    private static readonly NEO_HASH = '0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5';
    private static readonly GAS_HASH = '0xd2a4cff31913016155e38e474a2c06d08be276cf';

    @ApiHideProperty()
    public static readonly DVITA_ASSET = new BlockchainAssetDto(
        BlockchainAssetDto.DVITA_HASH,
        'DVITA',
        'DVITA',
        0
    );

    @ApiHideProperty()
    public static readonly DVG_ASSET = new BlockchainAssetDto(
        BlockchainAssetDto.DVG_HASH,
        'DVG',
        'DVG',
        8
    );

    @ApiHideProperty()
    public static readonly NEO_ASSET = new BlockchainAssetDto(
        BlockchainAssetDto.NEO_HASH,
        'NEO',
        'NEO',
        0
    );

    @ApiHideProperty()
    public static readonly GAS_ASSET = new BlockchainAssetDto(
        BlockchainAssetDto.GAS_HASH,
        'GAS',
        'GAS',
        8
    );

    @ApiProperty()
    readonly hash: string;

    @ApiProperty()
    readonly code: string;

    @ApiPropertyOptional()
    readonly name?: string;

    @ApiPropertyOptional()
    readonly decimals?: string;

    @ApiPropertyOptional()
    readonly metadata?: BlockchainAssetMetadata | undefined;

    constructor(
        hash: string,
        code: string,
        name: string,
        decimals: string  | number | undefined,
        metadata?: BlockchainAssetMetadata
    ) {
        this.hash = hash;
        this.code = code;
        this.name = name;
        this.decimals = decimals?.toString();
        this.metadata = metadata;
    }

    static fromCodeOrHash(codeOrHash: string): BlockchainAssetDto {
        if (codeOrHash.toLowerCase() === BlockchainAssetDto.DVITA_HASH.toLowerCase()) {
            return BlockchainAssetDto.DVITA_ASSET;
        }

        if (codeOrHash.toLowerCase() === BlockchainAssetDto.DVG_HASH.toLowerCase()) {
            return BlockchainAssetDto.DVG_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'DVITA') {
            return BlockchainAssetDto.DVITA_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'DVG') {
            return BlockchainAssetDto.DVG_ASSET;
        }

        if (codeOrHash.toLowerCase() === BlockchainAssetDto.NEO_HASH.toLowerCase()) {
            return BlockchainAssetDto.NEO_ASSET;
        }

        if (codeOrHash.toLowerCase() === BlockchainAssetDto.GAS_HASH.toLowerCase()) {
            return BlockchainAssetDto.GAS_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'NEO') {
            return BlockchainAssetDto.NEO_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'GAS') {
            return BlockchainAssetDto.GAS_ASSET;
        }

        // Other by code or hash
        if (codeOrHash.toLowerCase().startsWith('0x')) {
            // By hash
            return new BlockchainAssetDto(codeOrHash, '', '', undefined);
        } else {
            // By code
            return new BlockchainAssetDto(undefined, codeOrHash, '', undefined);
        }
    }
}