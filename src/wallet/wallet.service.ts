import { Injectable } from '@nestjs/common';
import { BlockchainAssetDto } from '../assets/dto/blockchain.asset.dto';
import { BlockchainBalanceDto } from './dto/blockchain.balance.dto';

@Injectable()
export class WalletService {
    async getAddressBalances(address: string): Promise<BlockchainBalanceDto[]> {
        const dvitaAsset = BlockchainAssetDto.DVITA_ASSET;
        const dvitaBalance = new BlockchainBalanceDto(dvitaAsset, null, address, '0');
        
        const dvgAsset = BlockchainAssetDto.DVG_ASSET;
        const dvgBalance = new BlockchainBalanceDto(dvgAsset, null, address, '0');

        const balances = [
            dvitaBalance,
            dvgBalance
        ];

        return balances;
    }

    async getDvitaBalance(address: string): Promise<BlockchainBalanceDto> {
        const asset = BlockchainAssetDto.DVITA_ASSET;
        const balance = new BlockchainBalanceDto(asset, null, address, '0');
        return balance;
    }

    async getDvgBalance(address: string): Promise<BlockchainBalanceDto> {
        const asset = BlockchainAssetDto.DVG_ASSET;
        const balance = new BlockchainBalanceDto(asset, null, address, '0');
        return balance;
    }

    async getTokenBalance(address: string, hash: string): Promise<BlockchainBalanceDto> {
        const asset = BlockchainAssetDto.fromCodeOrHash(hash);
        const balance = new BlockchainBalanceDto(asset, null, address, '0');
        return balance;
    }
}
