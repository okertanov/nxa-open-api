import { Injectable } from '@nestjs/common';
import { BlockchainGovernanceMemberDto } from './dto/blockchain.governance.member.dto';
import { BlockchainGovernanceRegistrationRequestDto } from './dto/blockchain.governance.registration.request';
import { BlockchainGovernanceRegistrationResultDto } from './dto/blockchain.governance.registration.result.dto';
import { BlockchainGovernanceVoteRequestDto } from './dto/blockchain.governance.vote.request';
import { BlockchainGovernanceVoteResultDto } from './dto/blockchain.governance.vote.result.dto';

@Injectable()
export class GovernanceService {
    async getFoundationMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        const candidates = [];
        return candidates;
    }

    async getCouncilMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        const candidates = [];
        return candidates;
    }

    async getCandidates(): Promise<BlockchainGovernanceMemberDto[]> {
        const candidates = [];
        return candidates;
    }

    async getCurrentConsensusMakers(): Promise<BlockchainGovernanceMemberDto[]> {
        const candidates = [];
        return candidates;
    }

    async vote(request: BlockchainGovernanceVoteRequestDto): Promise<BlockchainGovernanceVoteResultDto> {
        const result = new BlockchainGovernanceVoteResultDto();
        return result;
    }

    async registerCandidate(request: BlockchainGovernanceRegistrationRequestDto): Promise<BlockchainGovernanceRegistrationResultDto> {
        const result = new BlockchainGovernanceRegistrationResultDto();
        return result;
    }

    async unregisterCandidate(pubkey: string): Promise<BlockchainGovernanceRegistrationResultDto> {
        const result = new BlockchainGovernanceRegistrationResultDto();
        return result;
    }
}