import { Module } from '@nestjs/common';
import { ExplorerController } from './explorer.controller';
import { ExplorerService } from './explorer.service';

@Module({
    imports: [
    ],
    controllers: [ExplorerController],
    providers: [ExplorerService],
    exports: [ExplorerService]
})
export class ExplorerModule {
}
