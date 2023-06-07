import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env/validation.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.cofing';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/env/.${process.env.NODE_ENV}.env`,
      cache: true,
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
