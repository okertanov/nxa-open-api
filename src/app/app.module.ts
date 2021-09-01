import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GovernanceModule } from '../governance/governance.module';
import { AssetsModule } from '../assets/assets.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { ServiceStatusModule } from '../status/service.status.module';
import { TransactionModule } from '../transaction/transaction.module';
import { WalletModule } from '../wallet/wallet.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExplorerModule } from '../explorer/explorer.module';
import { MonitorModule } from '../monitor/monitor.module';
import { StatisticModule } from '../statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.API_DB_HOST,
      port: parseInt(process.env.API_DB_PORT as string, 10),
      database: process.env.API_DB_DATABASE,
      username: process.env.API_DB_USER,
      password: process.env.API_DB_PASSWORD,
      entities: [
        __dirname + '/../entity/*.entity.js',
      ],
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: true,
      retryAttempts: 100,
      retryDelay: 5000,
      'cli': {
        migrationsDir: 'src/migration',
      }
    }),
    ServiceStatusModule,
    BlockchainModule,
    TransactionModule,
    AssetsModule,
    WalletModule,
    GovernanceModule,
    ExplorerModule,
    MonitorModule,
    StatisticModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
