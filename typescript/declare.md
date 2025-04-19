# declare

The `declare` keyword in TypeScript is used to tell the compiler that a variable, function, class, or module exists, 
even though it’s defined elsewhere (e.g., in an external JavaScript file or a globally available script). It is commonly 
used in declaration files (`.d.ts`) to provide type information without implementing the actual behavior.

This is useful when integrating JavaScript code into a TypeScript project or when using third-party libraries that don’t
have built-in TypeScript definitions.

## Key Points:
- Used in `.d.ts` files to define types for external modules.
- Enables static type checking and IntelliSense in TypeScript.
- Does **not** produce any JavaScript output—it only exists at compile time.

## Example 1: User-defined `.d.ts` File for a Custom Module

Assume you have a custom JavaScript module `mathUtils.js` like this:

```js
// mathUtils.js
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}
```

Now, create a `mathUtils.d.ts` file to declare types for this module:

```ts
// mathUtils.d.ts
declare module "mathUtils" {
    export function add(a: number, b: number): number;
    export function multiply(a: number, b: number): number;
}
```

### Use in TypeScript:

```ts
// main.ts
import { add, multiply } from "mathUtils";

console.log(add(2, 3));       // Output: 5
console.log(multiply(4, 5));  // Output: 20
```

---

## Example 2: Declaration for a Third-party Module Without Types

Sometimes, a third-party JavaScript package doesn’t come with TypeScript typings. You can manually create a declaration
like this.

Suppose you're using a JavaScript library called `legacyLib` with no type support:

```ts
// legacyLib.d.ts
declare module "legacyLib" {
    export function legacyFunction(data: string): void;
    export const version: string;
}
```

### Use in TypeScript:

```ts
// app.ts
import { legacyFunction, version } from "legacyLib";

legacyFunction("Hello, legacy!");
console.log(version);
```

## Summary:
- `declare` helps TypeScript understand external or pre-existing code.
- Commonly used for:
    - Custom JavaScript utilities
    - Third-party libraries without TypeScript support
- Enables full type safety and editor support, even without native `.ts` code.

---

### Tip:
For many popular third-party libraries, type definitions are available at 
[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) and can be installed via:

```bash
npm install --save-dev @types/library-name
```

But if not available, you can write your own using `declare module`.


### References
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript#intermediate-typescript-interview-questions-and-answers)