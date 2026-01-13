import {
  HttpStatus,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from '../../../domain/contracts/account.repository';
import { InvitationRepository } from '../../../domain/contracts/invitation.repository';
import { Invitation } from '../../../domain/model/invitation/invitation';
import { InjectionToken } from '../../injection-token';
import { InvitationAccountCommand } from './invitation-account.command';

@CommandHandler(InvitationAccountCommand)
export class InvitationAccountHandler
  implements ICommandHandler<InvitationAccountCommand>
{
  constructor(
    @Inject(InjectionToken.INVITATION_REPOSITORY)
    private readonly invitationRepository: InvitationRepository,
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(command: InvitationAccountCommand): Promise<void> {
    const { invitedMobileNumber, inviterId } = command;

    // 1) Application rule: check if already invited (needs repo)
    const hasInvitation = await this.invitationRepository.hasInvitation(
      invitedMobileNumber,
      inviterId,
    );

    if (hasInvitation) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          invitedMobileNumber: 'already invited',
        },
      });
    }

    const invitation = Invitation.create(invitedMobileNumber, inviterId);
    await this.invitationRepository.save(invitation);
  }
}
