import { v4 } from 'uuid';
export class SessionId {
  constructor(private readonly _value: string) {}
  static generate(): SessionId {
    return new SessionId(v4());
  }
  value(): string {
    return this._value;
  }
}
