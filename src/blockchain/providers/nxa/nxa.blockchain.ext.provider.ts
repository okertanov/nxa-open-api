import { Injectable, Logger } from '@nestjs/common';
import * as Neon from '@cityofzion/neon-js';
import * as NeonCore from '@cityofzion/neon-core';
import { BlockchainNetwork } from '../../../blockchain/types/blockchain.network';
import { BlockchainGovernanceMemberDto } from '../../../governance/dto/blockchain.governance.member.dto';
import { BlockchainGovernanceRegistrationResultDto } from '../../../governance/dto/blockchain.governance.registration.result.dto';
import { BlockchainGovernanceVoteResultDto } from '../../../governance/dto/blockchain.governance.vote.result.dto';
import { DeploySmartContractDto } from '../../../blockchain/dto/deploy.smart.contract.dto';
import { DeploySmartContractResultDto } from '../../../blockchain/dto/deploy.smart.contract.result.dto';
import { DeploySmartContractItemDto } from '../../../blockchain/dto/deploy.smart.contract.item';
import { BlockchainSmartContract } from '../../../blockchain/types/blockchain.smart.contract';
import { BlockchainCnrResolveResultDto } from "../../../cnr/dto/blockchain.cnr.resolve.result";
import { BlockchainCnrRegisterResultDto } from "../../../cnr/dto/blockchain.cnr.register.result";
import { BlockchainCnrUnregisterResultDto } from "../../../cnr/dto/blockchain.cnr.unregister.result";
import { BlockchainCnrCreateRegisterTxResultDto } from "../../../cnr/dto/blockchain.cnr.createregistertx.result";
import { BlockchainCnrCreateUnregisterTxResultDto } from "../../../cnr/dto/blockchain.cnr.createunregistertx.result";

//
// NxaBlockchainExtProvider
// See https://gitlab.team11.lv/nxa/nxa-modules
//
@Injectable()
export class NxaBlockchainExtProvider {
    private readonly logger = new Logger(NxaBlockchainExtProvider.name);

    private apiRpcClient: NeonCore.rpc.RPCClient;

    connect(network: BlockchainNetwork): void {
        const endpoint = network.rpcEndpoint;

        this.logger.debug(`Connecting to: '${endpoint}'...`);
        
        this.apiRpcClient = new Neon.rpc.RPCClient(endpoint);
    }

    disconnect(): void {
        this.logger.debug(`Disconnecting from node...`);
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
        const rpcResult = await this.apiRpcClient.execute<{ candidates: string[]}>(rpcQuery);
        const candidates = rpcResult.candidates.map(candidate => {
            const pubKey = candidate['PubKey'];
            const address = (new Neon.wallet.Account(candidate['PubKey'])).address;
            return new BlockchainGovernanceMemberDto(
                pubKey,
                address,
                false,
                false,
                0,
                parseInt(candidate['DVITA'], 10),
                `Voter ${pubKey.substring(0,4)}`,
                '',
                'Unknown location'
            );
        });
        return candidates;
    }

    async registerCandidate(registrarAddress: string, candidatePublicKey: string,): Promise<BlockchainGovernanceRegistrationResultDto> {
        const rpcQuery = new NeonCore.rpc.Query({ method: 'createregistercandidatetx', params: [candidatePublicKey] });
        const rpcTx = await this.apiRpcClient.execute<any>(rpcQuery);

        const result = new BlockchainGovernanceRegistrationResultDto(registrarAddress, candidatePublicKey, rpcTx);
        return result;
    }

    async unregisterCandidate(registrarAddress: string, candidatePublicKey: string,): Promise<BlockchainGovernanceRegistrationResultDto> {
        const rpcQuery = new NeonCore.rpc.Query({ method: 'createunregistercandidatetx', params: [candidatePublicKey] });
        const rpcTx = await this.apiRpcClient.execute<any>(rpcQuery);

        const result = new BlockchainGovernanceRegistrationResultDto(registrarAddress, candidatePublicKey, rpcTx);
        return result;
    }

    async vote(voterAddress: string, voterPublicKey: string, candidatePublicKey: string): Promise<BlockchainGovernanceVoteResultDto> {
        const rpcQuery = new NeonCore.rpc.Query({ method: 'createvotetx', params: [voterPublicKey, candidatePublicKey] });
        const rpcResult = await this.apiRpcClient.execute<any>(rpcQuery);
        console.dir(rpcResult);

        const result = new BlockchainGovernanceVoteResultDto(voterAddress, candidatePublicKey, JSON.stringify(rpcResult.tx));
        return result;
    }

    async deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto> {
        const rpcQuery1 = new NeonCore.rpc.Query({ method: 'deploycontract',
            params: [
                process.env.BLOCKCHAIN_SYS_HOT_PK,
                dto.nefImageBase64,
                dto.manifest
            ]
        });
        const rpcResult1 = await this.apiRpcClient.execute<any>(rpcQuery1);
        console.dir(rpcResult1);

        const contract = new BlockchainSmartContract();
        contract.address = rpcResult1.address;
        contract.scriptHash = rpcResult1.scriptHash;
        return new DeploySmartContractResultDto(undefined, undefined, contract ,undefined);
    }

    async deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto> {
        return new DeploySmartContractResultDto(undefined, undefined, undefined ,undefined);
    }

    async resolve(cname: string): Promise<BlockchainCnrResolveResultDto> {
        const rpcQuery = new NeonCore.rpc.Query({ method: 'resolve', params: [cname] });
        const rpcResult = await this.apiRpcClient.execute<any>(rpcQuery);
        console.dir(rpcResult);

        const result = new BlockchainCnrResolveResultDto(cname, rpcResult.address);
        return result;
    }

    async createregistertx(cname: string, address: string, signerPubKey: string): Promise<BlockchainCnrCreateRegisterTxResultDto> {
        const rpcQuery = new NeonCore.rpc.Query({ method: 'createregistertx', params: [cname, address, signerPubKey] });
        const rpcResult = await this.apiRpcClient.execute<any>(rpcQuery);
        console.dir(rpcResult);

        const result = new BlockchainCnrCreateRegisterTxResultDto(cname, address, JSON.stringify(rpcResult.tx));
        return result;
    }

    async createunregistertx(cname: string, signerPubKey: string): Promise<BlockchainCnrCreateUnregisterTxResultDto> {
        const rpcQuery = new NeonCore.rpc.Query({ method: 'createunregistertx', params: [cname, signerPubKey] });
        const rpcResult = await this.apiRpcClient.execute<any>(rpcQuery);
        console.dir(rpcResult);

        const result = new BlockchainCnrCreateUnregisterTxResultDto(cname, JSON.stringify(rpcResult.tx));
        return result;
    }

    async register(cname: string, address: string): Promise<BlockchainCnrRegisterResultDto> {
        const privKey = process.env.BLOCKCHAIN_SYS_HOT_PK;
        const rpcQuery = new NeonCore.rpc.Query({ method: 'register', params: [cname, address, privKey] });
        const rpcResult = await this.apiRpcClient.execute<any>(rpcQuery);
        console.dir(rpcResult);

        const result = new BlockchainCnrRegisterResultDto(cname, address, rpcResult.txHash);
        return result;
    }

    async unregister(cname: string): Promise<BlockchainCnrUnregisterResultDto> {
        const privKey = process.env.BLOCKCHAIN_SYS_HOT_PK;
        const rpcQuery = new NeonCore.rpc.Query({ method: 'unregister', params: [cname, privKey] });
        const rpcResult = await this.apiRpcClient.execute<any>(rpcQuery);
        console.dir(rpcResult);

        const result = new BlockchainCnrUnregisterResultDto(cname, rpcResult.txHash);
        return result;
    }
}