import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthenticateCommand } from '../../application/command/authenticate/authenticate.command';
import { AuthenticateDto } from '../dto/authenticat.dto';

@Controller({
  path: 'accounts',
  version: '1',
})
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('authenticate')
  @HttpCode(HttpStatus.NO_CONTENT)
  async authenticate(@Body() authenticateDto: AuthenticateDto): Promise<void> {
    return this.commandBus.execute(
      new AuthenticateCommand(
        authenticateDto.idToken,
        authenticateDto.deviceId,
        authenticateDto.deviceType,
      ),
    );
  }
}
