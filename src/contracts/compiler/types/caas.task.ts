export enum CompilerTaskType {
    CSHARP = 'CSHARP',
    SOLIDITY = 'SOLIDITY'
}

export class CaasTask {
    readonly compilerTaskType: CompilerTaskType;
    readonly contractSource: string;
    readonly contractCompileOptions: string[];
    readonly contractValues: {[key: string]: any};

    constructor(
        compilerTaskType: CompilerTaskType,
        contractSource: string,
        contractValues: {[key: string]: any},
        contractCompileOptions?: string[],
    ) {
        this.compilerTaskType = compilerTaskType;
        this.contractSource = contractSource;
        this.contractValues = contractValues;
        this.contractCompileOptions = contractCompileOptions ?? [];
    }
}