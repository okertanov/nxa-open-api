import { BlockchainBalanceDto } from "../../wallet/dto/blockchain.balance.dto";
import { DeploySmartContractDto } from "../dto/deploy.smart.contract.dto";
import { DeploySmartContractItemDto } from "../dto/deploy.smart.contract.item";
import { DeploySmartContractResultDto } from "../dto/deploy.smart.contract.result.dto";
import { BlockchainBlock } from "./blockchain.block";
import { BlockchainNetwork } from "./blockchain.network";
import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainProviderInterface
//
export interface BlockchainProviderInterface {
    connect(network: BlockchainNetwork): void;
    disconnect(): void;
    testConnection(): Promise<void>;
    getLastBlock(): Promise<BlockchainBlock>;
    balanceOf(address: string): Promise<BlockchainBalanceDto[]>;
    balanceByAssetOf(asset: string, address: string): Promise<BlockchainBalanceDto>;
    deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto>;
    deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto>;
    getTransaction(txHash: string): Promise<BlockchainTransaction>;
    broadcastTransaction(tx: string): Promise<string>;
}
