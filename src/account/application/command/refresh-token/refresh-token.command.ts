export class RefreshTokenCommand {
  constructor(public readonly encodedRefreshToken: string, public readonly accountId : string, public readonly deviceId: string) {}
}