import { Inject, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AccountRepository } from "../../../domain/contracts/account.repository";
import { InjectionToken } from "../../injection-token";
import { RegisterFCMTokenCommand } from "./register-fcm-token.command";

@CommandHandler(RegisterFCMTokenCommand)
export class RegisterFCMTokenHandler implements ICommandHandler<RegisterFCMTokenCommand> {
  constructor(
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(command: RegisterFCMTokenCommand): Promise<void> {
    const account = await this.accountRepository.findById(command.accountId);
    if (!account) {
      throw new UnauthorizedException('Account not found');
    }
    account.registerFCMToken(command.deviceId, command.fcmToken);
    await this.accountRepository.save(account);
  }
}