export class CaasTask {
    contractSource: string;

    contractCompileOptions: string[];

    systemOwnerAddress?: string;
    contractAuthorAddress?: string;
    contractAuthorName?: string;
    contractAuthorEmail?: string;
    contractName?: string;
    contractDescription?: string;
    contractSymbol?: string;
    contractFactor?: string;
    contractDecimals?: string;

    constructor(contractSource: string, contractCompileOptions?: string[], contractTemplateOptions?: any) {
        this.contractSource = contractSource;
        this.contractCompileOptions = contractCompileOptions ?? [];

        this.systemOwnerAddress = contractTemplateOptions?.systemOwnerAddress;
        this.contractAuthorAddress = contractTemplateOptions?.contractAuthorAddress;
        this.contractAuthorName = contractTemplateOptions?.contractAuthorName;
        this.contractAuthorEmail = contractTemplateOptions?.contractAuthorEmail;
        this.contractName = contractTemplateOptions?.contractName;
        this.contractDescription = contractTemplateOptions?.contractDescription;
        this.contractSymbol = contractTemplateOptions?.contractSymbol;
        this.contractFactor = contractTemplateOptions?.contractFactor;
        this.contractDecimals = contractTemplateOptions?.contractDecimals;
    }
}