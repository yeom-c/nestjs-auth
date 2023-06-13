import { Injectable } from '@nestjs/common';
import { RegisterAccountDto } from './dto/register-account.dto';
import { AccountRepository } from '../../repository/account.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async register(registerAccountDto: RegisterAccountDto) {
    // bcrypt hashed password
    const salt = await bcrypt.genSalt();
    registerAccountDto.password = await bcrypt.hash(
      registerAccountDto.password,
      salt,
    );

    const account = await this.accountRepository.createAccount(
      registerAccountDto,
    );

    return account;
  }

  // TODO: filter, order 구현.
  async findAllWithQuery(
    filter: string,
    order: string,
    page: number,
    limit: number,
  ) {
    const [accounts, total] = await this.accountRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { accounts, total };
  }
}
