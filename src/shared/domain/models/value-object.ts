// import { DomainModel } from './domain-model';

export interface ValueObject {
  equals(other: ValueObject): boolean;
}
