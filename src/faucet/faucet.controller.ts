import { Request } from 'express';
import { Body, Controller, Logger, Post, Req } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransactionStatusDto } from "../transaction/dto/transaction.status.dto";
import { FaucetRequestDto } from "./dto/faucet.request.dto";
import { FaucetService } from "./faucet.service";

@ApiTags('Faucet')
@Controller('/faucet')
export class FaucetController {
    private readonly logger = new Logger(FaucetController.name);

    constructor(private readonly faucetService: FaucetService) {
    }

    @Post('')
    @ApiOperation({ summary: 'Get funds via faucet' })
    @ApiResponse({ status: 200, description: 'TX statuses (both DVITA & DVG)', type: TransactionStatusDto, isArray: true })
    @ApiResponse({ status: 400, description: 'Bad Request', type: TransactionStatusDto, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postFaucet(
        @Req() req: Request,
        @Body() body: FaucetRequestDto
    ): Promise<TransactionStatusDto[]> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);
        return this.faucetService.depositAddress(body.address);
    }
}