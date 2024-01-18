import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskRepository } from 'src/core/domain/repositories/task.repository';
import { Task } from 'src/core/domain/entities/task.entity';
import { Title } from 'src/core/domain/objects/title.vo';
import { Description } from 'src/core/domain/objects/description.vo';

@Injectable()
export class TypeOrmTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(title: Title, description: Description): Promise<Task> {
    const newTask = this.taskRepository.create({
      title: title.get(),
      description: description.get(),
    });
    return await this.taskRepository.save(newTask);
  }
}
