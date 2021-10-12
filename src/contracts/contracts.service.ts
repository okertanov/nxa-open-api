import { Injectable } from '@nestjs/common';
import { BlockchainToken, BlockchainTokenType } from '../blockchain/types/blockchain.token';
import { BlockchainSmartContract } from '../blockchain/types/blockchain.smart.contract';
import { CreateSmartContractNep17Dto } from './dto/create.smart.contract.nep17.dto';
import { CreateSmartContractNep11Dto } from './dto/create.smart.contract.nep11.dto';
import { CreateSmartContractSourceDto } from './dto/create.smart.contract.source.dto';
import { SmartContractRepository } from '../repository/smart.contract.repository';
import { SmartContractType } from '../entity/smart.contract.entity';

@Injectable()
export class ContractsService {
    constructor(
        private readonly smartContractRepository: SmartContractRepository
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
                '0xb34e1025391e953a918231df11478ec21b039e5f',
                'NUdYfrbi9A4PXd4tgfZVczKRrrB6Yc3b2r',
                undefined,
                undefined,
                new BlockchainToken(
                    BlockchainTokenType.NEP17,
                    'DvitaToken',
                    'Dvita Token',
                    2,
                    '0xb34e1025391e953a918231df11478ec21b039e5f',
                    'NUdYfrbi9A4PXd4tgfZVczKRrrB6Yc3b2r'
                )
            ),
            new BlockchainSmartContract(
                'GasToken',
                'Gas Token',
                undefined,
                undefined,
                '0xd2a4cff31913016155e38e474a2c06d08be276cf',
                'NepwUjd9GhqgNkrfXaxj9mmsFhFzGoFuWM',
                undefined,
                undefined,
                new BlockchainToken(
                    BlockchainTokenType.NEP17,
                    'GasToken',
                    'Gas Token',
                    2,
                    '0xd2a4cff31913016155e38e474a2c06d08be276cf',
                    'NepwUjd9GhqgNkrfXaxj9mmsFhFzGoFuWM'
                )
            ),
        ];
        return nativeContracts;
    }

    async getAllContracts(): Promise<BlockchainSmartContract[]> {
        const nativeContracts = await this.getNativeContracts();

        const manuallyDeployedContracts = [
            new BlockchainSmartContract(
                'T11',
                'Team11Token',
                undefined,
                undefined,
                '0x9072b3814fc2de5b4e122f73703ff313317d4ed6',
                'Nj36aekV3CLybZQJ5NfjYoFgRXEzhV9GtS',
                undefined,
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

        const dbContractEntities = await this.smartContractRepository.find();
        const dbContracts = dbContractEntities.map(BlockchainSmartContract.fromEntity);

        const allContracts = [...nativeContracts, ...manuallyDeployedContracts, ...dbContracts];

        return allContracts;
    }

    async createContractFromSource(dto: CreateSmartContractSourceDto): Promise<BlockchainSmartContract> {
        return undefined;
    }

    async createTokenContract(dto: CreateSmartContractNep17Dto): Promise<BlockchainSmartContract> {
        const entity = this.smartContractRepository.create();
        entity.type = SmartContractType.NEP17;
        entity.code = dto.symbol;
        entity.name = dto.name;
        entity.decimals = dto.decimals;
        entity.initial = dto.initial;
        entity.tokenUrl = dto.tokenUrl;
        entity.iconUrl = dto.iconUrl;
        entity.description = dto.description;
        entity.address = '0000000000000000000000000000000000000000';
        entity.scriptHash = '0x0000000000000000000000000000000000000000';

        const savedEntity = await this.smartContractRepository.save(entity);
        const savedDto = BlockchainSmartContract.fromEntity(savedEntity);
        return savedDto;
    }

    async createNftContract(dto: CreateSmartContractNep11Dto): Promise<BlockchainSmartContract> {
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
        entity.address = '0000000000000000000000000000000000000000';
        entity.scriptHash = '0x0000000000000000000000000000000000000000';

        const savedEntity = await this.smartContractRepository.save(entity);
        const savedDto = BlockchainSmartContract.fromEntity(savedEntity);
        return savedDto;
    }
}