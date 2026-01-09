import { IEvent } from '@nestjs/cqrs';
export class AccountCreated implements IEvent {
  constructor(
    public readonly accountId: string,
    public readonly mobileNumber: string,
  ) {}
}
