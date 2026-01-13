import { LedgerRepository } from '../../domain/ledger.repository';
import { Ledger } from '../../domain/ledger';

/**
 * Example infrastructure implementation of the domain repository.
 * This is wired in the module as:
 * { provide: LedgerRepository, useClass: LedgerRepositoryImpl }
 */
export class LedgerRepositoryImpl implements LedgerRepository {
  async findById(id: string): Promise<Ledger | null> {
    // TODO: implement using ORM
    return null;
  }

  async findAll(): Promise<Ledger[]> {
    // TODO: implement using ORM
    return [];
  }

  async save(entity: Ledger): Promise<void> {
    // TODO: implement using ORM
  }
}
