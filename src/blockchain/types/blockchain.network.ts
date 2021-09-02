import { ApiProperty } from "@nestjs/swagger";

//
// BlockchainNetwork
//
export enum BlockchainNetworkType {
    NEO = 'NEO',
    NXA = 'NXA'
}

//
// BlockchainNetwork
//
export class BlockchainNetwork {
    public static readonly Neo = new BlockchainNetwork(
        BlockchainNetworkType.NEO,
        '844378958',
        'NEO3RC3-TESTNET',
        'http://neonode.nft.teamxi.cloud:20332'
    );

    public static readonly Nxa = new BlockchainNetwork(
        BlockchainNetworkType.NXA,
        '199',
        'NXA-TESTNET',
        'http://192.168.1.191:20332' /* aka nxa-testnet-public.lan */
    );

    public static readonly Default = BlockchainNetwork.Nxa;

    @ApiProperty()
    type: BlockchainNetworkType;

    @ApiProperty()
    networkId: string;

    @ApiProperty()
    version: string;

    @ApiProperty()
    rpcEndpoint: string;

    constructor(
        type: BlockchainNetworkType,
        networkId: string,
        version: string,
        rpcEndpoint: string
    ) {
        this.type = type;
        this.networkId = networkId;
        this.version = version;
        this.rpcEndpoint = rpcEndpoint;
    }
}