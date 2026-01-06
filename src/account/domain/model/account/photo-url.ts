import { ValueValidator } from '../../../../utils/domain/extention/value.validator';

export class PhotoUrl {
  private static readonly FORMAT = new RegExp(
    'https?://(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)',
  );
  constructor(private readonly value: string) {
    if (value !== null && value.length > 0) {
      ValueValidator.assertValidFormat(value, PhotoUrl.FORMAT);
    }
  }
  static create(value: string): PhotoUrl {
    return new PhotoUrl(value);
  }
}
