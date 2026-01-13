export class RegisterFCMTokenCommand {
  constructor(public readonly accountId: string, public readonly deviceId: string, public readonly fcmToken: string) {}
}

