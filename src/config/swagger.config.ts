import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Demo Microservice')
  .setDescription(
    'Base microservice or archetype - edit in config/swagger.config.ts',
  )
  .setVersion('1.0.0')
  .build();
