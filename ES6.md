# ES6
ES6, also known as ECMAScript 2015, is the sixth edition of the JavaScript language and was released in June 2015. It 
introduced several new features and syntax improvements to the language, aimed at making the code more concise, 
maintainable, and powerful. ES6 is widely supported by modern browsers, but for compatibility with older browsers,
transpilers like Babel.js are often used.

# Key Features of ES6

## Constants or Immutable Variables
The introduction of the const keyword allows the declaration of variables whose values cannot be reassigned.

## Block-Scoped Variables
The let and const keywords provide block-scoping, which limits the scope of variables to the block, statement, or 
expression in which they are used, unlike var, which has function scope.

## Arrow Functions
Arrow functions (=>) offer a concise syntax for writing functions and lexically bind the this value, making them a great 
alternative to traditional function expressions.

### Difference between Arrow Functions and Regular Functions or Arrow Function vs Regular Function
#### Syntax
- **Arrow function:** use `=>` to separate the parameters from the function body.
  ```js
  const add = (a, b) => a + b;
  ```
- **Normal Function:** uses the `function` keyword.
  ```js
  function add(a, b) {
    return a + b;
  }
  ```
#### `this` Binding
- **Arrow function:** does not have its own `this` context. It uses the `this` value from the surrounding code.
  ```js
  const obj = {
      name: "Alice",
      greet: () => {
      console.log("Hello, " + this.name);
      }
  };
  
  obj.greet(); // Output: Hello, undefined
  ```
  When you use an arrow function as the constructor (or even assign an arrow function to the constructor property), 
  `this` inside the arrow function does not refer to the newly created object.  Instead, it inherits this from the 
  surrounding scope, which is typically the global scope (window in browsers) or in strict mode, `undefined`. <br/>
  **In browser**
  ```js
  const obj = {
      name: "Alice",
      greet: () => {
      console.log("Hello, " + this.name);
      }
  };


  window.name = "nothing";
  obj.greet(); // Output: Hello, nothing
  ```
  **In Node**
  ```js
  // Node.js example

  var globalVar = "I'm a global var (using var)"; // Attached to global
  let blockScopedVar = "I'm block scoped (using let)"; // NOT attached to global
  const globalConst = "I'm a global constant (using const)"; // NOT attached to global

  global.name = "Node Global Name"; // Setting a property on the global object

  const obj = {
    name: "Alice", // This is local to the object
    greet: () => {
      // Accessing the global object's name property
      console.log("1=>Hello, " + global.name); // Output:1=>Hello, Node Global Name
      // 'this' is the global object in Node.js for arrow functions, but name will be undefined because name is NOT attached to global
      console.log("2=>Hello, " + this.name);   // Output:2=>Hello, undefined
    },
  };

  obj.greet();
  console.log(`3=>${global.globalVar}`); // Output:3=>undefined
  console.log(`4=>${global.blockScopedVar}`); // Output:4=>undefined (let variables are not on global)
  console.log(`5=>${global.globalConst}`); // Output:5=>undefined (const variables are not on global)
  console.log(`6=>${name}`); // Output:6=>Node Global Name
  ```
  `global.name = "Node Global Name";`: This correctly sets the `name` property on the global object.

  `console.log("1=>Hello, " + global.name);`: This correctly accesses the `name` property of the global object, so you see "Hello, Node Global Name".

  `console.log("2=>Hello, " + this.name);`:  This is where I was wrong.  While it's true that in Node.js the `this` context *outside* of any function (in the global scope) is the global object (in non-strict mode), inside an arrow function the `this` binding behaves differently.

  * **Arrow functions and `this`:** Arrow functions in Node.js, just like in browsers, do *not* have their own `this` binding. They inherit `this` from the surrounding *lexical* scope.
  *   **Lexical Scope in Node.js Modules:** In Node.js, each file is treated as a separate module. The top-level scope of a module is *not* the global scope in the same way it is in a browser.  The surrounding scope of your arrow function is the module scope, not the global object.

  *   **Result:** Since `name` is not defined in the module scope (you declared it with `let` outside the object, which is module scoped, not global), `this.name` inside the arrow function is `undefined`.

  `console.log("3=>${global.globalVar});`: `globalVar` was declared with `var`, making it a property of the `global` 
  object. <br/>
  `console.log("4=>${global.blockScopedVar});`: `blockScopedVar` was declared with `let`, so it's scoped to the module,
  *not* the `global` object. <br/>
  `console.log("5=>${global.globalConst});`: `globalConst` was declared with `const`, so it's also scoped to the module,
  *not* the `global` object. <br/>
  `console.log("6=>${name});`: `name` is not defined in the global scope. It's defined within the module scope, so it's 
  undefined. <br/><br/>
 
  In summary:
  * The `this` context inside an arrow function in Node.js is *not* the `global` object.  It's inherited from the
    surrounding *module* scope.  This is a crucial difference from the global scope in the browser.
  * `var` declarations at the top level of a Node.js module *do* attach to the `global` object.
  * `let` and `const` declarations at the top level of a Node.js module are scoped to the module and *do not* attach to
    the `global` object.


- **Normal Function:** has its own `this` context, which can be influenced by how the function is called.
  ```js
  const obj = {
      name: "Alice",
      greet: function() {
          console.log("Hello, " + this.name);
      }
  };
  
  obj.greet(); // Output: Hello, Alice
  ```
#### `arguments` Object
- **Arrow function:** does not have its own `arguments` object. It uses the `arguments` object from the surrounding code.
  ```js
    const sum = () => {
        console.log(arguments);
    };
  
    sum(1, 2, 3); // ReferenceError: arguments is not defined
  ```
- **Normal Function:** has its own `arguments` object.
  ```js
    function sum() {
        console.log(arguments);
    }
  
    sum(1, 2, 3); // Output: [1, 2, 3]
  ```
#### Constructor Function
- **Arrow function:** cannot be used as a constructor function with the `new` keyword.
  ```js
  const Person = (name) => {
      this.name = name;
  };
  
  const alice = new Person("Alice"); // TypeError: Person is not a constructor
  ```
  ```js
  const Bike = (model, color) => {  // Arrow function
      this.model = model;  // This 'this' will not be the new object!
      this.color = color;
  };

  const myBike = new Bike('Yamaha', 'red'); // TypeError: Bike is not a constructor
  ```
- **Normal Function:** can be used as a constructor function.
  ```js
  function Person(name) {
      this.name = name;
  }

  const alice = new Person("Alice");
  ```  
#### Implicit Return
- **Arrow function:** automatically returns the expression without using the `return` keyword.
  ```js
  const add = (a, b) => a + b;
  ```
- **Normal Function:** requires the `return` keyword to return a value.
  ```js
    function add(a, b) {
        return a + b;
    }
  ```
#### Hoisting
- **Arrow function:** are not hoisted, meaning they cannot be called before they are defined.
  ```js
  console.log(add(2, 3)); // ReferenceError: Cannot access 'add' before initialization
  const add = (a, b) => a + b;
  ```
- **Normal Function:** are hoisted, allowing them to be called before they are defined.
  ```js
  console.log(add(2, 3)); // Outputs: 5
  function add(a, b) {
      return a + b;
  }
  ```
  


  

## Default Parameters
In ES6, default function parameters allow you to initialize function parameters with default values if no value or 
undefined is passed. This feature simplifies the process of setting default values, which in ES5 required the use of 
logical OR operators.

**Example in ES5:**
```js
var calculateArea = function (height, width) {
  height = height || 50;
  width = width || 60;
  return width * height;
};

console.log(calculateArea()); // Outputs: 300
```

**Example in ES6:**
```js
var calculateArea = function (height = 50, width = 60) {
  return width * height;
};

console.log(calculateArea()); // Outputs: 300
```
In this example, if calculateArea is called without arguments, height and width are automatically set to 50 and 60, 
respectively.

```js
const stringArray = [..."John Resig"];
console.log(stringArray); // Outputs: ["J", "o", "h", "n", " ", "R", "e", "s", "i", "g"]
```

## Template Literals
Template literals, introduced in ES6, are string literals that allow embedded expressions. These strings are enclosed by
back-ticks (`) instead of single or double quotes. This feature enables string interpolation, which allows you to embed 
variables and expressions directly within the string.

**Example in ES6:**
```js
var firstName = "John";
var lastName = "Doe";
var greeting = `Welcome to JS World, Mr. ${firstName} ${lastName}.`;

console.log(greeting); // Outputs: Welcome to JS World, Mr. John Doe.
```
In ES5, string concatenation would require breaking the string into multiple parts and concatenating them with the `+`
operator.

**Example in ES5:**
```js
var greeting = 'Welcome to JS World, Mr. ' + firstName + ' ' + lastName;
console.log(greeting); // Outputs: Welcome to JS World, Mr. John Doe.
```

### Multi-line Strings with Template Literals
Template literals also support multi-line strings without the need for newline escape characters (\n) or concatenation.
**Example in ES6:**
```js
console.log(`This is string sentence 1
This is string sentence 2`);
```
In contrast, in ES5, you would need to use newline characters and concatenate the strings:
**Example in ES5:**
```js
console.log("This is string sentence 1\n" + "This is string sentence 2");
```
Template literals thus provide a more convenient and readable way to work with strings in JavaScript.

## Nesting Templates
Nesting templates in JavaScript allow you to use inner backticks inside a placeholder ${ } within a template literal.
This feature makes your code more compact and readable, especially when dealing with conditional logic.

**Example**
```js
const iconStyles = `icon ${
  isMobilePlatform()
    ? ""
    : `icon-${user.isAuthorized ? "submit" : "disabled"}`
}`;
```
In this example, the template checks if the platform is mobile. If it is not, it then checks if the user is authorized
to determine the appropriate icon style.

**Example Without Nesting Templates:**
```js
const iconStyles = `icon ${
  isMobilePlatform()
    ? ""
    : user.isAuthorized
    ? "icon-submit"
    : "icon-disabled"
}`;
```
The code without nesting templates is more verbose, but nesting templates make it more concise.

## Tagged Templates
Tagged templates are an advanced form of template literals where a function, known as a "tag," is used to parse the 
template literal. The tag function can manipulate the template strings and expressions as needed.
**Example**
```js
var user1 = "John";
var skill1 = "JavaScript";
var experience1 = 15;

function myInfoTag(strings, userExp, experienceExp, skillExp) {
  var expertiseStr;
  if (experienceExp > 10) {
    expertiseStr = "expert developer";
  } else if (experienceExp > 5 && experienceExp <= 10) {
    expertiseStr = "senior developer";
  } else {
    expertiseStr = "junior developer";
  }

  return `${strings[0]}${userExp}${strings[1]}${expertiseStr}${strings[2]}${skillExp}`;
}

var output1 = myInfoTag`Mr/Ms. ${user1} is a/an ${experience1} in ${skill1}`;
console.log(output1); // Outputs: Mr/Ms. John is a/an expert developer in JavaScript
```
Tagged templates allow for more dynamic and complex string processing based on the values passed into the template.

## Raw Strings
The String.raw() method in ES6 provides a way to create raw strings, where escape sequences are not processed. This is
particularly useful when dealing with strings that contain special characters or when you want the string to appear 
exactly as typed.
**Example**
```js
var calculationString = String.raw`The sum of numbers is \n${1 + 2 + 3 + 4}!`;
console.log(calculationString); // Outputs: The sum of numbers is \n10!
```
Without using String.raw(), the newline character (\n) would be processed, and the string would be split into multiple 
lines.

**Example Without Raw Strings:**
```js
var calculationString = `The sum of numbers is \n${1 + 2 + 3 + 4}!`;
console.log(calculationString);
// Outputs:
// The sum of numbers is 
// 10!
```
Raw strings allow you to work with the exact string format you need, without any automatic processing of escape sequences.

## Multi-Line Strings
With template literals, multi-line strings are easily created without the need for escape characters.

## Destructuring Assignment
This feature allows the extraction of values from arrays or properties from objects into distinct variables using a 
succinct syntax.

## Enhanced Object Literals
ES6 introduced several shorthand notations and features in object literals, making it easier to define objects.

## Promises
Promises provide a cleaner, more flexible way to handle asynchronous operations, offering an alternative to callbacks.

## Classes
ES6 introduced a more straightforward and syntactically cleaner way to define and work with classes and inheritance in 
JavaScript.

## Modules
ES6 modules allow for the modularization of code, enabling better organization, dependency management, and code
reusability.

# Others

## arguments object vs rest parameter
### Type and Methods
#### Arguments Object:
* Type: The arguments object is array-like but not an actual array. It has indexed properties and a length property but 
  lacks array methods.
* Methods: It does not support array methods such as sort, map, forEach, or pop.

#### Rest Parameters:
* Type: Rest parameters are actual arrays. They are declared using the ... syntax in function parameters.
* Methods: They support all array methods, including sort, map, forEach, and pop.

```js
function exampleFunc() {
  console.log(arguments instanceof Array); // false
  console.log(Array.isArray(arguments)); // false
  console.log(Array.prototype.slice.call(arguments)); // Convert to array

  console.log([].concat(arguments).map(x => x * 2)); // Use map with arguments object (after conversion)
}

function exampleRestParam(...args) {
  console.log(Array.isArray(args)); // true
  console.log(args.map(x => x * 2)); // Directly use map with rest parameters
}
```

### Supported Methods
#### Arguments Object:
* Methods such as sort, map, forEach, or pop are not directly available.

#### Rest Parameters:
* These methods can be used directly on the rest parameter array.
```js
function exampleRestParam(...args) {
  console.log(args.map(x => x * 2)); // Directly use map with rest parameters
  console.log(args.sort()); // Directly use sort with rest parameters
}
```

### Content
#### Arguments Object:
* Contains all arguments passed to the function, regardless of whether they have individual names in the function signature.

#### Rest Parameters:
* Include only the arguments that haven't been named individually. They represent a subset of all arguments passed.

```js
function exampleFunc(a, b, ...rest) {
  console.log(arguments); // Contains all arguments
  console.log(rest); // Contains only the arguments not named explicitly
}

exampleFunc(1, 2, 3, 4, 5);
// Output: 
// Arguments: [1, 2, 3, 4, 5]
// Rest: [3, 4, 5]
```

In summary, the arguments object is a legacy array-like structure that provides access to all function arguments but
lacks array methods. Rest parameters are actual arrays that provide a more modern and flexible way to handle variable 
numbers of arguments, supporting all array methods and excluding named parameters.

## Rest and Spread Parameters
The `...` syntax allows functions to accept an indefinite number of arguments as an array (rest) and also enables the
expansion of arrays and objects (spread).

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)