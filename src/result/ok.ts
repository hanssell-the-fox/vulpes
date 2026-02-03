// result/ok.ts

import type { Result } from "./result.ts";

/**
 * Variant of `Result` that contains a success value.
 *
 * @template T Type of the contained success value.
 */
class Ok<T> implements Result<T, never> {
  /**
   * An `Ok` value.
   *
   * @param value - The value to represent a success.
   * @returns An instance of Result containing a success value.
   */
  public static create<T>(value: T): Result<T, never> {
    return new Ok(value);
  }

  private constructor(private readonly value: T) {}

  /** @inheritdoc */
  public isOk(): this is Result<T, never> {
    return true;
  }

  /** @inheritdoc */
  public isErr(): this is never {
    return false;
  }

  /** @inheritdoc */
  public match<U>({ Ok: handler }: { Ok: (value: T) => U }): U {
    return handler(this.value);
  }

  /** @inheritdoc */
  public map<U>(fn: (value: T) => U): Result<U, never> {
    return Ok.create(fn(this.value));
  }

  /** @inheritdoc */
  public mapErr<U>(): Result<T, U> {
    return this as unknown as Result<T, U>;
  }

  /** @inheritdoc */
  public or(): T {
    return this.value;
  }

  /** @inheritdoc */
  public unwrap(): T {
    return this.value;
  }

  /** @inheritdoc */
  public unwrapErr(): never {
    throw new TypeError("Trying to get an error value from Ok");
  }
}

/**
 * An `Ok` value.
 */
const ok: typeof Ok.create = Ok.create;

export { ok as Ok };
export default ok;
