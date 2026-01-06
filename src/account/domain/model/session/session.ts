import { AggregateRoot } from '@nestjs/cqrs';
import { Account } from '../account/account';
import { SessionId } from './session-id';

export type SessionEssentialProps = {
  id: SessionId;
  account: Account;
  hash: string;
};
export type SessionOptionalProps = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
export type SessionProps = SessionEssentialProps & SessionOptionalProps;

export class Session extends AggregateRoot {
  private constructor(
    private readonly _id: SessionId,
    private readonly _hash: string,
    private readonly _account: Account,
  ) {
    super();
  }
  static create(id: SessionId, hash: string, account: Account): Session {
    const _id = SessionId.generate();
    return new Session(_id, hash, account);
  }
  get id(): SessionId {
    return this._id;
  }
  get hash(): string {
    return this._hash;
  }
  get account(): Account {
    return this._account;
  }
}
