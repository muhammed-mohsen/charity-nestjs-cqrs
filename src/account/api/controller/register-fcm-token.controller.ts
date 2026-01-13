import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthRequest } from "../../../shared/types/auth-request";
import { RegisterFCMTokenCommand } from "../../application/command/register-fcm-token/register-fcm-token.command";
import { RegisterFCMTokenDto } from "../dto/register-fcm-token.dto";

@Controller({
  path: 'accounts',
  version: '1',
})
export class RegisterFCMTokenController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register-fcm-token')
  @ApiBearerAuth()  
  @UseGuards(AuthGuard('jwt'))
async registerFCMToken(@Request() request: AuthRequest, @Body() registerFCMTokenDto: RegisterFCMTokenDto) {
    return this.commandBus.execute(new RegisterFCMTokenCommand(request.user.id, request.user.deviceId, registerFCMTokenDto.fcmToken));
  }
}