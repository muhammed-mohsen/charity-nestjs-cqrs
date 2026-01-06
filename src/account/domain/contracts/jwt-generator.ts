import { Account } from '../model/account/account';
import { Device } from '../model/device/device';

export interface JwtGenerator {
  generateAccessToken(account: Account, device: Device): string;
  generateRefreshToken(account: Account, device: Device): string;
}
