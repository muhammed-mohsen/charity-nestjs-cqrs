import { Account } from '../model/account/account';

export abstract class AccountRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract findAll(): Promise<Account[]>;
  abstract getByMobileNumber(mobileNumber: string): Promise<Account | null>;
  abstract save(entity: Account): Promise<void>;
  abstract isAdmin(mobileNumber: string): boolean;
}
