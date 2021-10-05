import { Injectable, Logger } from '@nestjs/common';
import * as Neon from '@cityofzion/neon-js';
import * as NeonCore from '@cityofzion/neon-core';
import { BlockchainNetwork } from '../../../blockchain/types/blockchain.network';

//
// NxaBlockchainExtProvider
// See https://gitlab.teamxi.cloud/nxa/nxa-modules
//
@Injectable()
export class NxaBlockchainExtProvider {
    private readonly logger = new Logger(NxaBlockchainExtProvider.name);

    private apiRpcClient: NeonCore.rpc.RPCClient;

    connect(network: BlockchainNetwork): void {
        const endpoint = network.rpcEndpoint;

        this.logger.debug(`Connectiong to: '${endpoint}'...`);
        
        this.apiRpcClient = new Neon.rpc.RPCClient(endpoint);
    }

    disconnect(): void {
        this.logger.debug(`Disconnectiong from node...`);
        this.apiRpcClient = undefined;
    }

    async testConnection(): Promise<void> {
        const pingNum = await this.apiRpcClient.ping();
        console.dir(pingNum);

        const rpcQuery0 = new NeonCore.rpc.Query({ method: 'healthcheck' });
        const rpcResult0 = await this.apiRpcClient.execute<any>(rpcQuery0);
        console.dir(rpcResult0);

        const rpcQuery1 = new NeonCore.rpc.Query({ method: 'getcandidates' });
        const rpcResult1 = await this.apiRpcClient.execute<any>(rpcQuery1);
        console.dir(rpcResult1);

        //const rpcTestAccount = new Neon.wallet.Account('035997eaa3682cab4a2f701a9085ab891ad97e852b2ba30bdb5713fe62856664d7');
        //const rpcQuery2 = new NeonCore.rpc.Query({ method: 'getaccountstate', params: [rpcTestAccount.address] });
        //const rpcResult2 = await this.apiRpcClient.execute<any>(rpcQuery2);
        //console.dir(rpcResult2);
    }
}