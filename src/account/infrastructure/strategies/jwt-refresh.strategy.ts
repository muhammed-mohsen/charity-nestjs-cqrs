import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AllConfigType } from '../../../config/config.type';
import { OrNeverType } from '../../../shared/types/or-never.type';
import { JwtRefreshPayloadType } from './types/jwt-refresh-payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('auth.refreshSecret', { infer: true }),
    });
  }

  public validate(
    payload: JwtRefreshPayloadType,
  ): OrNeverType<JwtRefreshPayloadType> {
    if (!payload.id || !payload.deviceId) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.id,
      deviceId: payload.deviceId,
      deviceType: payload.deviceType,
      permissions: payload.permissions,
      mobileNumber: payload.mobileNumber,
      iat: payload.iat,
      exp: payload.exp,
    };
  }
}
