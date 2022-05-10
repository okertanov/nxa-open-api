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
        '877933390',
        'NEO3-TESTNET4',
        String(process.env.BLOCKCHAIN_RPC_ENDPOINT)
    );

    public static readonly Nxa = new BlockchainNetwork(
        BlockchainNetworkType.NXA,
        '199',
        'NXA-TESTNET',
        String(process.env.BLOCKCHAIN_RPC_ENDPOINT)
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
