import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AccountRepository } from '../account/account.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private accountRepository: AccountRepository) {}

  async login(loginAuthDto: LoginAuthDto) {
    // find account by email
    const account = await this.accountRepository.findOneBy({
      email: loginAuthDto.email,
    });

    // compare password
    const isValidPassword = await bcrypt.compare(
      loginAuthDto.password,
      account.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          errors: {
            password: '비밀번호 인증 실패',
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return '토큰 발급';
  }
}
