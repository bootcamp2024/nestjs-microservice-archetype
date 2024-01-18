export abstract class DomainEvent {
  type: string;
  timestamp: string;

  constructor(type: string, timestamp: string = new Date().toISOString()) {
    this.type = type;
    this.timestamp = timestamp;
  }

  abstract toSerialize(): string;
}
