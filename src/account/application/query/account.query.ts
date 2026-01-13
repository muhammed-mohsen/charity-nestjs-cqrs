import { Account } from '../../domain/model/account/account';
import { GetConnectionsResult } from './connections/get-connections.result';

export interface AccountQuery {
  findById(id: string): Promise<Account | null>;
  getConnections(userId: string): Promise<GetConnectionsResult>;
  findByIds(ids: string[]): Promise<Account[]>;
}
