import { BlockchainGovernanceMemberDto } from "../../governance/dto/blockchain.governance.member.dto";
import { BlockchainAssetDto } from "../../assets/dto/blockchain.asset.dto";
import { BlockchainBalanceDto } from "../../wallet/dto/blockchain.balance.dto";
import { DeploySmartContractDto } from "../dto/deploy.smart.contract.dto";
import { DeploySmartContractItemDto } from "../dto/deploy.smart.contract.item";
import { DeploySmartContractResultDto } from "../dto/deploy.smart.contract.result.dto";
import { BlockchainBlock } from "./blockchain.block";
import { BlockchainNetwork } from "./blockchain.network";
import { BlockchainTransaction } from "./blockchain.transaction";
import { BlockchainTransfer } from "./blockchain.transfer";

//
// BlockchainProviderInterface
//
export interface BlockchainProviderInterface {
    connect(network: BlockchainNetwork): void;
    disconnect(): void;
    testConnection(): Promise<void>;

    getFoundationMembers(): Promise<BlockchainGovernanceMemberDto[]>;
    getCouncilMembers(): Promise<BlockchainGovernanceMemberDto[]>;
    getCandidates(): Promise<BlockchainGovernanceMemberDto[]>;

    getGenesisBlock(): Promise<BlockchainBlock>;
    getLastBlock(): Promise<BlockchainBlock>;
    getBlockByNumber(num: string | number): Promise<BlockchainBlock>;
    getBlockByHash(hash: string): Promise<BlockchainBlock>;

    balanceOf(address: string): Promise<BlockchainBalanceDto[]>;
    balanceByAssetOf(asset: string, address: string): Promise<BlockchainBalanceDto>;

    deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto>;
    deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto>;

    getTransfersByAddress(address: string): Promise<BlockchainTransfer[]>;

    getTransaction(txHash: string): Promise<BlockchainTransaction>;
    broadcastTransaction(tx: string): Promise<string>;

    transferFromSystem(asset: BlockchainAssetDto, address: string, amount: string): Promise<string>;

    getSystemFeeForScript(script: string): Promise<string>;
    getNetworkFeeForLength(length: number): Promise<string>;
}
