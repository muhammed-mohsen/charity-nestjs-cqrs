import { AggregateRoot } from '@nestjs/cqrs';
import { Pair } from '../../../../shared/domain/models/pair';
import { NullableType } from '../../../../utils/types/nullable.type';
import { JwtGenerator } from '../../contracts/jwt-generator';
import { AccountAuthenticatedEvent } from '../../event/account-authenticated';
import { AccountCreated } from '../../event/account-created.event';
import { Device, DeviceProps } from '../device/device';
import { DeviceId } from '../device/device-id';
import { AccountId } from './account-id';
import { FullName } from './fullname';
import { MobileNumber } from './mobile-number';
import { PhotoUrl } from './photo-url';
export type AccountEssentialProps = {
  id: string;
  mobileNumber: string;
  fullName: string;
  photoUrl: string;
  blocked: boolean;
  joinedDate: Date;
  lastUpdated: Date;
  permissions: string[];
};
export type AccountOptionalProps = {
  joinedDate?: Date;
  lastUpdated?: Date;
  permissions?: string[];
  devices?: DeviceProps[];
};
export type AccountProps = AccountEssentialProps &
  Required<AccountOptionalProps>;

/**
 * Aggregate root for the Account context.
 */
export class Account extends AggregateRoot {
  // private readonly devices: Device[];
  constructor(
    private readonly _id: AccountId,
    private readonly _mobileNumber: MobileNumber,
    private _devices: Device[],
    private readonly _permissions: string[],
    private readonly _blocked: boolean = false,
    private readonly _fullName: NullableType<FullName> = null,
    private readonly _photoUrl: NullableType<PhotoUrl> = null,
    private readonly _joinedDate: Date = new Date(),
  ) {
    super();
  }

  authenticate(
    deviceId: string,
    deviceType: string,
    jwtGenerator: JwtGenerator,
  ): Pair<string, string> {
    let device = this.getDevice(deviceId);
    if (!device) {
      device = Device.create(deviceId, deviceType);
    }
    this.addDevice(device);
    const refreshToken = jwtGenerator.generateRefreshToken(this, device);
    device.updateRefreshToken(refreshToken);
    this.apply(new AccountAuthenticatedEvent(this._id, device));
    return new Pair<string, string>(
      jwtGenerator.generateAccessToken(this, device),
      refreshToken,
    );
  }

  addDevice(device: Device): void {
    this._devices.push(device);
  }
  registerAccount(): Account {
    console.log(this.id.value, this.mobileNumber.value);

    this.apply(new AccountCreated(this.id.value, this.mobileNumber.value));
    console.log('AccountCreated event applied');
    return this;
  }
  getDevice(_deviceId: string) {
    const deviceId = DeviceId.create(_deviceId);
    return this._devices.find((device) => device.deviceId.equals(deviceId));
  }
  get id(): AccountId {
    return this._id;
  }
  get mobileNumber(): MobileNumber {
    return this._mobileNumber;
  }
  get devices(): Device[] {
    return this._devices;
  }

  get permissions(): string[] {
    return this._permissions;
  }
  get blocked(): boolean {
    return this._blocked;
  }
  get fullName(): NullableType<FullName> {
    return this._fullName;
  }
}
