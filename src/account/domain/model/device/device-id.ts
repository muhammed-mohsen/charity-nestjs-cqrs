import { ValueValidator } from '../../../../shared/domain/extention/value.validator';
import { ValueObject } from '../../../../shared/domain/models/value-object';
export class DeviceId implements ValueObject {
  private static readonly MIN_LENGTH = 15;
  private static readonly MAX_LENGTH = 50;
  private constructor(private readonly _value: string) {
    ValueValidator.assertWithinRange(
      DeviceId.name,
      _value,
      DeviceId.MIN_LENGTH,
      DeviceId.MAX_LENGTH,
    );
  }
  static create(value: string): DeviceId {
    return new DeviceId(value);
  }
  equals(other: DeviceId): boolean {
    return this._value === other._value;
  }
  get value(): string {
    return this._value;
  }
}
