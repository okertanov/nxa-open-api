import { Injectable, Logger } from '@nestjs/common';
import { ContractsService } from '../contracts/contracts.service';
import { BlockchainAssetDto } from './dto/blockchain.asset.dto';

@Injectable()
export class AssetsService {
    private readonly logger = new Logger(AssetsService.name);

    constructor(
        private readonly contractsService: ContractsService
    ) {

    }

    async getAllAssets(): Promise<BlockchainAssetDto[]> {
        const preDefinedAssets = [
            BlockchainAssetDto.DVITA_ASSET,
            BlockchainAssetDto.DVG_ASSET,
            BlockchainAssetDto.T11_ASSET
        ];

        try {
            const deployedContracts = await this.contractsService.getDeployedContracts();
            const deployedAssets = deployedContracts.map(sc => BlockchainAssetDto.fromSmartContract(sc));
            const allAssets = [...preDefinedAssets, ...deployedAssets];
            return allAssets;
        } catch(e) {
            this.logger.error(e, e.stack);
            return preDefinedAssets;
        }
    }

    async getAssetByIdentifier(identifier: string): Promise<BlockchainAssetDto> {
        // TODO: See above
        const asset = BlockchainAssetDto.fromCodeOrHash(identifier);
        return asset;
    }

    async getAssetByHash(hash: string): Promise<BlockchainAssetDto> {
        // TODO: See above
        const asset = BlockchainAssetDto.fromCodeOrHash(hash);
        return asset;
    }
}