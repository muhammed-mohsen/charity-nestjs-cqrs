import { IEvent } from "@nestjs/cqrs";

export class FCMTokenRegisteredEvent implements IEvent {
  constructor(public readonly accountId: string, public readonly deviceId: string, public readonly fcmToken: string) {
  }
}