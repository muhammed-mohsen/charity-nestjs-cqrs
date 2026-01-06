import { MobileNumber } from '../account/mobile-number';

// domain/invitation.entity.ts
export class Invitation {
  private constructor(
    private readonly _invitedMobileNumber: MobileNumber,
    private readonly _inviterId: string,
  ) {}
  static create(invitedMobileNumber: string, inviterId: string): Invitation {
    return new Invitation(MobileNumber.create(invitedMobileNumber), inviterId);
  }
  get invitedMobileNumber(): MobileNumber {
    return this._invitedMobileNumber;
  }
  get inviterId(): string {
    return this._inviterId;
  }
}
