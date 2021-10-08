import { Injectable, Logger } from '@nestjs/common';
import * as Neon from '@cityofzion/neon-js';
import * as NeonCore from '@cityofzion/neon-core';
import { BlockchainNetwork } from '../../../blockchain/types/blockchain.network';
import { BlockchainGovernanceMemberDto } from '../../../governance/dto/blockchain.governance.member.dto';
import { BlockchainGovernanceRegistrationResultDto } from '../../../governance/dto/blockchain.governance.registration.result.dto';

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

        //const rpcTestAccount = new Neon.wallet.Account('035997eaa3682cab4a2f701a9085ab891ad97e852b2ba30bdb5713fe62856664d7');
        //const rpcQuery2 = new NeonCore.rpc.Query({ method: 'getaccountstate', params: [rpcTestAccount.address] });
        //const rpcResult2 = await this.apiRpcClient.execute<any>(rpcQuery2);
        //console.dir(rpcResult2);
    }

    async getCandidates(): Promise<BlockchainGovernanceMemberDto[]> {
        const rpcQuery = new NeonCore.rpc.Query({ method: 'getcandidates' });
        const rpcResult = await this.apiRpcClient.execute<string[]>(rpcQuery);
        const rpcResultNormalized = rpcResult.map(r => r?.split(':')[0]?.trim()).filter(r => !!r);
        const candidates = rpcResultNormalized.map(r => new BlockchainGovernanceMemberDto(
            r,
            (new Neon.wallet.Account(r)).address,
            false,
            false
        ));
        return candidates;
    }

    async registerCandidate(registrarAddress: string, candidatePublicKey: string,): Promise<BlockchainGovernanceRegistrationResultDto> {
        const rpcQuery = new NeonCore.rpc.Query({ method: 'createregistercandidatetx', params: [candidatePublicKey] });
        const rpcTx = await this.apiRpcClient.execute<any>(rpcQuery);

        const result = new BlockchainGovernanceRegistrationResultDto(registrarAddress, candidatePublicKey, '');
        return result;
    }

    async voite(registrarAddress: string, candidatePublicKey: string,): Promise<BlockchainGovernanceRegistrationResultDto> {
        const rpcQuery = new NeonCore.rpc.Query({ method: 'createregistercandidatetx', params: [candidatePublicKey] });
        const rpcTx = await this.apiRpcClient.execute<any>(rpcQuery);

        const result = new BlockchainGovernanceRegistrationResultDto(registrarAddress, candidatePublicKey, '');
        return result;
    }
}