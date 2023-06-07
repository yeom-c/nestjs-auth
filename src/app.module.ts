import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env/validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/env/.${process.env.NODE_ENV}.env`,
      cache: true,
      isGlobal: true,
      validationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
