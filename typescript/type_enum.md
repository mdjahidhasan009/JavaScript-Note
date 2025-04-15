# enum


# TypeScript vs. Strictly Statically Typed Languages

## Key Difference: Optional Static Typing

While TypeScript *is* a statically typed language (meaning it checks types at compile time), its key differentiator from many traditional statically typed languages (like Java or C#) is that its static typing is **optional**.

**Traditional Static Typing (e.g., Java, C#):**
*   Types are checked at **compile time**.
*   Type errors **prevent compilation**.
*   Every variable and expression *must* have a clearly defined type known at compile time. There are usually limited or no ways to easily bypass the type system.

**TypeScript's Optional Static Typing:**
*   Acts as a **superset of JavaScript** (which is dynamically typed - types checked at runtime).
*   Adds a **static type system** on top of JavaScript.
*   Type checking happens at **compile time** (transpilation time).
*   **Crucially, it allows developers to opt-out of static type checking in specific places.** This is primarily done using the `any` type:
    *   When a variable is declared with the type `any`, or TypeScript infers it as `any`, the compiler essentially **stops performing type checks** for that specific variable.
    *   You can assign **any kind of value** to an `any` variable without a compile-time error.
    *   You can access **any property or method** on an `any` variable without a compile-time error (though this might cause a runtime error if the property/method doesn't actually exist).

**In essence:**

TypeScript provides the *benefits* of static typing (catching errors early, better tooling, improved readability) but offers an "escape hatch" (`any`) that allows it to integrate smoothly with existing JavaScript code and provides flexibility when needed. However, overuse of `any` negates the advantages of using TypeScript in the first place. Strictly statically typed languages typically enforce their type rules much more rigidly across the entire codebase.

# Type Erasure in TypeScript

Type erasure in TypeScript refers to the process in which TypeScript's type information is removed during the transpilation (compilation) to JavaScript. Since JavaScript doesn't have a native type system like TypeScript, TypeScript compiler (tsc) eliminates all type annotations and corresponding type-checks when generating the resulting JavaScript code.

Type erasure has the following consequences and implications:

*   **Runtime type information:** TypeScript's type system only exists at compile-time for static type checking. Once compiled to JavaScript, there’s no information about types at runtime, which means you cannot perform type-checks or type-related operations during the execution of the code.
*   **Compatibility:** Type erasure ensures that the generated JavaScript code remains compatible with existing JavaScript libraries, frameworks, and codebases. TypeScript aims to be a strict superset of JavaScript, and type erasure helps maintain that compatibility.
*   **Performance impact:** Type erasure causes TypeScript's static type checking to have no overhead at runtime. The generated JavaScript code doesn't include any additional constructs related to type-checking, which means there is no impact on the overall runtime performance of the application.



##  TypeScript Definition Manager (TSD) and Modern Alternatives

TypeScript Definition Manager (TSD) *was* a tool used to manage TypeScript type definition files (`.d.ts`) for 
JavaScript libraries. These files allow TypeScript to understand the structure and types within external JavaScript code,
enabling static type checking.

**However, TSD is now deprecated.**

The modern and standard way to manage type definitions is using the **`@types` scope on npm**, which sources definitions
from the **DefinitelyTyped** repository.

**Use:** You install type definitions as development dependencies using your package manager (npm or yarn).

**Example (using npm):**

To get type definitions for the popular `lodash` library:

```bash
npm install --save-dev @types/lodash
```

This command downloads and adds the `lodash` type definitions to your project, allowing TypeScript to provide
autocompletion and type checking when you use `lodash` functions.







































Sources:
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript)