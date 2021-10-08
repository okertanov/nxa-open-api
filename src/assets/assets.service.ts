import { Injectable } from '@nestjs/common';
import { BlockchainAssetDto } from './dto/blockchain.asset.dto';

@Injectable()
export class AssetsService {
    async getAllAssets(): Promise<BlockchainAssetDto[]> {
        const assets = [
            BlockchainAssetDto.DVITA_ASSET,
            BlockchainAssetDto.DVG_ASSET,
            BlockchainAssetDto.T11_ASSET
        ];
        return assets;
    }

    async getAssetByIdentifier(identifier: string): Promise<BlockchainAssetDto> {
        const asset = BlockchainAssetDto.fromCodeOrHash(identifier);
        return asset;
    }

    async getAssetByHash(hash: string): Promise<BlockchainAssetDto> {
        const asset = BlockchainAssetDto.fromCodeOrHash(hash);
        return asset;
    }
}