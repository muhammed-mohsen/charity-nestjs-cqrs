import { Inject, Logger, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AccountRepository } from "../../../domain/contracts/account.repository";
import { JwtGenerator } from "../../../domain/contracts/jwt-generator";
import { InjectionToken } from "../../injection-token";
import { RefreshTokenCommand } from "./refresh-token.command";

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  private readonly logger = new Logger(RefreshTokenHandler.name);
  constructor(
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepository,
    @Inject(InjectionToken.JWT_GENERATOR)
    private readonly jwtGenerator: JwtGenerator,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<string> {

    const account = await this.accountRepository.findById(command.accountId);
    if (!account) {
      this.logger.error(`RefreshTokenHandler: Account not found for accountId: ${command.accountId}`);
      throw new UnauthorizedException('Unauthorized access.');
    }

    const accessToken = account.refreshAccessToken(command.deviceId, command.encodedRefreshToken, this.jwtGenerator);
    return accessToken;
  }
}