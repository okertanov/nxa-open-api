import { ApiProperty } from "@nestjs/swagger";
import { SearchRequestContext } from "./search.request.dto";

export enum SearchResultArea {
    block = 'block',
    tx = 'tx',
    address = 'address',
    contract = 'contract'
}

export class SearchResultDto {
    @ApiProperty()
    term: string;

    @ApiProperty({ enum: SearchRequestContext })
    context: SearchRequestContext;

    @ApiProperty()
    entity: string;

    @ApiProperty({ enum: SearchResultArea })
    area: SearchResultArea;

    constructor(
        term: string,
        context: SearchRequestContext,
        entity: string,
        area: SearchResultArea
    ) {
        this.term = term;
        this.context = context;
        this.entity = entity;
        this.area = area;
    }
}
