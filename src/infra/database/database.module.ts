import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';
import { TypeOrmTaskRepository } from './typeormtask.repository';
import { Task } from 'src/core/domain/entities/task.entity';

const repositoriesFactory = [TypeOrmTaskRepository];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        databaseConfig(configService),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [...repositoriesFactory],
  exports: [...repositoriesFactory],
})
export class DatabaseModule {}
