// config.ts
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

const brokerConfig = async (
  configService: ConfigService,
): Promise<KafkaOptions> => {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: configService
          .getOrThrow<string>('KAFKA_URLS', 'localhost:9091')
          .split(','),
      },
      producerOnlyMode: true,
      consumer: {
        groupId: configService.get<string>(
          'KAFKA_GROUP_ID',
          'microservice-demo',
        ),
      },
    },
  };
};

export default brokerConfig;
