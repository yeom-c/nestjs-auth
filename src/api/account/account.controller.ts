import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { RegisterAccountDto } from './dto/register-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  register(@Body() registerAccountDto: RegisterAccountDto) {
    return this.accountService.register(registerAccountDto);
  }
}
