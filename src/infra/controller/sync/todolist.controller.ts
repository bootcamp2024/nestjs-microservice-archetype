import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTaskUseCase,
  Response,
} from 'src/core/application/usecases/createtask.usecase';
import { Title } from 'src/core/domain/objects/title.vo';
import { TaskDto } from '../todolist.dto';
import { Description } from 'src/core/domain/objects/description.vo';

@Controller('todolist')
@ApiTags('Todo List')
export class TodoListController {
  constructor(
    @Inject('CreateTaskUseCase')
    private readonly createTaskUseCase: CreateTaskUseCase,
  ) {}

  @ApiOperation({ summary: 'Creation a new task' })
  @ApiCreatedResponse({
    description: 'The creation task has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('create')
  async create(@Body() body: TaskDto): Promise<Response> {
    return this.createTaskUseCase.execute({
      title: new Title(body.title),
      description: new Description(body.description),
    });
  }
}
