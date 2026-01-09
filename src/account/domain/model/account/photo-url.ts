import { ValueValidator } from '../../../../shared/domain/extention/value.validator';

export class PhotoUrl {
  private static readonly FORMAT = new RegExp(
    'https?://(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)',
  );
  constructor(private readonly _value: string) {
    if (_value !== null && _value.length > 0) {
      ValueValidator.assertValidFormat(PhotoUrl.name, _value, PhotoUrl.FORMAT);
    }
  }
  static create(value: string): PhotoUrl {
    return new PhotoUrl(value);
  }
  get value(): string {
    return this._value;
  }
}
