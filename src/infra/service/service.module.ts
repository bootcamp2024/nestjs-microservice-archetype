import { Module } from '@nestjs/common';
import { KafkaReminderService } from './kafkaemmiter.service';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import brokerConfig from 'src/config/broker.config';
import { ConfigService } from '@nestjs/config';

const servicesFactory = [KafkaReminderService];

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return brokerConfig(configService);
        },
      },
    ]),
  ],
  providers: [ClientKafka, ...servicesFactory],
  exports: [...servicesFactory],
})
export class ServiceModule {}
