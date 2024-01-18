import { ValueObject } from 'src/generic/valueobject';

export class Title implements ValueObject<string> {
  constructor(private readonly value: string) {
    if (value !== undefined) {
      if (value.length < 5) {
        throw new Error('The Title should be greater than 5 characters');
      }
    } else {
      throw new Error('The Title must be defined');
    }
  }
  get(): string {
    return this.value;
  }
}
