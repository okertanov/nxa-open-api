import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import * as fs from 'fs';
import { CreateSmartContractNep11Dto } from "../dto/create.smart.contract.nep11.dto";
import { CreateSmartContractNep17Dto } from "../dto/create.smart.contract.nep17.dto";
import { CaasClient } from "./caas.client";
import { CaasTask } from "./types/caas.task";
import { CaasResult } from "./types/caas.task.result";

@Injectable()
export class SmartContractCompilerService {
    private readonly logger = new Logger(SmartContractCompilerService.name);

    private nep17Template = undefined;
    private nep11Template = undefined;

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
        try {
            const source = this.getNep17TemplateSrc();
            const task = new CaasTask(source, [], {
                contractSource: source,
                contractCompileOptions: [''],
                systemOwnerAddress: dto.ownerAddress,
                contractAuthorAddress: dto.ownerAddress,
                contractAuthorName: 'Team11',
                contractAuthorEmail: 'info@dvita.com',
                contractName: dto.name,
                contractSymbol: dto.symbol,
                contractDescription: dto.description,
                contractDecimals: dto.decimals.toString(),
                contractInitialCoins: dto.initial.toString()
            });
            this.logger.debug(`Compiling ${JSON.stringify(task).substring(0, 64)}...`);
            const createResult = await this.caasClient.createCompilerTask(task);
            this.logger.debug(JSON.stringify(createResult));
            if (createResult.error) {
                this.logger.error(createResult.error);
                throw new BadRequestException(createResult.error, 'Compilation error');
            }
            return createResult.result;
        } catch(e) {
            this.logger.error(`${e}, ${e.stack}`);
            throw e;
        }
    }

    async compileNftNep11(dto: CreateSmartContractNep11Dto): Promise<CaasResult> {
        try {
            const source = this.getNep11TemplateSrc();
            const task = new CaasTask(source, [], {
                contractSource: source,
                contractCompileOptions: [''],
                systemOwnerAddress: dto.ownerAddress,
                contractAuthorAddress: dto.ownerAddress,
                contractAuthorName: 'Team11',
                contractAuthorEmail: 'info@dvita.com',
                contractName: dto.name,
                contractSymbol: dto.symbol,
                contractDescription: dto.description,
                contractDecimals: '0',
                contractInitialCoins: '0'
            });
            this.logger.debug(`Compiling ${JSON.stringify(task).substring(0, 64)}...`);
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

    private getNep17TemplateSrc(): string {
        if (!this.nep17Template) {
            this.nep17Template = this.getScTemplateSrc('nep17.template.cs');
        }
        return this.nep17Template;
    }

    private getNep11TemplateSrc(): string {
        if (!this.nep11Template) {
            this.nep11Template = this.getScTemplateSrc('nep11.template.cs');
        }
        return this.nep11Template;
    }

    private getScTemplateSrc(name: string, base64: boolean = true): string {
        const templateFilePath = `${__dirname}/templates/${name}`;
        
        if (!fs.existsSync(templateFilePath)) {
            throw Error('Template file not exists');
        }
        
        const templateFileSrc = fs.readFileSync(templateFilePath, { encoding: 'utf8' });
        
        if (!base64) {
            return templateFileSrc;
        }

        const templateFileSrcBase64 = Buffer.from(templateFileSrc).toString('base64');

        return templateFileSrcBase64;
    }
}

/*
  PSPFive PSP5 0x2478be91899b13bc02b6adf01c060aacb7ace50a
  scriptHash: '0x2478be91899b13bc02b6adf01c060aacb7ace50a',
  address: 'NLub5kVLQoMQTw8SgrB2syWWNySMy7g7wN',
  sent: '0xb1569a58e6a00cee281796d8a868d6373a8978d78cd87865a9379fd91385d747'

  Block Hash 0x14eb80e11b8fdbe2f2fa57b38d40f4166ef1029046a9ed721fe07fd21447bced
  TX Hash 0xb1569a58e6a00cee281796d8a868d6373a8978d78cd87865a9379fd91385d747
*/