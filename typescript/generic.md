# TypeScript Generics

Generics in TypeScript allow for creating reusable and flexible components without compromising on type safety. They enable you to create functions, classes, or interfaces that can work with different types while still providing the benefits of static typing.

## Example: Generic Function

Here's an example using generics in a TypeScript function:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let numIdentity = identity<number>(42);
let strIdentity = identity<string>('Hello, TypeScript!');
```

In this example, `identity<T>` is a generic function that takes an argument `arg` of type `T` (a type variable) and returns a value of the same type `T`. When calling the `identity` function, you specify the type argument between angle brackets `<>`, like `identity<number>` or `identity<string>`.

The generic function `identity` allows you to work with different types without losing type information. In this case, `numIdentity` will have the type `number`, and `strIdentity` will have the type `string`.





























### Resources
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript)