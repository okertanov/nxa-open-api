import { Injectable } from "@nestjs/common";
import { DeploySmartContractDto } from "./dto/deploy.smart.contract.dto";
import { DeploySmartContractItemDto } from "./dto/deploy.smart.contract.item";
import { DeploySmartContractResultDto } from "./dto/deploy.smart.contract.result.dto";
import { NeoBlockchainProvider } from "./providers/neo/neo.blockchain.provider";
import { NxaBlockchainProvider } from "./providers/nxa/nxa.blockchain.provider";
import { BlockchainNetwork } from "./types/blockchain.network";
import { BlockchainProviderInterface } from "./types/blockchain.provider.interface";
import { BlockchainAccessServiceInterface } from "./types/blockchain.access.service.interface";
import { BlockchainBalanceDto } from "../wallet/dto/blockchain.balance.dto";
import { BlockchainBlock } from "./types/blockchain.block";
import { BlockchainTransaction } from "./types/blockchain.transaction";
import { BlockchainTransfer } from "./types/blockchain.transfer";
import { BlockchainAssetDto } from "../assets/dto/blockchain.asset.dto";
import { BlockchainGovernanceMemberDto } from "../governance/dto/blockchain.governance.member.dto";
import { NxaBlockchainExtProvider } from "./providers/nxa/nxa.blockchain.ext.provider";
import { BlockchainInfoDto } from "./dto/blockchain.info.dto";

@Injectable()
export class BlockchainAccessService implements BlockchainAccessServiceInterface {
    private readonly provider: BlockchainProviderInterface;

    constructor(
        readonly neoBlockchainProvider: NeoBlockchainProvider,
        readonly nxaBlockchainProvider: NxaBlockchainProvider,
        readonly nxaBlockchainExtProvider: NxaBlockchainExtProvider,
    ) {
        this.provider = nxaBlockchainProvider;
    }
    
    connect(network: BlockchainNetwork): void {
        this.provider.connect(network);
    }
    
    disconnect(): void {
        this.provider.disconnect();
    }

    async testConnection(): Promise<void> {
        await this.provider.testConnection();
    }

    isAddressValid(address: string): boolean {
        return this.provider.isAddressValid(address);
    }

    async getBlockchainInfo(): Promise<BlockchainInfoDto> {
        return await this.provider.getBlockchainInfo();
    }
    
    async getFoundationMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        return this.provider.getFoundationMembers();
    }

    async getCouncilMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        return this.provider.getCouncilMembers();
    }

    async getCandidates(): Promise<BlockchainGovernanceMemberDto[]> {
        return this.provider.getCandidates();
    }

    async getGenesisBlock(): Promise<BlockchainBlock> {
        return this.provider.getGenesisBlock();
    }

    async getLastBlock(): Promise<BlockchainBlock> {
        return this.provider.getLastBlock();
    }

    async getBlockByNumber(num: string | number): Promise<BlockchainBlock> {
        return this.provider.getBlockByNumber(num);
    }

    async getBlockByHash(hash: string): Promise<BlockchainBlock> {
        return this.provider.getBlockByHash(hash);
    }

    async getBlocksRange(from: number, limit: number, order: 'ascending' | 'descending'): Promise<BlockchainBlock[]> {
        return this.provider.getBlocksRange(from, limit, order);
    }

    async balanceOf(address: string): Promise<BlockchainBalanceDto[]> {
        return this.provider.balanceOf(address);
    }

    async balanceByAssetOf(asset: string, address: string): Promise<BlockchainBalanceDto> {
        return this.provider.balanceByAssetOf(asset, address);
    }

    async deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto> {
        return this.nxaBlockchainExtProvider.deploySmartContract(network, dto);
    }

    async deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto> {
        return this.nxaBlockchainExtProvider.deploySmartContractItem(network, dto);
    }

    async getTransfersByAddress(address: string): Promise<BlockchainTransfer[]> {
        return this.provider.getTransfersByAddress(address);
    }

    async getTransaction(txHash: string): Promise<BlockchainTransaction> {
        return this.provider.getTransaction(txHash);
    }

    async getUnclaimedByAddress(address: string): Promise<BlockchainBalanceDto> {
        return this.provider.getUnclaimedByAddress(address);
    }

    async broadcastTransaction(tx: string): Promise<string> {
        return this.provider.broadcastTransaction(tx);
    }

    async getContractState(scriptHash: string): Promise<any> {
        return this.provider.getContractState(scriptHash);
    }

    async transferFromSystem(asset: BlockchainAssetDto, address: string, amount: string): Promise<string> {
        return this.provider.transferFromSystem(asset, address, amount);
    }

    async getSystemFeeForScript(script: string): Promise<string> {
        return this.provider.getSystemFeeForScript(script);
    }

    async getNetworkFeeForLength(length: number): Promise<string> {
        return this.provider.getNetworkFeeForLength(length);
    }
}
