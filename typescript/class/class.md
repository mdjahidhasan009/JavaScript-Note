**What "Class Constants" Generally Means:**

A "class constant" typically refers to a value that:

1.  Is **associated with the class itself**, not with any specific instance (object) of the class.
2.  Is **immutable** (cannot be changed) after it's initially defined.
3.  Is often accessed directly using the class name (e.g., `MyClass.CONSTANT_VALUE`).

Think of universal values related to the class, like a default configuration setting, a mathematical constant used in the class's calculations, or a standard label.

---

Here's the refined explanation as a Markdown note:

# Class Constants in TypeScript

In TypeScript, a "class constant" refers to a value associated directly with a class definition itself, rather than with individual instances of the class. This value should be immutable (unchangeable) after its initial definition.

The primary way to declare a true class constant in TypeScript is using the combination of **`static` and `readonly`**:

1.  **`static`**: This keyword makes the property belong to the **class itself**, not to any instance created from the class. You access it using the class name (e.g., `ClassName.propertyName`).
2.  **`readonly`**: This keyword ensures that the property's value **cannot be changed** after its initial assignment (which usually happens right where it's declared).

## Using `static readonly` (Preferred Method for Class Constants)

This creates a property directly on the class constructor function that cannot be reassigned.

```typescript
class AppConfig {
  static readonly MAX_USERS = 100;
  static readonly API_ENDPOINT = "https://api.example.com/v1";

  // You can access it within static methods:
  static displayConfig() {
    console.log(`API Endpoint: ${AppConfig.API_ENDPOINT}`);
    console.log(`Max Users: ${AppConfig.MAX_USERS}`);
  }

  // Or within instance methods:
  checkLimit(currentUserCount: number): boolean {
    return currentUserCount < AppConfig.MAX_USERS;
  }
}

// Accessing the constants directly via the class name:
console.log(AppConfig.MAX_USERS); // Output: 100
console.log(AppConfig.API_ENDPOINT); // Output: https://api.example.com/v1

// AppConfig.MAX_USERS = 200; // Error! Cannot assign to 'MAX_USERS' because it is a read-only property.

AppConfig.displayConfig();
let configInstance = new AppConfig();
console.log(configInstance.checkLimit(50)); // Output: true
```

## Other Related Concepts (Distinctions)

*   **`readonly` (Instance Property):** Using `readonly` *without* `static` creates an *instance* constant. Each object created from the class will have its own copy of this property, and its value cannot be changed *after the object is initialized* (either at declaration or within the constructor). It's constant *per instance*, not *per class*.

    ```typescript
    class User {
      readonly userId: number; // Constant for each user instance

      constructor(id: number) {
        this.userId = id; // Can only be set here or at declaration
      }
    }
    let user1 = new User(1);
    let user2 = new User(2);
    // user1.userId = 5; // Error! Readonly property
    console.log(user1.userId); // 1
    console.log(user2.userId); // 2
    ```

*   **`const` (Module Scope):** The `const` keyword is used to declare constants in the broader scope (e.g., module scope), *outside* of a class definition. While a class can certainly *use* these external constants, they aren't technically "class constants" belonging directly to the class structure itself.

    ```typescript
    const DEFAULT_TIMEOUT = 5000; // Module-level constant

    class Connection {
      timeout: number = DEFAULT_TIMEOUT; // Using the external constant

      connect() {
        console.log(`Connecting with timeout: ${this.timeout}`);
      }
    }
    ```

**In summary:** For true class constants in TypeScript (immutable values belonging to the class itself), use the `static readonly` modifiers together.






































Sources:
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript)