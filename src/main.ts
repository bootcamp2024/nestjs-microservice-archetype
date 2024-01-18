import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import brokerConfig from './config/broker.config';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger.config';
import { BusinessExceptionFilter } from './infra/shared/filters/business-exception.filter';
import { IllegalValueExceptionFilter } from './infra/shared/filters/illegar-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableShutdownHooks();
  const configService = app.get(ConfigService);

  const kafkaOptions = await brokerConfig(configService);
  app.connectMicroservice(kafkaOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix(process.env.BASE_PATH || '');
  app.useGlobalFilters(
    new BusinessExceptionFilter(),
    new IllegalValueExceptionFilter(),
  );

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.startAllMicroservices();
  await app.listen(process.env.SERVICE_PORT || 3000, '0.0.0.0');
}

bootstrap();
