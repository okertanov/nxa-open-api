import { Injectable } from '@nestjs/common';
import { BlockchainStatisticDto } from './dto/blockchain.statistic.dto';

@Injectable()
export class StatisticService {
    async getBlockchainStatistic(): Promise<BlockchainStatisticDto> {
        const stats = new BlockchainStatisticDto();
        return stats;
    }
}