import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { BlockchainTransaction } from "../blockchain/types/blockchain.transaction";
import { BlockchainAssetDto } from "../assets/dto/blockchain.asset.dto";
import { BlockchainAccessService } from "../blockchain/blockchain.access.service";
import { TransactionStatusDto, TransactionStatus } from "../transaction/dto/transaction.status.dto";
import { FaucetActivityRepository } from "../repository/faucet.activity.repository";

@Injectable()
export class FaucetService {
    private readonly logger = new Logger(FaucetService.name);

    // 1 DVITA
    private static readonly maxDvitaFaucetAmount = 1;
    // 10 DVG in decimals scale
    private static readonly maxDvgFaucetAmount = 10_0000_0000;

    constructor(
        private readonly faucetActivityRepository: FaucetActivityRepository,
        private readonly blockchainAccessService: BlockchainAccessService
    ) {
    }

    async depositAddress(address: string): Promise<TransactionStatusDto[]> {
        if (!this.blockchainAccessService.isAddressValid(address)) {
            throw new BadRequestException(address, 'Invalid address')
        }

        //
        // DVITA
        //
        const dvtTxHash = await this.blockchainAccessService.transferFromSystem(
            BlockchainAssetDto.DVITA_ASSET,
            address,
            FaucetService.maxDvitaFaucetAmount.toString()
        );
        const dvtTxStatus = new TransactionStatusDto(TransactionStatus.ANNOUNCED, BlockchainTransaction.Empty);
        dvtTxStatus.transaction.hash = dvtTxHash;

        //
        // DVG
        //
        const dvgTxHash = await this.blockchainAccessService.transferFromSystem(
            BlockchainAssetDto.DVG_ASSET,
            address,
            FaucetService.maxDvgFaucetAmount.toString()
        );
        const dvgTxStatus = new TransactionStatusDto(TransactionStatus.ANNOUNCED, BlockchainTransaction.Empty);
        dvgTxStatus.transaction.hash = dvgTxHash;

        // Store activity record, do not throw if error.
        try {
            const faucetActivity = this.faucetActivityRepository.create({
                address: address,
                dvitaAmount: FaucetService.maxDvitaFaucetAmount.toString(),
                dvitaTxHash: dvtTxHash,
                dvgAmount: FaucetService.maxDvgFaucetAmount.toString(),
                dvgTxHash: dvgTxHash,
            });
            const saved = await this.faucetActivityRepository.save(faucetActivity);
        } catch(e) {
            this.logger.error(e, e.stack);
        }
        
        return [dvtTxStatus, dvgTxStatus];
    }
}