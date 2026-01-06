export class DeviceType {
  private static readonly VALID_TYPES = new Set(['android', 'ios', 'web']);

  constructor(public readonly value: string) {}

  static create(value: string): DeviceType {
    const normalizedValue = value.toLowerCase();
    if (DeviceType.VALID_TYPES.has(normalizedValue)) {
      return new DeviceType(value);
    }
    throw new Error('Invalid device type');
  }
}
