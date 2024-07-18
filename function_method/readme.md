

## Difference Between Function, Method, and Constructor Calls in JavaScript

If you are familiar with object-oriented programming, you are likely used to thinking of functions, methods, and class
constructors as three separate things. But in JavaScript, these are just three different usage patterns of one single
construct.

#### Functions

The simplest usage of function calls:

```javascript
function helloWorld(name) {
  return "hello world, " + name;
}

console.log(helloWorld("JS Geeks")); // "hello world JS Geeks"
```

A function can take a form of immediately invoked function expression (IIFE):

```javascript
// Anonymous Self-invoking Function
(function() {
  // Do some stuff;
})();
```

Finally, there are also arrow functions:

```javascript
const myFunc = arg => {
    console.log("hello", arg)
}
```

#### Methods

Methods in JavaScript are nothing more than object properties that are functions that are stored as object properties. 
Here is an example:

```javascript
var obj = {
  helloWorld: function() {
    return "hello world, " + this.name;
  },
  name: 'John Carter'
};

console.log(obj.helloWorld()); // "hello world John Carter"
```

Notice how `helloWorld` refers to `this` properties of `obj`. Here it's clear, or you might have already understood, that `this` gets bound to `obj`. But the interesting point is that we can copy a reference to the same function `helloWorld` in another object and get a different answer. Let's see:

```javascript
var obj2 = {
  helloWorld: obj.helloWorld,
  name: 'John Doe'
};

console.log(obj2.helloWorld()); // "hello world John Doe"
```

You might wonder what exactly happens in a method call here. When we call the expression itself, it determines the 
binding of `this`. The expression `obj2.helloWorld()` looks up the `helloWorld` property of `obj` and calls it with the
receiver object `obj2`.

In ES6 we have classes. There the methods will look like this:

```javascript
class MyAwesomeClass {
  myMethod() {
    console.log("hi there");
  }
}

const obj1 = new MyAwesomeClass();
obj1.myMethod();
```

#### Constructors

The third use of functions is as constructors. Like function and method, constructors are defined with functions.

```javascript
function Employee(name, age) {
  this.name = name;
  this.age = age;
}

var emp1 = new Employee('John Doe', 28);
console.log(emp1.name); // "John Doe"
console.log(emp1.age); // 28
```

Unlike function calls and method calls, a constructor call `new Employee('John Doe', 28)` creates a brand new object and
passes it as the value of `this`, and implicitly returns the new object as its result.

The primary role of the constructor function is to initialize the object.

# First Order Function
A first-order function is a function that doesn’t accept another function as an argument and doesn’t return a function as its return value.

```js
function add(a, b) {
    return a + b;
}

console.log(add(2, 3)); // Outputs: 5
```

# Higher Order Function
A higher-order function is a function that accepts another function as an argument or returns a function as a return value, or both. These functions enable powerful programming techniques such as function composition, currying, and callbacks.

* Need for writing modular and resuable code.

### Accepting Another Function as an Argument (Callback):
```js
function higherOrderFunction(callback) {
    // Function logic here
    callback();
}

function sayHello() {
    console.log('Hello!');
}

higherOrderFunction(sayHello); // Outputs: Hello!
```

### Returning a Function as a Return Value
```js
function higherOrderFunction() {
    return function() {
        console.log('This is a returned function.');
    };
}

const returnedFunction = higherOrderFunction();
returnedFunction(); // Outputs: This is a returned function.
```

### Both Accepting and Returning Functions:
```js
function higherOrderFunction(callback) {
    return function() {
        callback();
        console.log('This is the returned function.');
    };
}

function sayHello() {
    console.log('Hello!');
}

const composedFunction = higherOrderFunction(sayHello);
composedFunction(); // Outputs: Hello! This is the returned function.
```

# Unary Function
A unary function is a function that takes exactly one argument. Unary functions are common in both functional and imperative programming paradigms. They are simple yet powerful tools that can be used in various contexts, including higher-order functions and function composition.

## Example
### Simple Unary Function:
```js
function square(x) {
    return x * x;
}

console.log(square(5)); // Outputs: 25
```
### Unary Function Used in Higher-Order Function
```js
function unaryFunctionExample(func, value) {
    return func(value);
}

function increment(x) {
    return x + 1;
}

console.log(unaryFunctionExample(increment, 5)); // Outputs: 6
```
## Use Cases
### Array Mapping
Unary functions are often used with array methods like map, where the function operates on each element of the array individually.
```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(x) {
    return x * 2;
});

console.log(doubled); // Outputs: [2, 4, 6, 8, 10]
```
### Function Composition
Unary functions can be composed to create more complex operations.
```js
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}

function double(x) {
    return x * 2;
 }

 const doubleThenSquare = compose(square, double);
 console.log(doubleThenSquare(5)); // Outputs: 100
```

# Currying function
Currying is a technique in functional programming where a function is transformed into a sequence of functions, each taking a single argument. Instead of taking all arguments at once, a curried function takes the first argument and returns a new function that takes the second argument, and so on, until all arguments have been provided. This allows for partial application of functions and more flexible and reusable code.

### Basic
```js
function add(x) {
    return function(y) {
        return x + y;
    };
}

const addFive = add(5);
console.log(addFive(3)); // Outputs: 8
console.log(add(5)(3)); // Outputs: 8
```

### Using more argument
```js
function multiply(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        };
    };
}

const multiplyByTwo = multiply(2);
const multiplyByTwoAndThree = multiplyByTwo(3);
console.log(multiplyByTwoAndThree(4)); // Outputs: 24
console.log(multiply(2)(3)(4)); // Outputs: 24
```

### Generic Curring Function
```js
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return function(...nextArgs) {
                return curried(...args, ...nextArgs);
            };
        }
    };
}

function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // Outputs: 6
console.log(curriedSum(1, 2)(3)); // Outputs: 6
console.log(curriedSum(1)(2, 3)); // Outputs: 6
```

#### Benefits of Currying
* **Reusability:** Curried functions allow for easy reuse of functions with partial application. You can fix certain arguments and create specialized functions.
* **Functional Composition:** Currying enables the creation of more modular and composable functions, making it easier to build complex logic from simpler functions.
* **Enhanced Readability:** Curried functions can lead to more readable and declarative code, especially when dealing with functions that are applied in a sequence

# Pure Function
A pure function is a function that, given the same set of inputs, will always return the same output and has no side effects. Side effects refer to any interaction with the outside world (like modifying a global variable, logging to the console, or altering the state of an object or data structure). Pure functions are a fundamental concept in functional programming and offer several advantages, including predictability, testability, and easier debugging.

### Characteristics of Pure Functions
* **Deterministic/Predictability:** Pure functions always produce the same output for the same input. They also avoid tight coupling and make it harder to break your application by not having any side effects. These principles are coming together with the Immutability concept of ES6: giving preference to const over let usage.
  ```js
  function add(a, b) {
      return a + b;
  }

  console.log(add(2, 3)); // Outputs: 5
  console.log(add(2, 3)); // Outputs: 5 (always the same result)
  ```
* **No Side Effect:** Pure functions do not modify any external state or rely on external state changes.
  ```js
  let counter = 0;

  // Impure function
  function increment() {
      counter++;
  }

  increment(); // This modifies the external variable 'counter'

  // Pure function
  function pureIncrement(value) {
    return value + 1;
  }

  console.log(pureIncrement(0)); // Outputs: 1 (no external state modified)
  ```
* **Easier Testing:** Pure functions are easier to test because they do not depend on or alter any external state. Also do not have any dependency injection.
  ```js
  console.assert(add(2, 3) === 5, 'Add function test failed');
  console.assert(multiply(2, 3) === 6, 'Multiply function test failed');
  ```
* **Referential Transparency:** Pure functions ensure referential transparency, meaning that a function call can be replaced with its corresponding output value without changing the program's behavior.
* **Simplified Debugging:** Debugging is simpler because pure functions do not depend on external states or cause side effects, reducing the potential for unexpected behavior.


# Lambda expressions or Arrow functions

Lambda expressions, also known as arrow functions, are a concise way to write functions in JavaScript. They provide a
shorter syntax compared to regular function expressions and do not bind their own `this`, `arguments`, `super`, or
`new.target`. Arrow functions are always anonymous and cannot be used as constructors. Best practice is to use arrow
functions for non-method functions and regular functions for methods.

# IIFE (Immediately Invoked Function Expression)

IIFE is a function that runs as soon as it's defined. Usually, it's anonymous (doesn't have a function name), but it 
also can be named. Here's an example of IIFE:

```javascript
(function() {
  console.log("Hi, I'm IIFE!");
})();
// outputs "Hi, I'm IIFE!"
```

#### Explanation

So, here's how it works. Remember the difference between function statements (`function a() {}`) and function 
expressions (`var a = function() {}`)? So, IIFE is a function expression. To make it an expression we surround our 
function declaration into the parens. We do it to explicitly tell the parser that it's an expression, not a statement 
(JS doesn't allow statements in parens).

After the function, you can see the two `()` braces, this is how we run the function we just declared.

That's it. The rest is details.

The function inside IIFE doesn't have to be anonymous. This one will work perfectly fine and will help to detect your 
function in a stack trace during debugging:

```javascript
(function myIIFEFunc() {
  console.log("Hi, I'm IIFE!");
})();
// outputs "Hi, I'm IIFE!"
```

It can take some parameters:

```javascript
(function myIIFEFunc(param1) {
  console.log("Hi, I'm IIFE, " + param1);
})("Yuri");
// outputs "Hi, I'm IIFE, Yuri!"
```

Here the value "Yuri" is passed to the `param1` of the function.

It can return a value:

```javascript
var result = (function myIIFEFunc(param1) {
  console.log("Hi, I'm IIFE, " + param1);
  return 1;
})("Yuri");
// outputs "Hi, I'm IIFE, Yuri!"
// result variable will contain 1
```

You don't have to surround the function declaration into parens, although it's the most common way to define IIFE. 
Instead, you can use any of the following forms:

```javascript
~function(){console.log("hi I'm IIFE")}()
!function(){console.log("hi I'm IIFE")}()
+function(){console.log("hi I'm IIFE")}()
-function(){console.log("hi I'm IIFE")}()
(function(){console.log("hi I'm IIFE")}());
var i = function(){console.log("hi I'm IIFE")}();
true && function(){ console.log("hi I'm IIFE") }();
0, function(){ console.log("hi I'm IIFE") }();
new function(){ console.log("hi I'm IIFE") }
new function(){ console.log("hi I'm IIFE") }()
```

Please don't use all these forms to impress colleagues, but be prepared that you can encounter them in someone's code.

#### Applications and Usefulness

Variables and functions that you declare inside an IIFE are not visible to the outside world, so you can:

1. **Use the IIFE for isolating parts of the code to hide details of implementation.**
2. **Specify the input interface of your code by passing commonly used global objects (window, document, jQuery, etc.) as IIFE’s parameters, and then reference these global objects within the IIFE via a local scope.**
3. **Use it in closures, when you use closures in loops.**
4. **IIFE is the basis of the module pattern in ES5 code. It helps to prevent polluting the global scope and provide the module interface to the outside.**
5. **IIFE is to obtain data privacy because any variables declared within the IIFE cannot be accessed by the outside world**

### Additional Information

IIFEs are a common pattern in JavaScript libraries and frameworks. They help to encapsulate code and avoid conflicts 
between different parts of the application or between different libraries. This pattern is especially useful when 
dealing with third-party libraries, ensuring that variables and functions do not leak into the global scope and cause
unexpected behavior.

Moreover, with the advent of ES6 modules, the need for IIFEs has decreased since modules provide a built-in mechanism
for scoping. However, understanding IIFEs is still important for working with older codebases and for situations where 
modules are not used.

# NFE (Named Function Expression)
A Named Function Expression (NFE) is a function expression that has a name. The name can be used to refer to the function
within the function itself or in the function's stack trace. NFEs are useful for self-referencing functions, recursion, 
and debugging.

Consider the following code:

```javascript
// NFE (Named Function Expression)
var foo = function bar() { return 12; };
typeof bar();
```

#### Answer

The output will be a `ReferenceError`. This is because the function `bar` is not defined in the global scope. To fix the bug, we can rewrite the code as follows:

#### Sample 1

```javascript
var bar = function() { return 12; };
typeof bar();
```

#### Sample 2

```javascript
function bar() { return 12; };
typeof bar();
```

### Explanation

- **Named Function Expression (NFE):** In the original code, `bar` is a named function expression. The name `bar` is only available within the function itself, not in the surrounding scope.
- **Reference Variable:** In Sample 1, `bar` is a reference variable that points to an anonymous function.
- **Function Statement:** In Sample 2, `bar` is a function declaration, making `bar` available in the surrounding scope.

### Example of Named Function Expression

```javascript
var foo = function bar() {
  // foo is visible here
  // bar is visible here
  console.log(typeof bar()); // Works here :)
};
// foo is visible here
// bar is undefined here
```

# Declaring a Function Using Function Expressions and Function Statements

Consider the following two ways to declare a function in JavaScript:

```javascript
var foo = function() {
  // Some code
};

function bar() {
  // Some code
}
```

#### Main Difference

The main difference is that `foo` is defined at run-time and is called a function expression, whereas `bar` is defined at parse time and is called a function statement.

## Run-Time Function Declaration (Function Expression)

In a function expression, the function is assigned to a variable. The function is not hoisted, meaning it is not available until the interpreter reaches the line of code where the function is defined. This is why attempting to call the function before it is defined will result in an error.

```javascript
// Run-Time function declaration
foo(); // Call foo function here, It will give an error
var foo = function() {
  console.log("Hi I am inside Foo");
};
```

In this example:
- `foo` is not available before the line `var foo = function() { ... }` is executed.
- Attempting to call `foo` before it is defined will result in an error.

## Parse-Time Function Declaration (Function Statement)

In a function statement, the function is hoisted to the top of its scope. This means the function is available throughout the scope in which it is defined, even before the line of code where the function is actually written.

```javascript
// Parse-Time function declaration
bar(); // Call bar function here, It will not give an Error
function bar() {
  console.log("Hi I am inside Bar");
}
```

In this example:
- `bar` is available throughout its scope, even before the line `function bar() { ... }`.
- Calling `bar` before it is defined will not result in an error.

### Explanation

- **Function Expression:**
  - Defined at run-time.
  - Not hoisted, meaning the function is not available until the interpreter reaches the line of code where the function is defined.
  - Example: `var foo = function() { ... };`

- **Function Statement:**
  - Defined at parse time.
  - Hoisted to the top of its scope, meaning the function is available throughout its scope even before the line of code where the function is actually written.
  - Example: `function bar() { ... }`

### Detailed Example

```javascript
// Function Expression
try {
  foo(); // Error: foo is not a function
} catch (e) {
  console.log(e);
}
var foo = function() {
  console.log("Hi I am inside Foo");
};
foo(); // "Hi I am inside Foo"

// Function Statement
bar(); // "Hi I am inside Bar"
function bar() {
  console.log("Hi I am inside Bar");
}
bar(); // "Hi I am inside Bar"
```

### Use Cases

- **Function Expressions:**
  - Useful for defining functions conditionally or within blocks.
  - Commonly used for creating anonymous functions, such as those passed as arguments to other functions.
  - Example: Assigning event handlers or callbacks.

  ```javascript
  var button = document.getElementById('myButton');
  button.onclick = function() {
    console.log('Button clicked!');
  };
  ```

- **Function Statements:**
  - Useful for defining utility functions or methods that need to be available throughout their scope.
  - Commonly used for creating top-level functions that perform specific tasks.

  ```javascript
  function calculateArea(width, height) {
    return width * height;
  }

  var area = calculateArea(5, 10);
  console.log(area); // Output: 50
  ```


## Typical Use Case for Anonymous Functions in JavaScript

### Definition
Anonymous functions are functions that are declared without any named identifier to refer to them. They are often used in scenarios where a function is only used once or in a specific context.

### Use Cases

1. **Single-use Functions:**
   No name is needed if the function is only used in one place. There is no need to add a name to the function if it will not be reused elsewhere.

   Example: `setTimeout` function
   ```javascript
   setTimeout(function() {
     alert("Hello");
   }, 1000);
   ```
   Here, there is no need to use a named function when we are sure that the function which alerts "Hello" will be used only once in the application.

2. **Event Handlers:**
   Anonymous functions are commonly used as callback functions in event handlers. Inline functions have the advantage that they can access variables in the parent scopes.

   Example: Adding a click event listener
   ```html
   <button id="myBtn"></button>
   ```

   ```javascript
   var btn = document.getElementById('myBtn');
   btn.addEventListener('click', function() {
     alert('button clicked');
   });
   ```
   The above example shows the use of an anonymous function as a callback function in an event handler.

3. **Callbacks:**
   Passing anonymous functions as parameters to other functions is a common use case.

   Example: Callback function
   ```javascript
   // Function which will execute the callback function
   function processCallback(callback) {
     if (typeof callback === 'function') {
       callback();
     }
   }

   // Call function and pass an anonymous function as callback 
   processCallback(function() {
     alert("Hi, I am an anonymous callback function");
   });
   ```

### Advantages of Using Anonymous Functions

- **Reduces Code:** They can reduce the amount of code, particularly in recursive functions and callback functions.
- **Scope Access:** Anonymous functions declared inline can access variables in the parent scope, making them useful in event handlers and callbacks.
- **Avoids Global Namespace Pollution:** They help avoid needless global namespace pollution by not creating named functions that can be accessed globally.

### Decision Making

The best way to decide whether to use an anonymous function is to ask the following question:
- Will the function which I am going to define be used anywhere else?

If the answer is yes, then create a named function rather than an anonymous function.

### Additional Use Cases

- **Immediately Invoked Function Expressions (IIFE):**
  Anonymous functions are often used in IIFEs to create a new scope and avoid polluting the global namespace.

  ```javascript
  (function() {
    // Code here runs immediately
    var temp = "IIFE";
    console.log(temp);
  })();
  // temp is not accessible here
  ```

- **Array Methods:**
  Anonymous functions are commonly used with array methods such as `map`, `filter`, and `reduce`.

  ```javascript
  var numbers = [1, 2, 3, 4, 5];
  var doubled = numbers.map(function(num) {
    return num * 2;
  });
  console.log(doubled); // [2, 4, 6, 8, 10]
  ```

### Conclusion
Anonymous functions are versatile and useful in many scenarios, especially when dealing with single-use functions, event handlers, and callbacks. They help keep the code clean and avoid unnecessary global variables.


## Setting Default Parameter Values in JavaScript

### Introduction
In languages like Python or C#, setting a default value for function parameters is common practice. For instance, in Python, you might define a function with default parameter values like this:

```python
# Define sendEmail function 
# configuration : Configuration object
# provider : Email Service provider, Default would be Gmail
def sendEmail(configuration, provider = 'Gmail'):
    # Your code logic
```

### Pre ES6/ES2015

There are several ways to achieve default parameter values in JavaScript before ES2015 (ES6).

### Method 1: Using `typeof` Operator

You can set a default parameter value using the `typeof` operator to check if a value has been passed.

```javascript
function sendEmail(configuration, provider) {
  // Set default value if user has not passed value for provider
  provider = typeof provider !== 'undefined' ? provider : 'Gmail';
  // Your code logic
}

// In this call we are not passing provider parameter value
sendEmail({
  from: 'xyz@gmail.com',
  subject: 'Test Email'
});
// Here we are passing Yahoo Mail as a provider value
sendEmail({
  from: 'xyz@gmail.com',
  subject: 'Test Email'
}, 'Yahoo Mail');
```

### Method 2: Using Logical OR Operator

Another way to set a default parameter value is by using the logical OR (`||`) operator.

```javascript
function sendEmail(configuration, provider) {
  // Set default value if user has not passed value for provider
  provider = provider || 'Gmail';
  // Your code logic
}

// In this call we are not passing provider parameter value
sendEmail({
  from: 'xyz@gmail.com',
  subject: 'Test Email'
});
// Here we are passing Yahoo Mail as a provider value
sendEmail({
  from: 'xyz@gmail.com',
  subject: 'Test Email'
}, 'Yahoo Mail');
```

### Method 3: Using Default Parameters in ES6

ES6 introduced a more straightforward way to set default parameter values.

```javascript
function sendEmail(configuration, provider = 'Gmail') {
  // Value of provider can be accessed directly
  console.log(`Provider: ${provider}`);
}

// In this call we are not passing provider parameter value
sendEmail({
  from: 'xyz@gmail.com',
  subject: 'Test Email'
});
// Here we are passing Yahoo Mail as a provider value
sendEmail({
  from: 'xyz@gmail.com',
  subject: 'Test Email'
}, 'Yahoo Mail');
```

### Conclusion
Setting default parameter values in JavaScript can be done in multiple ways. The modern approach using ES6 default parameters is more readable and concise. However, understanding the pre-ES6 methods is still valuable for maintaining older codebases.

## Function Binding in JavaScript

### Introduction
Function binding is an advanced JavaScript technique that is commonly used with event handlers and callback functions to preserve the code execution context while passing functions as parameters.

### Example

Consider the following example:

```javascript
var clickHandler = {
  message: 'click event handler',
  handleClick: function(event) {
    console.log(this.message);
  }
};

var btn = document.getElementById('myBtn');
// Add click event to btn
btn.addEventListener('click', clickHandler.handleClick);
```

In this example, the `clickHandler` object is created with a `message` property and a `handleClick` method. We assign the `handleClick` method to a DOM button, which will be executed in response to a click event. When the button is clicked, the `handleClick` method is called and logs a message to the console. However, instead of logging the message "click event handler", it logs `undefined`.

### Problem Explanation

The issue occurs because the execution context of the `clickHandler.handleClick` method is not preserved, causing `this` to point to the button (`btn`) object instead of the `clickHandler` object. We can fix this issue using the `bind` method.

### Solution Using `bind`

The `bind` method is available to all functions and takes an argument that sets the value of `this`.

```javascript
var clickHandler = {
  message: 'click event handler',
  handleClick: function(event) {
    console.log(this.message);
  }
};

var btn = document.getElementById('myBtn');
// Add click event to btn and bind the clickHandler object
btn.addEventListener('click', clickHandler.handleClick.bind(clickHandler));
```

### Additional Notes

- **`bind` Method:**
    - The `bind` method creates a new function that, when called, has its `this` keyword set to the provided value.
    - It is commonly used to ensure that `this` points to the correct object, even when the function is called in a different context.

- **`call` and `apply` Methods:**
    - Similar to `bind`, the `call` and `apply` methods can also be used to set the `this` value for a function. However, `call` and `apply` immediately invoke the function, whereas `bind` returns a new function.

### Example with `call` and `apply`

```javascript
var clickHandler = {
  message: 'click event handler',
  handleClick: function(event) {
    console.log(this.message);
  }
};

var btn = document.getElementById('myBtn');
// Using call method
btn.addEventListener('click', function(event) {
  clickHandler.handleClick.call(clickHandler, event);
});

// Using apply method
btn.addEventListener('click', function(event) {
  clickHandler.handleClick.apply(clickHandler, [event]);
});
```

### Conclusion

Function binding is a powerful technique in JavaScript that helps preserve the execution context of functions. It is especially useful in event handling and callback scenarios where the `this` keyword might otherwise refer to an unintended object.

## Understanding the `this` Keyword in Functions

The following JavaScript code snippet demonstrates the behavior of the `this` keyword in nested functions:

```javascript
function funcA() {
    console.log("funcA ", this);
    (function innerFuncA1() {
        console.log("innerFunc1", this);
        (function innerFunA11() {
            console.log("innerFunA11", this);
        })();
    })();
}

console.log(funcA());
```

#### Explanation

1. **First Function Call (`funcA`)**
    - `console.log("funcA ", this);`
    - When `funcA` is called, the `this` keyword refers to the global object (in non-strict mode) or `undefined` (in strict mode).
    - In a browser environment, the global object is `window`.

2. **First Nested Function (`innerFuncA1`)**
    - `(function innerFuncA1() { console.log("innerFunc1", this); })();`
    - `innerFuncA1` is an immediately invoked function expression (IIFE). Inside this function, `this` also refers to the global object (in non-strict mode) or `undefined` (in strict mode) because `innerFuncA1` is a regular function call.

3. **Second Nested Function (`innerFunA11`)**
    - `(function innerFunA11() { console.log("innerFunA11", this); })();`
    - Similar to `innerFuncA1`, `innerFunA11` is another IIFE. Inside this function, `this` again refers to the global object (in non-strict mode) or `undefined` (in strict mode).

The output of the code will be:
```
funcA  Window {...} (or `undefined` in strict mode)
innerFunc1  Window {...} (or `undefined` in strict mode)
innerFunA11  Window {...} (or `undefined` in strict mode)
```

#### Why Does `console.log(funcA());` Return `undefined`?

- The `funcA` function does not have a return statement, so it implicitly returns `undefined`.
- When `console.log(funcA());` is called, `funcA` is executed, and its return value (`undefined`) is passed to `console.log`, which then prints `undefined`.

```javascript
console.log(funcA()); // undefined
```

By adding a `return` statement inside `funcA`, you can change the return value:

```javascript
function funcA() {
    console.log("funcA ", this);
    (function innerFuncA1() {
        console.log("innerFunc1", this);
        (function innerFunA11() {
            console.log("innerFunA11", this);
        })();
    })();
    return "Completed";
}

console.log(funcA()); // "Completed"
```

### Important Note:
**Strict Mode**

If the code was run in strict mode (by adding `'use strict';` at the top of the script or function), `this` would be 
`undefined` in each of the function contexts instead of referring to the global object.

### Example with Strict Mode:
```javascript
'use strict';

function funcA() {
    console.log("funcA ", this);  // undefined
    (function innerFuncA1() {
        console.log("innerFunc1", this);  // undefined
        (function innerFunA11() {
            console.log("innerFunA11", this);  // undefined
        })();
    })();
}

console.log(funcA());
```

Output with Strict Mode:
```plaintext
funcA  undefined
innerFunc1  undefined
innerFunA11  undefined
undefined
```

In strict mode, the `this` keyword is `undefined` when not explicitly set by the call context.



### Explanation of the Code

```javascript
var obj = {
    message: "Hello",
    innerMessage: !(function() {
        console.log(this.message);
    })()
};

console.log(obj.innerMessage);
```

### Detailed Explanation

1. **Object Definition**:
    - An object `obj` is created with two properties: `message` and `innerMessage`.

2. **Immediately Invoked Function Expression (IIFE)**:
    - The `innerMessage` property is assigned the value returned by an IIFE.
    - The IIFE logs `this.message` to the console.

3. **`this` Keyword Context**:
    - Inside the IIFE, the `this` keyword refers to the global object (`window` in browsers) because the function is not called as a method of `obj`.
    - Since `window.message` is undefined, `console.log(this.message)` logs `undefined`.

4. **Logical NOT Operator**:
    - The result of the IIFE (which is `undefined` due to `console.log(this.message)`) is negated using the `!` operator.
    - `!undefined` evaluates to `true`.

5. **Property Assignment**:
    - The `innerMessage` property of `obj` is assigned the value `true`.

6. **Final Output**:
    - The `console.log(obj.innerMessage)` statement logs `true`.

### Summary
The code logs `undefined` from within the IIFE due to the `this` keyword referring to the global object. The `innerMessage` property is set to `true` because the IIFE returns `undefined`, which is negated by the `!` operator.

### Output

```
undefined
true
```

Another example 
```javascript
var obj = {
	message: "Hello",
	innerMessage: function() {
		return this.message;
	}
};

console.log(obj.innerMessage());
```

### Explanation

In this code snippet, an object `obj` is defined with two properties:

1. `message`: A string property with the value `"Hello"`.
2. `innerMessage`: A method that returns the value of `this.message`.

When `obj.innerMessage()` is called, the `this` keyword inside the `innerMessage` function refers to the `obj` object. Therefore, `this.message` evaluates to `obj.message`, which is `"Hello"`.

### Output

The output of the code is:
```
Hello
```

This is because the `innerMessage` method returns the value of the `message` property of the `obj` object, which is `"Hello"`.


### Explanation of the Code

```javascript
var obj = {
  message: 'Hello',
  innerMessage: function () {
    (function () {
      console.log(this.message);
    }());
  }
};
console.log(obj.innerMessage());
```

1. **Object Definition**:
    - An object `obj` is defined with two properties:
        - `message`: A string with the value 'Hello'.
        - `innerMessage`: A function that contains an immediately invoked function expression (IIFE).

2. **Function Execution**:
    - The `innerMessage` function is called using `console.log(obj.innerMessage());`.

3. **Immediately Invoked Function Expression (IIFE)**:
    - Within the `innerMessage` function, there's an IIFE:
      ```javascript
      (function () {
        console.log(this.message);
      }());
      ```
    - This IIFE is executed immediately when the `innerMessage` function is called.

4. **`this` Context**:
    - Inside the IIFE, `this` does not refer to the `obj` object. In JavaScript, the context of `this` inside a regular function refers to the global object (or `undefined` in strict mode) when not in an object method.
    - Since `this` inside the IIFE is not bound to `obj`, `this.message` will be `undefined`.

5. **Output**:
    - The `console.log(this.message);` inside the IIFE will print `undefined` because `this` does not refer to `obj`.

6. **Return Value**:
    - The `innerMessage` function does not return any value, so `console.log(obj.innerMessage());` will print `undefined`.

### Output

The output of the code will be:
```
undefined
undefined
```
The first `undefined` is from `console.log(this.message);` inside the IIFE.
The second `undefined` is from `console.log(obj.innerMessage());` because `innerMessage` does not return a value.



### Explanation of the JavaScript Code

The given code demonstrates the use of a workaround to preserve the context of \`this\` inside a nested function. Here is the code:

```javascript
var obj = {
  message: 'Hello',
  innerMessage: function () {
    var self = this;
    (function () {
      console.log(self.message);
    }());
  }
};
console.log(obj.innerMessage());
```

#### Explanation:

1. **Object Creation**: An object \`obj\` is created with two properties:
    - \`message\`: A string property with the value 'Hello'.
    - \`innerMessage\`: A function that logs the \`message\` property.

2. **\`innerMessage\` Function**:
    - A variable \`self\` is assigned the value of \`this\`, which refers to the \`obj\` object.
    - An immediately invoked function expression (IIFE) is defined and executed inside \`innerMessage\`.
    - Inside the IIFE, \`self.message\` is logged to the console.

#### Key Points:
- The use of \`var self = this;\` ensures that the context of \`this\` (which refers to the \`obj\` object) is preserved inside the IIFE.
- Without this workaround, \`this\` inside the IIFE would refer to the global object (or \`undefined\` in strict mode), not the \`obj\` object.
- \`console.log(obj.innerMessage());\` logs \`undefined\` because the \`innerMessage\` function does not return a value.

#### Output:
- The first \`console.log(self.message);\` inside the IIFE logs 'Hello'.
- The second \`console.log(obj.innerMessage());\` logs \`undefined\`.

By using this workaround, we can ensure that the inner function has access to the outer function's \`this\` context.


### Explanation of the Code

```javascript
function myFunc(){
    console.log(this.message);
}
myFunc.message = "Hi John";

console.log(myFunc());
```

#### Explanation

1. **Function Definition**:
    ```javascript
    function myFunc(){
        console.log(this.message);
    }
    ```
   This defines a function `myFunc` that logs the `message` property of the `this` context.

2. **Adding a Property to the Function**:
    ```javascript
    myFunc.message = "Hi John";
    ```
   In JavaScript, functions are objects, so you can add properties to them. Here, a `message` property with the value `"Hi John"` is added to the `myFunc` function object.

3. **Calling the Function**:
    ```javascript
    console.log(myFunc());
    ```
   When `myFunc` is called without an explicit context (like an object), the `this` context inside `myFunc` is set to `undefined` (in strict mode) or the global object (in non-strict mode). Since `this.message` refers to the global context and there is no `message` property in the global context, `this.message` is `undefined`.

    - The `console.log(this.message);` inside `myFunc` outputs `undefined` because `this` does not have a `message` property.
    - The `console.log(myFunc());` outputs `undefined` because `myFunc` does not return any value.

### Output
```
undefined
undefined
```

Other example

```javascript
function myFunc(){
	console.log(myFunc.message);
}
myFunc.message = "Hi John";
	
console.log(myFunc());
```

### Explanation

In this code snippet, the `myFunc` function has a property `message` assigned to it with the value "Hi John". When the `myFunc` function is called, it logs the value of `myFunc.message` to the console. Here’s a detailed explanation of what happens:

1. `function myFunc(){ console.log(myFunc.message); }`:
    - This defines a function `myFunc` that logs the value of its own `message` property to the console.

2. `myFunc.message = "Hi John";`:
    - This sets the `message` property of the `myFunc` function to "Hi John".

3. `console.log(myFunc());`:
    - This calls the `myFunc` function. Inside the function, `myFunc.message` is logged to the console, which outputs "Hi John".
    - The function `myFunc` itself does not return any value, so `undefined` is logged to the console as the return value of `myFunc`.

### Console Output
```
Hi John
undefined
```
- The first line "Hi John" is from the `console.log(myFunc.message);` inside the function.
- The second line `undefined` is from the `console.log(myFunc());` as the function does not return any value.

### Another example

```javascript
function myFunc() {
  myFunc.message = 'Hi John';
  console.log(myFunc.message);
}
console.log(myFunc());
```

### Explanation

In JavaScript, functions are objects. This means that they can have properties and methods just like any other object. In this example, `myFunc` is a function object and we are assigning a property `message` to it.

1. **Function Declaration**: `function myFunc() { ... }` declares a function named `myFunc`.
2. **Assigning Property**: `myFunc.message = 'Hi John';` assigns a property `message` with the value `'Hi John'` to the function object `myFunc`.
3. **Logging Property**: Inside the function `myFunc`, `console.log(myFunc.message);` logs the value of the property `message` of the function object `myFunc`.
4. **Function Call**: `console.log(myFunc());` calls the function `myFunc` and logs its return value.

## Output

When the code is executed, the following steps occur:

1. The function `myFunc` is called.
2. Inside the function, `myFunc.message` is set to `'Hi John'`.
3. `console.log(myFunc.message);` logs `'Hi John'` to the console.
4. The function `myFunc` does not explicitly return a value, so it returns `undefined` by default.
5. `console.log(myFunc());` logs the return value of `myFunc`, which is `undefined`.

### Result
```
Hi John
undefined
```

## Note

- Functions in JavaScript are first-class objects. This means they can have properties and methods, and can be passed as arguments to other functions, returned from functions, and assigned to variables.
- In this example, the function `myFunc` is used as an object to store the property `message`.

### Function Params Length

```javascript
function myFunc(param1,param2) {
  console.log(myFunc.length);
}
console.log(myFunc());
console.log(myFunc("a","b"));
console.log(myFunc("a","b","c","d"));
```

### Explanation:
- **myFunc.length** returns the number of parameters the function `myFunc` is defined to take.
- **console.log(myFunc());** calls the function `myFunc` without any arguments. Since the function doesn't return anything, it logs `undefined` to the console.
- **console.log(myFunc("a","b"));** calls the function `myFunc` with two arguments. It logs `myFunc.length`, which is 2, and then logs `undefined` because the function doesn't return anything.
- **console.log(myFunc("a","b","c","d"));** calls the function `myFunc` with four arguments. It still logs `myFunc.length`, which is 2, and then logs `undefined` because the function doesn't return anything.

### Output:
```
2
undefined
2
undefined
2
undefined
```

- The first value `2` is the output of `myFunc.length` which indicates the number of formal parameters the function is expecting.
- `undefined` is logged because the function `myFunc` does not have a return statement.


### Function Arguments Length

This code demonstrates the use of the `arguments` object in JavaScript functions to determine the number of arguments passed to the function.

```javascript
function myFunc() {
  console.log(arguments.length);
}

console.log(myFunc()); // Output: 0
console.log(myFunc("a","b")); // Output: 2
console.log(myFunc("a","b","c","d")); // Output: 4
```

#### Explanation

1. **Function Definition**:
    - The `myFunc` function is defined without any parameters.
    - Inside the function, `console.log(arguments.length)` is used to log the number of arguments passed to the function.

2. **Function Call: `myFunc()`**:
    - No arguments are passed.
    - `arguments.length` is `0`.

3. **Function Call: `myFunc("a","b")`**:
    - Two arguments are passed: `"a"` and `"b"`.
    - `arguments.length` is `2`.

4. **Function Call: `myFunc("a","b","c","d")`**:
    - Four arguments are passed: `"a"`, `"b"`, `"c"`, and `"d"`.
    - `arguments.length` is `4`.

The `arguments` object is an array-like object accessible inside functions that contains the values of the arguments passed to that function. The `length` property of the `arguments` object gives the number of arguments passed to the function.

Note that `arguments.length` does not depend on the number of parameters the function is declared with, but rather on the number of arguments actually passed during the function call.

# Explanation of the Code

```javascript
function Person(name, age){
    this.name = name || "John";
    this.age = age || 24;
    this.displayName = function(){
        console.log(this.name);
    }
}

Person.name = "John";
Person.displayName = function(){
    console.log(this.name);
}

var person1 = new Person('John');
person1.displayName();
Person.displayName();
```

## Explanation

1. **Function Constructor**:
    - `function Person(name, age)` is a constructor function used to create new objects.
    - It assigns default values to `name` and `age` if they are not provided.
    - It defines a method `displayName` which logs the `name` property of the created object.

2. **Adding Properties to Function Object**:
    - `Person.name = "John";` adds a property `name` to the `Person` function object itself, not to the instances created by the `Person` constructor.
    - `Person.displayName = function(){ console.log(this.name); }` adds a method `displayName` to the `Person` function object itself.

3. **Creating an Instance**:
    - `var person1 = new Person('John');` creates a new instance of `Person` with the `name` property set to 'John' and the default `age` of 24.

4. **Calling Methods**:
    - `person1.displayName();` calls the `displayName` method of the `person1` instance, which logs 'John' because `person1.name` is 'John'.
    - `Person.displayName();` calls the `displayName` method of the `Person` function object, which logs 'Person' because `this` refers to the `Person` function object, and `Person.name` is 'Person'.

## Console Output

```
John
Person
```

This explains why the console output is 'John' for `person1.displayName();` and 'Person' for `Person.displayName();`.

# Function Scope

#### Explanation of the Code

```javascript
function passWordMngr() {
    var password = '12345678';
    this.userName = 'John';
    return {
        pwd: password
    };
}
// Block End
var userInfo = passWordMngr();
console.log(userInfo.pwd); // Output: 12345678
console.log(userInfo.userName); // Output: undefined
```

### Explanation

1. **Function Definition**:
    - The `passWordMngr` function is defined. Inside this function:
        - A variable `password` is declared and assigned the value `'12345678'`.
        - A property `userName` is added to `this` and assigned the value `'John'`.
        - An object containing the property `pwd` with the value of `password` is returned.

2. **Function Invocation**:
    - The function `passWordMngr` is called, and the returned object is assigned to the variable `userInfo`.

3. **Output**:
    - `console.log(userInfo.pwd);` prints the value of the `pwd` property of the returned object, which is `'12345678'`.
    - `console.log(userInfo.userName);` prints `undefined` because the `userName` property was added to `this` within
      the `passWordMngr` function, but it is not included in the returned object.

### Key Points

- The `password` variable is a local variable within the `passWordMngr` function.
- The `userName` property is set on `this`, but since `this` is not returned, it is not accessible outside the function.
- The returned object only includes the `pwd` property, which contains the value of the local `password` variable.

### Scope and `this`

- The `password` variable is scoped within the `passWordMngr` function.
- The `userName` property is set on the `this` context within the `passWordMngr` function. However, since the function is called without an object context, `this` refers to the global object in non-strict mode or `undefined` in strict mode (the function itself returns an object, not `this`).

This code snippet highlights the importance of understanding scope, `this` context, and object return values in JavaScript.

Same reason this example will return undefined

```javascript
var employeeId = 'aq123';
function Employee() {
  this.employeeId = 'bq1uy';
}
console.log(Employee.employeeId); // Output: undefined
```

# JavaScript Prototype and Instance Properties

This code snippet demonstrates how JavaScript handles instance properties and prototype properties.

```javascript
var employeeId = 'aq123';

function Employee() {
    this.employeeId = 'bq1uy';
}
console.log(new Employee().employeeId); // Output: bq1uy

Employee.prototype.employeeId = 'kj182';
Employee.prototype.JobId = '1BJKSJ';
console.log(new Employee().JobId); // Output: 1BJKSJ
console.log(new Employee().employeeId); // Output: bq1uy
```

## Explanation

1. **Global Variable**:
    - `var employeeId = 'aq123';` - This defines a global variable `employeeId`.

2. **Constructor Function**:
    - `function Employee() { this.employeeId = 'bq1uy'; }` - This defines a constructor function `Employee` with an instance property `employeeId` set to `'bq1uy'`.

3. **Creating an Instance**:
    - `console.log(new Employee().employeeId);` - This creates a new instance of `Employee` and logs the `employeeId`. The output is `'bq1uy'` because the instance property takes precedence over the prototype property.

4. **Prototype Properties**:
    - `Employee.prototype.employeeId = 'kj182';` - This sets a prototype property `employeeId` on the `Employee` prototype.
    - `Employee.prototype.JobId = '1BJKSJ';` - This sets another prototype property `JobId` on the `Employee` prototype.

5. **Accessing Prototype Property**:
    - `console.log(new Employee().JobId);` - This creates a new instance of `Employee` and logs the `JobId`. The output is `'1BJKSJ'` because `JobId` is not an instance property, so it falls back to the prototype property.

6. **Accessing Instance Property Again**:
    - `console.log(new Employee().employeeId);` - This creates another new instance of `Employee` and logs the `employeeId`. The output is `'bq1uy'` again, for the same reason as before.

### Summary

- Instance properties defined inside the constructor function (`this.property`) take precedence over prototype properties.
- Prototype properties are used when the instance does not have its own property with the same name.


Miscellaneous

```js
var employeeId = 'aq123';
(function Employee() {
	try {
		throw 'foo123';
	} catch (employeeId) {
		console.log(employeeId); // Output: foo123
	}
	console.log(employeeId); // Output: aq123
}());
```

## Function Scope and Variable Shadowing

## Function is a First Class Object

In JavaScript, functions are first class objects. This means that 
* Functions can be treated like any other object. 
* They can be 
  * Assigned to variables 
  * Passed as arguments to other functions 
  * Returned from functions
  * Have properties and methods.

### Key Characteristics

1. **Assigned to Variables**:
   Functions can be assigned to variables just like any other value.

    ```javascript
    const greet = function(name) {
        return 'Hello, ' + name;
    };
    console.log(greet('Alice')); // Output: Hello, Alice
    ```

2. **Passed as Arguments**:
   Functions can be passed as arguments to other functions.

    ```javascript
    function callFunction(func, value) {
        return func(value);
    }
    const greet = function(name) {
        return 'Hello, ' + name;
    };
    console.log(callFunction(greet, 'Bob')); // Output: Hello, Bob
    ```

3. **Returned from Functions**:
   Functions can be returned from other functions.

    ```javascript
    function createGreeting(greeting) {
        return function(name) {
            return greeting + ', ' + name;
        };
    }
    const sayHello = createGreeting('Hello');
    console.log(sayHello('Charlie')); // Output: Hello, Charlie
    ```

4. **Have Properties and Methods**:
   Functions can have properties and methods just like any other object.

    ```javascript
    function greet(name) {
        return 'Hello, ' + name;
    }
    greet.language = 'English';
    console.log(greet.language); // Output: English
    ```

### Implications

- **Higher-Order Functions**: Functions that take other functions as arguments or return them are called higher-order
  functions. This allows for powerful patterns like callbacks, functional programming, and more.
- **Closures**: Functions can "remember" the scope in which they were created, which leads to closures. This is useful
  for data privacy and function factories.
- **Asynchronous Programming**: Functions being first-class citizens enable the use of callbacks, promises, and async/await
  for handling asynchronous operations.

### Example

Here's an example that demonstrates several of these characteristics:

```javascript
// Function assigned to a variable
const add = function(a, b) {
    return a + b;
};

// Function passed as an argument
function operate(func, x, y) {
    return func(x, y);
}
console.log(operate(add, 5, 3)); // Output: 8

// Function returned from another function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}
const double = multiplier(2);
console.log(double(4)); // Output: 8

// Function with a property
add.description = 'Adds two numbers';
console.log(add.description); // Output: Adds two numbers
```

In summary, functions being first-class objects in JavaScript provides a lot of flexibility and power in how you can use
and manipulate them within your code.

## Writing a `mul` Function to Work with Curried Syntax

To write a `mul` function that works properly when invoked with the following syntax:

```javascript
console.log(mul(2)(3)(4)); // output: 24
console.log(mul(4)(3)(4)); // output: 48
```

You can define the function like this:

```javascript
function mul(x) {
  return function(y) { // anonymous function
    return function(z) { // anonymous function
      return x * y * z;
    };
  };
}
```

#### Explanation

Here, the `mul` function accepts the first argument and returns an anonymous function. This anonymous function then takes the second parameter and returns another anonymous function, which finally takes the third and final parameter. The last function then multiplies `x`, `y`, and `z`, and returns the result of the operation.

In JavaScript, a function defined inside another function has access to the outer function's scope and can consequently return, interact with, or pass on to other functions the variables belonging to the scopes that encapsulate it.

### Key Points about JavaScript Functions

1. **A function is an instance of the Object type.**
2. **A function can have properties and has a link to its constructor method.**
3. **A function can be stored as a variable.**
4. **A function can be passed as a parameter to another function.**
5. **A function can be returned by another function.**


### Drawback of Declaring Methods Directly in JavaScript Objects
One of the primary drawbacks of declaring methods directly in JavaScript objects is that it is memory inefficient. When 
you declare methods inside the constructor of an object, a new copy of the method is created for each instance of that 
object. This can lead to increased memory usage, especially when creating many instances of the object.

Example:
```js
var Employee = function (name, company, salary) {
  this.name = name || "";       
  this.company = company || "";
  this.salary = salary || 5000;

  // Method declared directly inside the constructor
  this.formatSalary = function () {
      return "$ " + this.salary;
  };
};

// Alternatively, we can add the method to Employee's prototype:
Employee.prototype.formatSalary2 = function() {
    return "$ " + this.salary;
};

// Creating objects
var emp1 = new Employee('Yuri Garagin', 'Company 1', 1000000);
var emp2 = new Employee('Dinesh Gupta', 'Company 2', 1039999);
var emp3 = new Employee('Erich Fromm', 'Company 3', 1299483);
```

Explanation:<br/>
* **Direct Method Declaration:** In the example above, the `formatSalary` method is declared directly inside the `Employee` 
  constructor. As a result, each instance (`emp1`, `emp2`, `emp3`) will have its own copy of the `formatSalary` method. 
  This can lead to significant memory overhead if many instances are created.
* **Prototype Method Declaration:** Conversely, the `formatSalary2` method is added to the `Employee.prototype`. This 
  means that all instances of `Employee` share a single copy of the `formatSalary2` method. This approach is more memory
  efficient because the method is only stored once in memory, regardless of how many instances are created.

**Benefits of Using the Prototype:**<br/>
1. **Memory Efficiency:** Only one copy of the method exists in memory, regardless of the number of instances.
2. **Consistency:** Methods defined on the prototype are shared across all instances, ensuring consistent behavior.
3. **Performance:** Reduces memory footprint, which can improve performance, especially in applications with many object instances.

## `function.length`
`length` property of a function to find the number of parameters it expects. The length property returns the number of 
parameters defined in the function's declaration.The length property only counts the parameters before the first one 
with a default value.
```js
function sum(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}

console.log(sum.length); // Outputs: 4

function multiply(a, b, c = 1) {
    return a * b * c;
}

console.log(multiply.length); // Outputs: 2
```
Not recommended to place parameters with default values before trailing parameters without default values. This can lead 
to unexpected behavior and errors.
```js
function multiply(a, b=1, c) {
    return a * b * c;
}

console.log(multiply(1,2))//NaN
console.log(multiply(2,3,4))//24

console.log(multiply.length); // Outputs: 1
```

## `eval`
The eval function in JavaScript is a powerful tool that evaluates a string of JavaScript code in the context of the current
scope. While it can execute code dynamically, its use is generally discouraged due to security risks and performance issues.

**Syntax**
```js
eval(string);
```
Such as
```js
console.log(eval("1 + 2")); //  3
```
<details>
<summary>More about eval</summary>

**Evaluating Expressions**
```js
const x = 10;
const y = 20;
const result = eval('x * y');
console.log(result); // 200
```

**Evaluating Code Blocks**
```js
eval(`
  function sayHello() {
    console.log('Hello, world!');
  }
  sayHello();
`);
// Output: Hello, world!
```

**Modifying Scope**
```js
let a = 1;
eval('a = 2');
console.log(a); // 2
```
### Risks and Limitations
**Security Risks**

Using `eval` can open up your code to injection attacks, especially if you are evaluating strings that may contain user 
input. This can lead to the execution of malicious code.
```js
const userInput = '2 + 2';
console.log(eval(userInput)); // 4

const maliciousInput = 'console.log("Hacked!");';
eval(maliciousInput); // Output: Hacked!
```
**Performance Issues**

Code executed via `eval` cannot be optimized by JavaScript engines, leading to slower performance compared to directly 
written code.

Scope Changes

Code evaluated with `eval` can modify variables in the local scope, making it harder to debug and maintain.
```js
function testEval() {
  let x = 1;
  eval('x = 2');
  return x;
}
console.log(testEval()); // 2
```

### Alternatives to `eval`
**Function Constructor**

The `Function` constructor can be a safer alternative to eval for dynamically creating functions.
```js
const func = new Function('a', 'b', 'return a + b');
console.log(func(2, 3)); // 5
```
**JSON Parsing**
For parsing JSON data, always use `JSON.parse` instead of `eval`.
```js
const jsonString = '{"name": "John", "age": 30}';
const jsonObj = JSON.parse(jsonString);
console.log(jsonObj.name); // John
```
**Template Literals**
```js
const name = 'John';
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, John!
```

</details>

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)