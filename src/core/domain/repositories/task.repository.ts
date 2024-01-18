import { Task } from '../entities/task.entity';
import { Description } from '../objects/description.vo';
import { Title } from '../objects/title.vo';

export interface TaskRepository {
  createTask(title: Title, description: Description): Promise<Task>;
}
