import { Injectable, Logger } from "@nestjs/common";
import { ContractsService } from "../contracts/contracts.service";
import { BlockchainService } from "../blockchain/blockchain.service";
import { SearchRequestDto } from "./dto/search.request.dto";
import { SearchResultArea, SearchResultDto } from "./dto/search.result.dto";

@Injectable()
export class SearchService {
    private readonly logger = new Logger(SearchService.name);

    constructor(
        private readonly blockchainService: BlockchainService,
        private readonly contractsService: ContractsService
    ) {
    }

    async search(dto: SearchRequestDto): Promise<SearchResultDto[]> {
        if (!dto.term) {
            return [];
        }

        const normalizedTerm = dto.term.trim();

        if (normalizedTerm.length <= 0) {
            return [];
        }

        try {
            if (!normalizedTerm.startsWith('0x') && this.isNumber(normalizedTerm)) {
                // Search by Block number only
                const blockNum = Number(normalizedTerm);
                const block = await this.blockchainService.getBlockByNumber(blockNum);
                if (block) {
                    return [ new SearchResultDto(dto.term, dto.context, block.hash, SearchResultArea.block) ];
                }
            } else {
                // Search by free text e.g block or tx hash, eating error and recovering for more search results.

                // 1. Block by human readable
                try {
                    let block = undefined;
                    const normalizedTermLow = normalizedTerm.toLowerCase();
                    
                    if (normalizedTermLow === 'last' || normalizedTermLow === 'latest' || normalizedTermLow === 'recent') {
                        block = await this.blockchainService.getLatestBlock();
                    } else if (normalizedTermLow === 'zero' || normalizedTermLow === 'first' || normalizedTermLow === 'genesis' || normalizedTermLow === 'genesys') {
                        block = await this.blockchainService.getGenesisBlock();
                    }

                    if (block) {
                        return [ new SearchResultDto(dto.term, dto.context, block.hash, SearchResultArea.block) ];
                    }
                } catch(e) {
                    this.logger.warn(e, e.stack);
                }

                // 2. Block by hash
                try {
                    const block = await this.blockchainService.getBlockByHash(normalizedTerm);
                    if (block) {
                        return [ new SearchResultDto(dto.term, dto.context, block.hash, SearchResultArea.block) ];
                    }
                } catch(e) {
                    this.logger.warn(e, e.stack);
                }

                // 3. TX by hash
                try {
                    const tx = await this.blockchainService.getTransactionByHash(normalizedTerm);
                    if (tx) {
                        return [ new SearchResultDto(dto.term, dto.context, tx.hash, SearchResultArea.tx) ];
                    }
                } catch(e) {
                    this.logger.warn(e, e.stack);
                }

                // 4. Contracts by Code
                try {
                    const contract = await this.contractsService.getContractByCode(normalizedTerm);
                    if (contract) {
                        return [ new SearchResultDto(dto.term, dto.context, contract.scriptHash, SearchResultArea.contract) ];
                    }
                } catch(e) {
                    this.logger.warn(e, e.stack);
                }

                // 5. Contracts by Hash
                try {
                    const contract = await this.contractsService.getContractByHash(normalizedTerm);
                    if (contract) {
                        return [ new SearchResultDto(dto.term, dto.context, contract.scriptHash, SearchResultArea.contract) ];
                    }
                } catch(e) {
                    this.logger.warn(e, e.stack);
                }

                // 6. Address
                try {
                    const valid = this.blockchainService.isAddressValid(normalizedTerm);
                    if (valid) {
                        return [ new SearchResultDto(dto.term, dto.context, normalizedTerm, SearchResultArea.address) ];
                    }
                } catch(e) {
                    this.logger.warn(e, e.stack);
                }
            }
        } catch(e) {
            this.logger.warn(e, e.stack);
        }

        return [];
    }

    private isNumber(str: string): boolean {
        return !isNaN(Number(str));
    }
}