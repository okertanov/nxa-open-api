import { BadRequestException, Injectable } from '@nestjs/common';
import { BlockchainAccessService } from '../blockchain/blockchain.access.service';
import { BlockchainAssetDto } from '../assets/dto/blockchain.asset.dto';
import { BlockchainBalanceDto } from './dto/blockchain.balance.dto';
import { BlockchainTransfer } from '../blockchain/types/blockchain.transfer';

@Injectable()
export class WalletService {
    constructor(
        private readonly blockchainAccessService: BlockchainAccessService,
    ) {
    }

    async getAddressBalances(address: string): Promise<BlockchainBalanceDto[]> {
        if (!this.blockchainAccessService.isAddressValid(address)) {
            throw new BadRequestException(address, 'Invalid address')
        }

        const balances = await this.blockchainAccessService.balanceOf(address);
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
        const balance = this.blockchainAccessService.balanceByAssetOf(asset.hash, address);
        return balance;
    }

    async getTransfersByAddress(address: string): Promise<BlockchainTransfer[]> {
        const transfers = this.blockchainAccessService.getTransfersByAddress(address);
        return transfers;
    }
}
