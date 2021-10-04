import { Injectable } from '@nestjs/common';
import { BlockchainSmartContract } from '../blockchain/types/blockchain.smart.contract';
import { BlockchainBlock } from '../blockchain/types/blockchain.block';
import { BlockchainTransaction } from '../blockchain/types/blockchain.transaction';
import { BlockchainAssetDto } from '../assets/dto/blockchain.asset.dto';
import { BlockchainAccessService } from '../blockchain/blockchain.access.service';

@Injectable()
export class ExplorerService {
    constructor(
        private readonly blockchainAccessService: BlockchainAccessService,
    ) {
    }

    async getBlocks(from: number, limit: number, order: 'ascending' | 'descending'): Promise<BlockchainBlock[]> {
        const blocks = await this.blockchainAccessService.getBlocksRange(from, limit, order);
        return blocks;
    }

    async getBlock(hash: string): Promise<BlockchainBlock> {
        const block = await this.blockchainAccessService.getBlockByHash(hash);
        return block;
    }

    async getTransactions(from: number, limit: number, order: 'ascending' | 'descending'): Promise<BlockchainTransaction[]> {
        return [];
    }

    async getTransaction(hash: string): Promise<BlockchainTransaction> {
        const tx = await this.blockchainAccessService.getTransaction(hash);
        return tx;
    }

    async getContracts(): Promise<BlockchainSmartContract[]> {
        return [];
    }

    async getContract(hash: string): Promise<BlockchainSmartContract> {
        return undefined;
    }

    async getTokens(): Promise<BlockchainAssetDto[]> {
        return [];
    }

    async getToken(hashOrCode: string): Promise<BlockchainAssetDto> {
        return undefined;
    }
}