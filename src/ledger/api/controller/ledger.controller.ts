import { Controller, Get } from '@nestjs/common';
import { LedgerDomainService } from '../../domain/ledger-domain.service';

@Controller('ledger')
export class LedgerController {
  constructor(private readonly domainService: LedgerDomainService) {}

  @Get()
  async findAll() {
    // Delegate to domain service (or application layer)
    return this.domainService.findAll();
  }
}
