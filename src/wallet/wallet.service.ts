import { BadRequestException, Injectable } from '@nestjs/common';
import { BlockchainAccessService } from '../blockchain/blockchain.access.service';
import { BlockchainAssetDto } from '../assets/dto/blockchain.asset.dto';
import { BlockchainBalanceDto } from './dto/blockchain.balance.dto';
import { BlockchainTransfer } from '../blockchain/types/blockchain.transfer';
import { ContractsService } from '../contracts/contracts.service';
import { BlockchainAssetMetadata } from '../assets/dto/blockchain.asset.metadata';

@Injectable()
export class WalletService {
    constructor(
        private readonly blockchainAccessService: BlockchainAccessService,
        private readonly contractsService: ContractsService,
    ) {
    }

    async getAddressBalances(address: string): Promise<BlockchainBalanceDto[]> {
        // if (!this.blockchainAccessService.isAddressValid(address)) {
        //     throw new BadRequestException(address, 'Invalid address')
        // }

        let balances = await this.blockchainAccessService.balanceOf(address);
        
        balances = await this.enrichBalances(balances);

        return balances;
    }

    async getDvitaBalance(address: string): Promise<BlockchainBalanceDto> {
        if (!this.blockchainAccessService.isAddressValid(address)) {
            throw new BadRequestException(address, 'Invalid address')
        }

        const asset = BlockchainAssetDto.DVITA_ASSET;
        const balance = this.blockchainAccessService.balanceByAssetOf(asset.code, address);
        return balance;
    }

    async getDvgBalance(address: string): Promise<BlockchainBalanceDto> {
        if (!this.blockchainAccessService.isAddressValid(address)) {
            throw new BadRequestException(address, 'Invalid address')
        }

        const asset = BlockchainAssetDto.DVG_ASSET;
        const balance = this.blockchainAccessService.balanceByAssetOf(asset.code, address);
        return balance;
    }

    async getTokenBalance(address: string, hash: string): Promise<BlockchainBalanceDto> {
        if (!this.blockchainAccessService.isAddressValid(address)) {
            throw new BadRequestException(address, 'Invalid address')
        }

        const asset = BlockchainAssetDto.fromCodeOrHash(hash);
        let balance = await this.blockchainAccessService.balanceByAssetOf(asset.hash, address);

        balance = await this.enrichBalance(balance);

        return balance;
    }

    async getTransfersByAddress(address: string): Promise<BlockchainTransfer[]> {
        let transfers = await this.blockchainAccessService.getTransfersByAddress(address);
        
        transfers = await this.enrichTransfers(transfers);

        return transfers;
    }

    async getUnclaimedByAddress(address: string): Promise<BlockchainBalanceDto> {
        const unclaimed = this.blockchainAccessService.getUnclaimedByAddress(address);
        return unclaimed;
    }

    private async enrichBalances(balances: BlockchainBalanceDto[]): Promise<BlockchainBalanceDto[]> {
        const allContracts = await this.contractsService.getAllContracts();

        balances = balances.map(b => {
            if (b.asset?.code === b.asset?.hash && b.asset?.name === b.asset?.hash) {
                const contract = allContracts.find(c => c.scriptHash === b.asset?.hash);
                if (contract && contract.token) {
                    b.asset.code = contract.token.symbol;
                    b.asset.name = contract.token.name;
                    b.asset.decimals = contract.token.decimals.toString();
                    b.asset.metadata = new BlockchainAssetMetadata(contract.token.iconUrl, contract.token.iconUrl)
                }
            }
            return new BlockchainBalanceDto(b.asset, b.lastUpdatedBlockIndex, b.address, b.amount);
        });
        return balances;
    }

    private async enrichBalance(balance: BlockchainBalanceDto): Promise<BlockchainBalanceDto> {
        let contract = undefined;
        try {
            contract = await this.contractsService.getContractByHash(balance.asset.hash);
        } catch(e) {
            // Silently if not found
        }

        if (balance.asset?.code === balance.asset?.hash && balance.asset?.name === balance.asset?.hash) {
            if (contract && contract.token) {
                balance.asset.code = contract.token.symbol;
                balance.asset.name = contract.token.name;
                balance.asset.decimals = contract.token.decimals.toString();
                balance.asset.metadata = new BlockchainAssetMetadata(contract.token.iconUrl, contract.token.iconUrl)
            }
        }
        return balance;
    }

    private async enrichTransfers(transfers: BlockchainTransfer[]): Promise<BlockchainTransfer[]> {
        const allContracts = await this.contractsService.getAllContracts();

        transfers = transfers.map(t => {
            // console.dir(t);
            if (t.asset?.code === t.asset?.hash && t.asset?.name === t.asset?.hash) {
                const contract = allContracts.find(c => c.scriptHash === t.asset?.hash);
                if (contract && contract.token) {
                    t.asset.code = contract.token.symbol;
                    t.asset.name = contract.token.name;
                    t.asset.decimals = contract.token.decimals.toString();
                    t.asset.metadata = new BlockchainAssetMetadata(contract.token.iconUrl, contract.token.iconUrl)
                }
            }
            return t;
        });
        return transfers;
    }
}
