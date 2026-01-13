import { Controller, Get } from '@nestjs/common';

@Controller('account')
export class AccountController {
  // constructor(private readonly accountRepository: AccountRepository) {}

  @Get()
  async findAll() {
    // Delegate to domain service (or application layer)
    // return this.domainService.findAll();
  }
}
