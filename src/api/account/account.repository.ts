import { Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { DataSource, Repository } from 'typeorm';
import { RegisterAccountDto } from './dto/register-account.dto';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(private dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }

  async createAccount(data: RegisterAccountDto): Promise<Account> {
    return await this.save(this.create(data));
  }
}
