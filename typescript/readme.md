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

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)