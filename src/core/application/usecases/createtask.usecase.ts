import { Description } from 'src/core/domain/objects/description.vo';
import { Title } from 'src/core/domain/objects/title.vo';
import { TaskRepository } from 'src/core/domain/repositories/task.repository';
import { UseCase } from 'src/generic/usecase';
import { Emmiter, TaskCreated } from '../services/reminder.service';
import { BusinessException } from 'src/generic/businessexception';

export interface CreateTaskRequest {
  title: Title;
  description: Description;
}
export interface CreateTaskResponse {
  id: number;
}
export class CreateTaskException extends BusinessException {}

export class CreateTaskUseCase
  implements UseCase<CreateTaskRequest, CreateTaskResponse>
{
  constructor(
    private readonly repository: TaskRepository,
    private readonly service: Emmiter,
  ) {}

  execute(data: CreateTaskRequest): Promise<CreateTaskResponse> {
    return this.repository
      .createTask(data.title, data.description)
      .then((result) => ({
        id: result.id,
      }))
      .then((response) => {
        this.service.sendMessage(
          new TaskCreated(
            response.id,
            data.title.get(),
            data.description.get(),
          ),
        );
        return response;
      })
      .catch((error) => {
        throw new CreateTaskException(400, 'Could not save task', error);
      });
  }
}
