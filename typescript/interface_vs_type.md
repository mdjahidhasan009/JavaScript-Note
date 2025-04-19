# Interface vs. Type Alias in TypeScript

| Feature                    | Interface                                                                                                                              | Type                                                                                                                                |
|:---------------------------|:---------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------|
| **Primary Use Case**       | Primarily used for defining the structure and contract for objects and classes.                                                        | More flexible, allowing not only structures but also primitives, unions, intersections, tuples, literal types, and mapped types.    |
| **Error Messages/Support** | Provides better error messages and improved code editors' support (e.g., auto-completion).                                             | When used with object structures, the error messages and editor support may not be as streamlined as with interfaces.               |
| **Declaration Merging**    | Can be merged or extended using declaration merging when spanning across multiple parts of the codebase with the same interface name.  | Cannot be merged or extended like interfaces. Instead, you use intersections (`&`) and unions (`\|`) to compose complex types.      |
| **Implementation**         | Can be implemented by classes, ensuring adherence to the interface properties and methods.                                             | Cannot be implemented by classes, but is primarily used for defining custom types connected to various data structures or values.   |
| **Inheritance/Extension**  | Supports extending multiple interfaces, allowing a single interface to inherit properties and methods from multiple parent interfaces. | Types can be self-referential, allowing more complex recursive types better suited for nested data structures.                      |

**Additional Notes:**

**Interfaces** are often preferred for defining the "shape" of objects or the API contracts that classes must adhere to,
due to their better error messages for object shapes and the ability for declaration merging (useful when augmenting
existing interfaces, especially from third-party libraries).

* **Type aliases** offer more versatility beyond object shapes. They are essential for creating aliases for union types
  (`string | number`), intersection types (`A & B`), tuples (`[string, number]`), mapped types, and conditional types.
* The choice between `interface` and `type` often comes down to preference and the specific use case. For defining 
  object shapes or contracts for classes, `interface` is commonly recommended. For anything else (unions, intersections,
  mapping, aliasing primitives), `type` is necessary. Many projects use a mix of both.


### Resources
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript#intermediate-typescript-interview-questions-and-answers)