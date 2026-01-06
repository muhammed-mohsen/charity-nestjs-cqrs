import {
  HttpStatus,
  Inject,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Pair } from '../../../../shared/domain/models/pair';
import { AccountFactory } from '../../../domain/account.factory';
import { AccountRepository } from '../../../domain/contracts/account.repository';
import { FirebaseAuthProvider } from '../../../domain/contracts/firebase-auth.provider';
import { JwtGenerator } from '../../../domain/contracts/jwt-generator';
import { Account } from '../../../domain/model/account/account';
import { InjectionToken } from '../../injection-token';
import { AuthenticateCommand } from './authenticate.command';

@CommandHandler(AuthenticateCommand)
export class AuthenticateHandler
  implements ICommandHandler<AuthenticateCommand>
{
  constructor(
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepository,
    @Inject(InjectionToken.FIREBASE_AUTH_PROVIDER)
    private readonly authProvider: FirebaseAuthProvider,
    @Inject(InjectionToken.JWT_GENERATOR)
    private readonly jwtGenerator: JwtGenerator,
    @Inject()
    private readonly accountFactory: AccountFactory,
  ) {}

  private readonly logger = new Logger(AuthenticateHandler.name);
  async execute(command: AuthenticateCommand): Promise<Pair<string, string>> {
    // Verify JWT token
    try {
      const mobileNumber = await this.authProvider.getVerifiedMobileNumber(
        command.idToken,
      );
      this.logger.log(`Mobile number verified: ${mobileNumber}`);
      const account = await this.existingAccountOrNewAccount(
        mobileNumber,
        command,
      );
      this.logger.log(`Authenticating account: ${account.mobileNumber}`);
      const tokens = account.authenticate(
        command.deviceId,
        command.deviceType,
        this.jwtGenerator,
      );
      await this.accountRepository.save(account);
      this.logger.log(
        `Authentication successful for account: ${account.mobileNumber}`,
      );
      return tokens;
    } catch (error) {
      this.logger.error(`Error authenticating account: ${error}`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `invalidHash`,
        },
      });
    }
  }

  private async existingAccountOrNewAccount(
    mobileNumber: string,
    command: AuthenticateCommand,
  ): Promise<Account> {
    const account =
      await this.accountRepository.getByMobileNumber(mobileNumber);
    this.logger.log(`Account found: ${account ? 'true' : 'false'}`);
    if (account) {
      return account;
    }
    return this.createNewAccount(mobileNumber, command);
  }
  private async createNewAccount(
    mobileNumber: string,
    command: AuthenticateCommand,
  ): Promise<Account> {
    const isAdmin = await this.accountRepository.isAdmin(mobileNumber);
    this.logger.log(`Is admin: ${isAdmin}`);
    const account = this.accountFactory.create({
      mobileNumber: mobileNumber,
      devices: [
        {
          deviceId: command.deviceId,
          deviceType: command.deviceType,
          refreshToken: '',
        },
      ],

      isAdmin: isAdmin,
    });
    account.registerAccount();
    // console.log(account.id.value, account.mobileNumber.value);
    await this.accountRepository.save(account); // persist first

    account.commit();
    return account;
  }
}
