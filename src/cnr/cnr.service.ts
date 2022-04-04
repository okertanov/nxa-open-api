import { Injectable } from '@nestjs/common';
import { BlockchainCnrService } from '../blockchain/blockchain.cnr.service';
import { BlockchainCnrResolveResultDto } from "../cnr/dto/blockchain.cnr.resolve.result";
import { BlockchainCnrCreateRegisterTxRequestDto } from "./dto/blockchain.cnr.createregistertx.request";
import { BlockchainCnrCreateRegisterTxResultDto } from "./dto/blockchain.cnr.createregistertx.result";
import { BlockchainCnrCreateUnregisterTxRequestDto } from "./dto/blockchain.cnr.createunregistertx.request";
import { BlockchainCnrCreateUnregisterTxResultDto } from "./dto/blockchain.cnr.createunregistertx.result";
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

    async createregistertx(request: BlockchainCnrCreateRegisterTxRequestDto): Promise<BlockchainCnrCreateRegisterTxResultDto> {
        const result = await this.blockchainCnrService.createregistertx(request);
        return result;
    }

    async createunregistertx(request: BlockchainCnrCreateUnregisterTxRequestDto): Promise<BlockchainCnrCreateUnregisterTxResultDto> {
        const result = await this.blockchainCnrService.createunregistertx(request);
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