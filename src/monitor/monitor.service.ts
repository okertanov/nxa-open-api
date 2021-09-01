import { Injectable } from '@nestjs/common';
import { BlockchainMonitorNodeDto } from './dto/blockchain.monitor.node.dto';

@Injectable()
export class MonitorService {
    async getBlockchainNodes(): Promise<BlockchainMonitorNodeDto[]> {
        const nodes = [];
        return nodes;
    }
}