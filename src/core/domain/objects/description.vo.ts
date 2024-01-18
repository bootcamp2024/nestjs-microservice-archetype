import { ValueObject } from 'src/generic/valueobject';

export class Description implements ValueObject<string> {
  constructor(private readonly value: string) {
    if (value !== undefined) {
      if (value.length < 5) {
        throw new Error('The Description should be greater than 10 characters');
      }
    } else {
      throw new Error('The Description must be defined');
    }
  }
  get(): string {
    return this.value;
  }
}
