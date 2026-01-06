import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AllConfigType } from '../../config/config.type';
type Claims = {
  iss: string;
  sub: string;
  typ: 'access' | 'refresh';
  aud: string;
  jti: string;
  accountId: string;
  deviceId: string;
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
    if (!payload?.accountId || !payload?.deviceId) {
      throw new UnauthorizedException('Invalid token');
    }

    // Optional: enforce token type here if this strategy is for access tokens only
    if (payload.typ !== 'access') {
      throw new UnauthorizedException('Access token required');
    }

    // Return what becomes req.user
    return {
      accountId: payload.accountId,
      deviceId: payload.deviceId,
      tokenId: payload.jti,
      tokenType: payload.typ,
      audience: payload.aud,
      issuedAt: payload.iat,
      expiresAt: payload.exp,
    };
  }
}
