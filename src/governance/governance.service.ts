import { Injectable } from '@nestjs/common';
import { BlockchainGovernanceService } from '../blockchain/blockchain.governance.service';
import { BlockchainGovernanceMemberDto } from './dto/blockchain.governance.member.dto';
import { BlockchainGovernanceRegistrationRequestDto } from './dto/blockchain.governance.registration.request';
import { BlockchainGovernanceRegistrationResultDto } from './dto/blockchain.governance.registration.result.dto';
import { BlockchainGovernanceVoteRequestDto } from './dto/blockchain.governance.vote.request';
import { BlockchainGovernanceVoteResultDto } from './dto/blockchain.governance.vote.result.dto';

@Injectable()
export class GovernanceService {
    constructor(
        private readonly blockchainGovernanceService: BlockchainGovernanceService
    ) {
    }

    async getFoundationMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        const foundationMembers = await this.blockchainGovernanceService.getFoundationMembers();
        return foundationMembers;
    }

    async getCouncilMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        const councilMembers = await this.blockchainGovernanceService.getCouncilMembers();
        return councilMembers;
    }

    async getCandidates(): Promise<BlockchainGovernanceMemberDto[]> {
        const candidates = await this.blockchainGovernanceService.getCandidates();
        return candidates;
    }

    async registerCandidate(request: BlockchainGovernanceRegistrationRequestDto): Promise<BlockchainGovernanceRegistrationResultDto> {
        const result = await this.blockchainGovernanceService.registerCandidate(request);
        return result;
    }

    async unregisterCandidate(request: BlockchainGovernanceRegistrationRequestDto): Promise<BlockchainGovernanceRegistrationResultDto> {
        const result = await this.blockchainGovernanceService.unregisterCandidate(request);
        return result;
    }

    async vote(request: BlockchainGovernanceVoteRequestDto): Promise<BlockchainGovernanceVoteResultDto> {
        const result = await this.blockchainGovernanceService.vote(request);
        return result;
    }
}