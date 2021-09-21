import { Module } from "@nestjs/common";
import { BlockchainModule } from "../blockchain/blockchain.module";
import { FaucetController } from "./faucet.controller";
import { FaucetService } from "./faucet.service";

@Module({
    imports: [
        BlockchainModule
    ],
    controllers: [
        FaucetController
    ],
    providers: [
        FaucetService
    ],
})
export class FaucetModule {
}