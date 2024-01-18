import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  Emmiter,
  TaskCreated,
} from 'src/core/application/services/reminder.service';

@Injectable()
export class KafkaReminderService implements Emmiter {
  private readonly TOPIC: string = 'notification-topic';

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async sendMessage(message: TaskCreated): Promise<void> {
    await lastValueFrom(
      this.kafkaClient.emit(this.TOPIC, message.toSerialize()),
    );
  }
}
