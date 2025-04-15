# TypeScript: Class vs. Interface Comparison

Both classes and interfaces are fundamental concepts in TypeScript for defining the structure of objects, but they serve different purposes and have distinct characteristics.

| Feature / Aspect      | Class (`class`)                                       | Interface (`interface`)                                         |
| :-------------------- | :---------------------------------------------------- | :-------------------------------------------------------------- |
| **Keyword**           | Defined using the `class` keyword.                    | Defined using the `interface` keyword.                          |
| **Purpose**           | Acts as a blueprint for creating objects (instances). | Defines a contract or shape that objects must adhere to.        |
| **Implementation**    | **Contains implementation details** (method bodies, constructor logic, field initializers). Contains executable code. | **Contains only declarations** (method signatures, property names and types). Does *not* contain implementation or executable code. Serves as a contract or outline. |
| **Instantiation**     | **Can be instantiated** using the `new` keyword to create objects. | **Cannot be instantiated** directly using `new`. It's a compile-time construct. |
| **Runtime Presence**  | **Exists at runtime.** Compiles to JavaScript functions/classes. | **Erased at runtime.** Primarily used for compile-time type checking; does not generate JavaScript code. |
| **Inheritance**       | Uses `extends` for single class inheritance.          | Uses `extends` for multiple interface inheritance (combining contracts). |
| **Implementing**      | A class can `implement` one or more interfaces to enforce its structure. | An interface cannot implement a class or another interface. |
| **Constructors**      | Can have `constructor` methods for initialization.    | Cannot have constructors.                                       |
| **Access Modifiers**  | Can use `public`, `private`, `protected` on members.  | Members are implicitly `public`; access modifiers cannot be used. |
| **Declaration Merging**| Class declarations cannot be merged.                | Interface declarations with the same name are automatically merged. |

**Key Takeaways:**

*   Use a **Class** when you need to create objects with specific implementation logic, behavior (methods), and state (properties), often requiring initialization via a constructor. Classes are the actual "factories" for objects.
*   Use an **Interface** when you need to define a **contract** or **shape** for objects or classes, ensuring they have specific properties and methods without dictating *how* they are implemented. Interfaces are primarily for type checking and ensuring structural compatibility.



# TypeScript: Choosing Between Interfaces and Classes

In TypeScript, both `interface` and `class` allow you to define custom types and structures for your code. However, they serve distinct purposes. Choosing the right one depends on what you need to achieve.

## When to Use Interfaces (`interface`)

Use an `interface` primarily when you need to **define a contract or shape** that objects or classes must adhere to, without providing implementation details. Think of it as describing *what* something should look like, not *how* it works.

**Choose an `interface` when:**

* You want to define the **shape or structure** of an object (e.g., required properties, method signatures).
* Your primary goal is **compile-time type checking** – ensuring variables, function parameters, or return values match a specific structure.
* You are defining a **contract** that multiple, potentially unrelated, classes might `implement`.
* You need a **lightweight** type definition that **doesn't generate any JavaScript code** at runtime (interfaces are erased during compilation).
* You want to define the structure of objects coming from external sources (like **API responses**).
* You need to leverage **declaration merging** (adding properties/methods to an existing interface definition, common in library augmentation).
* You want to describe the shape of function types or array types.

**Example:**

```typescript
interface User {
  id: number;
  name: string;
  isActive: boolean;
  logIn(): void; // Method signature, no implementation
}

function greetUser(user: User) {
  console.log(`Hello, ${user.name}!`);
  if (user.isActive) {
    user.logIn();
  }
}
```

## When to Use Classes (`class`)

Use a `class` when you need a **blueprint to create instances (objects)** that bundle together **state (properties)** and **behavior (methods with implementation)**. Classes define *both* the structure *and* the implementation.

**Choose a `class` when:**

* You need to **create instances** of the type using the `new` keyword.
* You need to include **concrete implementation logic** (method bodies, constructor logic, property initializers).
* You want to leverage **Object-Oriented Programming (OOP)** features like:
  * **Inheritance:** Using `extends` to inherit properties and methods *implementation* from a single parent class.
  * **Encapsulation:** Using access modifiers (`public`, `private`, `protected`) to control visibility.
  * **Constructors:** To initialize object state upon creation.
* You need the defined structure to **exist at runtime** as a JavaScript function/class.
* You need instance-specific state and methods.

**Example:**

```typescript
class Employee implements User { // Implements the User contract
  id: number;
  name: string;
  isActive: boolean = false;
  department: string;

  constructor(id: number, name: string, department: string) {
    this.id = id;
    this.name = name;
    this.department = department;
  }

  logIn(): void { // Concrete implementation
    this.isActive = true;
    console.log(`${this.name} logged in.`);
  }

  getDepartment(): string {
    return this.department;
  }
}

let emp = new Employee(101, "Alice", "Engineering");
greetUser(emp); // Works because Employee implements User
console.log(emp.getDepartment()); // Access class-specific method
```

**Simple Rule of Thumb:**

* Need to define a **shape/contract**? Use an **`interface`**.
* Need to create **instances** with **implementation/behavior**? Use a **`class`**.

Often, you'll use both: define contracts with `interface` and provide concrete implementations that adhere to those contracts with `class` (using the `implements` keyword).


































Sources:
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript)