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
    const persistenceSchema = new AccountSchemaClass();
    if (domain.devices.length > 0) {
      persistenceSchema.devices;
      persistenceSchema.devices = domain.devices.map((device) => {
        return {
          deviceId: device.deviceId.value,
          deviceType: device.deviceType.value,
          refreshToken: device.refreshToken?.value ?? '',
          fcmToken: device.fcmToken?.value ?? '',
          lastAccessTime: device.lastAccessTime,
        };
      });
    }
    persistenceSchema._id = domain.id.value;
    persistenceSchema.mobileNumber = domain.mobileNumber.value;
    persistenceSchema.fullName = domain.fullName?.value ?? '';
    persistenceSchema.photoUrl = domain.photoUrl?.value ?? '';
    persistenceSchema.blocked = domain.blocked;
    persistenceSchema.permissions = domain.permissions;
    return persistenceSchema;
  }
}
