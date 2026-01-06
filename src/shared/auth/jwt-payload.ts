import { AUTH_ISSUER, AUTH_SUBJECT } from './auth-constants';
import type { TokenType } from './token-type';

export abstract class JwtPayload {
  readonly issuer: string = AUTH_ISSUER;
  readonly subject: string = AUTH_SUBJECT;

  readonly type: TokenType;
  readonly audience: string;
  readonly jwtId: string;
  readonly expireAt: Date;
  readonly issuedAt: Date;

  protected constructor(params: {
    type: TokenType;
    audience: string;
    jwtId: string;
    expireAt: Date;
    issuedAt: Date;
  }) {
    this.type = params.type;
    this.audience = params.audience;
    this.jwtId = params.jwtId;

    // defensive copies like Java
    this.expireAt = new Date(params.expireAt);
    this.issuedAt = new Date(params.issuedAt);
  }

  /**
   * JWT payload claims to pass into JwtService.sign(...)
   */
  abstract toClaims(): Record<string, unknown>;

  protected toStandardClaims(): Record<string, unknown> {
    return {
      iss: this.issuer,
      sub: this.subject,
      typ: this.type,
      aud: this.audience,
      jti: this.jwtId,
      exp: Math.floor(this.expireAt.getTime() / 1000),
      iat: Math.floor(this.issuedAt.getTime() / 1000),
    };
  }
}
