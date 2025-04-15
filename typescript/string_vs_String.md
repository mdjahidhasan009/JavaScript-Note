# Difference Between `String` and `string` in TypeScript

In TypeScript, `String` and `string` both represent textual data, but they have different meanings and use cases:

*   **`string`**: This is the simplest, preferred, and most commonly used type for representing textual data in TypeScript. It's a primitive type that is automatically assigned to string literals. When you use the `string` type, TypeScript performs type checking and ensures that all operations and assignments are valid for strings.

    ```typescript
    let text: string = 'Hello, TypeScript!';
    ```

*   **`String`**: This is a built-in global object of JavaScript and wraps around the simple `string` type to provide additional methods and functionalities. The `String` object acts as a constructor for creating new strings and as a namespace for various utility methods to manipulate or inspect strings. However, in most scenarios, it is not necessary to use the `String` object, as TypeScript and JavaScript automatically convert primitive strings to `String` objects when required.

    ```typescript
    let wrappedText: String = new String('Wrapped TypeScript!');
    ```

In practice, you should generally use the `string` type for working with textual data in TypeScript, as it provides type checking and simpler, more efficient code. In contrast, avoid using the `String` object unless you have a specific use case that requires the additional functionality it provides.
























































Sources:
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript)