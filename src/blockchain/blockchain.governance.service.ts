import { Injectable } from "@nestjs/common";
import { BlockchainNetwork } from "./types/blockchain.network";
import { BlockchainGovernanceMemberDto } from "../governance/dto/blockchain.governance.member.dto";
import { NxaBlockchainExtProvider } from "./providers/nxa/nxa.blockchain.ext.provider";
import { BlockchainAccessService } from "./blockchain.access.service";
import { BlockchainGovernanceRegistrationRequestDto } from "../governance/dto/blockchain.governance.registration.request";
import { BlockchainGovernanceVoteRequestDto } from "../governance/dto/blockchain.governance.vote.request";
import { BlockchainGovernanceVoteResultDto } from "../governance/dto/blockchain.governance.vote.result.dto";
import { BlockchainGovernanceRegistrationResultDto } from "../governance/dto/blockchain.governance.registration.result.dto";
import { BlockchainGovernanceVoteStatusDto } from "../governance/dto/blockchain.governance.vote.status.dto";

@Injectable()
export class BlockchainGovernanceService {
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

    async getFoundationMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        return this.blockchainAccessService.getFoundationMembers();
    }

    async getCouncilMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        return this.blockchainAccessService.getCouncilMembers();
    }

    async getCandidates(): Promise<BlockchainGovernanceMemberDto[]> {
        return this.nxaBlockchainExtProvider.getCandidates();
    }

    async registerCandidate(dto: BlockchainGovernanceRegistrationRequestDto): Promise<BlockchainGovernanceRegistrationResultDto> {
        return this.nxaBlockchainExtProvider.registerCandidate(dto.registrarAddress, dto.candidatePublicKey);
    }

    async unregisterCandidate(dto: BlockchainGovernanceRegistrationRequestDto): Promise<BlockchainGovernanceRegistrationResultDto> {
        return this.nxaBlockchainExtProvider.unregisterCandidate(dto.registrarAddress, dto.candidatePublicKey);
    }

    async vote(request: BlockchainGovernanceVoteRequestDto): Promise<BlockchainGovernanceVoteResultDto> {
        return this.nxaBlockchainExtProvider.vote(request.voterAddress, request.voterPublicKey, request.candidatePublicKey);
    }

    async getVoteStatus(address: string): Promise<BlockchainGovernanceVoteStatusDto> {
        const result = await this.blockchainAccessService.getVoteStatus(address);
        return result;
    }
}
