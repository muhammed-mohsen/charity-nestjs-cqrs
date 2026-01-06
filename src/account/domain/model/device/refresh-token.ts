import { ValueValidator } from '../../../../utils/domain/extention/value.validator';

export class RefreshToken {
  private constructor(private readonly _value: string) {
    ValueValidator.assertNotEmpty(_value);
  }

  // Static factory method
  public static create(value: string): RefreshToken {
    return new RefreshToken(value);
  }

  public getValue(): string {
    return this._value;
  }

  public equals(other: any): boolean {
    if (this === other) return true;
    if (!(other instanceof RefreshToken)) return false;
    return this._value === other._value;
  }

  public hashCode(): number {
    let hash = 0;
    for (let i = 0; i < this._value.length; i++) {
      const char = this._value.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  public toString(): string {
    return `RefreshToken{value='${this._value}'}`;
  }
}
