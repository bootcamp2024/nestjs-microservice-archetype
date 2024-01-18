// config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

const databaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: configService.get<'postgres'>('TYPEORM_TYPE', 'postgres'),
    host: configService.get<string>('TYPEORM_HOST', 'localhost'),
    port: configService.get<number>('TYPEORM_PORT', 3306),
    username: configService.get<string>('TYPEORM_USERNAME', 'admin'),
    password: configService.get<string>('TYPEORM_PASSWORD', 'admin'),
    database: configService.get<string>('TYPEORM_DATABASE', 'demo'),
    entities: [
      process.env.TYPEORM_ENTITIES || __dirname + '/../core/**/*.entity.[tj]s',
    ],
    migrations: [
      process.env.TYPEORM_MIGRATIONS ||
        __dirname + '/../db/migration/**/*.[tj]s',
    ],
    synchronize: true,
  };
};

export default databaseConfig;
