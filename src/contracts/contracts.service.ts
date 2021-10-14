import { v4 as uuidv4 } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';
import { BlockchainToken, BlockchainTokenType } from '../blockchain/types/blockchain.token';
import { BlockchainSmartContract } from '../blockchain/types/blockchain.smart.contract';
import { CreateSmartContractNep17Dto } from './dto/create.smart.contract.nep17.dto';
import { CreateSmartContractNep11Dto } from './dto/create.smart.contract.nep11.dto';
import { CreateSmartContractSourceDto } from './dto/create.smart.contract.source.dto';
import { SmartContractRepository } from '../repository/smart.contract.repository';
import { SmartContractType } from '../entity/smart.contract.entity';
import { SmartContractCompilerService } from './compiler/smart.contract.compiler.service';
import { BlockchainAssetDto } from '../assets/dto/blockchain.asset.dto';
import { BlockchainAccessService } from '../blockchain/blockchain.access.service';
import { BlockchainNetwork } from '../blockchain/types/blockchain.network';
import { DeploySmartContractDto } from '../blockchain/dto/deploy.smart.contract.dto';

@Injectable()
export class ContractsService {
    private readonly logger = new Logger(ContractsService.name);

    constructor(
        private readonly smartContractRepository: SmartContractRepository,
        private readonly smartContractCompilerService: SmartContractCompilerService,
        private readonly blockchainAccessService: BlockchainAccessService
    ) {
    }

    async getNativeContracts(): Promise<BlockchainSmartContract[]> {
        // TODO: to call ExtRPC for that (to impl first)
        // See list nativecontract
        const nativeContracts = [
            new BlockchainSmartContract(
                'ContractManagement',
                'Contract Management',
                undefined,
                undefined,
                '0xfffdc93764dbaddd97c48f252a53ea4643faa3fd',
                'Nj36aekV3CLybZQJ5NfjYoFgRXEzhV9GtS'
            ),
            new BlockchainSmartContract(
                'StdLib',
                'Standard Library',
                undefined,
                undefined,
                '0xacce6fd80d44e1796aa0c2c625e9e4e0ce39efc0',
                'NdW7WHg1K4bDeNiBSdPchdvvFvTCUFJgXH'
            ),
            new BlockchainSmartContract(
                'CryptoLib',
                'Crypto Library',
                undefined,
                undefined,
                '0x726cb6e0cd8628a1350a611384688911ab75f51b',
                'NNToUmdQBe5n8o53BTzjTFAnSEcpouyy3B'
            ),
            new BlockchainSmartContract(
                'LedgerContract',
                'Ledger Contract',
                undefined,
                undefined,
                '0xda65b600f7124ce6c79950c1772a36403104f2be',
                'NdKbVo9EQNus6YH3CkKWGSWghGpxKCYLoU'
            ),
            new BlockchainSmartContract(
                'PolicyContract',
                'Policy Contract',
                undefined,
                undefined,
                '0xcc5e4edd9f5f8dba8bb65734541df7a1c081c67b',
                'NXCS6rAgYY2ofNJiZFinQrKkffub6RYfcd'
            ),
            new BlockchainSmartContract(
                'RoleManagement',
                'Role Management',
                undefined,
                undefined,
                '0x49cf4e5378ffcd4dec034fd98a174c5491e395e2',
                'Nga3TaLE2wfATqxw8A1CsULd4PmaZq7aTe'
            ),
            new BlockchainSmartContract(
                'OracleContract',
                'Oracle Contract',
                undefined,
                undefined,
                '0xfe924b7cfe89ddd271abaf7210a80a7e11178758',
                'NTz4UrybSL4C7HSfaVpXV6hcsWTkks8Nrj'
            ),
            new BlockchainSmartContract(
                'DvitaToken',
                'Dvita Token',
                undefined,
                undefined,
                undefined,
                '0xb34e1025391e953a918231df11478ec21b039e5f',
                'NUdYfrbi9A4PXd4tgfZVczKRrrB6Yc3b2r',
                undefined,
                new Date(2021, 0, 1, 0, 0, 0, 0),
                undefined,
                new BlockchainToken(
                    BlockchainTokenType.NEP17,
                    BlockchainAssetDto.DVITA_ASSET.code,
                    BlockchainAssetDto.DVITA_ASSET.name,
                    parseInt(BlockchainAssetDto.DVITA_ASSET.decimals, 10),
                    BlockchainAssetDto.DVITA_ASSET.hash,
                    'NUdYfrbi9A4PXd4tgfZVczKRrrB6Yc3b2r'
                )
            ),
            new BlockchainSmartContract(
                'GasToken',
                'Gas Token',
                undefined,
                undefined,
                undefined,
                '0xd2a4cff31913016155e38e474a2c06d08be276cf',
                'NepwUjd9GhqgNkrfXaxj9mmsFhFzGoFuWM',
                undefined,
                new Date(2021, 0, 1, 0, 0, 0, 0),
                undefined,
                new BlockchainToken(
                    BlockchainTokenType.NEP17,
                    BlockchainAssetDto.DVG_ASSET.code,
                    BlockchainAssetDto.DVG_ASSET.name,
                    parseInt(BlockchainAssetDto.DVG_ASSET.decimals, 10),
                    BlockchainAssetDto.DVG_ASSET.hash,
                    'NepwUjd9GhqgNkrfXaxj9mmsFhFzGoFuWM'
                )
            ),
        ];
        return nativeContracts;
    }

    async getAllContracts(): Promise<BlockchainSmartContract[]> {
        //
        // Native
        //
        const nativeContracts = await this.getNativeContracts();

        //
        // TODO: Manually deployed for testing
        //
        const manuallyDeployedContracts = [
            new BlockchainSmartContract(
                'T11',
                'Team11Token',
                undefined,
                undefined,
                undefined,
                '0x9072b3814fc2de5b4e122f73703ff313317d4ed6',
                'Nj36aekV3CLybZQJ5NfjYoFgRXEzhV9GtS',
                undefined,
                new Date(),
                undefined,
                new BlockchainToken(
                    BlockchainTokenType.NEP17,
                    'T11',
                    'Team11Token',
                    2,
                    '0x9072b3814fc2de5b4e122f73703ff313317d4ed6',
                    'Nj36aekV3CLybZQJ5NfjYoFgRXEzhV9GtS'
                )
            ),
        ];

        //
        // DB contracts aka Deployed
        //
        const dbContractEntities = await this.smartContractRepository.find();
        const dbContracts = dbContractEntities.map(BlockchainSmartContract.fromEntity);

        const allContracts = [...nativeContracts, ...manuallyDeployedContracts, ...dbContracts];

        return allContracts;
    }

    async getDeployedContracts(): Promise<BlockchainSmartContract[]> {
        const dbContractEntities = await this.smartContractRepository.find();
        const dbContracts = dbContractEntities.map(BlockchainSmartContract.fromEntity);
        return dbContracts;
    }

    async getContractByCode(code: string): Promise<BlockchainSmartContract> {
        // First Mocked
        const native = await this.getNativeContracts();
        const foundNative = native.find(n => n?.token?.symbol?.toLowerCase() === code.toLowerCase());
        if (foundNative) {
            return foundNative;
        }

        // Then real DB
        const dbContractEntity = await this.smartContractRepository.findOneOrFail({
            where: {
                'LOWER(code)': code.toLowerCase()
              }
        });
        const dbContract = BlockchainSmartContract.fromEntity(dbContractEntity);
        return dbContract;
    }

    async getContractByHash(scriptHash: string): Promise<BlockchainSmartContract> {
        // First Mocked
        const native = await this.getNativeContracts();
        const foundNative = native.find(n => n?.scriptHash === scriptHash);
        if (foundNative) {
            return foundNative;
        }

        // Then real DB
        const dbContractEntity = await this.smartContractRepository.findOneOrFail({ scriptHash });
        const dbContract = BlockchainSmartContract.fromEntity(dbContractEntity);
        return dbContract;
    }

    async createContractFromSource(dto: CreateSmartContractSourceDto): Promise<BlockchainSmartContract> {
        this.logger.debug(`Creating contract from: \n${JSON.stringify(dto)}`);

        // 1. Compile
        const compileResult = await this.smartContractCompilerService.compileSource(dto.source);
        console.dir(compileResult);

        // 2. Dto
        const contract = new BlockchainSmartContract();
        return contract;
    }

    async createTokenContract(dto: CreateSmartContractNep17Dto): Promise<BlockchainSmartContract> {
        this.logger.debug(`Creating Token contract from: \n${JSON.stringify(dto)}`);

        // 1. Compile
        const compileResult = await this.smartContractCompilerService.compileTokenNep17(dto);
        console.dir(compileResult);

        // 2. Deploy
        const deployDto = new DeploySmartContractDto(compileResult.nefImageBase64, compileResult.manifest);
        const deployResult = await this.blockchainAccessService.deploySmartContract(BlockchainNetwork.Nxa, deployDto);
        console.dir(deployResult);

        // 3. Persist
        const entity = this.smartContractRepository.create();
        entity.type = SmartContractType.NEP17;
        entity.code = dto.symbol;
        entity.name = dto.name;
        entity.decimals = dto.decimals;
        entity.initial = dto.initial;
        entity.tokenUrl = dto.tokenUrl;
        entity.iconUrl = dto.iconUrl;
        entity.description = dto.description;
        entity.metadata = undefined;
        entity.address = deployResult.contract.address;
        entity.scriptHash = deployResult.contract.scriptHash;

        const savedEntity = await this.smartContractRepository.save(entity);
        const savedDto = BlockchainSmartContract.fromEntity(savedEntity);
        console.dir(savedDto);
        
        return savedDto;
    }

    async createNftContract(dto: CreateSmartContractNep11Dto): Promise<BlockchainSmartContract> {
        this.logger.debug(`Creating NFT contract from: \n${JSON.stringify(dto)}`);

        // 1. Compile
        const compileResult = await this.smartContractCompilerService.compileNftNep11(dto);
        console.dir(compileResult);

        // 2. Deploy
        const deployDto = new DeploySmartContractDto(compileResult.nefImageBase64, compileResult.manifest);
        const deployResult = await this.blockchainAccessService.deploySmartContract(BlockchainNetwork.Nxa, deployDto);
        console.dir(deployResult);

        // 3. Persist
        const entity = this.smartContractRepository.create();
        entity.type = SmartContractType.NEP11;
        entity.code = dto.symbol;
        entity.name = dto.name;
        entity.decimals = 0;
        entity.initial = '0';
        entity.tokenUrl = dto.tokenUrl;
        entity.iconUrl = dto.iconUrl;
        entity.description = dto.description;
        entity.metadata = dto.metadata;
        entity.address = deployResult.contract.address;
        entity.scriptHash = deployResult.contract.scriptHash;

        const savedEntity = await this.smartContractRepository.save(entity);
        const savedDto = BlockchainSmartContract.fromEntity(savedEntity);
        console.dir(savedDto);
        
        return savedDto;
    }
}