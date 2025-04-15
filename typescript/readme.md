# TypeScript
TypeScript is a typed superset of JavaScript created by Microsoft that adds optional types, classes, async/await, and 
many other features. It compiles to plain JavaScript, allowing developers to write code that is more predictable and 
easier to debug. Angular, a popular frontend framework, is built entirely in TypeScript.

### Installation
To install TypeScript, you need to have Node.js installed. You can install TypeScript globally using npm with the
following command:
```bash
npm install -g typescript
```

### Version Checking
This command will display the TypeScript version on your system, confirming that the installation was successful.
```bash
tsc --version
```

### Usage
To compile a TypeScript file, use the `tsc` command followed by the filename. For example, to compile a file named
`index.ts`, you would run:
```bash
tsc index.ts
```

This will generate a JavaScript file named `index.js` in the same directory.

### Example
Here is an example of a simple TypeScript program that prints "Hello, World!" to the console:
```typescript
function greet(name: string): void {
    console.log(`Hello, ${name}!`);
}

greet("World");
```

To compile and run this program, save it to a file named `index.ts` and run:
```bash
tsc index.ts
node index.js
```

This will output:
```
Hello, World!
```

### Some Features
TypeScript brings several powerful features to JavaScript development, which help in creating safer, more maintainable, and scalable code. Here are some key features of TypeScript:

* **Static Typing**: TypeScript introduces static typing, providing type checking during the development stage rather than at runtime. This leads to early detection of errors and better developer tooling.
* **Interfaces**: Interfaces define the shape, structure, and contract of objects or classes, allowing for custom types and enforcing a consistent structure across your codebase.
* **Classes**: TypeScript supports object-oriented programming concepts like inheritance, encapsulation, and abstraction through classes and their related features, such as constructors, access modifiers, and abstract classes.
* **Generics**: Generics enable you to create highly reusable and flexible components that work with a variety of types without sacrificing type safety.
* **Type Inference**: TypeScript automatically infers types of variables and expressions when they are not explicitly specified.

### Differences from JavaScript
| Feature              | TypeScript                                | JavaScript                                           |
|----------------------|-------------------------------------------|------------------------------------------------------|
| Language Paradigm    | Object-oriented programming language      | Scripting language                                   |
| Typing Support       | Supports static typing                    | Dynamic typing                                       |
| Modules              | Supported                                 | Not supported (ES6 onwards, modules are supported)   |
| Interface            | Supports interfaces                       | Does not support interfaces                          |
| Optional Parameters  | Functions support optional parameters     | Functions do not support optional parameters         |

## Advantages of TypeScript Over JavaScript

* **Compile-Time Error Checking**: TypeScript catches errors during development, reducing runtime errors. JavaScript, being an interpreted language, lacks this feature.
* **Strong Typing**: TypeScript supports static typing, allowing for type correctness checks at compile time, which is not possible in JavaScript.
* **Compatibility with Different ECMAScript Versions**: TypeScript can compile .ts files into ES3, ES4, and ES5, providing flexibility compared to JavaScript's ES6 features, which might not be supported in all browsers.
* **Advanced autocompletion and IntelliSense**: TypeScript provides enhanced autocompletion, code navigation, and refactoring capabilities through better integration with editors like Visual Studio Code, making the development process faster and more efficient.
* **Large-scale application support**: Features like classes, interfaces, generics, and namespaces in TypeScript facilitate the design of modular code, making it well-suited for large and complex applications.
* **Code maintainability**: TypeScript's static types, interfaces, and other OOP features contribute to better code readability and maintainability, making it easier for developers to understand and work with shared codebases.
* **Better tooling and editor support**: TypeScript provides excellent integration with popular IDEs, resulting in advanced autocompletion, code navigation, and refactoring tools. This improves the development experience and boosts productivity.

## TypeScript Declaration Files
It is known that not all JavaScript libraries or frameworks have TypeScript declaration files. But if you still want to 
use libraries or frameworks in your TypeScript files without getting compilation errors, the only solution is declare
keyword along with a variable declaration. For example, let's imagine you have a library called customLibrary that 
doesn’t have a TypeScript declaration and have a namespace called customLibrary in the global namespace. You can use this
library in typescript code as below,
```js
declare var customLibrary;
```

In the runtime, typescript will provide the type to the customLibrary variable as any type. The another alternative 
without using declare keyword is below

```js
var customLibrary: any;
```


## Some Component of Typescript
TypeScript consists of several components that work together to provide powerful features for developers building JavaScript applications:

* **Language**− TypeScript extends JavaScript by adding optional static typing, interfaces, classes, decorators, namespaces, and many other features that JavaScript doesn't have natively.
* **Compiler** − TypeScript has a dedicated transpiler (tsc) that compiles TypeScript code into plain JavaScript. The TypeScript compiler ensures type safety, checks for errors, and transpiles TypeScript into JavaScript, which can run across different browsers and platforms.
* **Language Service**: The TypeScript Language Service provides editor support, such as IntelliSense, code completion, syntax highlighting, and refactoring, for modern development environments like Visual Studio, VSCode, WebStorm, etc. These advanced editing features enable developers to write code efficiently and productively.
* **Type Definitions**: TypeScript uses type definition files (.d.ts) to provide type information about external libraries or JavaScript code. Type definitions help TypeScript developers access type information for third-party libraries like jQuery, React, or Express that are written in JavaScript. The DefinitelyTyped repository is a popular source of type definitions for various JavaScript libraries.
* **Tooling**: TypeScript has robust integration with popular build tools, test runners, task runners, and bundlers, such as Webpack, Rollup, Gulp, Grunt, Babel, and Jest. These integrations ensure a smooth development, testing, and build process for TypeScript developers.


# Automatic TypeScript Compilation on File Changes (Watch Mode)

Yes, you can configure the TypeScript compiler (`tsc`) to automatically recompile your `.ts` files whenever you save changes. This significantly speeds up the development workflow by eliminating the need to manually run the compiler after every modification.

This feature is commonly known as **"watch mode"**.

## How to Use Watch Mode

There are two main ways to enable watch mode:

**1. Watching a Single File:**

   If you are working on a single TypeScript file, you can tell the compiler to watch just that file. Open your terminal or command prompt, navigate to the directory containing the file, and run:

   ```bash
   tsc your-file.ts --watch
   ```

   (Replace `your-file.ts` with the actual name of your file). The compiler will perform an initial compilation and then stay active, watching for changes in `your-file.ts` and recompiling it automatically whenever you save modifications.

**2. Watching an Entire Project (using `tsconfig.json`):**

   This is the more common and recommended approach for projects with multiple files.

   *   **Ensure you have a `tsconfig.json` file:** This file defines your project's TypeScript settings. If you don't have one, you can generate it by running `tsc --init` in your project's root directory.
   *   **Run `tsc` with the `--watch` flag:** Navigate to your project's root directory (where `tsconfig.json` resides) in the terminal and simply run:

     ```bash
     tsc --watch
     ```
     *or equivalently*
     ```bash
     tsc -w
     ```

   The compiler will read the settings from `tsconfig.json`, compile all the files included in the project according to those settings, and then watch all relevant `.ts` files for changes. Any saved change will trigger a fast, incremental recompilation.

## `watch` Option in `tsconfig.json`

While you *can* add `"watch": true` within the `compilerOptions` section of your `tsconfig.json`, **this setting itself does not automatically start watch mode when you run just `tsc`**. Its primary purpose is related to how watch mode behaves *when it's already activated* via the command line (`tsc --watch`).

Therefore, the standard way to **activate** watch mode for a project is always by running `tsc --watch` or `tsc -w` in the terminal.

**In Summary:**

Using `tsc --watch` (either for a single file or for a project with `tsconfig.json`) provides real-time feedback by automatically recompiling your TypeScript code upon changes, streamlining the development process.












































Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript)