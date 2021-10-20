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

    async getAssetByHash(hash: string): Promise<BlockchainAssetDto | undefined> {
        const allAssets = await this.getAllAssets();
        const asset = allAssets.find(a => a.hash === hash);
        return asset ?? undefined;
    }
}