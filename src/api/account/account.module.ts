import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
