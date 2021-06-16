import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceStatusModule } from '../status/service.status.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    ServiceStatusModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
