import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { Account } from './entities/account.entity';
import { Min } from 'class-validator';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  register(@Body() registerAccountDto: RegisterAccountDto) {
    return this.accountService.register(registerAccountDto);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
    @Query('filter') filter: string,
    @Query('order') order: string,
  ): Promise<{ accounts: Account[]; total: number }> {
    page = page < 1 ? 1 : page;
    limit = limit > 100 ? 100 : limit;

    const { accounts, total } = await this.accountService.findAllWithQuery(
      filter,
      order,
      page,
      limit,
    );
    return { accounts, total };
  }
}
