export class IllegalValueException extends Error {
  constructor(
    public type: string,
    public message: string,
  ) {
    super(message);
  }
}
