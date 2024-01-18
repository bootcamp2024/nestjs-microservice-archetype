import { DomainEvent } from 'src/generic/domainevent';

export class TaskCreated extends DomainEvent {
  constructor(
    public id: number,
    public title: string,
    public description: string,
  ) {
    super('demo.taskcreated');
  }

  toSerialize(): string {
    return JSON.stringify(this);
  }
}

export interface Emmiter {
  sendMessage(message: TaskCreated): Promise<void>;
}
