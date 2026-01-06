import { JwtPayload } from './jwt-payload';

export class AccessTokenPayload extends JwtPayload {
  readonly accountId: string;
  readonly deviceId: string;

  constructor(params: {
    audience: string;
    jwtId: string;
    expireAt: Date;
    issuedAt: Date;
    accountId: string;
    deviceId: string;
  }) {
    super({
      type: 'access',
      audience: params.audience,
      jwtId: params.jwtId,
      expireAt: params.expireAt,
      issuedAt: params.issuedAt,
    });

    this.accountId = params.accountId;
    this.deviceId = params.deviceId;
  }

  toClaims(): Record<string, unknown> {
    return {
      ...this.toStandardClaims(),
      accountId: this.accountId,
      deviceId: this.deviceId,
    };
  }
}
