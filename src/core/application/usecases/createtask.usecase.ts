import { Description } from 'src/core/domain/objects/description.vo';
import { Title } from 'src/core/domain/objects/title.vo';
import { TaskRepository } from 'src/core/domain/repositories/task.repository';
import { UseCase } from 'src/generic/usecase';
import { Emmiter, TaskCreated } from '../services/reminder.service';

export interface Request {
  title: Title;
  description: Description;
}
export interface Response {
  id: number;
}

export class CreateTaskUseCase implements UseCase<Request, Response> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly service: Emmiter,
  ) {}

  execute(data: Request): Promise<Response> {
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
      });
  }
}
