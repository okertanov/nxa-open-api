
import { Body, Controller, HttpCode, Logger, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SearchRequestDto } from './dto/search.request.dto';
import { SearchResultDto } from './dto/search.result.dto';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('/search')
export class SearchController {
    private readonly logger = new Logger(SearchController.name);

    constructor(private readonly searchService: SearchService) {
    }

    @Post('')
    @HttpCode(200)
    @ApiOperation({ summary: 'Search for Blocks and Transactions' })
    @ApiResponse({ status: 200, description: 'Search results', type: SearchResultDto, isArray: true })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async postFaucet(
        @Req() req: Request,
        @Body() body: SearchRequestDto
    ): Promise<SearchResultDto[]> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(body)}`);
        return this.searchService.search(body);
    }
}
