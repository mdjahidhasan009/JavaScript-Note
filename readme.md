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
This refers to JavaScript code written directly within an HTML document using the `<script>` tag. The code is embedded
within the HTML file and executed as part of the HTML document.
```html
<script>
  // Internal JavaScript code
  console.log("Hello from internal JavaScript!");
</script>
```

### External JavaScript
External JavaScript involves placing code in a separate file with a .js extension. This file is then linked to the HTML
document using the `<script>` tag with a src attribute. This method helps keep HTML and JavaScript code separate and 
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

# Environment Record
An Environment Record is a critical concept in JavaScript, defined in the ECMAScript specification, which represents the
association of identifiers (variable and function names) to specific variables and functions. This concept is based on
the lexical (static) structure of the JavaScript code.

### Lexical Association
The Environment Record captures the relationships between variable and function identifiers and their respective values
based on the code’s lexical structure. This means that the Environment Record is tightly coupled to how the code is 
written and nested.

### Creation
Every time a new block of code (e.g., a function, block statement, or catch clause) is evaluated, a new Environment
Record is created. This record is used to store the bindings (associations) of identifiers (such as variables and 
functions) created by that block of code.

### Types of Environment Records
#### Declarative Environment Record
This type of Environment Record is used to store bindings for variables, functions, and catch clauses. It is directly 
associated with specific code structures like functions and blocks.

#### Object Environment Record
This type of Environment Record is associated with objects and typically used for global variables where the environment
record points to an object (like the global object) that holds the bindings.

#### Global Environment Record
A specific type of Environment Record that combines both declarative and object environment records, used to handle the
global scope.

### Storage of Bindings
The Environment Record stores information about each identifier in the current execution context, including whether the
identifier is a variable, function, or parameter, and what value (if any) is associated with it.

### Access and Modification
When code is executed, the JavaScript engine uses the Environment Record to look up variable and function names to
determine their current values. When variables are assigned new values or new variables are declared, the Environment
Record is updated accordingly.

**Example** <br/>
Consider the following code:
```js
function outer() {
    var x = 10;
    function inner() {
        var y = 20;
        console.log(x + y);
    }
    inner();
}
outer();
```
* **Environment Record for outer**: When `outer()` is called, a new Environment Record is created for outer, which 
  contains the binding for the variable x and the function inner.
* **Environment Record for inner**: When `inner()` is called, a new Environment Record is created for inner, which 
  contains the binding for the variable y. The inner function can also access x from the outer function’s Environment 
  Record due to lexical scoping.

# Side Effects in JavaScript
In JavaScript, a side effect refers to any change in the state of the program that is observable outside the function
being executed. Side effects can include modifying global variables, changing the value of a function argument, or
interacting with the DOM. Below are some side effects which make function impure,
* Making an HTTP request. Asynchronous functions such as fetch and promise are impure.
* DOM manipulations
* Mutating the input data
* Printing to a screen or console: For example, console.log() and alert()
* Fetching the current time
* Math.random() calls: Modifies the internal state of Math object


# Memory Leaks
Memory leaks can lead to poor performance, slow loading times and even crashes in web applications. Some of the common
causes of memory leaks are listed below,

* The execessive usage of global variables or omitting the var keyword in local scope.
* Forgetting to clear the timers set up by setTimeout or setInterval.
* Closures retain references to variables from their parent scope, which leads to variables might not garbage collected
  even they are no longer used.

# Statement Affected by Automatic Semicolon Insertion(ASI)
JavaScript has a feature called Automatic Semicolon Insertion (ASI), where the parser automatically inserts semicolons 
at the end of certain statements if they are missing. This can sometimes lead to unexpected behavior, especially in 
statements where the presence or absence of a semicolon changes the meaning of the code.

Here are some examples of statements affected by ASI:

### Return Statement
If you use a return statement followed by a newline, JavaScript might insert a semicolon immediately after return, which 
can result in unexpected behavior.

```js
function example() {
  return
  {
    key: "value"
  };
}

console.log(example()); // Output: undefined
```
ASI inserts a semicolon after return, so the code is interpreted as return;, and the function exits without returning
the object.

**Corrected Code**
```js
function example() {
  return {
    key: "value"
  };
}

console.log(example()); // Output: { key: "value" }
```

### Throw Statement
Similar to the return statement, a throw statement followed by a newline can cause ASI to insert a semicolon after 
throw, leading to an error.
```js
function throwError() {
  throw
  new Error("Something went wrong");
}

throwError(); // SyntaxError: Unexpected token 'new'
```
ASI inserts a semicolon after throw, so the code is interpreted as throw;, followed by an unexpected new Error(...)
statement.

**Corrected Code**
```js
function throwError() {
  throw new Error("Something went wrong");
}

throwError(); // Throws an error as expected
```

### Continue and Break Statements
When used inside loops, if a continue or break statement is followed by a newline, ASI might insert a semicolon, leading
to unintended flow control.

```js
for (let i = 0; i < 5; i++) {
  if (i === 2)
    continue
  console.log(i);
}
```
ASI inserts a semicolon after continue, so the console.log(i) line is executed for all values of i, leading to the
output: 0, 1, 2, 3, 4.

**Correct Code**
```js
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
// Output: 0, 1, 3, 4
```

### var Statement
Although var statements are less commonly affected, if there's a newline after the variable name before the assignment, 
ASI might insert a semicolon, leading to unexpected behavior.

```js
var a 
= 5;

console.log(a); // Output: 5
```
ASI could insert a semicolon after var a, but in this specific case, it doesn’t because the assignment = 5; 
continues the line.

### Empty Statements
An empty statement can be a single semicolon, which might be automatically inserted by ASI and may affect the logic,
particularly in loops.

```js
for (let i = 0; i < 5; i++)
  ; // ASI may add a semicolon, effectively making the loop do nothing

console.log("Loop finished");
```
The loop runs without any operation due to the semicolon acting as an empty statement.

# Proxy
Proxies are not used in regular day to day JavaScript work but they enabled many exciting programming patterns. Some of
the real world use cases are listed below,

#### Vue3
Vue3 uses proxies to track changes in the data and update the DOM accordingly. This allows Vue to provide reactivity
without the need for getters and setters.

#### SolidJs
SolidJs is a reactive UI library that uses proxies to track dependencies and update the UI when the data changes reactive
store.

#### Immer
Immer is a library that allows you to work with immutable data structures in a mutable way. It uses proxies to create a
draft of the data that can be modified and then applied immutably.

#### ZenStack
ZenStack improved Prisma ORM for access control and data validation. It uses proxies to intercept and validate data
access.



# Inline Caching in JavaScript

Inline caching is an optimization technique based on the observation that repeated calls to the same function tend to 
occur on the same type of objects. The V8 compiler stores a cache of the type of objects that were passed as parameters 
in recent method calls. When the same function is called again, the compiler can directly search for the type in the 
cache.

## Example

Consider an example where the compiler stores the shape type in cache for repeated calls in a loop.

```javascript
let shape = {width: 30, height: 20}; // Compiler stores the type in cache as { width: <int>, height: <int>} after
// repeated calls

function area(obj) {
  // Calculate area
}

for (let i = 0; i < 100; i++) {
  area(shape);
}
```

After a few successful calls of the same `area` method to its same hidden class, the V8 engine omits the hidden class 
lookup and simply adds the offset of the property to the object pointer itself. As a result, this increases the 
execution speed.

## Types of Inline Caching

There are mainly three types of inline caching possible:

1. **Monomorphic:** This is an optimized caching technique where the same type of objects is always passed.
2. **Polymorphic:** This is a slightly optimized caching technique where a limited number of different types of objects
   can be passed.
3. **Megamorphic:** This is an unoptimized caching technique where any number of different objects can be passed.


* [Programming Language Foundation ](./1.Programming_Language.md)


# Sources
* [mrhm-dev/full-stack-army(github)](https://github.com/mrhm-dev/full-stack-army)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)