import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RefreshTokenCommand } from "../../application/command/refresh-token/refresh-token.command";
import { AuthRequest } from "../../../shared/types/auth-request";

@Controller({
  path: 'accounts',
  version: '1',
})
export class RefreshTokenController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('refresh-token')
  @ApiBearerAuth()  
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Request() request: AuthRequest): Promise<string> {
    const encodedRefreshToken = request.headers['authorization'].split(' ')[1];
    const userId = request.user.id;
    const deviceId = request.user.deviceId;
    return await this.commandBus.execute(
      new RefreshTokenCommand(encodedRefreshToken, userId, deviceId),
    );
  }
}