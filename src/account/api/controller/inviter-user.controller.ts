import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthRequest } from '../../../shared/types/auth-request';
import { InvitationAccountCommand } from '../../application/command/invite-account/invitation-account.command';
import { InviteAccountDto } from '../dto/invite-account.dto';

@Controller({
  path: 'accounts',
  version: '1',
})
export class InviterUserController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('/invite')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async invite(@Body() inviteDto: InviteAccountDto, @Request() req: AuthRequest) {
    // For backward compatibility, use empty password and names if not provided
    return this.commandBus.execute(
      new InvitationAccountCommand(inviteDto.mobileNumber, req.user.id),
    );
    // return this.accountService.invite(inviteDto);
  }
}
