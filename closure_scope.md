# Scope
Scope in JavaScript refers to the **accessibility of variables, functions, and objects** in various parts of your code 
during runtime. It determines the visibility and lifetime of these entities within different areas of your code.

There are four types of scope 
* global, 
* function, 
* block, 
* module

### Global Scope
Variables declared **outside any function or block** have global scope. They are accessible from anywhere in the code.
```js
var globalVar = "I am a global variable";

function checkScope() {
  console.log(globalVar); // Accessible here
}

checkScope(); // Outputs: I am a global variable
console.log(globalVar); // Outputs: I am a global variable
```

### Function Scope
Variables declared within a function are function-scoped. They can only be accessed within the function in which they 
were declared.

```js
function checkScope() {
  var functionVar = "I am a function-scoped variable";
  console.log(functionVar); // Accessible here
}

checkScope(); // Outputs: I am a function-scoped variable
console.log(functionVar); // Error: functionVar is not defined
```

### Block Scope
Variables declared with `let` or `const` within a block (e.g., inside an `if` statement or a `for` loop) are 
block-scoped. They are only accessible within that block.

```js
if (true) {
  let blockVar = "I am a block-scoped variable";
  console.log(blockVar); // Accessible here
}

console.log(blockVar); // Error: blockVar is not defined
```

#### Block and Function Scope 
```js
function outerFunction() {
  var functionVar = "Outer function variable"; // Function scope
  console.log("Inside function:", functionVar); // Output: Inside function: Outer function variable
  console.log("Inside function:", anotherFunctionVar); // Output: Inside function: undefined -> as it is hoisted to top of function as var is function-scoped
  try {
    console.log("Inside function:", blockVar); 
  } catch (error) {
    console.log(error.message); // Output: blockVar is not defined
  }  

  if (true) {
    let blockVar = "Block variable"; // Block scope
    var functionVar = "Inner function variable"; // Shadowing outer functionVar -> as var is function-scoped
    // it now replaces the value of the outer functionVar inside intire function  
    var anotherFunctionVar = "Another inner function variable"; // Function scope  

    console.log("Inside block:", functionVar); // Output: Inside block: Inner function variable
    console.log("Inside block:", blockVar);    // Output: Inside block: Block variable
  }

  console.log("Outside block:", functionVar); // Output: Outside block: Inner function variable
  // console.log("Outside block:", blockVar); // Error: blockVar is not defined
}

outerFunction();

try {
  console.log(functionVar);     
} catch (error) {
  console.log(error.message); //functionVar is not defined
}

```


### Module Scope
Variables declared in a module are scoped to that module. They are not accessible outside the module unless 
explicitly exported.

```js
// module.js
export const moduleVar = "I am a module-scoped variable";

// main.js
import { moduleVar } from './module.js';
console.log(moduleVar); // Outputs: I am a module-scoped variable
```

## Scope Chain
When a variable is referenced, JavaScript looks up the scope chain to find it. The scope chain starts from the current 
scope and moves up to the global scope.

```js
var globalVar = "Global";

function outerFunction() {
  var outerVar = "Outer";

  function innerFunction() {
    var innerVar = "Inner";
    console.log(innerVar); // Outputs: Inner
    console.log(outerVar); // Outputs: Outer -> from outerFunction scope
    console.log(globalVar); // Outputs: Global ->from global scope
  }

  innerFunction();
}

outerFunction();
```

## Lexical Scope
JavaScript uses lexical scoping (or static scoping), which means the **scope of a variable is determined by its position 
in the source code**. Nested functions have access to variables declared in their outer scope.

```js
function outerFunction() {
  var outerVar = "Outer";

  function innerFunction() {
    console.log(outerVar); // Accessible due to lexical scoping
  }

  innerFunction();
}

outerFunction(); // Outputs: Outer
```






# Closure
A closure is a function defined inside another function (called the parent function) and, as such, it has access to the
variables declared and defined within its parent function's scope.

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the
lexical environment). In other words, a closure gives a function access to its outer scope.

In JavaScript, closures are created every time a function is created, at function creation time.

The closure has access to variables in three scopes:
1. Variables declared in its own scope/variables defined between its curly brackets.
2. Variables declared in its parent function's scope/outer function's scope.
3. Variables declared in the global namespace/global variables.

#### Example of a Closure:

```javascript
var globalVar = "abc"; // Global variable

// Parent self-invoking function
(function outerFunction (outerArg) { // start of outerFunction's scope

  var outerFuncVar = 'x'; // Variable declared in outerFunction's function scope   
  
  // Closure self-invoking function
  (function innerFunction (innerArg) { // start of innerFunction's scope

    var innerFuncVar = "y"; // Variable declared in innerFunction's function scope
    console.log(         
      "outerArg = " + outerArg + "\n" +
      "outerFuncVar = " + outerFuncVar + "\n" +
      "innerArg = " + innerArg + "\n" +
      "innerFuncVar = " + innerFuncVar + "\n" +
      "globalVar = " + globalVar);
  	
  // end of innerFunction's scope
  
  })(5); // Pass 5 as parameter to our Closure

// end of outerFunction's scope

})(7); // Pass 7 as parameter to the Parent function
```

In this example:
- `globalVar` is a global variable.
- `outerFunction` is the parent function that takes `outerArg` as an argument and declares `outerFuncVar`.
- `innerFunction` is the closure that takes `innerArg` as an argument and declares `innerFuncVar`.

Because `innerFunction` is defined inside `outerFunction`, it has access to:
- Its own variables: `innerArg` and `innerFuncVar`.
- Variables of its parent function `outerFunction`: `outerArg` and `outerFuncVar`.
- Global variables: `globalVar`.

When executed, the code above will produce the following output:

```
outerArg = 7
outerFuncVar = x
innerArg = 5
innerFuncVar = y
globalVar = abc
```

This demonstrates how `innerFunction`, the closure, can access variables from its own scope, its parent function's 
scope, and the global scope. This is the essence of closures in JavaScript.

### Common Use Cases of Closures:
#### Data Privacy
Closures can be used to create private variables and methods. By defining variables within a function's scope and 
returning inner functions that have access to those variables, you can create a form of encapsulation, limiting access
to certain data or functionality.

#### Function Factories
Closures are often used to create functions with pre-set parameters. This is useful when you need to create multiple
functions with similar behavior but different configurations.

#### Callback Functions
Closures are frequently used in asynchronous programming, such as handling event listeners or AJAX requests. The inner
function captures variables from the outer scope and can access them when the callback is invoked.

#### Memoization
Closures can be used for memoization, a technique to optimize performance by caching the results of expensive function 
calls. The inner function can remember the results of previous calls and return the cached result if the same input is
provided again.

#### iterators and Generators
Closures can be used to create iterators and generators, which are essential for working with collections of data in
modern JavaScript.


### Uses of Closures:
* Module Design Pattern
* Currying
* Function like `once`
* Memoization
* Maintaining state in async operations
* setTimeouts
* Iterators and Generators

### Disadvantages of Closures:
* **Memory Consumption:** Closures consume more memory than regular functions because they keep a reference to their 
  outer scope.
* **Performance Overhead:** Closures can cause performance issues due to the scope chain lookup process.
* **Memory Leaks:** Improper use of closures can lead to memory leaks, especially in long-running applications.
* **Difficult to Debug:** Closures can make debugging more challenging due to their complex scope chain.
* **Maintaining State:** Closures can make it difficult to manage state in asynchronous operations.

### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [Closures in JS 🔥 | Namaste JavaScript Episode 10](https://www.youtube.com/watch?v=qikxEIxsXco)
