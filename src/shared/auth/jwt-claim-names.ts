export const JwtClaimNames = {
  iss: 'iss',
  sub: 'sub',
  typ: 'typ',
  aud: 'aud',
  jti: 'jti',
  exp: 'exp',
  iat: 'iat',
} as const;

export type JwtClaimName = (typeof JwtClaimNames)[keyof typeof JwtClaimNames];
