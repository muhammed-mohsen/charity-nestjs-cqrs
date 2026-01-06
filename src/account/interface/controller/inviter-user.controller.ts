import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InvitationAccountCommand } from '../../application/command/invite-account/invitation-account.command';
import { InviteAccountDto } from '../dto/invite-account.dto';

@Controller({
  path: 'accounts',
  version: '1',
})
export class InviterUserController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('/invite')
  async invite(@Body() inviteDto: InviteAccountDto) {
    // For backward compatibility, use empty password and names if not provided
    return this.commandBus.execute(
      new InvitationAccountCommand(inviteDto.email, inviteDto.inviterId),
    );
    // return this.accountService.invite(inviteDto);
  }
}
