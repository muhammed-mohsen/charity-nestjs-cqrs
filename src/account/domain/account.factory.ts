import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Account, AccountProps } from './model/account/account';
import { AccountId } from './model/account/account-id';
import { FullName } from './model/account/fullname';
import { MobileNumber } from './model/account/mobile-number';
import { PhotoUrl } from './model/account/photo-url';
import { Device, DeviceEssentialProps } from './model/device/device';
type AccountFactoryProps = {
  mobileNumber: string;
  devices: DeviceEssentialProps[];
  isAdmin: boolean;
};
@Injectable()
export class AccountFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(props: AccountFactoryProps): Account {
    const _id = AccountId.generate();
    const _mobileNumber = MobileNumber.create(props.mobileNumber);
    const _devices = props.devices.map((device) =>
      Device.create(device.deviceId, device.deviceType),
    );
    const _permissions = props.isAdmin ? ['full_access'] : ['view'];
    return this.eventPublisher.mergeObjectContext(
      new Account(
        _id,
        _mobileNumber,
        _devices,
        _permissions,
        false,
        null,
        null,
      ),
    );
  }

  reconstitute(props: AccountProps): Account {
    const _id = new AccountId(props._id);
    const _mobileNumber = MobileNumber.create(props.mobileNumber);
    const _devices = props.devices.map((device) =>
      Device.create(
        device.deviceId,
        device.deviceType,
        device.refreshToken,
        device.fcmToken,
      ),
    );
    const _permissions = props.permissions ?? [];
    const _blocked = props.blocked ?? false;
    const _fullName = props.fullName ? new FullName(props.fullName) : null;
    const _photoUrl = props.photoUrl ? new PhotoUrl(props.photoUrl) : null;
    return this.eventPublisher.mergeObjectContext(
      new Account(
        _id,
        _mobileNumber,
        _devices,
        _permissions,
        _blocked,
        _fullName,
        _photoUrl,
      ),
    );
  }
}
