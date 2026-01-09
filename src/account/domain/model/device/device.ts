import { UnauthorizedException } from '@nestjs/common';
import { Entity } from '../../../../shared/domain/models/entity';
import { NullableType } from '../../../../shared/types/nullable.type';
import { DeviceId } from './device-id';
import { DeviceType } from './device-type';
import { FCMToken } from './fcm-token';
import { RefreshToken } from './refresh-token';

export type DeviceEssentialProps = {
  deviceId: string;
  deviceType: string;
  refreshToken: string;
};
export type DeviceOptionalProps = {
  fcmToken?: string;
  lastAccessTime?: Date;
};
export type DeviceProps = DeviceEssentialProps & Required<DeviceOptionalProps>;

export class Device extends Entity<DeviceId> {
  private constructor(
    private _deviceId: DeviceId,
    private _deviceType: DeviceType,
    private _refreshToken: NullableType<RefreshToken>,
    private _fcmToken: NullableType<FCMToken>,
    private _lastAccessTime: Date,
  ) {
    super(_deviceId);
  }

  static create(
    deviceId: string,
    deviceType: string,
    refreshToken: NullableType<string> = null,
    fcmToken: NullableType<string> = null,
    lastAccessTime: NullableType<Date> = null,
  ): Device {
    const _deviceId = DeviceId.create(deviceId);
    const _deviceType = DeviceType.create(deviceType);
    const _refreshToken = refreshToken
      ? RefreshToken.create(refreshToken)
      : null;
    const _fcmToken = fcmToken ? FCMToken.create(fcmToken) : null;
    const _lastAccessTime = lastAccessTime
      ? new Date(lastAccessTime)
      : new Date();
    return new Device(
      _deviceId,
      _deviceType,
      _refreshToken,
      _fcmToken,
      _lastAccessTime,
    );
  }
  public validateRefreshToken(refreshToken: string): void {
    const _refreshToken = RefreshToken.create(refreshToken);
    if (this.refreshToken?.equals(_refreshToken)) {
      throw new UnauthorizedException('Refresh token is invalid');
    }
  }
  updateRefreshToken(refreshToken: string): void {
    const _refreshToken = RefreshToken.create(refreshToken);
    this._refreshToken = _refreshToken;
    this._lastAccessTime = new Date();
  }
  updateFCMToken(fcmToken: string): void {
    const _fcmToken = FCMToken.create(fcmToken);
    this._fcmToken = _fcmToken;
    this._lastAccessTime = new Date();
  }

  get deviceId(): DeviceId {
    return this._deviceId;
  }

  get deviceType(): DeviceType {
    return this._deviceType;
  }
  get refreshToken(): NullableType<RefreshToken> {
    return this._refreshToken;
  }
  get fcmToken(): NullableType<FCMToken> {
    return this._fcmToken;
  }
  get lastAccessTime(): Date {
    return this._lastAccessTime;
  }
}
