# Execution Context
The execution context in JavaScript is a data structure that stores the information necessary for executing a piece of 
code. It includes the code itself, the values of the variables used in the code, and the scope chain. The scope chain 
is a list of objects that are used to resolve variable names.

The execution context has two phases:
## Creation phase
In this phase, the JavaScript engine creates the execution context and sets up the script's environment. This includes 
creating the variable object and the scope chain.

## Execution phase
In this phase, the JavaScript engine executes the code in the execution context. This includes evaluating expressions,
assigning values to variables, and calling functions.

The execution context is created when a function is called. The function's code is then executed in the execution 
context. When the function returns, the execution context is destroyed.

### Execution Context and Hoisting
One important concept related to execution context is hoisting. Hoisting is a JavaScript mechanism where variables and
function declarations are moved to the top of their scope before code execution. This means that no matter where functions
and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local.

# Hoisting
- **Hoisting** is a JavaScript mechanism where variables and function declarations are moved to the top of their scope 
  before code execution.
- This means that no matter where functions and variables are declared, they are moved to the top of their scope 
  regardless of whether their scope is global or local.
- **Note:** Only declarations are hoisted, not initializations.

## Global Execution Context(GEC)
The Global Execution Context is the default and first execution context that the JavaScript engine creates when your
script starts to run. It is responsible for executing the global code, which includes all code that is not inside any
function or object.

#### Creation Phase
The Global Execution Context is created as soon as the JavaScript engine begins executing the script, even before any
code runs. This context is created when the file first loads in the browser or when the script is executed in a Node.js
environment.

#### Single Context
Since JavaScript is single-threaded, there is only one Global Execution Context throughout the entire lifecycle of the
script. No matter how many functions are called, they all exist within the scope of this single global context.

#### Hoisting
During the creation phase of the Global Execution Context, the JavaScript engine hoists function declarations and variable
declarations to the top of the script. This means that you can call functions and access variables before they are
actually declared in the code.

##### Global Object and `this`
* **Global Object**: In a browser environment, this is the window object. In Node.js, it is the global object.
* **this keyword**: In the global context, this refers to the global object (window in the browser or global in Node.js).

#### Variable and Function Declarations
All variables and function declarations that are not inside any function or block are part of the Global Execution
Context. These are accessible globally throughout the script.

```js
var x = 10;

function A() {
  console.log("Start function A");

  function B() {
    console.log("In function B");
  }

  B();
}

A();

console.log("GlobalContext");
```
In this example:
* The variables x, and the functions A and B are created in the Global Execution Context.
* The code var x = 10;, the function A(), and the console.log("GlobalContext"); are all executed in the Global Execution
  Context.

## Function Execution Context(FEC)
Whenever a function is invoked, the JavaScript engine creates a Function Execution Context (FEC) within the Global 
Execution Context to execute the code inside that function.

#### Creation Phase
An FEC is created each time a function is invoked. Unlike the Global Execution Context, there can be multiple Function
Execution Contexts, one for each active function invocation.

#### Local Variables
Variables declared inside a function are local to that function and are not accessible outside of it. These variables are
created and stored in the Function Execution Context.

#### Hoisting
During the creation phase of the Function Execution Context, the JavaScript engine hoists function declarations and
variable declarations to the top of the function. This means that you can call functions and access variables before they
are actually declared in the code.

#### Components
Each Function Execution Context consists of the following components:
* Local Variable Object (LVO): Holds function arguments, local variables, and inner function declarations.
* Scope Chain: Consists of the current function's variables and its outer environment references, up to the global scope.
* this keyword: Refers to the object that is the context of the function invocation.

#### Execution Phase
The FEC is created, code inside the function is executed, and then the FEC is destroyed after the function completes.

```js
function A() {
  console.log("Start function A");

  function B() {
    console.log("In function B");
  }

  B();
}

A();
```
In this example:
* When A() is called, an FEC is created for A.
* Inside A, when B() is called, a new FEC is created for B.
* After B() finishes executing, its FEC is destroyed. Similarly, after A() completes, its FEC is also destroyed.

## Temporal Dead Zone
The Temporal Dead Zone (TDZ) is a concept in JavaScript that refers to the period of time during which **a variable is 
in scope but cannot be accessed**. This period occurs between the entering of the scope where the variable is defined
and its actual declaration and initialization.

This behavior is specific to variables declared with the `let` and `const` keywords as they are hoisted to the top of
their block scope. However, unlike variables declared with var, they are not initialized with undefined. Accessing 
these variables before their declaration results in a ReferenceError.

```js
function somemethod() {
  console.log(counter1); // undefined
  console.log(counter2); // ReferenceError: Cannot access 'counter2' before initialization
  console.log(counter3); // ReferenceError: counter3 is not defined
  var counter1 = 1;
  let counter2 = 2;
}
```

## Hoisting in Functions
Consider the following function expression:

```javascript
var foo = function foo() {
  return 12;
};
```

In JavaScript, `var`-declared variables and functions are hoisted. Let's take function hoisting first. The JavaScript interpreter looks ahead to find all variable declarations and hoists them to the top of the function where they're declared.

```javascript
 // Here foo is still undefined
foo(); //TypeError: foo is not a function
var foo = function foo() {
  return 12;
};
```

The code above, behind the scenes, looks something like this:

```javascript
var foo = undefined;
// Here foo is undefined
foo(); // TypeError: foo is not a function
foo = function foo() {
  // Some code stuff
};
foo(); // Now foo is defined here
```

If you use `let`, will that get hoisted?

## Hoisting at function declarations and function expressions
### Functional Declaration
A function declaration is fully hoisted to the top of its scope, **including both the declaration and the definition**. This means you can call the function before it appears in the code.
```js
message("Good morning"); // Outputs: Good morning

function message(name) {
  console.log(name);
}
```
### Function Expression
A function expression is only partially hoisted. The variable declaration is hoisted, but the assignment of the function definition is not. This means that while the variable is hoisted, it is initially set to undefined, and trying to call it before the assignment results in an error.
```js
foo(); // Uncaught TypeError: foo is not a function
var foo = function foo() {
  return 12;
};
```

## Hoisting of Variables
### Hoisting with `let`

In JavaScript, `let` and `const` declared variables are hoisted but are not initialized. This means that the variable is in a "temporal dead zone" from the start of the block until the declaration is encountered. Trying to access the variable before the declaration results in a `ReferenceError`.

```javascript
foo(); // ReferenceError: Cannot access 'foo' before initialization
let foo = function foo() {
  return 12;
};
```

### Example: Variable Hoisting

What will be the output of the following code?

```javascript
var salary = "1000$";

(function () {
  console.log("Original salary was " + salary);

  var salary = "5000$";

  console.log("My New Salary " + salary);
})();
```

#### Answer

The code above will output: `undefined`, `5000$` because of hoisting. In the code presented above, you might be expecting 
`salary` to retain its value from the outer scope until the point that `salary` was re-declared in the inner scope. But
due to hoisting, `salary` value was `undefined` instead. To understand it better, have a look at the following code, 
where the `salary` variable is hoisted and declared at the top in function scope. When we print its value using 
`console.log`, the result is `undefined`. Afterwards, the variable is redeclared and the new value `"5000$"` is assigned
to it.

The code above, behind the scenes, looks something like this:
```javascript
var salary = "1000$";
(function () {
  var salary = undefined;
  console.log("Original salary was " + salary);

  salary = "5000$";

  console.log("My New Salary " + salary);
})();
```

```js
var employeeId = '1234abe';
(function() {
	console.log(employeeId);
	var employeeId = '122345';
	(function() {
		var employeeId = 'abc1234';
	}());
}());
```
Output will be `undefined` because of hoisting. The variable `employeeId` is hoisted to the top of the function scope,
and it is declared as `undefined`. When we try to print the value of `employeeId` before it is assigned, it will return
`undefined`.

```js
(function() {
	console.log(typeof displayFunc);
	var displayFunc = function(){
		console.log("Hi I am inside displayFunc");
	}
}());
```
Output will be `undefined` because of hoisting as same as the previous example.

```js
var employeeId = 'abc123';
function foo(){
	employeeId = '123bcd';
	return;
}
foo();
console.log(employeeId);//123bcd
```

```js
var employeeId = 'abc123';

function foo() {
  employeeId = '123bcd';
  return;

  function employeeId() {}
}
foo();
console.log(employeeId);//abc123
```

```js
var employeeId = 'abc123';

function foo() {
  employeeId();
  return;

  function employeeId() {
    console.log(typeof employeeId);
  }
}
foo();
```
Explanation:<br/>
In JavaScript, function declarations are hoisted to the top of their scope. In the example, `employeeId` inside `foo`
refers to the function declaration `employeeId()`, not the global variable `employeeId`. When `employeeId()` is called,
it logs `"function"` because the function declaration is hoisted.

```javascript
function foo() {
    employeeId();
    var product = 'Car';

    function employeeId() {
        console.log(product);
    }
}
foo();
```

### Explanation:

In this example, `employeeId` is a function declared inside `foo`. When `employeeId()` is called, it logs the value of 
`product`. Due to JavaScript's hoisting mechanism, the `product` variable is hoisted to the top of its scope in the `foo`
function, so `employeeId()` can access `product` even though it is declared after the function call. However, the value 
assigned to `product` is not hoisted, only the declaration is. At the time `employeeId()` is called, `product` is 
`undefined` because the assignment `product = 'Car'` has not yet been executed. Therefore, the output will be `undefined`.

But this code below will print `Car` as the `product` variable defined and assigned before the `employeeId` function is called.
```js
function foo() {
    var product = 'Car'; 

    function employeeId() {
        console.log(product);
    }

    employeeId();
}
foo(); // This will print 'Car'
```

```js
if(0) {
  function getData() {}
}
console.log(getData); // undefined
```
Explanation:<br/>
In JavaScript, function declarations are hoisted to the top of their scope. In this example, the function declaration
`getData` is hoisted to the top of the block scope. However, since the condition `0` is falsy, the block of code is not
executed, and `getData` is never defined. Therefore, when `console.log(getData)` is called, it logs `undefined`.

```js
if(1) {
  function getData() {}
}
console.log(getData); // f getData() {}
```
Explanation:<br/>
In this example, the condition `1` is truthy, so the block of code is executed. The function declaration `getData` is
hoisted to the top of the block scope and is defined. Therefore, when `console.log(getData)` is called, it logs the
function definition `f getData() {}`.

### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
