// option/some.ts

import { Option } from "./option.ts";

/**
 * Variant of Option that contains a value.
 */
class Some<T> implements Option<T> {
  /**
   * Some value.
   *
   * @template T Type of the value
   * @returns An Option containing a value.
   */
  public static create<T>(value: NonNullable<T>): Option<NonNullable<T>> {
    return new Some(value);
  }

  private constructor(private readonly value: NonNullable<T>) {}

  /** @inheritdoc */
  public isSome(): this is Option<NonNullable<T>> {
    return true;
  }

  /** @inheritdoc */
  public isNone(): this is Option<never> {
    return false;
  }

  /** @inheritdoc */
  public match<U>({ Some: handler }: { Some: (value: NonNullable<T>) => U }): U {
    return handler(this.value);
  }

  /** @inheritdoc */
  public map<U>(fn: (value: NonNullable<T>) => U): Option<NonNullable<U>> {
    return Option.from(fn(this.value));
  }

  /** @inheritdoc */
  public or(): NonNullable<T> {
    return this.value;
  }

  /** @inheritdoc */
  public unwrap(): NonNullable<T> {
    return this.value;
  }
}

/**
 * Some value.
 */
const some: typeof Some.create = Some.create;

export { some as Some };
export default some;
