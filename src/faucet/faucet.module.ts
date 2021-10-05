import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FaucetActivityRepository } from "../repository/faucet.activity.repository";
import { BlockchainModule } from "../blockchain/blockchain.module";
import { FaucetController } from "./faucet.controller";
import { FaucetService } from "./faucet.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([FaucetActivityRepository]),
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