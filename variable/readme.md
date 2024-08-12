# Primitive Value or Data Types
A primitive data type is data that has a primitive value, which **has no properties or methods**. There are 7 types of 
primitive data types:
* string
* number
* boolean
* null
* undefined
* bigint
* symbol

## Wrapper Objects
In JavaScript, primitive values such as strings, numbers, and booleans do not inherently have properties or methods. 
However, JavaScript provides a way to temporarily treat these primitives as objects to allow for the use of methods and
properties. This process involves converting primitive values into their corresponding wrapper objects.

#### Wrapper Objects for Primitive Types
##### String
`String` Represents string primitives and provides methods for string manipulation.
##### Number
`Number` Represents numeric primitives and provides methods for mathematical operations.
##### Boolean 
`Boolean` Represents boolean primitives and provides methods for logical operations.
##### BigInt
`BigInt` Represents integer primitives with arbitrary precision.
##### Symbol
`Symbol` Represents unique symbols and provides methods for symbol-related operations.

<br/><br/>
`undefined` and `null` do not have wrapper objects because they are primitive values with no methods or properties.

##### Undefined
Represents a value that has not been assigned. It is the default value of uninitialized variables. Like null, undefined
does not have a wrapper object because it is a primitive value with no methods or properties.

##### Null
Represents the intentional absence of any object value. It is a special value used to indicate "no value" or "empty." 
Since null is not an object and does not have any methods or properties, JavaScript does not provide a wrapper object 
for it.

**Examples** <br/>
Attempting to use methods on null or undefined will result in errors, as these values do not have any associated methods 
or properties:

```js
let nothing = null;
console.log(nothing.toString()); // TypeError: Cannot read property 'toString' of null

let notDefined;
console.log(notDefined.toUpperCase()); // TypeError: Cannot read property 'toUpperCase' of undefined
```

### Check is the value primitive or not
```js
function isPrimitive(value) {
  return value !== Object(value);
}

console.log(isPrimitive(42)); // true
console.log(isPrimitive("Hello")); // true
console.log(isPrimitive(true)); // true
console.log(isPrimitive(null)); // true

console.log(isPrimitive({})); // false
console.log(isPrimitive([])); // false
console.log(isPrimitive(function() {})); // false
```

Explanation: <br/>
If the value is a primitive data type, the Object constructor creates a new wrapper object for the value. But If the value
is a non-primitive data type (an object), the Object constructor will give the same object. This function works for all 
primitive types, including numbers, strings, booleans, null, and undefined.

## Symbol

### Making an Object Iterable in JavaScript
By default, plain objects in JavaScript are not iterable. However, you can make an object iterable by defining a 
Symbol.iterator property on it. This allows the object to be used in loops like for...of or with functions that expect 
iterables.

##### Defining Symbol.iterator Manually
You can manually define the Symbol.iterator property on an object to control how it is iterated over. Below is an 
example of creating an iterable object.
```js
const collection = {
  one: 1,
  two: 2,
  three: 3,
  [Symbol.iterator]() {
    const values = Object.keys(this);
    let i = 0;
    return {
      next: () => {
        return {
          value: this[values[i++]],
          done: i > values.length,
        };
      },
    };
  },
};

const iterator = collection[Symbol.iterator]();

console.log(iterator.next()); // → {value: 1, done: false}
console.log(iterator.next()); // → {value: 2, done: false}
console.log(iterator.next()); // → {value: 3, done: false}
console.log(iterator.next()); // → {value: undefined, done: true}
```

##### Using a Generator Function for Simplification
Instead of manually implementing the next method, you can simplify the process using a generator function. A generator
function can automatically create an iterable by yielding values.
```js
const collection = {
  one: 1,
  two: 2,
  three: 3,
  [Symbol.iterator]: function* () {
    for (let key in this) {
      yield this[key];
    }
  },
};

const iterator = collection[Symbol.iterator]();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```


# Non-Primitive Data Types
In addition to primitive data types, JavaScript also has non-primitive data types, which include objects. Non-primitive 
data types can have properties and methods.

### Examples
#### Object
A collection of properties, where each property is a key-value pair.
```js
const obj = {
  key: "value",
  anotherKey: 42
};
```

#### Array
A special type of object used for storing ordered collections of values.
```js
const arr = [1, 2, 3, 4];
```

#### Function
A callable object that executes a block of code.
```js
function greet() {
  console.log("Hello, world!");
}
```

#### Date
An object for working with dates and times.
```js
const date = new Date();
```

### RegExp
An object for matching text with a pattern.
```js
const regex = /ab+c/;
```

## Primitive vs Non-Primitive Data Types
### Mutability
Primitive values are immutable, while objects are mutable.

### Reference vs Value
Primitive values are accessed by value, while objects are accessed by reference.

### Memory Allocation
Primitive types are stored in the stack, whereas objects are stored in the heap.

# Scalar Data Types or Scalar Value
Scalar data types are data types that represent a single value. In JavaScript, the scalar data types are:
* string
* number
* boolean
* null
* undefined
* bigint
* symbol


# `var` and `let`

`var` and `let` are both used for variable declaration in JavaScript, but they have some differences.

* **Function vs Block Scope:** `var` is function-scoped when declared inside a function, and globally scoped when 
  declared outside a function. `let` is block-scoped local variable, meaning it is only accessible within the block,
  statement or expression it is defined in.
* **Hoisting:** Variables declared with `var` are hoisted to the top of their scope and initialized with `undefined`.  
  Variables declared with `let` are hoisted to the top of their block but are not initialized.
* **Redeclaration:** Redeclaring a variable with `var` is allowed, while redeclaring a variable with `let` in the same
  scope is not allowed.
* `let` is a relatively new feature introduced in ES6, while `var` has been around since the beginning of JavaScript.
* It is recommended to use `let` over `var` for variable declaration in modern JavaScript code.
* `const` is another keyword used for variable declaration, but it is used for constants that cannot be reassigned.

```js
function userDetails(username) {
  if (username) {
    console.log(salary); // undefined due to hoisting
    console.log(age); // ReferenceError: Cannot access 'age' before initialization
    let age = 30;
    var salary = 10000;
  }
  console.log(salary); //10000 (accessible due to function scope)
  console.log(age); //error: age is not defined(due to block scope)
}
userDetails("John");
```

If we redeclare a variable in `switch` will throw error.
```js
let counter = 1;
switch (x) {
  case 0:
    let name;
    break;

  case 1:
    let name; // SyntaxError for redeclaration.
    break;
}
```
But if we wrap it with `{}` then it will become functional scoped then error will gone.
```js
let counter = 1;
switch (x) {
  case 0: {
    let name;
    break;
  }
  case 1: {
    let name; // No SyntaxError for redeclaration.
    break;
  }
}
```

## Understanding `var` Scope and `setTimeout` in JavaScript
When working with loops and asynchronous operations like `setTimeout` in JavaScript, it's important to understand the
behavior of variable scoping, particularly with `var`.

#### Variable Scoping with `var`
When you use `var` inside a loop, the variable is function-scoped. This means there is only one instance of the variable
shared across all iterations of the loop.
### Example Code

```javascript
var arr = [10, 32, 65, 2];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log('The index of this number is: ' + i);
  }, 3000);
}
```
Output
```
The index of this number is: 4
The index of this number is: 4
The index of this number is: 4
The index of this number is: 4
```

### Execution Flow
1. **For Loop Execution**:
    - The `for` loop runs quickly, iterating over the array.
    - During each iteration, a `setTimeout` is scheduled to run after 3000 milliseconds.
    - The value of `i` at each iteration is updated globally within the function scope.

2. **After the Loop**:
    - After the loop completes, `i` is equal to `arr.length`, which is 4 in this case.
    - All the scheduled `setTimeout` callbacks reference this single, shared `i`.

3. **Timeout Execution**:
    - 3000 milliseconds later, each `setTimeout` callback executes.
    - Each callback logs the value of `i`, which is now 4 for all callbacks.

### Why All Console Logs Show the Same Value
Due to the function scope of `var`, all `setTimeout` callbacks share the same `i` variable, which ends up being the
length of the array after the loop finishes. Therefore, all logs will show the value 4.

## Correcting the Scope Issue

To capture the correct index value for each iteration, use an IIFE (Immediately Invoked Function Expression), `let`, or
`forEach` to create a block-scoped variable:

## Using ES5
#### Using IIFE

```javascript
var arr = [10, 32, 65, 2];
for (var i = 0; i < arr.length; i++) {
  (function(index) {
    setTimeout(function() {
      console.log('The index of this number is: ' + index);
    }, 3000);
  })(i);
}
```
Output after 3 seconds:
```shell
The index of this number is: 0
The index of this number is: 1
The index of this number is: 2
The index of this number is: 3
```
#### Using `forEach`

```javascript
var arr = [10, 32, 65, 2];
arr.forEach(function(ele, i) {
  setTimeout(function() {
    console.log('The index of this number is: ' + i);
  }, 3000);
});
```

## Using ES6
#### Using `let`

```javascript
var arr = [10, 32, 65, 2];
for (let i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log('The index of this number is: ' + i);
  }, 3000);
}
```

### Expected Corrected Output
Using any of the above methods will produce the expected output after 3000 milliseconds:
```
The index of this number is: 0
The index of this number is: 1
The index of this number is: 2
The index of this number is: 3
```

#### Reserved Words
We can not use reserved words as variable name.

```js
var return = 20; // Uncaught SyntaxError: Unexpected token 'else'
var else = 10; // Uncaught SyntaxError: Unexpected token 'else'
```
**But, we can use them as object property.**
```js
var obj = {
  return: 20,
  else: 10  
}
```

### Redeclaration of let, const and var
In JavaScript, variables declared with `let` and `const` cannot be redeclared within the same scope. If you attempt to 
redeclare a variable that has already been declared using `let` or `const`, JavaScript will throw a `SyntaxError`.

This restriction contrasts with variables declared using var, which are function-scoped and can be redeclared within the
same scope without causing errors. This behavior is due to the hoisting mechanism, where var declarations are moved to
the top of their scope during the compilation phase.

**Example of Redeclaration with var:**
```js
var name = "John";

function myFunc() {
  var name = "Nick";
  var name = "Abraham"; // Valid, reassigns within the same function block
  alert(name); // Outputs: Abraham
}

myFunc();
alert(name); // Outputs: John
```

**Example of Redeclaration with let (Throws Error):**
```js
let name = "John";

function myFunc() {
  let name = "Nick";
  let name = "Abraham"; // Throws SyntaxError: Identifier 'name' has already been declared
  alert(name);
}

myFunc();
alert(name);
```

#### Immutability of const Variables
The const keyword in JavaScript is used to declare variables that cannot be reassigned after their initial assignment. 
However, this does not mean the value is immutable. If a const variable is an object or an array, the contents of that
object or array can still be modified.

const only ensures that the variable identifier cannot be reassigned to a different value or object. This is an important 
distinction, as it means that while you cannot reassign the variable, you can still change the properties of an object 
or the elements of an array that is assigned to that const variable.

**Example of const with an Array:**
```js
const userList = [];
userList.push("John"); // Modifies the array by adding an element
console.log(userList); // Outputs: ['John']
```
In this example, even though userList is declared with const, we can still modify the contents of the array by using 
methods like push. The const keyword only prevents reassignment of the userList variable itself.


# Undeclared variables / `not defined` or `ReferenceError`
Undeclared variables are those that have not been defined/declared in the current scope using `var`, `let`, or `const`. 
When you try to use an undeclared variable, JavaScript will throw a `ReferenceError`.Also, function execution will be 
stopped at that point.

```js
try {
    console.log(a); // ReferenceError: a is not defined
} catch(e) {
    console.error(e);
}
a = 10; // Creates a global variable 'a' (not recommended)
console.log(a) // 10
```
But if we use `typeof` operator, it will return `undefined` instead of `ReferenceError`.

```js
console.log(typeof x); // undefined
```
In strict mode (`"use strict";`), assigning a value to an undeclared variable will also throw a `ReferenceError`.
```js
"use strict";
a = 10; // ReferenceError: a is not defined
```

# Undefined Variables / `undefined`
Undefined variables are those that have been declared but not yet assigned a value.We get that while we defined a 
variable but not assigned any value to it. Also, `console.log` do not throw any error. It's **primitive value not an 
object**.

```js
let a; // declaring a
console.log(a); // undefined
console.log(typeof a === 'undefined'); // true
```
`typeof undefined` is `undefined`.
```js
console.log(typeof undefined); // undefined
```

When you explicitly assign `undefined` to a variable, it does not change its type or status as declared; it just sets 
its value to `undefined`.
```js
var c = undefined;
console.log(c); // undefined
```

In strict mode, accessing a variable declared but not assigned still returns `undefined` but no error.

Similar as with `null`, negating undefined gives true, but comparing it to either `true` or `false` always gives `false`.
```js
console.log(!undefined); // true
console.log(undefined == false); // false
console.log(undefined === false); // false
console.log(undefined == true); // false
console.log(undefined === true); // false
```

# `null`
`null` is a special value in JavaScript that represents an empty value. It is a **primitive value and not an object**.
But, `typeof null` return `object` which is a bug in JavaScript. It is used to represent an empty value. `null` is only
equal to `undefined` and itself. It is not equal to any other value.

```js
console.log(null == null); // true
console.log(null === null); // true
console.log(null == undefined); // true
console.log(null === undefined); // false
```

Negative or `!null` is `true` and `null` is `false`. But `null == false` return `false` and `null == true` return `false`.

```js
console.log(!null); // true
console.log(null == false); // false
console.log(null === false); // false
console.log(null == true); // false
console.log(null === true); // false
```
In basic math, `null` is `0`. But, `null` is not equal to `0`.

```js
console.log(null == 0); // false
console.log(null === 0); // false
```

```js
console.log(null + 5); // 5
console.log(null - 2); // -2
console.log(null * 27) // 0
console.log(null / 2); // 0
console.log(null % 3); // 0
```
### `null >= 0 && null <= 0` but `null !== 0`
In JavaScript, the comparisons involving null and 0 can be surprising due to the different rules for type coercion and
comparison. Let's break down why null >= 0 && null <= 0 is true, but null == 0 is false.

**Type Coercion in Comparisons**<br/><br/>
**Relational Comparisons (>= and <=)**<br/>
When performing relational comparisons (like >= and <=), JavaScript converts `null` to a number:

* `null` is coerced to 0 in numeric contexts.
* Therefore, `null >= 0` is evaluated as `0 >= 0`, which is `true`.
* Similarly, `null <= 0` is evaluated as `0 <= 0`, which is `true`.
```js
console.log(null >= 0); // true
console.log(null <= 0); // true
```

**Equality Comparison (==)**<br/>
When performing equality comparisons with ==, JavaScript follows different rules:

* `null` is only equal to `undefined` and `null` itself.
* `null` is not coerced to 0 in this context.

Thus, `null == 0` is `false` because `null` is not coerced to `0`, and `null` is only equal to `undefined` and itself.

```js
console.log(null == 0); // false
console.log(null == null); // true
console.log(null == undefined); // true
```

**Why the Difference?**
* **Relational Comparison (>= and <=):** Involves type coercion where null is converted to 0.
* **Equality Comparison (==):** Does not involve coercion of null to 0; instead, null is only considered equal to null
  and undefined.

**Example to Demonstrate**
```js
console.log(null >= 0); // true, because null is coerced to 0
console.log(null <= 0); // true, because null is coerced to 0
console.log(null == 0); // false, because null is only loosely equal to undefined, not 0

// Additional examples:
console.log(null === 0); // false, strict equality without type coercion
console.log(null == null); // true, null is equal to null
console.log(null == undefined); // true, null is loosely equal to undefined
console.log(Number(null)); // 0, type coercion converts null to 0 in numeric context
```

## `undefined` vs `null`
**Similarities**
* Both when negated are giving true (falsy values), but none of them equals true or false
* They represent something non-existing…
* They both are primitive value.

**Differences:**
* `null` represents “nothing”, fully non-existing. `undefined` means we defined something but do now assign value yet.
* `undefined` has its own data type (undefined), `null` is only an object
* null is treated as 0 in basic arithmetic operations, undefined returns NaN

```js
console.log(undefined == null); // true
console.log(undefined === null); // false
console.log(!undefined === !null); // true
```
The first statement: `undefined == null`, gives us true since JavaScript tries its best to convert both values into the
same type.

The second one: `undefined === null`, is different, this time we’re telling “Please, also compare data types” (basically
check if both of this things are the same) and JavaScript turns out to be clever enough to see the difference so it says
“false”.

`!undefined` is `true` and `!null` is true. So, `!undefined === !null` is `true`.

# `NaN`
`NaN` is a special value in JavaScript that represents an **unrepresentable value**. It is a property of the global object.
It is returned when a mathematical operation is not possible. **It is not equal to any value, including itself.**

```js
console.log(NaN === NaN); // false
console.log(NaN !== NaN); // true
console.log(isNaN(NaN)); // true
console.log(isNaN(null)); // false
```
But, if we use `typeof` operator, it will return `number` instead of `NaN`. Because, `NaN` is a special value of `number`.

Some operations that return `NaN`:
- `0 / 0`
- `Infinity - Infinity`
- `Math.sqrt(-1)`
- `parseInt('string')`
- `Number(undefined)`
- `Number('12a')`
- `Number('a12')`
- `Number('12.34.56')`
- `Number('12.34e-')`
- `"hello" - 5`
- `12 / "hello"`

But if we use `+` sign instant of `-`
```js
console.log("hello" + 5); // hello5
console.log(true + 'false'); // truefalse
```
Also, same as `null` if we add `true` or `false` we those values are converted to `1` and `0` respectively.

```js
console.log(true + 5); // 6
console.log(false + 5); // 5
console.log(true * 55); // 55
console.log(false * 55); // 0
console.log(false / 55); // 0
console.log(true / 55); // 0.01818181818181818
console.log(true * false) // 0
```

## `isNaN`
The isNaN() function is used to determine whether a value is an illegal number (Not-a-Number) or not. i.e, This function
returns true if the value equates to NaN. Otherwise it returns false.
```js
isNaN("Hello"); //true
isNaN("100"); //false
```

### Check is a Number or not
```js
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
```

## `isFinite`
The `isFinite()` function is used to determine whether a number is a finite, legal number. It returns false if the value is
+infinity, -infinity, or NaN (Not-a-Number), otherwise it returns true.
```js
isFinite(Infinity); // false
isFinite(NaN); // false
isFinite(-Infinity); // false

isFinite(100); // true
```

## `parseInt` and `Number`
`Number()` and `parseInt()` are two **functions** that convert a value to a number. `Number` is a **constructor function** and
`parseInt` is a **global function**. `Number` is used to **convert a value to a number** so empty string "", `false`,
`null` becomes `0` and `true` becomes `1` and `Number('some string')` become `NaN` Note: but `Number(undefined)` is `NaN`.
`parseInt` is used to **convert a string to an integer**. `parseInt` stops parsing when it encounters a non-numeric character.
```
console.log(Number(null)); // 0
console.log(Number('')); // 0
console.log(Number(' ')); // 0

console.log(parseInt(null)); // NaN
console.log(parseInt('')); // NaN
console.log(parseInt(' ')); // NaN

console.log(parseFloat(null)); // NaN
console.log(parseFloat('')); // NaN
console.log(parseFloat(' ')); // NaN

console.log(Number(10)); // 10
console.log(Number('10')); // 10
console.log(Number('10.5')); // 10.5

console.log(Number('20px')); // NaN

console.log(parseInt('20px')); // 20
console.log(parseInt('20px', 16)); // 32
console.log(parseInt('20px', 10)); // 20

console.log(Number(true)); // 1
console.log(Number(false)); // 0

console.log(parseInt(true)); // NaN
console.log(parseInt(false)); // NaN
```


But, `parseInt(null)` and `parseInt('')` return `NaN`. Also `parseFloat(null)` and `parseFloat('')` return `NaN`.
Also, `parseInt('20px')` return `20` and `parseInt('20px', 16)` return `32`. But `parseInt('20px', 10)` return `20`.
Because, `parseInt` stops parsing when it encounters a non-numeric character.

But, `Number('20px')` return `NaN`.

<br/><br/>

When dealing with numeric variables in JavaScript, it's important to understand the behavior of `NaN` (Not-a-Number).
Consider the following two conditional statements:

```js
if (x <= 100) { ... }
if (!(x > 100)) { ... }
```
For most values of `x`, these statements will produce the same result. However, there are specific values of `x` for
which these statements do not yield the same outcome. Specifically, when `x` is `NaN`:

* `NaN <= 100` is `false`
* `NaN > 100` is also `false`

This discrepancy occurs because `NaN` is not comparable to any numeric value, including itself. As a result, both
comparisons return `false`, causing the logical negation in the second statement to yield a different result.

This behavior also applies to any value of `x` that, when converted to a number, results in `NaN`, such as `undefined`,
`[1, 2, 5]`, `{a: 22}`, etc.

Therefore, when working with numeric variables, it is crucial to handle `NaN` appropriately. `NaN` cannot be equal to,
less than, or greater than any other numeric value. The most reliable way to check if a value is `NaN` is by using the
`isNaN()` function:

```js
if (isNaN(x)) {
// Handle the case where x is NaN
}
```
This approach ensures that you accurately detect and manage NaN values in your code.

# `delete`
The `delete` operator is used to remove a property from an object. It can also be used to remove an element from an array.

```js
var output = (function(x) {
  delete x;
  return x;
})(0);

console.log(output); // 0
```
The code above will output `0` as output. `delete` operator is used to delete a property from an object. Here `x` is not an
object, it's a local variable. `delete` operator doesn't affect local variables.

```js
var x = 1;
var output = (function() {
  delete x;
  return x;
})();

console.log(output);// 1
```
The code above will output `1` as output. `delete` operator is used to delete a property from an object. Here `x` is not an
object it's global variable of type `number`.

```js
var x = { foo : 1};
var output = (function() {
  delete x.foo;
  return x.foo;
})();

console.log(output);// undefined
```
The code above will output `undefined` as output. `delete` operator is used to delete a property from an object. Here `x` is
an object which has `foo` as a property and from a self-invoking function, we are deleting the foo property of object `x`
and after deletion, we are trying to reference deleted property `foo` which result `undefined`.

```js

```

### Example of Delete at Prototype Property

```javascript
var Employee = {
  company: 'xyz'
};

var emp1 = Object.create(Employee);
delete emp1.company;
console.log(emp1.company); // Output: 'xyz'
```

#### Why?

1. **Prototype Chain:**
    - In JavaScript, objects can have a prototype, which is another object from which they inherit properties.
    - The `Object.create` method creates a new object with the specified prototype object and properties. In this case, 
      `emp1` is created with `Employee` as its prototype.

2. **Prototype Property:**
    - The `company` property is defined on the `Employee` object.
    - When `emp1` is created using `Object.create(Employee)`, it inherits the `company` property from `Employee`.

3. **Delete Operator:**
    - The `delete` operator is used to remove a property from an object.
    - `delete emp1.company` attempts to remove the `company` property from the `emp1` object.
    - Since `emp1` does not have its own `company` property (it is inherited from `Employee`), the `delete` operation 
      does not affect the prototype property.

4. **Property Access:**
    - After attempting to delete `emp1.company`, when `emp1.company` is accessed, JavaScript looks for the `company` 
      property on `emp1`.
    - Since `emp1` does not have its own `company` property, JavaScript looks up the prototype chain and finds the 
      `company` property on the `Employee` object.

#### Verification:
```javascript
console.log(emp1.hasOwnProperty('company')); // Output: false
```
- This line verifies that `emp1` does not have its own `company` property. Instead, it inherits it from `Employee`.

#### Deleting Prototype Property:
- To delete the `company` property from the `Employee` object directly:
  ```javascript
  delete Employee.company;
  ```
- Alternatively, you can delete the `company` property from `emp1`'s prototype:
  ```javascript
  delete emp1.__proto__.company;
  ```


### What is `empty` in JavaScript?

Consider the following code:

```javascript
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
delete trees[3];
```

When you run the code above and do `console.log(trees);` in the Chrome developer console, you will see the output:

```
(5) ["redwood", "bay", "cedar", empty, "maple"]
```

In recent versions of Chrome, the word `empty` is used to indicate an uninitialized index in arrays. When you run the same code in the Firefox browser console, you will see:

```
Array(5) [ "redwood", "bay", "cedar", <1 empty slot>, "maple" ]
```

### Explanation

- **Chrome's Representation:** Chrome displays uninitialized indexes in arrays as `empty`. This is Chrome's way of indicating that the array has an uninitialized slot at that index.
- **Firefox's Representation:** Firefox displays the uninitialized index as `<1 empty slot>`. This is Firefox's way of indicating an uninitialized slot in the array.

Regardless of the representation, the actual value at `trees[3]` is `undefined` in both browsers.

### Checking Uninitialized Index

When you check `trees[3] === undefined` in any browser, you will get `true`:

```javascript
console.log(trees[3] === undefined); // Output: true
```

### What will be the output of the following code?

```javascript
var trees = ["xyz", "xxxx", "test", "ryan", "apple"];
delete trees[3];
console.log(trees.length);
```

#### Answer

The code above will output `5`. When we use the `delete` operator to delete an array element, the array length is not affected by this. This holds true even if you delete all elements of an array using the `delete` operator.

So when the `delete` operator removes an array element, that deleted element is no longer present in the array. In place of the value at the deleted index, `undefined × 1` in Chrome and `<1 empty slot>` in Firefox is placed at the index. If you do `console.log(trees)`, the output will be:

- In Chrome: `["xyz", "xxxx", "test", empty, "apple"]`
- In Firefox: `Array(5) [ "xyz", "xxxx", "test", <1 empty slot>, "apple" ]`

### Important Note

You do not need to check for the uninitialized index of the array using `trees[3] === 'empty'` or `trees[3] === '<1 empty slot>'`. These are just ways of displaying an uninitialized index in different browsers, not actual values.

### Summary

- Deleting an element in an array leaves an uninitialized slot.
- Chrome and Firefox display these uninitialized slots differently in their developer consoles.
- The actual value of an uninitialized slot is `undefined`.

Understanding how different browsers display uninitialized array slots can help avoid confusion when debugging JavaScript code.

# Best Way to Detect Reference Values of Any Type in JavaScript

In JavaScript, objects are called reference types. Any value other than a primitive is considered a reference type.
There are several built-in reference types such as Object, Array, Function, Date, null, and Error.

#### Detecting Objects Using `typeof` Operator

The `typeof` operator can be used to detect objects:

```javascript
console.log(typeof {});           // object
console.log(typeof []);           // object
console.log(typeof new Array());  // object
console.log(typeof null);         // object 
console.log(typeof new RegExp()); // object
console.log(typeof new Date());   // object
```

However, the downside of using the `typeof` operator to detect an object is that `typeof` returns "object" for `null` (although `null` is technically an object in JavaScript).

#### Using `instanceof` Operator

The best way to detect an object of a specific reference type is by using the `instanceof` operator.

Syntax: `value instanceof constructor`

```javascript
// Detecting an array
if (value instanceof Array) {
  console.log("value is type of array");
}
```

### Example Usage

Consider the following examples demonstrating the use of `instanceof`:

```javascript
// Employee constructor function
function Employee(name) {
  this.name = name; // Public property
}

var emp1 = new Employee('John');

console.log(emp1 instanceof Employee); // true

// Detecting different types
console.log([] instanceof Array);          // true
console.log({} instanceof Object);         // true
console.log(new Date() instanceof Date);   // true
console.log(function(){} instanceof Function); // true
```

### Prototype Chain

The `instanceof` operator not only checks the constructor used to create an object but also checks its prototype chain. For example:

```javascript
console.log(emp1 instanceof Object); // true
```

This is because `Employee.prototype` is an object itself, and every object ultimately inherits from `Object.prototype`.

### Summary

- `typeof` operator can be used to detect objects but has limitations (e.g., `null` returns "object").
- `instanceof` operator is a reliable way to check if a value is of a specific reference type.
- `instanceof` checks the entire prototype chain, ensuring accurate type detection.

Using `instanceof` is generally the best way to detect reference values and their types in JavaScript due to its accuracy and reliability.

# Passing Values by Reference vs by Value

For a JavaScript developer, it's crucial to understand which values are passed by reference, and which ones are passed by value. Remember that objects, including arrays, are passed by reference while strings, booleans, and numbers are passed by value.

### Example 1

```javascript
var strA = "hi there";
var strB = strA;
strB = "bye there!";
console.log(strA);
```
Explanation:
The output will be 'hi there' because we're dealing with strings here. Strings are passed by value, that is, copied.

```js
var objA = {prop1: 42};
var objB = objA;
objB.prop1 = 90;
console.log(objA) 
```
Explanation:
The output will be `{prop1: 90}` because objects are passed by reference. When we assign `objA` to `objB`, we're not creating a new object. Instead, both `objA` and `objB` point to the same object in memory. So, changing the property `prop1` of `objB` will also change the property `prop1` of `objA`.

```js
var arrA = [0,1,2,3,4,5];
var arrB = arrA;
arrB[0]=42;
console.log(arrA)
```
Explanation:
The output will be `[42,1,2,3,4,5]` because arrays are passed by reference. When we assign `arrA` to `arrB`, we're not creating a new array. Instead, both `arrA` and `arrB` point to the same array in memory. So, changing the element at index 0 of `arrB` will also change the element at index 0 of `arrA`.

```js
var arrA = [0,1,2,3,4,5];
var arrB = arrA.slice();
arrB[0]=42;
console.log(arrA)
```
Explanation:
The output will be `[0,1,2,3,4,5]` because `slice()` creates a new array with the same elements as the original array. So, changing the element at index 0 of `arrB` will not affect `arrA`.

```js
var arrA = [{prop1: "value of array A!!"},  {someProp: "also value of array A!"}, 3,4,5];
var arrB = arrA;
arrB[0].prop1=42;
console.log(arrA);
```
Explanation:
The output will be `[{prop1: 42}, {someProp: "also value of array A!"}, 3, 4, 5]` because objects are passed by reference. When we assign `arrA` to `arrB`, we're not creating a new array. Instead, both `arrA` and `arrB` point to the same array in memory. So, changing the property `prop1` of the object at index 0 of `arrB` will also change the property `prop1` of the object at index 0 of `arrA`.

```js
var arrA = [{prop1: "value of array A!!"}, {someProp: "also value of array A!"},3,4,5];
var arrB = arrA.slice();
arrB[0].prop1=42;
arrB[3] = 20;
console.log(arrA);
```
Explanation:
The output will be `[{prop1: 42}, {someProp: "also value of array A!"}, 3, 4, 5]`.
The slice function copies all the elements of the array returning the new array. However, it doesn't do deep copying.
Instead it does shallow copying. You can imagine slice implemented like this:
```js
function slice(arr) {
   var result = [];
   for (i = 0; i< arr.length; i++) {
       result.push(arr[i]);
   }
   return result; 
}
```
Look at the line with `result.push(arr[i])`. `If arr[i]` happens to be a number or string, it will be passed by value,
in other words, copied. If arr[i] is an object, it will be passed by reference.

In case of our array `arr[0]` is an object `{prop1: "value of array A!!"}`. Only the reference to this object will be
copied. This effectively means that arrays arrA and arrB share first two elements.

This is why changing the property of `arrB[0]` in `arrB` will also change the `arrA[0]`.

### Example 2: Using find() Method

The `find()` method returns the value of the first element in the provided array that satisfies the provided testing function.

Whether it returns a copy of or a reference to the value will follow normal JavaScript behavior, i.e., it'll be a copy if it's a primitive, or a reference if it's a complex type.

```javascript
let foo = ['a', { bar: 1 }];
let a = foo.find(val => val === 'a');
a = 'b';
console.log(foo[0]); // Output: "a"

let obj = foo.find(val => val.bar);
obj.bar = 2;
console.log(foo[1].bar); // Output: 2 - reference
```

# Equality

## Difference Between `==` and `===` Operators in JavaScript

JavaScript provides both strict (`===`, `!==`) and type-converting (`==`, `!=`) equality comparison. The strict operators
take the type of variable into consideration, while non-strict operators make type correction/conversion based on the
values of variables.

### Strict Equality (`===` and `!==`)

The strict operators follow the below conditions for different types:

- Two strings are strictly equal when they have the same sequence of characters, same length, and same characters in
  corresponding positions.
- Two numbers are strictly equal when they are numerically equal, i.e., having the same number value. There are two
  special cases in this:
    - `NaN` is not equal to anything, including `NaN`.
    - Positive and negative zeros are equal to one another.
- Two Boolean operands are strictly equal if both are true or both are false.
- Two objects are strictly equal if they refer to the same object.
- `Null` and `Undefined` types are not equal with `===`, but equal with `==`.

## Examples

Some examples that cover the above cases:

```javascript
  0 == false   // true
  0 === false  // false
  1 == "1"     // true
  1 === "1"    // false
  null == undefined // true
  null === undefined // false
  '0' == false // true
  '0' === false // false
  NaN == NaN // false
  NaN === NaN // false
  [] == [] // false, refer to different objects in memory
  [] === [] // false, refer to different objects in memory
  {} == {} // false, refer to different objects in memory
  {} === {} // false, refer to different objects in memory
```


### Sources:
* [Understanding null, undefined and NaN.](https://codeburst.io/understanding-null-undefined-and-nan-b603cb74b44c)
* [Why does Number(null) return 0, and parseFloat(null) return NaN?](https://stackoverflow.com/questions/55459023/why-does-numbernull-return-0-and-parsefloatnull-return-nan)
* [Why `null >= 0 && null <= 0` but not `null == 0`?](https://stackoverflow.com/questions/2910495/why-null-0-null-0-but-not-null-0)
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)