import { Injectable } from '@nestjs/common';
import { BlockchainAccessService } from './blockchain.access.service';
import { BlockchainInfoDto, BlockchainType } from './dto/blockchain.info.dto';
import { BlockchainBlock } from './types/blockchain.block';
import { BlockchainTransaction } from './types/blockchain.transaction';

@Injectable()
export class BlockchainService {
    constructor(
        private readonly blockchainAccessService: BlockchainAccessService,
    ) {
    }

    async getInfo(): Promise<BlockchainInfoDto> {
        const block = await this.blockchainAccessService.getLastBlock();
        const info = new BlockchainInfoDto(BlockchainType.NXA, 'N3', '199', true, block.index);
        return info;
    }

    async getGenesisBlock(): Promise<BlockchainBlock> {
        const block = new BlockchainBlock();
        return block;
    }

    async getLatestBlock(): Promise<BlockchainBlock> {
        const block = await this.blockchainAccessService.getLastBlock();
        return block;
    }

    async getBlockById(id: string | number): Promise<BlockchainBlock> {
        const block = new BlockchainBlock();
        return block;
    }

    async getBlockByHash(hash: string): Promise<BlockchainBlock> {
        const block = new BlockchainBlock();
        return block;
    }

    async getBlockTransactionsByBlockId(id: string | number): Promise<BlockchainTransaction[]> {
        const txs = [];
        return txs;
    }

    async getBlockTransactionsByBlockHash(hash: string): Promise<BlockchainTransaction[]> {
        const txs = [];
        return txs;
    }

    async getTransactionByHash(hash: string): Promise<BlockchainTransaction> {
        const tx = await this.blockchainAccessService.getTransaction(hash);
        return tx;
    }
}
