import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BecomePartnerDto } from './dto/become.partner.dto';
import { PartnerService } from './partner.service';

@ApiTags('Partner')
@Controller('/partner')
export class PartnerController {
    private readonly logger = new Logger(PartnerController.name);

    constructor(private readonly partnerService: PartnerService) {
    }

    @Post('')
    @ApiOperation({ summary: 'Become partner' })
    @ApiResponse({ status: 200, description: 'Become partner status', type: BecomePartnerDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postBecomePartner(
        @Req() req: Request,
        @Body() body: BecomePartnerDto
    ): Promise<BecomePartnerDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);
        return this.partnerService.registerBecomePartnerRequest(body);
    }
}
