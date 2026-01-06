// import { DomainModel } from './domain-model';
import { ValueObject } from './value-object';

export abstract class Entity<TId extends ValueObject> {
  protected constructor(public readonly id: TId) {}

  /**
   * DDD equality: entities are equal if they have the same identity AND type.
   */
  equals(other?: Entity<TId> | null): boolean {
    if (!other) return false;
    if (this === other) return true;
    if (this.constructor !== other.constructor) return false;
    return this.id.equals(other.id);
  }

  /**
   * JS doesn't have hashCode; if you need a stable key for Maps/Sets,
   * expose a string key (based on id).
   */
  get key(): string {
    return `${this.constructor.name}:${String(this.id)}`;
  }
}
