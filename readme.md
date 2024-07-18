ECMAScript is the scripting language that forms the basis of JavaScript. ECMAScript standardized by the ECMA 
International standards organization in the ECMA-262 and ECMA-402 specifications. The first edition of ECMAScript was 
released in 1997.


JavaScript was created by Brendan Eich in 1995 during his time at Netscape Communications. Initially it was developed 
under the name Mocha, but later the language was officially called LiveScript when it first shipped in beta releases of
Netscape.

### JavaScript interpreted language
JavaScript is traditionally considered an interpreted language, but modern execution involves a mix of interpretation 
and compilation.
#### Interpreted Language
In the traditional sense, JavaScript is interpreted. An interpreter in the browser reads over the JavaScript code, 
interprets each line, and runs it.
#### Just-In-Time (JIT) Compilation
Nowadays, modern browsers use a technology known as Just-In-Time (JIT) compilation. This means that the JavaScript 
engine compiles the JavaScript code to executable bytecode just as it is about to run, which combines aspects of both
interpretation and compilation.

### JavaScript Case Sensitive
Language keywords, variables, function names, object names, and other identifiers must always be typed with consistent
capitalization.
```js
let name = "John";
let Name = "Doe";

console.log(name); // Outputs: John
console.log(Name); // Outputs: Doe
```

# Tree Shaking
Tree shaking is a technique used in modern JavaScript build processes to eliminate dead code. It ensures that unused
modules or code are not included in the final bundle, leading to smaller and more efficient builds.

**Key Concepts** <br/>
* **Dead Code Elimination:** Tree shaking removes code that is never used or executed in the final application.
* **Static Analysis:**
  * Tree shaking relies on the static structure of ES2015 (ES6) module syntax, specifically `import` and `export`
    statements.
  * This static analysis allows the bundler to determine which parts of the code are actually being used and which can 
    be safely eliminated.
* **Module Bundlers:** 
  * The concept of tree shaking was popularized by Rollup, an ES2015 module bundler.
  * Other bundlers like Webpack have also adopted tree shaking techniques to optimize the build process.
  
### How Tree Shaking Works
Tree shaking works by analyzing the dependency graph of the modules in your application. Here's a simplified explanation 
of the process:
* **Import and Export Statements:** The bundler examines the import and export statements in the code to understand the 
  module dependencies and which parts of the code are used.
* **Dead Code Detection:** Any code that is not referenced or used by other parts of the application is considered "dead"
  and is removed from the final bundle.
* **Optimization:** The resulting bundle is optimized by removing these unused parts, reducing the bundle size and 
  improving performance.

EXAMPLE
```js
// utils.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}
```
```js
// main.js
import { add } from './utils';

console.log(add(2, 3));
```
In this example:
* Only the `add` function is used in `main.js`.
* The `subtract` and `multiply` functions are not used.
With tree shaking:
* The bundler will include only the `add` function in the final bundle.
* The `subtract` and `multiply` functions will be excluded from the final bundle.

### Benefits of Tree Shaking
* **Reduced Bundle Size:** By removing unused code, tree shaking significantly reduces the size of the final bundle, 
  leading to faster load times and better performance.
* **Improved Performance:** Smaller bundles mean less code to parse and execute, improving the overall performance of the
  application.
* **Cleaner Code:** Encourages developers to write modular and maintainable code by highlighting unused dependencies.


* [Programming Language Foundation ](./1.Programming_Language.md)


# Sources
* [mrhm-dev/full-stack-army(github)](https://github.com/mrhm-dev/full-stack-army)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)