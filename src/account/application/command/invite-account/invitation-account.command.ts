import { ICommand } from '@nestjs/cqrs';

export class InvitationAccountCommand implements ICommand {
  constructor(
    public readonly invitedMobileNumber: string,
    public readonly inviterId: string,
  ) {}
}
