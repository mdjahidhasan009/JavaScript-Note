#  Various Kind of Operators

* **Arithmetic Operators**: Includes + (Addition), – (Subtraction), * (Multiplication), / (Division), % (Modulus), ++ (Increment) and – – (Decrement)
* **Comparison Operators**: Includes == (Equal), != (Not Equal), === (Equal with type), > (Greater than), >= (Greater than or Equal to), < (Less than), <= (Less than or Equal to)
* **Logical Operators**: Includes && (Logical AND), || (Logical OR), ! (Logical NOT)
* **Assignment Operators**: Includes = (Assignment Operator), += (Add and Assignment Operator), –= (Subtract and Assignment Operator), *= (Multiply and Assignment), /= (Divide and Assignment), %= (Modules and Assignment)
* **Ternary Operators**: It includes conditional(: ?) Operator
* **typeof Operator**: It uses to find type of variable. The syntax looks like typeof variable

#  Bitwise Operators
In addition to arithmetic, comparison, logical, and assignment operators, JavaScript also supports a set of bitwise 
logical operators that operate on the binary representations of numbers.


#### Bitwise AND ( & )
* Performs a binary AND operation.
* Each bit of the output is 1 if the corresponding bit of both operands is 1; otherwise, it is 0.
```javascript
let result = 5 & 3; // 0101 & 0011 = 0001 (result is 1)
```

#### Bitwise OR ( | )
* Performs a binary OR operation.
* Each bit of the output is 1 if the corresponding bit of either operand is 1; otherwise, it is 0.
```javascript
let result = 5 | 3; // 0101 | 0011 = 0111 (result is 7)
```

#### Bitwise XOR ( ^ )
* Performs a binary XOR operation.
* Each bit of the output is 1 if the corresponding bits of the operands are different; otherwise, it is 0.
```javascript
let result = 5 ^ 3; // 0101 ^ 0011 = 0110 (result is 6)
```

#### Bitwise NOT ( ~ )
* Performs a binary NOT operation.
* Inverts each bit of the operand.
```javascript
let result = ~5; // ~0105 = 1010 (result is -6, because of two's complement representation)
```

#### Left Shift ( << )
* Shifts the bits of the operand to the left by the specified number of positions.
* New bits on the right are filled with 0.
```javascript
let result = 5 << 1; // 0101 << 1 = 1010 (result is 10)
```

#### Sign Propagating Right Shift ( >> )
* Shifts the bits of the operand to the right by the specified number of positions.
* The leftmost bits are filled with the sign bit (the original leftmost bit) to preserve the sign of the number.
```javascript
let result = -5 >> 1; // 11111111111111111111111111111011 >> 1 = 11111111111111111111111111111101 (result is -3)
```

#### Zero fill Right Shift ( >>> )
* Shifts the bits of the operand to the right by the specified number of positions.
* The leftmost bits are filled with 0, regardless of the sign of the number.
```javascript
let result = -5 >>> 1; // 11111111111111111111111111111011 >>> 1 = 01111111111111111111111111111101 (result is 2147483645)
````
These bitwise operators allow for low-level manipulation of data, enabling efficient performance in scenarios requiring
bitwise calculations, such as cryptography, network programming, and graphics processing.

# Difference Between `typeof` and `instanceof` in JavaScript

## `typeof` Operator

The `typeof` operator returns a string indicating the type of the unevaluated operand.

The `typeof` operator checks if a value belongs to one of the seven basic types:
- `number`
- `string`
- `boolean`
- `object`
- `function`
- `undefined`
- `symbol`

Example:

```javascript
console.log(typeof 42);              // Output: "number"
console.log(typeof 'hello');         // Output: "string"
console.log(typeof true);            // Output: "boolean"
console.log(typeof {});              // Output: "object"
console.log(typeof function() {});   // Output: "function"
console.log(typeof undefined);       // Output: "undefined"
console.log(typeof Symbol());        // Output: "symbol"
```

Note that `typeof(null)` will return `"object"`:

```javascript
console.log(typeof null);            // Output: "object"
```

## `instanceof` Operator

The `instanceof` operator checks the current object and returns `true` if the object is of the specified type, which works on the level of prototypes. It tests to see if the right operand appears anywhere in the prototype chain of the left operand.

Example:

```javascript
function Animal() {}
var dog = new Animal();
console.log(dog instanceof Animal);  // Output: true

var name = new String("xyz");
console.log(name instanceof String); // Output: true
```

### Key Differences

1. **Type Checking:**
    - `typeof` is used for primitive types.
    - `instanceof` is used for complex types (i.e., objects and functions).

2. **Returns:**
    - `typeof` returns a string indicating the type.
    - `instanceof` returns a boolean indicating whether the object is an instance of a particular type.

3. **Scope:**
    - `typeof` does not check the prototype chain.
    - `instanceof` checks the entire prototype chain.

### Example

Consider the following examples:

```javascript
console.log(typeof "foo"); // Output: "string"
console.log("foo" instanceof String); // Output: false

var color1 = new String("green");
console.log(color1 instanceof String); // Output: true

var color2 = "coral";
console.log(color2 instanceof String); // Output: false

function Person(name) {
  this.name = name;
}
var me = new Person('John');

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true
console.log(me instanceof Array);  // false
```

### Real-World Application

The `instanceof` operator is rarely useful in production code but can be useful in tests where you want to assert that
your code returns or creates objects of the correct types. By being explicit about the kinds of objects your code is
returning or creating, your tests become more powerful as a tool for understanding and documenting your code.


# `delete`
The delete operator in JavaScript is used to remove properties from objects. It can also be used to delete array elements,
although this is not a common practice because it leaves holes in arrays. The delete operator returns true if the property 
was successfully deleted, and false otherwise.
```js
delete object.property;
delete object['property'];
```
**Deleting Object Properties**
```js
const person = {
  firstName: "John",
  lastName: "Doe"
};

delete person.lastName;
console.log(person); // { firstName: "John" }
```
**Deleting Array Elements**

Deleting array elements is not recommended as it leaves undefined holes in the array.
```js
const fruits = ["apple", "banana", "mango"];
delete fruits[1];
console.log(fruits); // ["apple", undefined, "mango"]
```
**Deleting Non-Configurable Properties**

The delete operator cannot delete properties that are non-configurable. Non-configurable properties are those that 
cannot be deleted or redefined.
```js
const obj = {};
Object.defineProperty(obj, 'x', {
  value: 42,
  configurable: false
});

delete obj.x; // Returns false
console.log(obj.x); // 42
```

**Deleting Variables**

The delete operator cannot delete variables declared with var, let, or const. However, it can delete properties from the 
global object if they were added explicitly.
````js
var x = 42;
delete x; // Returns false

y = 21; // Implicit global
delete y; // Returns true
````


# `console`
## Adding a Prefix to Console Logs in JavaScript

### Problem
Logging error messages or some informative messages is always required when dealing with client-side JavaScript using
`console.log` method. Sometimes you want to add some prefix to identify messages generated from your application, hence 
you would like to prefix your app name in every `console.log`.

### General Approach
A general way to do this is to keep adding your app name in every `console.log` message like:

```javascript
console.log('your app name' + 'some error message');
```

But doing it this way means you have to write your app name every time when you log a message using `console`.

### Solution
There is a better way to achieve this:

```javascript
function appLog() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift('your app name');
  console.log.apply(console, args);
}

appLog("Some error message"); 
// Output: 'your app name Some error message'
```

### Usage in a React or Node.js Project

If you add this function in your `app.ts` of a React project or `server.ts` of a Node.js project, it will work throughout the project. Here’s how you can do it:

1. **For a React project (app.ts):**

   ```javascript
   // app.ts

   function appLog() {
     var args = Array.prototype.slice.call(arguments);
     args.unshift('your app name');
     console.log.apply(console, args);
   }

   export default appLog;

   // Use it in your components
   import appLog from './app';

   appLog('Component loaded');
   ```

2. **For a Node.js project (server.ts):**

   ```javascript
   // server.ts

   function appLog() {
     var args = Array.prototype.slice.call(arguments);
     args.unshift('your app name');
     console.log.apply(console, args);
   }

   global.appLog = appLog;

   // Use it in your server code
   appLog('Server started');
   ```

By defining this function in a central file and making it available globally (as shown in the Node.js example), you can use `appLog` throughout your entire project to log messages with your desired prefix.

#### Double exclamation
The double exclamation or negation(!!) ensures the resulting type is a boolean. If it was falsey (e.g. 0, null, undefined,
etc.), it will be false, otherwise, it will be true. For example, you can test IE version using this expression as below,
```js
let isIE8 = false;
isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
console.log(isIE8); // returns true or false
```
If we don't use this expression then it returns the original value.
```js
console.log(navigator.userAgent.match(/MSIE 8.0/)); // returns either an Array or null
```
**Note:** The expression !! is not an operator, but it is just twice of ! operator.

## The void Operator
The void operator is used in JavaScript to evaluate an expression and return `undefined` regardless of the expression's 
original value.

Syntax
```js
void(expression)
```
* `expression`: Any valid JavaScript expression.

### `void 0`
The most common usage of `void` is `void(0)`, which always returns undefined and is often used to prevent unwanted side 
effects, such as reloading a page when a link is clicked.

#### Common Use Case: Preventing Page Refresh
One of the primary uses of void(0) is within HTML documents, particularly in anchor (`<a>`) elements. When a link is 
clicked, the default behavior of the browser is to load a new page or refresh the current page. Using void(0) helps 
prevent this default behavior, allowing for custom actions (such as triggering JavaScript functions) without causing a
page reload.
```html
<a href="JavaScript:void(0);" onclick="alert('Well done!')">
  Click Me!
</a>
```
In this example:
* The href="JavaScript:void(0);" attribute prevents the default behavior of the link, which would otherwise load a new 
  page or refresh the current page.
* The onclick attribute triggers a JavaScript alert message when the link is clicked.

Why Use void(0)
* Preventing Default Link Behavior: Using void(0) in the href attribute of an anchor tag prevents the browser from 
  following the link and refreshing the page.
* Returning undefined: The void operator ensures that the expression evaluates to undefined, which is often the desired 
  outcome in scenarios where you want to avoid any side effects.

### Conditional Operator (Ternary Operator)
The conditional operator, also known as the ternary operator, is a JavaScript operator that evaluates a condition and
returns one of two values based on whether the condition is true or false.

Syntax
```js
condition ? value1 : value2
```
* `condition`: An expression that is evaluated to determine whether it is true or false.
* `value1`: The value to return if the condition is true.
* `value2`: The value to return if the condition is false.

#### Example
```js
var age = 20;
var message = age >= 18 ? "You are an adult" : "You are a minor";
console.log(message); // Output: "You are an adult"
```

There can be express instance like `condition ? expression1 : expression2` where `expression1` and `expression2` can be
any valid JavaScript expression.

#### Example
```js
function getGreeting(isMorning) {
  return isMorning ? "Good morning!" : "Good evening!";
}

var time = new Date().getHours();
var greeting = time < 12 ? getGreeting(true) : getGreeting(false);

console.log(greeting); // Will print "Good morning!" if before noon, otherwise "Good evening!"
```

### Chaining Conditional (Ternary) Operators
In JavaScript, you can chain conditional (ternary) operators to handle multiple conditions, similar to using if…else 
`if…else` chains. This approach provides a concise way to evaluate multiple conditions and return corresponding values.

Syntax example:
```js
function traceValue(someParam) {
  return condition1
    ? value1
    : condition2
    ? value2
    : condition3
    ? value3
    : value4;
}
```

This chained ternary operator is equivalent to the following `if…else` `if…else` structure:
```js
function traceValue(someParam) {
  if (condition1) {
    return value1;
  } else if (condition2) {
    return value2;
  } else if (condition3) {
    return value3;
  } else {
    return value4;
  }
}
```
This technique allows for more compact and readable code when handling multiple conditional evaluations.


# Spread Operator
The spread operator (...) allows iterables (arrays, objects, strings) to be expanded into single arguments/elements. It 
is a convenient way to handle elements individually and can be used in various scenarios such as function calls, array
literals, and object literals.

**Function Call**

The spread operator can be used to pass elements of an array as arguments to a function.
```js
function calculateSum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(calculateSum(...numbers)); // 6
```

**Array Literal**

The spread operator can be used to create a new array by combining elements from existing arrays.
```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2];

console.log(combined); // [1, 2, 3, 4, 5, 6]
```

**Object Literal**

The spread operator can be used to create a new object by copying properties from existing objects.
```js
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

const combinedObj = { ...obj1, ...obj2 };

console.log(combinedObj); // { a: 1, b: 2, c: 3, d: 4 }
```

**String**

The spread operator can be used to split a string into individual characters.

```js
const str = "Hello";

const chars = [...str];

console.log(chars); // ['H', 'e', 'l', 'l', 'o']
```

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [What is the instanceof operator in JavaScript?](https://stackoverflow.com/questions/2449254/what-is-the-instanceof-operator-in-javascript)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)