import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { useCasesProvide } from '../../config/usecase.config';
import { DatabaseModule } from '../database/database.module';

import { LoggerInterceptor } from '../shared/interceptors/logger.interceptor';
import { ServiceModule } from '../service/service.module';
import { TodoListController } from './sync/todolist.controller';
import { ConsumerController } from './async/consumer.controller';

const controllersFactory = [TodoListController, ConsumerController];

@Module({
  imports: [DatabaseModule, ServiceModule],
  controllers: [...controllersFactory],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    ...useCasesProvide,
  ],
})
export class ControllerModule {}
