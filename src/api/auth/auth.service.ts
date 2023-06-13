import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AccountRepository } from '../../repository/account.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

    // create jwt token
    const jwtPayload = { id: account.id, name: account.name };
    const jwtAccessToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}m`,
    });
    const jwtRefreshToken = this.jwtService.sign(null, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}m`,
    });

    this.accountRepository.update(account.id, {
      refreshToken: jwtRefreshToken,
    });

    return { access_token: jwtAccessToken, refresh_token: jwtRefreshToken };
  }
}
