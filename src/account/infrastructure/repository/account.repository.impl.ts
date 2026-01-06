import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AllConfigType } from '../../../config/config.type';
import { AccountRepository } from '../../domain/contracts/account.repository';
import { Account } from '../../domain/model/account/account';
import {
  AccountSchemaClass,
  AccountSchemaDocument,
} from '../entity/account.entity';
import { DomainAccountMapper } from '../mappers/domain-account.mapper';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(
    @InjectModel(AccountSchemaClass.name, 'write')
    private readonly writeAccountModel: Model<AccountSchemaDocument>,

    private readonly config: ConfigService<AllConfigType>,

    private readonly mapper: DomainAccountMapper,
  ) {}

  async findById(id: string): Promise<Account | null> {
    const doc = await this.writeAccountModel.findById(id).exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }
  async getByMobileNumber(mobileNumber: string): Promise<Account | null> {
    const doc = await this.writeAccountModel.findOne({ mobileNumber }).exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }
  isAdmin(mobileNumber: string): boolean {
    return (
      this.config.get('app.admins', { infer: true })?.includes(mobileNumber) ??
      false
    );
  }
  async save(entity: Account): Promise<void> {
    const raw = this.mapper.toPersistence(entity);
    await this.writeAccountModel
      .updateOne({ id: raw.id }, { $set: raw }, { upsert: true })
      .exec();
  }

  async findAll(): Promise<Account[]> {
    const docs = await this.writeAccountModel.find().exec();
    return docs.map((doc) => this.mapper.toDomain(doc));
  }
}
