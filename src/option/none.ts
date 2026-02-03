// option/none.ts

import type { Option } from "./option.ts";

/**
 * Variant of Option that is empty.
 */
class None<T = never> implements Option<T> {
  /**
   * No value.
   */
  public static create(): Option<never> {
    return new None();
  }

  private constructor() {}

  /** @inheritdoc */
  public isSome(): this is Option<NonNullable<T>> {
    return false;
  }

  /** @inheritdoc */
  public isNone(): this is Option<never> {
    return true;
  }

  /** @inheritdoc */
  public match<U>({ None: handler }: { None: () => U }): U {
    return handler();
  }

  /** @inheritdoc */
  public map<U>(): Option<NonNullable<U>> {
    return this as unknown as Option<NonNullable<U>>;
  }

  /** @inheritdoc */
  public or(defaultValue: NonNullable<T>): NonNullable<T> {
    return defaultValue;
  }

  /** @inheritdoc */
  public unwrap(): never {
    throw new TypeError("Trying to unwrap None");
  }
}

/**
 * No value
 */
const none: Option<never> = None.create();

export { none as None };
export default none;
