import * as NeonCore from '@cityofzion/neon-core';
import * as Neon from '@cityofzion/neon-js';
import { Injectable, Logger } from '@nestjs/common';
import { BlockchainAssetDto } from '../../../assets/dto/blockchain.asset.dto';
import { DeploySmartContractDto } from '../../../blockchain/dto/deploy.smart.contract.dto';
import { DeploySmartContractItemDto } from '../../../blockchain/dto/deploy.smart.contract.item';
import { DeploySmartContractResultDto } from '../../../blockchain/dto/deploy.smart.contract.result.dto';
import { BlockchainProviderInterface } from '../../../blockchain/types/blockchain.provider.interface';
import { BlockchainBalanceDto } from '../../../wallet/dto/blockchain.balance.dto';
import { BlockchainNetwork } from '../../../blockchain/types/blockchain.network';
import { BlockchainBlock } from '../../../blockchain/types/blockchain.block';
import { BlockchainTransaction } from '../../../blockchain/types/blockchain.transaction';

//
// NeoBlockchainProvider
//
@Injectable()
export class NeoBlockchainProvider implements BlockchainProviderInterface {
    private readonly logger = new Logger(NeoBlockchainProvider.name);

    private apiRpcClient: NeonCore.rpc.RPCClient;

    connect(network: BlockchainNetwork): void {
        const endpoint = network.rpcEndpoint;

        this.logger.debug(`Connectiong to: '${endpoint}'...`);
        
        this.apiRpcClient = new Neon.rpc.RPCClient(endpoint);
        
        console.dir(this.apiRpcClient);
    }

    disconnect(): void {
        this.logger.debug(`Disconnectiong from node...`);
        this.apiRpcClient = undefined;
    }

    async testConnection(): Promise<void> {
        const pingNum = await this.apiRpcClient.ping();
        console.dir(pingNum);

        const version = await this.apiRpcClient.getVersion();
        console.dir(version);

        const net = await this.apiRpcClient.net;
        console.dir(net);

        const connections = await this.apiRpcClient.getConnectionCount();
        console.dir(connections);

        const peers = await this.apiRpcClient.getPeers();
        console.dir(peers);

        const lastSeenHeight = await this.apiRpcClient.lastSeenHeight;
        console.dir(lastSeenHeight);

        const blockCount = await this.apiRpcClient.getBlockCount();
        console.dir(blockCount);

        const block = await this.apiRpcClient.getBlock(blockCount - 1, 1);
        console.dir(block);

        const validatedAddress = await this.apiRpcClient.validateAddress('NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP');
        console.dir(validatedAddress);

        const nep17Balances = await this.apiRpcClient.getNep17Balances('NfnxvNk8g51rj9qBSQJzRckJoTrrcES4sP');
        console.dir(nep17Balances);
    }

    async getLastBlock(): Promise<BlockchainBlock> {
        const blockCount = await this.apiRpcClient.getBlockCount();
        const block = await this.apiRpcClient.getBlock(blockCount - 1, 1);
        const blockchainBlock = new BlockchainBlock();
        blockchainBlock.version = block.version.toString();
        blockchainBlock.index = block.index.toString();
        blockchainBlock.hash = block.hash;
        blockchainBlock.timestamp = block.time;
        blockchainBlock.transactions = [];
        return blockchainBlock;
    }

    async balanceOf(address: string): Promise<BlockchainBalanceDto[]> {
        const nep17Balances = await this.apiRpcClient.getNep17Balances(address);
        const balances = BlockchainBalanceDto.fromRpcBalances(nep17Balances);
        return balances;
    }

    async balanceByAssetOf(asset: string, address: string): Promise<BlockchainBalanceDto> {
        const assetFromCodeOrHash = BlockchainAssetDto.fromCodeOrHash(asset);
        const nep17Balances = await this.apiRpcClient.getNep17Balances(address);
        const balances = BlockchainBalanceDto.fromRpcBalances(nep17Balances);
        const balance = balances.find(b => b.asset.hash === assetFromCodeOrHash.hash || b.asset.code === assetFromCodeOrHash.code);
        return balance;
    }

    async deploy(...params: any): Promise<any> {
        return {};
    }

    async deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto> {
        return new DeploySmartContractResultDto(undefined, undefined, undefined ,undefined);
    }

    async deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto> {
        return new DeploySmartContractResultDto(undefined, undefined, undefined ,undefined);
    }

    async getTransaction(txHash: string): Promise<BlockchainTransaction> {
        const rawTx = await this.apiRpcClient.getRawTransaction(txHash, true);
        const txBlock = await this.apiRpcClient.getBlock(rawTx.blockhash, true);
        
        const tx = new BlockchainTransaction();
        tx.blockHash = rawTx.blockhash;
        tx.blockIndex = txBlock.index.toString();
        tx.index = rawTx.nonce.toString();
        tx.hash = rawTx.hash;
        tx.size = rawTx.size.toString();
        tx.version = rawTx.version.toString();
        tx.nonce = rawTx.nonce.toString();
        tx.sender = rawTx.sender;
        tx.sysfee = rawTx.sysfee;
        tx.netfee = rawTx.netfee;
        tx.script = rawTx.script;
        tx.timestamp = rawTx.blocktime;

        return tx;
    }

    async broadcastTransaction(tx: string): Promise<string> {
        const hex = Neon.u.HexString.fromHex(tx);
        this.logger.debug(`Broadcasting: '${hex.toString()}'`);
        const txhash = await this.apiRpcClient.sendRawTransaction(hex);
        this.logger.debug(`Broadcasted: '${hex.toString()}',\nTX hash: '${txhash}'`);
        return txhash;
    }
}
