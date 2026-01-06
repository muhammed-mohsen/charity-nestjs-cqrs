export class Pair<T, U> {
  constructor(
    private readonly first: T,
    private readonly second: U,
  ) {}
  getFirst(): T {
    return this.first;
  }
  getSecond(): U {
    return this.second;
  }
}
