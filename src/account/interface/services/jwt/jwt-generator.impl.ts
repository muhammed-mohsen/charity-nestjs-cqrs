import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtGenerator } from '../../../domain/contracts/jwt-generator';
import { Account } from '../../../domain/model/account/account';
import { Device } from '../../../domain/model/device/device';
import { TokenMapper } from './tokent-mapper';

@Injectable()
export class JwtGeneratorImpl implements JwtGenerator {
  constructor(
    private readonly jwtService: JwtService,

    private readonly config: ConfigService,
  ) {}
  private readonly tokenMapper = new TokenMapper();

  generateAccessToken(account: Account, device: Device): string {
    const payload = this.tokenMapper.toAccessToken(account, device);
    return this.jwtService.sign(payload, {
      expiresIn: '5m',
      secret: this.config.get('AUTH_JWT_SECRET'),
    });
  }

  generateRefreshToken(account: Account, device: Device): string {
    const payload = this.tokenMapper.toRefreshToken(account, device);
    return this.jwtService.sign(payload, {
      expiresIn: '1y',
      secret: this.config.get('AUTH_JWT_SECRET'),
    });
  }
}
