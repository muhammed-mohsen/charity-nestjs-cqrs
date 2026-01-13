import { Ledger } from './ledger';

export class LedgerFactory {
  static create(props: { id: string /* TODO: add other props */ }): Ledger {
    // TODO: add invariants, validation, etc.
    return new Ledger(props.id);
  }
}
