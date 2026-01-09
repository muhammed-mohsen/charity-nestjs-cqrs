import { ValueValidator } from '../../../../shared/domain/extention/value.validator';

export class MobileNumber {
  private static readonly FORMAT = /^[0-9]*$/;
  private static readonly MIN_LENGTH = 10;
  private static readonly MAX_LENGTH = 1000;
  constructor(private readonly _value: string) {
    ValueValidator.assertValidFormat(
      MobileNumber.name,
      _value,
      MobileNumber.FORMAT,
    );
    ValueValidator.assertWithinRange(
      MobileNumber.name,
      _value,
      MobileNumber.MIN_LENGTH,
      MobileNumber.MAX_LENGTH,
    );
  }
  static create(value: string): MobileNumber {
    //if you want to replace or make any change in value before passing it to the constructor, you can do it here

    return new MobileNumber(value);
  }
  public get value(): string {
    return this._value;
  }
}
