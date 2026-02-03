# Vulpes

> Only a small library about not lying to yourself.

This "project", as I call it, is a minimal, predictable data-modeling library
for TypeScript / JavaScript.

It provides two core abstractions — **Option** and **Result** — designed to model
*data states*, not control flow, execution, or business logic.

The goal is clarity, type safety, and long-term maintainability in real-world
JavaScript environments.

---

### Design and Principles

* **Data-first**: Option and Result represent values, not execution or business logic.
* **No magic**: No implicit async handling, exception catching, or runtime tricks.
* **Predictable semantics**: Each method does one thing and nothing more.
* **JS-native mindset**: Not a strict FP clone — adapted for JavaScript reality.
* **Strong inference**: APIs are designed to guide TypeScript’s type narrowing.

---

## Option<T>

`Option<T>` represents the presence or absence of a value.

It is primarily intended to replace unsafe usage of `null` and `undefined` in
data modeling.

```ts
import { Option, Some, None } from "vulpes";

const foo = Some(value)            // the "value" must be non-nullable
let bar: Option<string> = None     // absence of a "value" and acting as "placeholder"
const maybe = Option.from(value)   // null / undefined becomes None, otherwise Some
```

### Semantics

* `Some<T>` always contains a **non-nullable** value
* `None` contains no value and is a singleton

---

## Result<T, E>

`Result<T, E>` represents the outcome of an operation that may succeed or fail.

Unlike Option, **both Ok and Err always contain a value**.

```ts
import { Ok, Err } from "vulpes";

const foo = Ok(value)
const bar = Err(error)
```


### Semantics

* `Ok<T>` represents success and contains a value
* `Err<E>` represents failure and contains an error value
* Errors are data, not exceptions

---

### Rationale

* Promises already model execution and time
* Exceptions already model control flow interruption
* Option and Result are purely data representations

### Non-Goals

This library intentionally does **not**:

* Catch exceptions automatically
* Convert promises implicitly
* Enforce functional purity
* Replace JavaScript control flow

### Summary

Option and Result are small by design.

They exist to:

* Make data states explicit
* Improve type inference
* Reduce null-related bugs
* Keep APIs predictable

Nothing more — and nothing less.

---

### Changes

#### v0.0.2 

- Removed methods `Option.Some`, `Option.None`, `Result.Ok` and `Result.Err`. Those methods provided
syntactic sugar for "factories", but also produced the perfect environment to occur circular
dependency.

