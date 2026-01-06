// package com.charity_hub.accounts.internal.core.model.account;
import { v4 } from 'uuid';
// import com.charity_hub.shared.domain.model.ValueObject;

// import java.util.UUID;

// public record AccountId(UUID value) implements ValueObject {

//     // Static factory method (replacing companion object)
//     public static AccountId generate() {
//         return new AccountId(UUID.randomUUID());
//     }

// }
export class AccountId {
  constructor(private readonly _value: string) {}
  static generate(): AccountId {
    return new AccountId(v4());
  }
  get value(): string {
    return this._value;
  }
}
