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
import { BlockchainTransfer, BlockchainTransferType } from '../../../blockchain/types/blockchain.transfer';
import { BlockchainGovernanceMemberDto } from '../../../governance/dto/blockchain.governance.member.dto';

//
// NeoBlockchainProvider
//
@Injectable()
export class NeoBlockchainProvider implements BlockchainProviderInterface {
    private readonly logger = new Logger(NeoBlockchainProvider.name);

    private apiRpcClient: NeonCore.rpc.RPCClient;

    connect(network: BlockchainNetwork): void {
        const endpoint = network.rpcEndpoint;

        this.logger.debug(`Connecting to: '${endpoint}'...`);
        
        this.apiRpcClient = new Neon.rpc.RPCClient(endpoint);
        
        console.dir(this.apiRpcClient);
    }

    disconnect(): void {
        this.logger.debug(`Disconnecting from node...`);
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

    isAddressValid(address: string): boolean {
        return NeonCore.wallet.isAddress(address);
    }

    async getFoundationMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        return undefined;
    }

    async getCouncilMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        return undefined;
    }

    async getCandidates(): Promise<BlockchainGovernanceMemberDto[]> {
        return undefined;
    }

    async getGenesisBlock(): Promise<BlockchainBlock> {
        const block = await this.apiRpcClient.getBlock(0, 1);
        const blockchainBlock = BlockchainBlock.fromRaw(block);
        return blockchainBlock;
    }

    async getLastBlock(): Promise<BlockchainBlock> {
        const blockCount = await this.apiRpcClient.getBlockCount();
        const block = await this.apiRpcClient.getBlock(blockCount - 1, 1);
        const blockchainBlock = BlockchainBlock.fromRaw(block);
        return blockchainBlock;
    }

    async getBlockByNumber(num: string | number): Promise<BlockchainBlock> {
        const numId = Number.parseInt(num.toString());
        const block = await this.apiRpcClient.getBlock(numId, 1);
        const blockchainBlock = BlockchainBlock.fromRaw(block);
        return blockchainBlock;
    }

    async getBlockByHash(hash: string): Promise<BlockchainBlock> {
        const block = await this.apiRpcClient.getBlock(hash, 1);
        const blockchainBlock = BlockchainBlock.fromRaw(block);
        return blockchainBlock;
    }

    async getBlocksRange(from: number, limit: number, order: 'ascending' | 'descending'): Promise<BlockchainBlock[]> {
        return undefined;
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

    async deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto> {
        return new DeploySmartContractResultDto(undefined, undefined, undefined ,undefined);
    }

    async deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto> {
        return new DeploySmartContractResultDto(undefined, undefined, undefined ,undefined);
    }

    async getTransfersByAddress(address: string): Promise<BlockchainTransfer[]> {
        const nep17Transfers = await this.apiRpcClient.getNep17Transfers(address);
        const sent = nep17Transfers.sent.map(s => new BlockchainTransfer(
            BlockchainTransferType.SENT,
            s.blockindex.toString(),
            s.txhash,
            nep17Transfers.address,
            s.transferaddress,
            s.amount,
            s.timestamp,
            BlockchainAssetDto.fromCodeOrHash(s.assethash)
        ));
        const received = nep17Transfers.received.map(s => new BlockchainTransfer(
            BlockchainTransferType.RECEIVED,
            s.blockindex.toString(),
            s.txhash,
            s.transferaddress,
            nep17Transfers.address,
            s.amount,
            s.timestamp,
            BlockchainAssetDto.fromCodeOrHash(s.assethash)
        ));
        return [...sent, ...received];
    }

    async getUnclaimedByAddress(address: string): Promise<BlockchainBalanceDto> {
        return undefined;
    }

    async getTransaction(txHash: string): Promise<BlockchainTransaction> {
        const rawTx = await this.apiRpcClient.getRawTransaction(txHash, true);
        const txBlock = rawTx?.blockhash ? await this.apiRpcClient.getBlock(rawTx.blockhash, true) : undefined;
        const tx = BlockchainTransaction.fromRaw(rawTx.blockhash, txBlock?.index.toString(), rawTx.blocktime, rawTx);
        return tx;
    }

    async broadcastTransaction(tx: string): Promise<string> {
        const hex = Neon.u.HexString.fromHex(tx);
        this.logger.debug(`Broadcasting: '${hex.toString()}'`);
        const txhash = await this.apiRpcClient.sendRawTransaction(hex);
        this.logger.debug(`Broadcasted: '${hex.toString()}',\nTX hash: '${txhash}'`);
        return txhash;
    }

    async transferFromSystem(asset: BlockchainAssetDto, address: string, amount: string): Promise<string> {
        return undefined;
    }

    async getSystemFeeForScript(script: string): Promise<string> {
        return undefined;
    }

    async getNetworkFeeForLength(length: number): Promise<string> {
        return undefined;
    }
}
