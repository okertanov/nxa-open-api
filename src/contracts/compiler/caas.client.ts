import { HttpService, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CaasStatus } from "./types/caas.status";
import { CaasTask } from "./types/caas.task";
import { CaasTaskResult } from "./types/caas.task.result";
import { CaasVersion } from "./types/caas.version";

@Injectable()
export class CaasClient implements OnApplicationBootstrap {
    private readonly logger = new Logger(CaasClient.name);
    private readonly caasApiBaseUrl: string;
    private readonly caasApiToken: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
        this.caasApiBaseUrl = this.configService.get<string>('CAAS_API_BASE_URL');
        this.caasApiToken = this.configService.get<string>('CAAS_API_TOKEN');
    }

    async onApplicationBootstrap(): Promise<any> {
        try {
            this.logger.debug(`Using '${this.caasApiBaseUrl}' with '${this.caasApiToken}'`);
            const version = await this.getVersion();
            const status = await this.getStatus();
            this.logger.debug(`Version: ${JSON.stringify(version)}, Status: ${JSON.stringify(status)}`);
        } catch(e) {
            this.logger.error(e, e.stack);
        }
    }

    async getStatus(): Promise<CaasStatus> {
        const response = await this.httpService.get<CaasStatus>(`${this.caasApiBaseUrl}/Status`).toPromise();
        return response.data;
    }

    async getVersion(): Promise<CaasVersion> {
        const options = { headers: { 'Token': this.caasApiToken } };
        const response = await this.httpService.get<CaasVersion>(`${this.caasApiBaseUrl}/Version`, options).toPromise();
        return response.data;
    }

    async createCompilerTask(task: CaasTask): Promise<CaasTaskResult> {
        const options = { headers: { 'Token': this.caasApiToken } };
        const response = await this.httpService.put<CaasTaskResult>(`${this.caasApiBaseUrl}/Compiler`, task, options).toPromise();
        return response.data;
    }
}