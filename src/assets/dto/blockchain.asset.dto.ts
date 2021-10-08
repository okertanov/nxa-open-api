import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainAssetMetadata } from "./blockchain.asset.metadata";

export class BlockchainAssetDto {
    // TODO: Improve currency code/hash mapper here
    private static readonly DVITA_HASH = '0xb34e1025391e953a918231df11478ec21b039e5f';
    private static readonly DVG_HASH = '0xd2a4cff31913016155e38e474a2c06d08be276cf';

    private static readonly T11_HASH = '0x9072b3814fc2de5b4e122f73703ff313317d4ed6';

    private static readonly NEO_HASH = '0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5';
    private static readonly GAS_HASH = '0xd2a4cff31913016155e38e474a2c06d08be276cf';

    @ApiHideProperty()
    public static readonly DVITA_ASSET = new BlockchainAssetDto(
        BlockchainAssetDto.DVITA_HASH,
        'DVITA',
        'DVITA',
        0,
        new BlockchainAssetMetadata(
            'http://dvitae.teamxi.cloud/assets/logos/logo2.svg',
            'http://dvita.teamxi.cloud/assets/logos/logo2.svg',
            'Dvita is a platform that supports DLT to improve financial inclusion, transparency and the UN’s SDGs.',
            'http://dvita.teamxi.cloud/',
            'http://dvita.teamxi.cloud/blocks'
        )
    );

    @ApiHideProperty()
    public static readonly DVG_ASSET = new BlockchainAssetDto(
        BlockchainAssetDto.DVG_HASH,
        'DVG',
        'DVG',
        8,
        new BlockchainAssetMetadata(
            'http://dvita.teamxi.cloud/assets/logos/logo2.svg',
            'http://dvita.teamxi.cloud/assets/logos/logo2.svg',
            'Dvita is a platform that supports DLT to improve financial inclusion, transparency and the UN’s SDGs.',
            'http://dvita.teamxi.cloud/',
            'http://dvita.teamxi.cloud/blocks'
        )
    );

    @ApiHideProperty()
    public static readonly T11_ASSET = new BlockchainAssetDto(
        BlockchainAssetDto.T11_HASH,
        'T11',
        'Team11Token',
        2,
        new BlockchainAssetMetadata(
            'http://dvita.teamxi.cloud/assets/logos/logo2.svg',
            'http://dvita.teamxi.cloud/assets/logos/logo2.svg',
            'Team11 token asset',
            'http://dvita.teamxi.cloud/',
            'http://dvita.teamxi.cloud/blocks'
        )
    );

    @ApiHideProperty()
    public static readonly NEO_ASSET = new BlockchainAssetDto(
        BlockchainAssetDto.NEO_HASH,
        'NEO',
        'NEO',
        0,
        new BlockchainAssetMetadata(
            'http://dvita.teamxi.cloud/assets/logos/logo2.svg',
            'http://dvita.teamxi.cloud/assets/logos/logo2.svg',
            'Neo is unique in that it was the first public blockchain platform to adopt a dual token mechanism. It separates the rights of governance from the rights of using the network. It also provides a means of acquiring the tokens needing to pay transaction fees.',
            'https://neo.org/',
            'https://neo3.neotube.io/'
        )
    );

    @ApiHideProperty()
    public static readonly GAS_ASSET = new BlockchainAssetDto(
        BlockchainAssetDto.GAS_HASH,
        'GAS',
        'GAS',
        8,
        new BlockchainAssetMetadata(
            'http://dvita.teamxi.cloud/assets/logos/logo2.svg',
            'http://dvita.teamxi.cloud/assets/logos/logo2.svg',
            'The Neo network charges GAS for the operation and storage of tokens and smart contracts, preventing the abuse of node resources.',
            'https://neo.org/',
            'https://neo3.neotube.io/'
        )
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
        metadata: BlockchainAssetMetadata | undefined
    ) {
        this.hash = hash;
        this.code = code;
        this.name = name;
        this.decimals = decimals?.toString();
        this.metadata = metadata;
    }

    static fromCodeOrHash(codeOrHash: string): BlockchainAssetDto {

        //
        // DVITA
        //

        if (codeOrHash.toLowerCase() === BlockchainAssetDto.DVITA_HASH.toLowerCase()) {
            return BlockchainAssetDto.DVITA_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'DVITA') {
            return BlockchainAssetDto.DVITA_ASSET;
        }

        //
        // DVG
        //

        if (codeOrHash.toLowerCase() === BlockchainAssetDto.DVG_HASH.toLowerCase()) {
            return BlockchainAssetDto.DVG_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'DVG') {
            return BlockchainAssetDto.DVG_ASSET;
        }

        //
        // T11
        //

        if (codeOrHash.toLowerCase() === BlockchainAssetDto.T11_HASH.toLowerCase()) {
            return BlockchainAssetDto.T11_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'T11') {
            return BlockchainAssetDto.T11_ASSET;
        }

        //
        // NEO
        //

        if (codeOrHash.toLowerCase() === BlockchainAssetDto.NEO_HASH.toLowerCase()) {
            return BlockchainAssetDto.NEO_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'NEO') {
            return BlockchainAssetDto.NEO_ASSET;
        }

        //
        // GAS
        //

        if (codeOrHash.toLowerCase() === BlockchainAssetDto.GAS_HASH.toLowerCase()) {
            return BlockchainAssetDto.GAS_ASSET;
        }

        if (codeOrHash.toUpperCase() === 'GAS') {
            return BlockchainAssetDto.GAS_ASSET;
        }

        // Other by code or hash
        if (codeOrHash.toLowerCase().startsWith('0x')) {
            // By hash
            return new BlockchainAssetDto(codeOrHash, '', '', undefined, undefined);
        } else {
            // By code
            return new BlockchainAssetDto(undefined, codeOrHash, '', undefined, undefined);
        }
    }
}