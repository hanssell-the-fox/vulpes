// result/err.ts

import type { Result } from "./result.ts";

/**
 * Variant of `Result` that contains an error value.
 *
 * @template T Type of the contained error value.
 */
class Err<T> implements Result<never, T> {
  /**
   * An `Error` value.
   *
   * @param value - The value to represent an error.
   * @returns An instance of Result containing an error value.
   */
  public static create<T>(value: T): Result<never, T> {
    return new Err(value);
  }

  private constructor(private readonly value: T) {}

  /** @inheritdoc */
  public isOk(): this is never {
    return false;
  }

  /** @inheritdoc */
  public isErr(): this is Result<never, T> {
    return true;
  }

  /** @inheritdoc */
  public match<U>({ Err: handler }: { Err: (value: T) => U }): U {
    return handler(this.value);
  }

  /** @inheritdoc */
  public map<U>(): Result<U, T> {
    return this as unknown as Result<U, T>;
  }

  /** @inheritdoc */
  public mapErr<U>(fn: (value: T) => U): Result<never, U> {
    return Err.create(fn(this.value));
  }

  /** @inheritdoc */
  public or<V>(defaultValue: V): V {
    return defaultValue;
  }

  /** @inheritdoc */
  public unwrap(): never {
    throw new TypeError("Trying to get a success value from Err");
  }

  /** @inheritdoc */
  public unwrapErr(): T {
    return this.value;
  }
}

/**
 * An `Error` value.
 */
const err: typeof Err.create = Err.create;

export { err as Err };
export default err;
