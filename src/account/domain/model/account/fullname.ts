// package com.charity_hub.accounts.internal.core.model.account;

import { ValueValidator } from '../../../../utils/domain/extention/value.validator';

// import com.charity_hub.shared.domain.extension.ValueValidator;

// public record FullName(String value) {
//     private static final int MIN_LENGTH = 2;
//     private static final int MAX_LENGTH = 50;

//     public FullName {
//         ValueValidator.assertWithinRange(getClass(), value, MIN_LENGTH, MAX_LENGTH);
//     }

//     public static FullName create(String value) {
//         return new FullName(value);
//     }

// }
export class FullName {
  private static readonly MIN_LENGTH = 2;
  private static readonly MAX_LENGTH = 50;
  constructor(private readonly value: string) {
    ValueValidator.assertWithinRange(
      value,
      FullName.MIN_LENGTH,
      FullName.MAX_LENGTH,
    );
  }
  static create(value: string): FullName {
    return new FullName(value);
  }
}
