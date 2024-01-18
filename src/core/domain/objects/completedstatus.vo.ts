import { ValueObject } from 'src/generic/valueobject';

export enum Status {
  COMPLETED = 'COMPLETED',
  INCOMPLETED = 'INCOMPLETED',
}

export class CompletedStatus implements ValueObject<Status> {
  constructor(private readonly value: Status) {
    if (value !== undefined) {
    } else {
      throw new Error('The Status must be defined');
    }
  }

  get(): Status {
    return this.value;
  }
}
