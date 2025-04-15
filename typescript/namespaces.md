# TypeScript Namespaces

## Overview

Namespaces in TypeScript provide a way to logically **group related code**, such as classes, interfaces, functions, and variables. They were originally called "Internal Modules" before the term "Module" became primarily associated with ES Modules (file-based modules).

The main purpose of a namespace is to **prevent polluting the global scope** and avoid naming collisions between different parts of an application, especially when not using a file-based module system (like ES Modules or CommonJS). Think of a namespace as creating a named container or object that holds its own set of definitions.

## Declaration Syntax

You declare a namespace using the `namespace` keyword, followed by a name, and then a block `{}` containing the members of the namespace.

```typescript
namespace <namespace_name> {
  // Members go here: interfaces, classes, functions, variables, etc.

  // To make members accessible from outside the namespace,
  // you MUST use the 'export' keyword.
  export interface MyInterface { /* ... */ }
  export class MyClass { /* ... */ }
  export function myFunction() { /* ... */ }
  export const MY_CONSTANT = 100;

  // Items without 'export' are private to the namespace
  const internalHelper = () => { /* ... */ };
  class InternalUtility { /* ... */ }
}
```

**Example:**

```typescript
namespace ValidationUtils {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      return emailRegex.test(s);
    }
  }

  export function isStringEmpty(s: string | null | undefined): boolean {
    return !s; // Basic check for null, undefined, or empty string
  }

  // This function is only usable *within* the ValidationUtils namespace
  function logValidationAttempt(value: string) {
      console.log(`Validating: ${value}`);
  }
}
```

## Accessing Namespace Members

To use an exported member from a namespace, you use the namespace name followed by a dot (`.`) and then the member name.

```typescript
// Using the ValidationUtils namespace from the example above:

let email = "test@example.com";
let validator: ValidationUtils.StringValidator = new ValidationUtils.EmailValidator();

if (validator.isValid(email)) {
  console.log(`${email} is a valid email.`);
} else {
  console.log(`${email} is not valid.`);
}

if (ValidationUtils.isStringEmpty(null)) {
  console.log("The string is empty.");
}

// Cannot access non-exported members:
// ValidationUtils.logValidationAttempt("test"); // Error: Property 'logValidationAttempt' does not exist on type 'typeof ValidationUtils'.
```

## Key Features and Considerations

*   **Organization:** Excellent for grouping related functionalities, especially in scenarios where you might not be using file-based modules extensively (e.g., single-file applications or global scripts).
*   **Scope Control:** Creates a distinct scope, preventing naming conflicts with other code or third-party libraries in the global scope.
*   **Explicitness:** You must `export` members you intend to use outside the namespace. Non-exported members are effectively private to the namespace.
*   **Nesting:** Namespaces can be nested inside other namespaces to create hierarchical structures.
    ```typescript
    namespace App {
      export namespace UI {
        export class Button { /* ... */ }
      }
      export namespace Services {
        export class ApiClient { /* ... */ }
      }
    }
    let button = new App.UI.Button();
    ```
*   **Aliasing:** You can create shorter aliases for namespaces, especially useful for nested ones, using an `import` alias declaration:
    ```typescript
    import UIElements = App.UI;
    let button = new UIElements.Button();
    ```
*   **Merging:** Multiple namespace declarations with the same name are merged by the compiler. This allows splitting a large namespace across multiple files (though requires careful compilation, often using `/// <reference>` tags or `--outFile`).

## Namespaces vs. Modules (ES Modules)

In modern TypeScript development, **ES Modules (`import`/`export` at the top level of files) are generally preferred** over namespaces for organizing code across files.

*   **Modules** are file-based; each file is a module. They have explicit dependencies (`import`) and integrate better with modern build tools, code splitting, and the broader JavaScript ecosystem.
*   **Namespaces** are primarily for logical grouping *within* a scope (which might be the global scope or another module/namespace). They don't inherently define file boundaries or manage dependencies between files in the same way modules do.

**Use Namespaces When:**

*   You need to structure code within the global scope (e.g., for scripts included directly in HTML without a module loader).
*   You want to group related items within a single, large file.
*   You are working with legacy code that uses namespaces.

**Prefer Modules When:**

*   Building applications or libraries of any significant size.
*   You need clear dependency management between files.
*   You want to leverage modern JavaScript tooling and features like code splitting.



















































Sources:
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript)