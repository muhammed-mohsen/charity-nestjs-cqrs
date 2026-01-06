import { ICommand } from '@nestjs/cqrs';

export class AuthenticateCommand implements ICommand {
  constructor(
    public readonly idToken: string,
    public readonly deviceId: string,
    public readonly deviceType: string,
  ) {}
}
