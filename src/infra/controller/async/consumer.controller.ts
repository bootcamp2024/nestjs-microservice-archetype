import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskCreated } from 'src/core/application/services/reminder.service';

@Controller()
export class ConsumerController {
  @MessagePattern('notification-topic')
  async handleMessage(@Payload() event: TaskCreated): Promise<void> {
    console.log(event); //process
  }
}
