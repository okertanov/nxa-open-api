import { Injectable } from '@nestjs/common';
import { BlockchainSmartContract } from '../blockchain/types/blockchain.smart.contract';

@Injectable()
export class ContractsService {
    async getNativeContracts(): Promise<BlockchainSmartContract[]> {
        // TODO: to call ExtRPC for that (to impl first)
        // See list nativecontract
        const nativeContracts = [
            new BlockchainSmartContract('ContractManagement', 'Contract Management', undefined, undefined, '0xfffdc93764dbaddd97c48f252a53ea4643faa3fd', 'Nj36aekV3CLybZQJ5NfjYoFgRXEzhV9GtS'),
            new BlockchainSmartContract('StdLib', 'Standard Library', undefined, undefined, '0xacce6fd80d44e1796aa0c2c625e9e4e0ce39efc0', 'NdW7WHg1K4bDeNiBSdPchdvvFvTCUFJgXH'),
            new BlockchainSmartContract('CryptoLib', 'Crypto Library', undefined, undefined, '0x726cb6e0cd8628a1350a611384688911ab75f51b', 'NNToUmdQBe5n8o53BTzjTFAnSEcpouyy3B'),
            new BlockchainSmartContract('LedgerContract', 'Ledger Contract', undefined, undefined, '0xda65b600f7124ce6c79950c1772a36403104f2be', 'NdKbVo9EQNus6YH3CkKWGSWghGpxKCYLoU'),
            new BlockchainSmartContract('DvitaToken', 'Dvita Token', undefined, undefined, '0xb34e1025391e953a918231df11478ec21b039e5f', 'NUdYfrbi9A4PXd4tgfZVczKRrrB6Yc3b2r'),
            new BlockchainSmartContract('GasToken', 'Gas Token', undefined, undefined, '0xd2a4cff31913016155e38e474a2c06d08be276cf', 'NepwUjd9GhqgNkrfXaxj9mmsFhFzGoFuWM'),
            new BlockchainSmartContract('PolicyContract', 'Policy Contract', undefined, undefined, '0xcc5e4edd9f5f8dba8bb65734541df7a1c081c67b', 'NXCS6rAgYY2ofNJiZFinQrKkffub6RYfcd'),
            new BlockchainSmartContract('RoleManagement', 'Role Management', undefined, undefined, '0x49cf4e5378ffcd4dec034fd98a174c5491e395e2', 'Nga3TaLE2wfATqxw8A1CsULd4PmaZq7aTe'),
            new BlockchainSmartContract('OracleContract', 'Oracle Contract', undefined, undefined, '0xfe924b7cfe89ddd271abaf7210a80a7e11178758', 'NTz4UrybSL4C7HSfaVpXV6hcsWTkks8Nrj'),
        ];
        return nativeContracts;
    }
}