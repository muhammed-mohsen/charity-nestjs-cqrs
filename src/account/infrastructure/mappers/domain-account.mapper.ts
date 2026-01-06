import { Injectable } from '@nestjs/common';
import { AccountFactory } from '../../domain/account.factory';
import { Account } from '../../domain/model/account/account';
import { AccountSchemaClass } from '../entity/account.entity';

@Injectable()
export class DomainAccountMapper {
  constructor(private readonly accountFactory: AccountFactory) {}
  toDomain(raw: AccountSchemaClass): Account {
    return this.accountFactory.reconstitute(raw);
  }

  toPersistence(domain: Account): AccountSchemaClass {
    console.log('🚀 ~ DomainAccountMapper ~ toPersistence ~ domain:', domain);
    return new AccountSchemaClass();
  }
}
