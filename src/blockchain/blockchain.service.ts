import { Injectable } from '@nestjs/common';
import { BlockchainAccessService } from './blockchain.access.service';
import { BlockchainInfoDto } from './dto/blockchain.info.dto';
import { BlockchainBlock } from './types/blockchain.block';
import { BlockchainTransaction } from './types/blockchain.transaction';

@Injectable()
export class BlockchainService {
    constructor(
        private readonly blockchainAccessService: BlockchainAccessService,
    ) {
    }

    isAddressValid(address: string): boolean {
        const valid = this.blockchainAccessService.isAddressValid(address);
        return valid;
    }

    async getBlockchainInfo(): Promise<BlockchainInfoDto> {
        const info = await this.blockchainAccessService.getBlockchainInfo();
        return info;
    }

    async getGenesisBlock(): Promise<BlockchainBlock> {
        const block = await this.blockchainAccessService.getGenesisBlock();
        return block;
    }

    async getLatestBlock(): Promise<BlockchainBlock> {
        const block = await this.blockchainAccessService.getLastBlock();
        return block;
    }

    async getBlockByNumber(id: string | number): Promise<BlockchainBlock> {
        const block = await this.blockchainAccessService.getBlockByNumber(id);
        return block;
    }

    async getBlockByHash(hash: string): Promise<BlockchainBlock> {
        const block = await this.blockchainAccessService.getBlockByHash(hash);
        return block;
    }

    async getBlockTransactionsByBlockId(id: string | number): Promise<BlockchainTransaction[]> {
        const block = await this.blockchainAccessService.getBlockByNumber(id);
        return block.transactions;
    }

    async getBlockTransactionsByBlockHash(hash: string): Promise<BlockchainTransaction[]> {
        const block = await this.blockchainAccessService.getBlockByHash(hash);
        return block.transactions;
    }

    async getTransactionByHash(hash: string): Promise<BlockchainTransaction> {
        const tx = await this.blockchainAccessService.getTransaction(hash);
        return tx;
    }

    async getPaginatedBlocks(from: number, limit: number, order: 'ascending' | 'descending'): Promise<BlockchainBlock[]> {
        const blocks = await this.blockchainAccessService.getBlocksRange(from, limit, order);
        return blocks;
    }

    async getPaginatedTransactions(from: number, limit: number, order: 'ascending' | 'descending'): Promise<BlockchainTransaction[]> {
        // TODO: Use SQL DB for Transactions collected by Node Block Plugin or API block indexer worker
        return [];
    }
}
