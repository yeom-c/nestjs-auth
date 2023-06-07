import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: configService.get('NODE_ENV') == 'prod' ? false : true,
    logging: configService.get('NODE_ENV') == 'prod' ? false : true,
    namingStrategy: new SnakeNamingStrategy(),
  }),
  inject: [ConfigService],
};
