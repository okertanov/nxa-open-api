import { Injectable } from "@nestjs/common";
import { BlockchainAssetDto } from "../assets/dto/blockchain.asset.dto";
import { BlockchainAccessService } from "../blockchain/blockchain.access.service";
import { TransactionStatusDto, TransactionStatus } from "../transaction/dto/transaction.status.dto";

@Injectable()
export class FaucetService {
    private static readonly maxDvitaFaucetAmount = 1;
    private static readonly maxDvgFaucetAmount = 10;

    constructor(
        private readonly blockchainAccessService: BlockchainAccessService        
    ) {
    }
    async depositAddress(address: string): Promise<TransactionStatusDto[]> {
        const dvtTxHash = await this.blockchainAccessService.transferFromSystem(
            BlockchainAssetDto.DVITA_ASSET,
            address,
            FaucetService.maxDvitaFaucetAmount.toString()
        );
        const dvtTxStatus = new TransactionStatusDto(TransactionStatus.ANNOUNCED);
        dvtTxStatus.transaction.hash = dvtTxHash;

        const dvgTxHash = await this.blockchainAccessService.transferFromSystem(
            BlockchainAssetDto.DVG_ASSET,
            address,
            FaucetService.maxDvgFaucetAmount.toString()
        );
        const dvgTxStatus = new TransactionStatusDto(TransactionStatus.ANNOUNCED);
        dvgTxStatus.transaction.hash = dvgTxHash;
        
        return [dvtTxStatus, dvgTxStatus];
    }
}