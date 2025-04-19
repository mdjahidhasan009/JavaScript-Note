# enum

In TypeScript, an Enum (short for enumeration) is a custom data type that allows you to define a set of named numeric 
constants, making your code more self-explanatory and easier to maintain. Enums provide a robust and expressive way to 
handle sets of values that represent specific categories, states, or options in your program.

Here's an example of an Enum in TypeScript:

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

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



# TypeScript Definition Manager (TSD) and Modern Alternatives

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



## Type Assertions

Think of type assertions as **telling the TypeScript compiler, "Trust me, I know what type this value really is."** You
use them when you have more specific knowledge about a value's type than TypeScript can infer on its own. It's like a 
type *cast* in other languages, but crucially, **it performs no special runtime checks or data conversion**. It's purely 
a compile-time instruction to override the type checker, allowing you to access properties or methods specific to the 
asserted type. Use them carefully, as incorrect assertions can lead to runtime errors if the value doesn't actually 
match the asserted type.

### Example

Imagine you get an HTML element using `document.getElementById`. TypeScript knows it returns `HTMLElement | null`, which
is quite general. If you *know* it's specifically an input element, you need an assertion to access input-specific 
properties like `.value`.

```typescript
// Assume an HTML input element exists: <input type="text" id="myInput" value="Hello TypeScript">

const myElement = document.getElementById("myInput");

// Without assertion - Error: Property 'value' does not exist on type 'HTMLElement'.
// console.log(myElement.value); // Compile-time error!

// --- Using Type Assertion ---

// 1. Using the 'as' syntax (preferred, especially in .tsx files)
const myInputElement = myElement as HTMLInputElement;

// Now TypeScript knows myInputElement is an HTMLInputElement, so .value is accessible
console.log(myInputElement.value); // Output: "Hello TypeScript"

// 2. Using the angle-bracket syntax
const myInputElementAngle = <HTMLInputElement>myElement;
console.log(myInputElementAngle.value); // Output: "Hello TypeScript"

// --- Important Note ---
// This assertion doesn't check if myElement is *actually* an HTMLInputElement at runtime.
// If 'myInput' was a <div>, the code above would compile fine but likely fail at runtime
// when trying to access '.value'.

// Good practice often involves checking the element exists first:
if (myElement) {
  const checkedInputElement = myElement as HTMLInputElement;
  console.log(checkedInputElement.value);
}
```

In this example, we assert that `myElement`, which TypeScript initially types as `HTMLElement | null`, is actually an
`HTMLInputElement`. This allows us to access the `.value` property without a compile-time error.

### Angle Bracket Syntax
```ts
let someValue: any = "Hello, TypeScript!";
let stringLength: number = (<string>someValue).length;
```

## Conditional Types in TypeScript

Conditional types allow defining a type based on a condition within the type system, often using generics. They enable
complex type logic.

**Syntax:**

```typescript
T extends U ? X : Y
```

* **Type Variables:** `T`, `U`, `X`, and `Y` represent types.
* **Type Check:** The expression `T extends U` checks if type `T` is assignable to (or a subtype of) type `U`.
* **Evaluation:** If the condition (`T extends U`) is true, the conditional type evaluates to type `X`. Otherwise, it
  evaluates to type `Y`.

This provides a way to create types that dynamically adapt based on other types.



## Omit Utility Type

The `Omit<Type, Keys>` utility type in TypeScript constructs a new type by picking all properties from `Type` and then 
removing `Keys` (where `Keys` is typically a string literal type or a union of string literal types).

* **Purpose:** To create a new type from an existing one by *excluding* specific properties.
* **Usage:** Takes two type arguments:
  1. The original type (`Type`) you want to modify.
  2. A union of property names (`Keys`) as string literals that you wish to remove from the original type.
* **Benefit:** Helps create more specific, derived types based on existing data structures without manually redefining 
  them, improving code reuse and maintainability.

**Example:**

```typescript
// Original interface
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean; // Example optional property
}

// Using Omit to create a type without 'email' and 'isAdmin'
type PublicUserInfo = Omit<User, 'email' | 'isAdmin'>;
// Resulting type PublicUserInfo is equivalent to:
// {
//   id: number;
//   name: string;
// }

// Creating an object of the new type
const publicUser: PublicUserInfo = {
  id: 1,
  name: 'John'
  // email: 'john@example.com', // Error! Property 'email' does not exist on type 'PublicUserInfo'.
  // isAdmin: false,            // Error! Property 'isAdmin' does not exist on type 'PublicUserInfo'.
};

console.log(publicUser);
```

In this example, `Omit<User, 'email' | 'isAdmin'>` creates `PublicUserInfo`, which contains only the `id` and `name` 
properties from the original `User` interface. Attempting to include the omitted properties (`email` or `isAdmin`) when 
creating an object of type `PublicUserInfo` will result in a TypeScript compile-time error.


## Recursive Type Aliases

Recursive type aliases are a feature in TypeScript that allows creating a type alias that refers to itself within its 
own definition. This capability is essential for accurately modeling data structures that have a nested or hierarchical 
nature.

Such structures are common in various programming scenarios, including:

* **Tree-like structures:** Representing file systems, organizational charts, or Abstract Syntax Trees (ASTs).
* **Nested JSON data:** Handling complex API responses or configuration files where objects can contain arrays of
  similar objects.
* **Linked lists:** Defining nodes that contain a value and a reference to the next node of the same type.

By allowing a type alias to reference itself, TypeScript enables the creation of precise and type-safe definitions for
these inherently recursive patterns.

**Example: Tree Node Structure**

```typescript
type TreeNode = {
  value: string;
  // The 'children' property is an array where each element is also a TreeNode
  children?: TreeNode[]; // Recursive reference
};

// Example usage:
const fileTree: TreeNode = {
  value: "root",
  children: [
    { value: "folderA" },
    {
      value: "folderB",
      children: [
        { value: "file1.txt" },
        { value: "file2.js" }
      ]
    },
    { value: "file3.ts" }
  ]
};

function printTree(node: TreeNode, indent: string = "") {
  console.log(indent + node.value);
  // Safely access children because the type definition allows it
  node.children?.forEach(child => printTree(child, indent + "  "));
}

printTree(fileTree);
/* Output:
root
  folderA
  folderB
    file1.txt
    file2.js
  file3.ts
*/
```

In this example, the `TreeNode` type alias defines a structure with a `value` and an optional `children` array. The
crucial part is that the `children` property is typed as `TreeNode[]`, directly referencing the `TreeNode` type itself,
thus creating the recursion. Interfaces can also be defined recursively in a similar manner.



## `never` Type

The `never` type in TypeScript represents a value that **should never occur** or be reached within the code. It
signifies the type of values that never happen. It is often used to:

1. Narrow down the types of variables in specific control flow paths where reaching that point is impossible according 
   to the types.
2. Indicate that a function *never returns* normally (e.g., it always throws an error or enters an infinite loop).

The `never` type is fundamentally different from `void`:
* `void` represents the absence of a *meaningful* return value (like a function that returns `undefined` implicitly or 
  explicitly). The function itself *does* complete.
* `never` indicates that the function *never completes normally* – it doesn't return at all in the conventional sense.

Here are a few key use cases for the `never` type in TypeScript:

**1. Function Return Type (Always Throws or Loops Indefinitely):**

When a function is guaranteed to never return a value because it always throws an exception or contains an infinite 
loop, you can use the `never` type as its return type. This clearly signals its behavior to the TypeScript compiler and 
other developers.

```typescript
// Example: Function that always throws an error
function throwError(message: string): never {
  throw new Error(message);
}

// Example: Function with an infinite loop (conceptual)
// function infiniteLoop(): never {
//   while (true) {
//     // ... does something forever
//   }
// }
```

**2. Exhaustiveness Checking in Control Flow:**

In control flow analysis, particularly within `switch` statements handling discriminated unions or enum types, `never` 
can be used to ensure all possible cases have been handled. If a code path (like a `default` case) is reached with a
value that *should* have been handled by a previous case according to the type system, assigning that value to `never`
will trigger a compile-time error.

```typescript
// Example: Exhaustiveness check utility function
function exhaustiveCheck(value: never): never {
  // This function's purpose is to cause a compile-time error if called.
  throw new Error(`Unhandled case: ${value}`);
}

// Example: Using the check in a function
type Fruit = "apple" | "banana";

function getFruitInfo(fruit: Fruit): string {
  switch (fruit) {
    case "apple":
      return "apple is red";
    case "banana":
      return "banana is yellow";
    default:
      // If we add a new type to Fruit (e.g., "orange") but forget
      // to add a 'case' here, 'fruit' will have the type "orange".
      // Assigning "orange" to a parameter expecting 'never' causes an error.
      return exhaustiveCheck(fruit); // Error if there's an unhandled case
  }
}

// Example call
console.log(getFruitInfo("apple"));
```

In this example, the `exhaustiveCheck` function expects its `value` parameter to be of type `never`. If we modify the 
`Fruit` type (e.g., `type Fruit = "apple" | "banana" | "orange";`) but forget to add a corresponding `case "orange":`
within the `getFruitInfo` function, the `default` branch will be reached with `fruit` having the type `"orange"`. Trying 
to pass this value to `exhaustiveCheck` (which expects `never`) will correctly result in a TypeScript compile-time type 
error, highlighting the unhandled case and improving code robustness.



##  `import type`

In TypeScript, the `import type` statement is a specific syntax used to import *only* the type information (like 
interfaces, type aliases, enums used as types) from a module, without importing any of the actual runtime values (like
functions, classes, variables) or executing any side-effects associated with that module.

**Key Points:**

* **Type-Only Imports:** Its primary purpose is to explicitly signal that you only need the *shape* or *type signature*
  of something from another module for compile-time type checking, not its actual implementation or value at runtime.
* **Clarity of Intent:** Using `import type` makes the code clearer about whether an import is for type checking
  purposes only or if it brings in runtime code.
* **Prevents Accidental Value Imports:** It guards against accidentally using an imported type as a value, which would 
  cause a runtime error if the value wasn't actually needed or imported.
* **Compile-Time Erasure:** When TypeScript compiles your code to JavaScript, all `import type` statements (and the 
  types they import) are completely erased. They exist only for the TypeScript compiler.
* **No Runtime Overhead:** Because they are erased, `import type` statements introduce absolutely no runtime overhead or
  code into the final JavaScript bundle related to the type import itself.
* **Potential Build Optimizations:** Some build tools and bundlers can leverage `import type` to perform optimizations. 
  They can more easily determine which modules contain only types and potentially skip processing or bundling them if 
  only their types were imported, potentially leading to faster builds and smaller bundles.

**Example:**

Consider a module `user.ts`:

```typescript
// user.ts
export interface User {
  id: number;
  name: string;
}

export function getUserName(user: User): string {
  console.log("Executing getUserName function..."); // Side effect
  return user.name;
}

export const defaultUserId = 0; // Runtime value
```

Now, using `import type` in another file `app.ts`:

```typescript
// app.ts

// Using 'import type' to only bring in the 'User' interface type
import type { User } from './user';

// We can use 'User' as a type annotation
function displayUser(user: User) {
  console.log(`User ID: ${user.id}, Name: ${user.name}`);
}

// --- The following would cause errors if uncommented ---

// import { getUserName } from './user'; // This would import the runtime function + log side effect

// Trying to use 'User' as a value (constructor, etc.) - Fails even if imported normally,
// but 'import type' makes the intent clearer it wasn't meant to be a value.
// const newUser = new User(); // Error: 'User' cannot be used as a value because it was imported using 'import type'.

// We did NOT import the actual getUserName function or defaultUserId constant
// console.log(getUserName({ id: 1, name: "Alice" })); // Error: Cannot find name 'getUserName'.
// console.log(defaultUserId); // Error: Cannot find name 'defaultUserId'.

// We can still import values separately if needed
import { getUserName, defaultUserId } from './user';

const testUser: User = { id: defaultUserId, name: "Bob" };
displayUser(testUser);
console.log(getUserName(testUser)); // Now this works, outputs the console log from user.ts
```

In summary, `import type` is a valuable tool for managing dependencies explicitly, improving code clarity, and
potentially enabling build optimizations by clearly separating type-level imports from runtime-level imports.


## `unknown` Type

In TypeScript, the `unknown` type is used when a variable's value can potentially have **any type**, but you want to 
enforce **explicit type-checking** before performing any operations on it. It serves as a type-safe counterpart to the 
`any` type.

**Key Differences from `any`:**

* **`any`**: Essentially disables type checking for the variable. You can access any property, call it like a function, 
  or assign it to any other type without compile-time errors, which can lead to runtime errors if assumptions are wrong.
* **`unknown`**: Represents a value whose type is not known beforehand. TypeScript prevents you from performing *any* 
  operation on an `unknown` value until you have narrowed its type using type guards (like `typeof`, `instanceof`), type
  assertions (`as type`), or custom type guard functions.

**Why Use `unknown`?**

Using `unknown` forces developers to safely determine the type of a value before interacting with it, making it a much
safer alternative to `any` when dealing with values from uncertain sources.

**Common Use Cases:**

Using `unknown` is particularly useful when dealing with:

* Values from external APIs or libraries where the structure might vary or isn't strictly typed.
* User input (e.g., from forms, prompts).
* Deserialized data (e.g., from `JSON.parse`).
* Any situation where the exact type of a value cannot be reliably determined beforehand at compile time.

When a value is of type `unknown`, TypeScript enforces the use of a **type guard** or a **type assertion** to narrow 
down its type before allowing operations specific to that narrowed type. This makes it a more robust and type-safe 
approach compared to `any`.

**Example:**

```typescript
function processInput(input: unknown): string {
  // We must check the type before using string-specific methods
  if (typeof input === "string") {
    // Inside this block, TypeScript knows 'input' is a string
    // input is now treated as a string since we have performed a type check
    return input.toUpperCase();
  } else {
    // If it's not a string, we handle the error appropriately
    throw new Error(`The provided input is not a string: ${input}`);
  }
  // Outside the 'if' block, 'input' is still treated as 'unknown'
}

// --- Usage ---
console.log(processInput("TypeScript")); // Output: "TYPESCRIPT"

try {
  console.log(processInput(42));
} catch (error) {
  // Throws an error: 'The provided input is not a string: 42'
  if (error instanceof Error) {
    console.error(error.message);
  }
}

// --- Contrast with 'any' (Less Safe) ---
// function processInputAny(input: any): string {
//   // No compile-time error here, even if input is not a string!
//   return input.toUpperCase(); // This would cause a runtime error if input is 42
// }
// console.log(processInputAny(42)); // Runtime TypeError: input.toUpperCase is not a function
```

In this example, the `processInput` function accepts a parameter of type `unknown`. It uses a type check (`typeof
 input === "string"`) to narrow down the type to `string` before safely calling `.toUpperCase()`. This ensures that the 
code is type-safe, and potential issues related to incorrect types are caught during compile time or handled explicitly
at runtime.



## Union vs. Intersection of Types

Union types and intersection types in TypeScript are both used to combine multiple existing types into new ones; however
, they serve different purposes and represent different relationships between the combined types.

**Union Types (`A | B`)**

* **Purpose:** Union types represent a value that can be **any one of** several types. If a value has a union type 
  `A | B`, it means the value can be *either* type `A` *or* type `B`.
* **Behavior:** When working with a value of a union type, TypeScript's control flow analysis allows access to
  properties or methods only if they are **common to all** types within the union. To access properties specific to one 
  of the types in the union, you typically need to use type guards (like `typeof`, `instanceof`, or checking for
  specific properties) to narrow down the type within a specific code block.
* **Analogy:** Think of the `|` symbol as an "OR".

**Example:**

```typescript
// Union type: can be a string OR a number
type StringOrNumber = string | number;

function display(value: StringOrNumber) {
  // console.log(value.toUpperCase()); // Error: Property 'toUpperCase' does not exist on type 'StringOrNumber'. (Only exists on string)
  if (typeof value === 'string') {
    // OK: Inside this block, TS knows 'value' is a string
    console.log(value.toUpperCase());
  } else {
    // OK: Inside this block, TS knows 'value' is a number
    console.log(value.toFixed(2));
  }
}

display("Hello"); // OK. Output: HELLO
display(42);    // OK. Output: 42.00
// display(true);  // Error: Argument of type 'boolean' is not assignable to parameter of type 'StringOrNumber'.
```

**Intersection Types (`A & B`)**

* **Purpose:** Intersection types represent a value that **combines multiple types into one**. If a value has an
  intersection type `A & B`, it means the value must have all the properties and methods of type `A` **and** all the
  properties and methods of type `B`.
* **Behavior:** A value of an intersection type must satisfy the constraints of *all* the types being combined. This 
  effectively merges the members of all intersected types into a single type definition.
* **Analogy:** Think of the `&` symbol as an "AND".

**Example:**

```typescript
// Type representing something with a name
type Named = { name: string };

// Type representing something with an age
type Aged = { age: number };

// Intersection type: must have BOTH name AND age properties
type Person = Named & Aged;

function printPerson(person: Person) {
  // We can safely access both 'name' and 'age' properties
  console.log(`${person.name}, ${person.age} years old`);
}

// This object satisfies both Named and Aged interfaces
const someone: Person = { name: "Alice", age: 30 };
printPerson(someone); // OK. Output: Alice, 30 years old

// const incompletePerson: Person = { name: "Bob" }; // Error: Property 'age' is missing in type '{ name: string; }' but required in type 'Aged'.
```

In summary:
* Use **Union Types (`|`)** when a value can be one of several distinct possibilities (OR).
* Use **Intersection Types (`&`)** when a value must simultaneously possess all characteristics of several types (AND).



## Type Inference vs. Contextual Typing in TypeScript

In TypeScript, both **Type Inference** and **Contextual Typing** are powerful mechanisms that help the compiler 
determine the types of variables or expressions, often without requiring explicit type annotations from the developer. 
While they share the goal of assigning types, they operate based on different information and in different scenarios.

**Type Inference**

* **Definition:** Type Inference is the process where TypeScript automatically deduces the type of a variable, parameter,
  or function return based primarily on the **value it is assigned or initialized with**.
* **Direction:** The type information flows from the *value* (the right-hand side of an assignment or a `return` 
  statement) to the *variable* or *expression* (the left-hand side or the function signature).
* **When it Happens:** Typically occurs during variable declarations with initializers, function return statements, or 
  setting default parameter values.

**Example of Type Inference:**

```typescript
// 1. Variable Initialization
let message = "Hello, World!"; // TypeScript infers 'message' is of type 'string'
// message = 123; // Error: Type 'number' is not assignable to type 'string'.

// 2. Function Return Value
function add(a: number, b: number) {
  return a + b; // TypeScript infers the return type is 'number'
}
let sum = add(5, 10); // TypeScript infers 'sum' is of type 'number'

// 3. Default Parameter Value
function greet(name = "Guest") { // TypeScript infers 'name' is of type 'string'
  console.log(`Hello, ${name.toUpperCase()}`);
}
greet(); // Output: Hello, GUEST
```

**Contextual Typing**

* **Definition:** Contextual Typing is the mechanism where TypeScript deduces the type of an expression based on its
  **location in the code** or the **context** in which it is being used. The surrounding code provides the type
  information.
* **Direction:** The type information flows from the *surrounding context* (like a function signature requiring a 
  certain callback type, or an assignment to a variable with a known type) to the *expression itself* (like a lambda
  function or an object literal).
* **When it Happens:** Common in situations like function arguments (especially callbacks), right-hand sides of 
  assignments where the left side is typed, type assertions, array literals, object literals assigned to typed 
  variables, and event handlers.

**Example of Contextual Typing:**

```typescript
// 1. Function Arguments (Callback)
const names = ["Alice", "Bob", "Charlie"];
// 'forEach' expects a callback like (value: string, index: number, array: string[]) => void
// TypeScript uses this context to infer the types of 's' and 'index'
names.forEach((s, index) => {
  // No need to write 's: string' or 'index: number'
  console.log(`${index + 1}: ${s.toUpperCase()}`); // '.toUpperCase()' is allowed because 's' is inferred as string
});

// 2. Event Handlers (Example with DOM - conceptual)
// Assume 'button' is an HTMLButtonElement
// window.addEventListener expects an event listener for 'click' to have an 'event' parameter of type 'MouseEvent'
// window.addEventListener("click", (event) => {
//   // No need to write 'event: MouseEvent'
//   console.log(event.button); // Accessing 'button' property is safe because 'event' is contextually typed as MouseEvent
// });

// 3. Assignment Context
type Point = { x: number; y: number };
let p1: Point;
// The type 'Point' provides the context for the object literal
p1 = { x: 10, y: 20 }; // No need for type annotations inside the object literal
// p1 = { x: 10 }; // Error: Property 'y' is missing in type '{ x: number; }' but required in type 'Point'.
```

**In Summary:**

* **Type Inference:** Figures out the type based on the **value assigned**. Think `value => type`.
* **Contextual Typing:** Figures out the type based on the **location or expected type**. Think `context => type`.

Both mechanisms work together to make TypeScript development smoother by reducing the need for explicit type annotations
while maintaining strong type safety.



## Mapped Types in TypeScript
Mapped Types allow you to create new types based on existing ones by iterating over their properties and applying 
transformations or modifications to them. This is a powerful feature for creating related types without repetitive
manual definitions.

The syntax typically involves iterating over the keys of an existing type (using `keyof`) and defining the structure of
the new type's properties based on those keys.

**Example:** Creating a `Readonly` version of a type using a Mapped Type.

```typescript
// Define a mapped type 'ReadonlyPoint'
// It iterates over the keys ('x' and 'y') of the inline type { x: number; y: number }
// For each key 'K', it creates a 'readonly' property with the same name 'K' and type 'number'.
type ReadonlyPoint = {
  readonly [K in keyof { x: number; y: number }]: number;
  // Alternatively, if Point type already exists:
  // type Point = { x: number; y: number };
  // readonly [K in keyof Point]: Point[K]; // More general approach
};

// Create an object of the mapped type
const point: ReadonlyPoint = {
  x: 0,
  y: 0,
};

// This assignment will throw an error because properties are readonly.
// point.x = 1; // Error: Cannot assign to 'x' because it is a read-only property.
```

*Note: TypeScript provides a built-in `Readonly<T>` utility type that achieves the same result more concisely: 
`type ReadonlyPoint = Readonly<{ x: number; y: number }>;`*

We can also combined mapped type and conditional types by using a mapped type as the extends clause of a conditional
type
```ts
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type ExampleType = {
  a: number;
  b: string;
};

// NullableExampleType properties can be the original type or null
type NullableExampleType = Nullable<ExampleType>;
```


## `keyof` Type Operator in TypeScript

The `keyof` type operator in TypeScript is used to create a new type consisting of the union of known, public property
names (keys) of a given object type. Essentially, it extracts the literal types of the keys from a type.

**Purpose:**

* Obtains a union type representing all possible property names of a type.
* Useful in generic functions or mapped types to ensure that operations are performed only with valid keys of an object.

**Example:**

```typescript
// Define an object type
type Point = {
  x: number;
  y: number;
};

// Use 'keyof' to get a union of the keys of Point
type PointKeys = keyof Point; // Equivalent to: "x" | "y"

// Generic function using 'keyof' for type safety
// T represents the object type.
// K represents the key type, constrained to be a key of T (K extends keyof T).
// The function takes an object 'obj' of type T and a 'key' of type K.
// It returns a value of the type corresponding to that key on T (T[K] - Indexed Access Type).
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// --- Usage ---
const point: Point = { x: 0, y: 0 };

// Calling getProperty with a valid key ('x') of 'point'
console.log(getProperty(point, 'x')); // Output: 0

// console.log(getProperty(point, 'z')); // Error: Argument of type '"z"' is not assignable to parameter of type 'keyof Point'.
```

In this example:
1.  `keyof Point` evaluates to the union type `"x" | "y"`.
2.  The `getProperty` function uses `K extends keyof T` to ensure that the `key` argument passed must be one of the 
    actual keys present on the object type `T`.
3.  `T[K]` (an indexed access type) is used to correctly type the return value based on the specific key provided. This 
    makes the function type-safe, preventing attempts to access non-existent properties at compile time.










Sources:
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript)