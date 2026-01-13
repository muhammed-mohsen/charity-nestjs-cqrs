import { Injectable } from '@nestjs/common';
import { Ledger } from './ledger';
import { LedgerRepository } from './ledger.repository';

@Injectable()
export class LedgerDomainService {
  constructor(private readonly repository: LedgerRepository) {}

  async findAll(): Promise<Ledger[]> {
    // TODO: implement domain logic
    return [];
  }
}
