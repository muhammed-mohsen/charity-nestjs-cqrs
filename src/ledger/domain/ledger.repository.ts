import { Ledger } from './ledger';

export  interface LedgerRepository {
  findById(id: string): Promise<Ledger | null>;
  findAll(): Promise<Ledger[]>;
  save(entity: Ledger): Promise<void>;
}
