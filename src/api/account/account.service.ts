import { Injectable } from '@nestjs/common';
import { RegisterAccountDto } from './dto/register-account.dto';
import { AccountRepository } from './account.repository';
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
}