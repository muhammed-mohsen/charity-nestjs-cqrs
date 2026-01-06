import { AccountProps } from '../../domain/model/account/account';

export interface AccountQuery {
  findById(id: string): Promise<AccountProps | null>;
  findByEmail(email: string): Promise<AccountProps | null>;
  isAdmin(email: string): Promise<boolean>;
  revoke(id: string): Promise<void>;
  isRevoked(id: string, tokenIssueDate: number): Promise<boolean>;
  findAll(): Promise<AccountProps[]>;
}
