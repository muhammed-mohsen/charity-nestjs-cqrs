import { ValueValidator } from '../../../../utils/domain/extention/value.validator';

export class FCMToken {
  1;

  private constructor(private readonly _value: string) {
    ValueValidator.assertNotEmpty(_value);
  }
  static create(value: string): FCMToken {
    return new FCMToken(value);
  }
  get value(): string {
    return this._value;
  }
  hashCode(): number {
    return this._value
      .split(':')
      .reduce((acc, curr) => acc + curr.charCodeAt(0), 0);
  }
  equals(other: FCMToken): boolean {
    return this._value === other._value;
  }
  toString(): string {
    return 'FCMToken{value=' + this._value + '}';
  }
}
