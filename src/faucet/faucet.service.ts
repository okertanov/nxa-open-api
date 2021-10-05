import { BadRequestException, Injectable } from "@nestjs/common";
import { BlockchainTransaction } from "../blockchain/types/blockchain.transaction";
import { BlockchainAssetDto } from "../assets/dto/blockchain.asset.dto";
import { BlockchainAccessService } from "../blockchain/blockchain.access.service";
import { TransactionStatusDto, TransactionStatus } from "../transaction/dto/transaction.status.dto";

@Injectable()
export class FaucetService {
    // 1 DVITA
    private static readonly maxDvitaFaucetAmount = 1;
    // 10 DVG in decimals scale
    private static readonly maxDvgFaucetAmount = 10_0000_0000;

    constructor(
        private readonly blockchainAccessService: BlockchainAccessService
    ) {
    }

    async depositAddress(address: string): Promise<TransactionStatusDto[]> {
        if (!this.blockchainAccessService.isAddressValid(address)) {
            throw new BadRequestException(address, 'Invalid address')
        }

        const dvtTxHash = await this.blockchainAccessService.transferFromSystem(
            BlockchainAssetDto.DVITA_ASSET,
            address,
            FaucetService.maxDvitaFaucetAmount.toString()
        );
        const dvtTxStatus = new TransactionStatusDto(TransactionStatus.ANNOUNCED, BlockchainTransaction.Empty);
        dvtTxStatus.transaction.hash = dvtTxHash;

        const dvgTxHash = await this.blockchainAccessService.transferFromSystem(
            BlockchainAssetDto.DVG_ASSET,
            address,
            FaucetService.maxDvgFaucetAmount.toString()
        );
        const dvgTxStatus = new TransactionStatusDto(TransactionStatus.ANNOUNCED, BlockchainTransaction.Empty);
        dvgTxStatus.transaction.hash = dvgTxHash;
        
        return [dvtTxStatus, dvgTxStatus];
    }
}