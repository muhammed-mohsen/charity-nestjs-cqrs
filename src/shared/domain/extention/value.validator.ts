import { BadRequestException } from '@nestjs/common';

export class ValueValidator {
  static assertNotEmpty(className: string, value: string): void {
    if (!value || value.length === 0) {
      throw new BadRequestException(`${className}: Value must not be empty`);
    }
  }
  static assertWithinRange(
    className: string,
    value: string,
    min: number,
    max: number,
  ): void {
    if (!value) return;
    if (value.length < min || value.length > max) {
      throw new BadRequestException(
        `${className}: Value must be between ${min} and ${max} characters`,
      );
    }
  }
  static assertValidFormat(
    className: string,
    value: string,
    format: RegExp,
  ): void {
    if (!value) return;
    if (!value.match(format)) {
      throw new BadRequestException(
        `${className}: Value must be in ${format} format`,
      );
    }
  }
}

