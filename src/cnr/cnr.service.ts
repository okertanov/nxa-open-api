import { Injectable } from '@nestjs/common';
import { BlockchainCnrService } from '../blockchain/blockchain.cnr.service';
import { BlockchainCnrResolveResultDto } from "../cnr/dto/blockchain.cnr.resolve.result";
import { BlockchainCnrRegisterRequestDto } from "./dto/blockchain.cnr.register.request";
import { BlockchainCnrRegisterResultDto } from "./dto/blockchain.cnr.register.result";
import { BlockchainCnrUnregisterRequestDto } from "./dto/blockchain.cnr.unregister.request";
import { BlockchainCnrUnregisterResultDto } from "./dto/blockchain.cnr.unregister.result";

@Injectable()
export class CnrService {
    constructor(private readonly blockchainCnrService: BlockchainCnrService
    ) { }
    
    async resolve(request: string): Promise<BlockchainCnrResolveResultDto> {
        const result = await this.blockchainCnrService.resolve(request);
        return result;
    }

    async register(request: BlockchainCnrRegisterRequestDto): Promise<BlockchainCnrRegisterResultDto> {
        const result = await this.blockchainCnrService.register(request);
        return result;
    }

    async unregister(request: BlockchainCnrUnregisterRequestDto): Promise<BlockchainCnrUnregisterResultDto> {
        const result = await this.blockchainCnrService.unregister(request);
        return result;
    }
}