
### Difference Between Function, Method, and Constructor Calls in JavaScript

If you are familiar with object-oriented programming, you are likely used to thinking of functions, methods, and class constructors as three separate things. But in JavaScript, these are just three different usage patterns of one single construct.

#### Functions

The simplest usage of function calls:

```javascript
function helloWorld(name) {
  return "hello world, " + name;
}

console.log(helloWorld("JS Geeks")); // "hello world JS Geeks"
```

#### Methods

Methods in JavaScript are nothing more than object properties that are functions.

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

You might wonder what exactly happens in a method call here. When we call the expression itself, it determines the binding of `this`. The expression `obj2.helloWorld()` looks up the `helloWorld` property of `obj` and calls it with the receiver object `obj2`.

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

Unlike function calls and method calls, a constructor call `new Employee('John Doe', 28)` creates a brand new object and passes it as the value of `this`, and implicitly returns the new object as its result.

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

# NFE (Named Function Expression)
A Named Function Expression (NFE) is a function expression that has a name. The name can be used to refer to the function
within the function itself or in the function's stack trace. NFEs are useful for self-referencing functions, recursion, and
debugging.

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

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)