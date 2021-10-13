import { ApiProperty } from "@nestjs/swagger";

export enum SearchRequestContext {
    global = 'global',
    profile = 'profile',
    explorer = 'explorer'
}

export class SearchRequestDto {
    @ApiProperty()
    term: string;

    @ApiProperty({ enum: SearchRequestContext })
    context: SearchRequestContext;
}
