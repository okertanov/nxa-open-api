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
}
