# Vulpes

> Only a small library about not lying to yourself.

This "project", as I call it, is a minimal, predictable data-modeling library
for TypeScript / JavaScript.

It provides two core abstractions — **Option** and **Result** — designed to model
*data states*, not control flow, execution, or business logic.

The goal is clarity, type safety, and long-term maintainability in real-world
JavaScript environments.

---

🦊 **A note on personality**

This library is intentionally opinionated and personal and the fox is not a
mascot by accident:

* curious, but cautious
* pragmatic, not academic
* clever without being cryptic

Each **data type** is designed to behave like a fox would: never assume, never
panic, always inspect the terrain before moving forward.

---

### Design and Principles

* **Data-first**: Option and Result represent values, not execution or business logic.
* **No magic**: No implicit async handling, exception catching, or runtime tricks.
* **Predictable semantics**: Each method does one thing and nothing more.
* **JS-native mindset**: Not a strict FP clone — adapted for JavaScript reality.
* **Strong inference**: APIs are designed to guide TypeScript’s type narrowing.

---

## Option<T>

`Option<T>` represents the presence (`Some`) or absence (`None`) of a value.

It is primarily intended to replace unsafe usage of `null` and `undefined` in
data modeling.

```ts
import {Option, Some, None} from "vulpes";

const foo = Some(value)            // value must be non-nullable
let bar: Option<string> = None     // absence and "placeholder"
const maybe = Option.from(value)   // null / undefined -> None, otherwise Some
```

### Semantics

* `Some<T>` always contains a **non-nullable** value
* `None` contains no value and is a singleton
* `Option` never throws unless explicitly unwrapped incorrectly

---

## Result<T, E>

`Result<T, E>` represents the outcome of an operation that may succeed (`Ok`) or
fail (`Err`).

Unlike Option, **both Ok and Err always contain a value**.

```ts
import {Ok, Err} from "vulpes";

const foo = Ok(value)
const bar = Err(error)
```

There are no restrictions on `T` or `E` — they may be any type, including `null`
or `undefined`.

This is intentional.

### Semantics

* `Ok<T>` represents success and contains a value
* `Err<E>` represents failure and contains an error value
* Errors are data, not exceptions

---

## Async & Exceptions

This library **does not** provide async helpers.

### Rationale

* Promises already model execution and time
* Exceptions already model control flow interruption
* Option and Result are purely data representations

Recommended pattern:

```ts
Promise<Result<T, E>>
```

Async behavior is handled externally using `async/await` or `try/catch`.

---

### Non-Goals

This library intentionally does **not**:

* Catch exceptions automatically
* Convert promises implicitly
* Enforce functional purity
* Replace JavaScript control flow

---

### Summary

Option and Result are small by design.

They exist to:

* Make data states explicit
* Improve type inference
* Reduce null-related bugs
* Keep APIs predictable

Nothing more — and nothing less.

