export class CaasTask {
    systemOwnerAddress?: string;
    contractAuthorAddress?: string;
    contractAuthorName?: string;
    contractAuthorEmail?: string;
    contractName?: string;
    contractDescription?: string;
    contractSymbol?: string;
    contractFactor?: string;
    contractDecimals?: string;
    
    contractSource: string;
    contractCompileOptions: string[];

    constructor(contractSource: string, contractCompileOptions?: string[]) {
        this.contractSource = contractSource;
        this.contractCompileOptions = contractCompileOptions ?? [];
        this.systemOwnerAddress = '0x00';
        this.contractAuthorAddress = '0x00';
        this.contractAuthorName = 'me';
        this.contractAuthorEmail = 'me@me.me';
        this.contractName = 'test1';
        this.contractDescription = 'descr';
        this.contractSymbol = 'T111';
        this.contractFactor = '0';
        this.contractDecimals = '0';
    }
}