import { Injectable } from "@nestjs/common";
import { BlockchainNetwork } from "./types/blockchain.network";
import { NxaBlockchainExtProvider } from "./providers/nxa/nxa.blockchain.ext.provider";
import { BlockchainAccessService } from "./blockchain.access.service";
import { BlockchainCnrResolveResultDto } from "../cnr/dto/blockchain.cnr.resolve.result";
import { BlockchainCnrCreateRegisterTxRequestDto } from "../cnr/dto/blockchain.cnr.createregistertx.request";
import { BlockchainCnrCreateRegisterTxResultDto } from "../cnr/dto/blockchain.cnr.createregistertx.result";
import { BlockchainCnrCreateUnregisterTxRequestDto } from "../cnr/dto/blockchain.cnr.createunregistertx.request";
import { BlockchainCnrCreateUnregisterTxResultDto } from "../cnr/dto/blockchain.cnr.createunregistertx.result";
import { BlockchainCnrRegisterRequestDto } from "../cnr/dto/blockchain.cnr.register.request";
import { BlockchainCnrRegisterResultDto } from "../cnr/dto/blockchain.cnr.register.result";
import { BlockchainCnrUnregisterRequestDto } from "../cnr/dto/blockchain.cnr.unregister.request";
import { BlockchainCnrUnregisterResultDto } from "../cnr/dto/blockchain.cnr.unregister.result";

@Injectable()
export class BlockchainCnrService {
    private readonly providerExt: NxaBlockchainExtProvider;

    constructor(
        readonly blockchainAccessService: BlockchainAccessService,
        readonly nxaBlockchainExtProvider: NxaBlockchainExtProvider
    ) {
        this.providerExt = nxaBlockchainExtProvider;
    }

    connect(network: BlockchainNetwork): void {
        this.providerExt.connect(network);
    }

    disconnect(): void {
        this.providerExt.disconnect();
    }

    async testConnection(): Promise<void> {
        await this.providerExt.testConnection();
    }

    async resolve(request: string): Promise<BlockchainCnrResolveResultDto> {
        return this.nxaBlockchainExtProvider.resolve(request);
    }

    async createregistertx(request: BlockchainCnrCreateRegisterTxRequestDto): Promise<BlockchainCnrCreateRegisterTxResultDto> {
        return this.nxaBlockchainExtProvider.createregistertx(request.cname, request.address, request.signerPubKey);
    }

    async createunregistertx(request: BlockchainCnrCreateUnregisterTxRequestDto): Promise<BlockchainCnrCreateUnregisterTxResultDto> {
        return this.nxaBlockchainExtProvider.createunregistertx(request.cname, request.signerPubKey);
    }

    async register(request: BlockchainCnrRegisterRequestDto): Promise<BlockchainCnrRegisterResultDto> {
        return this.nxaBlockchainExtProvider.register(request.cname, request.address, request.privKey);
    }

    async unregister(request: BlockchainCnrUnregisterRequestDto): Promise<BlockchainCnrUnregisterResultDto> {
        return this.nxaBlockchainExtProvider.unregister(request.cname, request.privKey);
    }
}
