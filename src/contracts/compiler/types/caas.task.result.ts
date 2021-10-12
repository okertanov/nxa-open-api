import { CaasTask } from "./caas.task";

export class CaasResult {
    nefScript: string;
    nefImage: string;
    nefScriptBase64: string;
    nefImageBase64: string;
    manifest: string;
}

export class CaasError {
    file: string;
    line: number;
    code: string;
    messsage: string;
    trace: string;
}

export class CaasTaskResult {
    identifier: string;
    status: number;
    create: CaasTask;
    result: CaasResult;
    error: CaasError;
}