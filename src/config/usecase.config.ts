import { CreateTaskUseCase } from 'src/core/application/usecases/createtask.usecase';
import { UseCasesProviderBuilder } from 'src/generic/usecase.builder';
import { TypeOrmTaskRepository } from 'src/infra/database/typeormtask.repository';
import { KafkaReminderService } from 'src/infra/service/kafkaemmiter.service';

export const useCasesProvide = new UseCasesProviderBuilder()
  .addUseCase(CreateTaskUseCase, TypeOrmTaskRepository, KafkaReminderService)
  .build();
