import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ExplorerService } from './explorer.service';

@ApiTags('Explorer')
@Controller('/explorer')
export class ExplorerController {
    private readonly logger = new Logger(ExplorerController.name);

    constructor(private readonly explorerService: ExplorerService) {
    }
}