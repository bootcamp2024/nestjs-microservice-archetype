import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllerModule } from './infra/controller/controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Cargar variables de entorno
    ControllerModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
