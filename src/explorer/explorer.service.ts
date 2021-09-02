import { Injectable } from '@nestjs/common';
import { BlockchainSmartContract } from '../blockchain/types/blockchain.smart.contract';
import { BlockchainBlock } from '../blockchain/types/blockchain.block';
import { BlockchainTransaction } from '../blockchain/types/blockchain.transaction';
import { BlockchainAssetDto } from '../assets/dto/blockchain.asset.dto';

@Injectable()
export class ExplorerService {
    async getBlocks(): Promise<BlockchainBlock[]> {
        return [];
    }

    async getBlock(hash: string): Promise<BlockchainBlock> {
        return undefined;
    }

    async getTransactions(): Promise<BlockchainTransaction[]> {
        return [];
    }

    async getTransaction(hash: string): Promise<BlockchainTransaction> {
        return undefined;
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