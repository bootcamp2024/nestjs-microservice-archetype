export class BusinessException extends Error {
  timestamp: string;

  constructor(
    public code: number,
    public reasons: string,
    public error: Error,
    timestamp: string = new Date().toISOString(),
  ) {
    super(error.message);
    this.timestamp = timestamp;
  }
}
