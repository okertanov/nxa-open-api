import { Body, Controller, Delete, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BlockchainGovernanceMemberDto } from './dto/blockchain.governance.member.dto';
import { BlockchainGovernanceRegistrationRequestDto } from './dto/blockchain.governance.registration.request';
import { BlockchainGovernanceRegistrationResultDto } from './dto/blockchain.governance.registration.result.dto';
import { BlockchainGovernanceVoteRequestDto } from './dto/blockchain.governance.vote.request';
import { BlockchainGovernanceVoteResultDto } from './dto/blockchain.governance.vote.result.dto';
import { GovernanceService } from './governance.service';

@ApiTags('Governance')
@Controller('/governance')
export class GovernanceController {
    private readonly logger = new Logger(GovernanceController.name);

    constructor(private readonly governanceService: GovernanceService) {
    }

    @Get('/foundation')
    @ApiOperation({ summary: 'Get Foundation members' })
    @ApiResponse({ status: 200, description: 'The Foundation members list', type: BlockchainGovernanceMemberDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getFoundationMembers(
        @Req() req: Request
    ): Promise<BlockchainGovernanceMemberDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.governanceService.getFoundationMembers();
    }

    @Get('/council')
    @ApiOperation({ summary: 'Get Council members' })
    @ApiResponse({ status: 200, description: 'The Council members list', type: BlockchainGovernanceMemberDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getCouncilMembers(
        @Req() req: Request
    ): Promise<BlockchainGovernanceMemberDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.governanceService.getCouncilMembers();
    }

    @Get('/candidates')
    @ApiOperation({ summary: 'Get Candidates' })
    @ApiResponse({ status: 200, description: 'The Candidates list', type: BlockchainGovernanceMemberDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getCandidates(
        @Req() req: Request
    ): Promise<BlockchainGovernanceMemberDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.governanceService.getCandidates();
    }

    @Get('/consensus/current')
    @ApiOperation({ summary: 'Get Current consensus makers' })
    @ApiResponse({ status: 200, description: 'Current consensus makers list', type: BlockchainGovernanceMemberDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getCurrentConsensusMakers(
        @Req() req: Request
    ): Promise<BlockchainGovernanceMemberDto[]> {
        this.logger.verbose(`${req.method} : ${req.url}`);
        return this.governanceService.getCurrentConsensusMakers();
    }

    @Post('/vote')
    @ApiOperation({ summary: 'Vote for a member' })
    @ApiResponse({ status: 200, description: 'Vote result', type: BlockchainGovernanceVoteResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postVote(
        @Req() req: Request,
        @Body() body: BlockchainGovernanceVoteRequestDto
    ): Promise<BlockchainGovernanceVoteResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);
        return this.governanceService.vote(body);
    }

    @Post('/register')
    @ApiOperation({ summary: 'Register a candidate' })
    @ApiResponse({ status: 200, description: 'Candidate registration result', type: BlockchainGovernanceRegistrationResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postRegisterCandidate(
        @Req() req: Request,
        @Body() body: BlockchainGovernanceRegistrationRequestDto
    ): Promise<BlockchainGovernanceRegistrationResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);
        return this.governanceService.registerCandidate(body);
    }

    @Delete('/register/:pubkey')
    @ApiOperation({ summary: 'Unregister a candidate' })
    @ApiResponse({ status: 200, description: 'Candidate unregistration result', type: BlockchainGovernanceRegistrationResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async deleteUnregisterCandidate(
        @Req() req: Request,
        @Param('pubkey') pubkey: string
    ): Promise<BlockchainGovernanceRegistrationResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(pubkey)}`);
        return this.governanceService.unregisterCandidate(pubkey);
    }
}