import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountQuery } from '../../application/query/account.query';
import { GetConnectionsResult } from '../../application/query/connections/get-connections.result';
import { Account } from '../../domain/model/account/account';
import {
  AccountSchemaClass,
  AccountSchemaDocument,
} from '../entity/account.entity';
import { DomainAccountMapper } from '../mappers/domain-account.mapper';

export class AccountQueryImpl implements AccountQuery {
  constructor(
    @InjectModel(AccountSchemaClass.name, 'read')
    private readonly readAccountModel: Model<AccountSchemaDocument>,
    private readonly mapper: DomainAccountMapper,
  ) {}

  async findById(id: string): Promise<Account | null> {
    const account = await this.readAccountModel.findById(id).exec();
    return account ? this.mapper.toDomain(account) : null;
  }
  async findByIds(ids: string[]): Promise<Account[]> {
    const accounts = await this.readAccountModel
      .find({ _id: { $in: ids } })
      .exec();
    return accounts.map((account) => this.mapper.toDomain(account));
  }

  async getConnections(userId: string): Promise<GetConnectionsResult> {
    const accounts = await this.readAccountModel
      .find({ connections: { $elemMatch: { userId } } })
      .exec();
    const domainAccounts = accounts.map((account) =>
      this.mapper.toDomain(account),
    );
    return domainAccounts.map((account) => ({
      id: account.id.value,
      fullName: account.fullName?.value ?? '',
      photoUrl: account.photoUrl?.value ?? '',
      permissions: account.permissions,
    }));
  }
}
