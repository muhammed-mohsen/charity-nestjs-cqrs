import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AllConfigType } from '../../../config/config.type';
//TODO: unified jwt claims with jwt-payload
type Claims = {
  iss: string;
  sub: string;
  typ: 'access' | 'refresh';
  aud: string;
  jti: string;
  id: string;
  deviceId: string;
  deviceType: string;
  permissions: string[];
  mobileNumber: string;
  iat: number;
  exp: number;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('auth.secret', { infer: true }),
    });
  }

  // runs after signature/exp are validated by passport-jwt
  validate(payload: Claims) {
    // basic sanity checks
    if (!payload?.id || !payload?.deviceId) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      id: payload.id,
      deviceId: payload.deviceId,
      deviceType: payload.deviceType,
      permissions: payload.permissions,
      mobileNumber: payload.mobileNumber,
      tokenId: payload.jti,
      tokenType: payload.typ,
      audience: payload.aud,
      issuedAt: payload.iat,
      expiresAt: payload.exp,
    };
  }
}
