import { BadRequestException } from '@nestjs/common';

export class ValueValidator {
  static assertNotEmpty(value: string): void {
    if (value.length === 0) {
      throw new BadRequestException('Value must not be empty');
    }
  }
  static assertWithinRange(value: string, min: number, max: number): void {
    if (value.length < min || value.length > max) {
      throw new BadRequestException(
        `Value must be between ${min} and ${max} characters`,
      );
    }
  }
  static assertValidFormat(value: string, format: RegExp): void {
    if (!value.match(format)) {
      throw new BadRequestException(`Value must be in ${format} format`);
    }
  }
}
