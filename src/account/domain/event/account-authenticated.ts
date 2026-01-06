import { IEvent } from '@nestjs/cqrs';
import { AccountId } from '../model/account/account-id';
import { Device } from '../model/device/device';

export class AccountAuthenticatedEvent implements IEvent {
  constructor(
    public readonly accountId: AccountId,
    public readonly device: Device,
  ) {}
}
