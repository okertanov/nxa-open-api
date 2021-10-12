import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreateSmartContractNep11Dto } from "../dto/create.smart.contract.nep11.dto";
import { CreateSmartContractNep17Dto } from "../dto/create.smart.contract.nep17.dto";
import { CaasClient } from "./caas.client";
import { CaasTask } from "./types/caas.task";
import { CaasResult } from "./types/caas.task.result";

@Injectable()
export class SmartContractCompilerService {
    private readonly logger = new Logger(SmartContractCompilerService.name);

    constructor(
        private readonly caasClient: CaasClient
    ) {
    }

    async compileSource(source: string): Promise<CaasResult> {
        try {
            const task = new CaasTask(source);
            this.logger.debug(`Compiling ${task.contractSource}...`);
            const createResult = await this.caasClient.createCompilerTask(task);
            this.logger.debug(JSON.stringify(createResult));
            if (createResult.error) {
                throw new BadRequestException(createResult.error, 'Compilation error');
            }
            return createResult.result;
        } catch(e) {
            this.logger.error(`${e}, ${e.stack}`);
            throw e;
        }
    }

    async compileTokenNep17(dto: CreateSmartContractNep17Dto): Promise<CaasResult> {
        return undefined;
    }

    async compileNftNep11(dto: CreateSmartContractNep11Dto): Promise<CaasResult> {
        return undefined;
    }
}