### Difference Between Function, Method, and Constructor Calls in JavaScript

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


### Writing a `mul` Function to Work with Curried Syntax

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

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)