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


## Difference between Java and JavaScript
Both are totally unrelated programming languages and no relation between them. Java is statically typed, compiled, runs
on its own VM. Whereas Javascript is dynamically typed, interpreted, and runs in a browser and nodejs environments. 
Let's see the major differences in a tabular format,

| Feature         | Java                         | JavaScript                            |
|-----------------|------------------------------|---------------------------------------|
| **Typed**       | Strongly typed               | Dynamically typed                     |
| **Paradigm**    | Object-oriented programming  | Prototype-based programming           |
| **Scoping**     | Block-scoped                 | Function-scoped                       |
| **Concurrency** | Thread-based                 | Event-based                           |
| **Memory**      | Uses more memory             | Uses less memory, ideal for web pages |


## Load CSS and JS Files Dynamically
To dynamically load CSS and JavaScript files in a web page, you can create link (for CSS) and script (for JavaScript) 
elements and append them to the head tag of the document.

```js
function loadAssets(filename, filetype) {
  let fileReference;
  
  if (filetype === "css") {
    // Create a link element for the CSS file
    fileReference = document.createElement("link");
    fileReference.setAttribute("rel", "stylesheet");
    fileReference.setAttribute("type", "text/css");
    fileReference.setAttribute("href", filename);
  } else if (filetype === "js") {
    // Create a script element for the JS file
    fileReference = document.createElement("script");
    fileReference.setAttribute("type", "text/javascript");
    fileReference.setAttribute("src", filename);
  }
  
  if (fileReference) {
    document.getElementsByTagName("head")[0].appendChild(fileReference);
  }
}

// Example usage:
loadAssets("styles.css", "css");  // Loads a CSS file
loadAssets("script.js", "js");    // Loads a JavaScript file
```
Explanation:

#### CSS Files
* To load a CSS file dynamically, the function creates a link element.
* The rel attribute is set to "stylesheet" to specify that it is a stylesheet.
* The href attribute is set to the URL of the CSS file.

#### JavaScript Files
* To load a JavaScript file dynamically, the function creates a script element.
* The src attribute is set to the URL of the JavaScript file.

#### Appending to head:
* The created link or script element is then appended to the head tag, making it part of the DOM, and thereby loading 
  the respective CSS or JS file.

# JavaScript Programming Paradigms
JavaScript is a multi-paradigm language, supporting several programming styles. It encompasses imperative/procedural
programming, object-oriented programming, and functional programming.

### Imperative/Procedural Programming
JavaScript allows for writing code that explicitly outlines the steps needed to achieve a desired result. This style
focuses on describing the procedures and sequences of operations.

### Object-Oriented Programming (OOP)
JavaScript supports OOP through its prototype-based inheritance system. Unlike classical OOP languages that use classes, 
JavaScript uses prototypes to enable inheritance and object creation.

### Functional Programming
JavaScript supports functional programming by treating functions as first-class citizens. This means functions can be 
passed as arguments, returned from other functions, and assigned to variables. JavaScript includes features like 
higher-order functions and closures to facilitate functional programming.

### Event-Driven Programming
JavaScript is inherently event-driven, especially in web development. Event-driven programming involves responding to
events or user actions, such as clicks, keypresses, or data loading, by executing specific functions or code blocks.

### Asynchronous Programming
JavaScript is single-threaded and uses an event loop to handle asynchronous operations. Asynchronous programming allows
for non-blocking code execution, enabling tasks like fetching data from servers or handling user input without
interrupting the main thread.

### Declarative Programming
Declarative programming focuses on describing the desired outcome rather than the step-by-step process to achieve it.
JavaScript libraries like React use a declarative approach to define UI components based on their state.

### Functional Reactive Programming (FRP)
FRP is a programming paradigm that combines functional programming and reactive programming. Libraries like RxJS enable
FRP in JavaScript by providing tools to work with asynchronous data streams and events.


# Internal vs. External JavaScript
JavaScript code can be included in an HTML document in two ways: internally (inline) or externally (linked from an
external file).

### Internal JavaScript
This refers to JavaScript code written directly within an HTML document using the <script> tag. The code is embedded
within the HTML file and executed as part of the HTML document.
```html
<script>
  // Internal JavaScript code
  console.log("Hello from internal JavaScript!");
</script>
```

### External JavaScript
External JavaScript involves placing code in a separate file with a .js extension. This file is then linked to the HTML
document using the <script> tag with a src attribute. This method helps keep HTML and JavaScript code separate and 
promotes better code management and reuse.
```js
<script src="script.js"></script>
```

# JavaScript vs. Server-Side Scripts
JavaScript, as a client-side script, often executes faster than server-side scripts. This is due to the following reasons:

### Client-Side Execution
JavaScript runs directly in the browser, reducing the need for server communication for computations. This results in 
lower latency and faster execution.

### Server-Side Processing
Server-side scripts, such as those written in ASP, PHP, or other server-side languages, involve sending requests to the 
server, processing on the server, and receiving responses. This process introduces delays compared to client-side 
execution.



## Transpiler:

A transpiler (short for "source-to-source compiler") takes code written in one language and converts it to another 
language at the same level of abstraction. In the case of Babel, it transpiles modern JavaScript (e.g., ES6/ESNext) into
an older version of JavaScript (e.g., ES5) to ensure compatibility with environments that don't support newer language 
features.

## Compiler:

A compiler typically translates code from a high-level programming language (e.g., C, Java) to a lower-level language or
machine code (e.g., assembly language, bytecode) that can be executed directly by a computer's CPU.

* [Programming Language Foundation ](./1.Programming_Language.md)


# Sources
* [mrhm-dev/full-stack-army(github)](https://github.com/mrhm-dev/full-stack-army)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)