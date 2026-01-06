import { Account } from '../../../domain/model/account/account';
import { Device } from '../../../domain/model/device/device';

export class TokenMapper {
  toAccessToken(
    account: Account,
    device: Device,
  ): {
    id: string;
    mobileNumber: string;
    deviceId: string;
    deviceType: string;
    permissions: string[];
  } {
    return {
      id: account.id.value,
      mobileNumber: account.mobileNumber.value,
      deviceId: device.deviceId.value,
      deviceType: device.deviceType.value,
      permissions: account.permissions,
    };
  }
  toRefreshToken(
    account: Account,
    device: Device,
  ): {
    id: string;
    mobileNumber: string;
    deviceId: string;
    deviceType: string;
  } {
    return {
      id: account.id.value,
      mobileNumber: account.mobileNumber.value,
      deviceId: device.deviceId.value,
      deviceType: device.deviceType.value,
    };
  }
}
