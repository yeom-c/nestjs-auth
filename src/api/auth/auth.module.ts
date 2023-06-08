import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountRepository } from '../account/account.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccountRepository],
})
export class AuthModule {}
