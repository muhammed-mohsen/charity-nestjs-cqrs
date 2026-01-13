export class MemberId {
  constructor(private readonly _value: string) {}
  static create(value: string): MemberId {
    return new MemberId(value);
  }
  get value(): string {
    return this._value;
  }
}