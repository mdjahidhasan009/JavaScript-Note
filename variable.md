# `not defined`
Will throw `error` when we try to access a variable that is not defined/declared in the scope. Also, function execution 
will be stopped at that point.

```js
console.log(x); // ReferenceError: x is not defined
```
But if we use `typeof` operator, it will return `undefined` instead of `ReferenceError`.

```js
console.log(typeof x); // undefined
```

# `undefined`
We get while we defined a variable but not assigned any value to it. Also, `console.log` do not throw any error. It's 
**primitive value not an object**.

```js
let a; // declaring a
console.log(a); // undefined
console.log(typeof a === 'undefined'); // true
```
`typeof undefined` is `undefined`.
```js
console.log(typeof undefined); // undefined
```
Similar as with `null`, negating undefined gives true, but comparing it to either true or false gives false.
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
* They represent something non existing…

**Differences:**
* … null represents “nothing”, fully non existing. undefined something which isn’t defined
* undefined has its own data type (undefined), null is only an object
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

# Object
`Object` is a global object in JavaScript that has methods for creating and manipulating objects. It is a constructor
function that creates an object wrapper for the given value. It can also be used to create new objects.


### Prototype Property
The `prototype` property is used to add new properties and methods to an object constructor. It allows you to define
properties and methods that will be shared by all instances of the object. When you create a new object using the
constructor, the new object will inherit the properties and methods defined in the prototype.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
```
In the example above, the `Person` function is used as a constructor to create new `Person` objects. If you want to add
a new method to all `Person` objects, you can do so by adding the method to the `Person.prototype` object.

```js
Person.prototype.greet = function() {
  return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
};
```
The `greet` method is added to the `Person.prototype` object, which means that all `Person` objects will have access to
this method.

```js
const john = new Person('John', 30);
console.log(john.greet()); // Output: Hello, my name is John and I am 30 years old.
```
When you create a new `Person` object using the `Person` constructor, the `greet` method is available on the new object.


### Explanation of Output in JavaScript Code

#### Code

```javascript
function User(name) {
  this.name = name || "JsGeeks";
}

var person = new User("xyz")["location"] = "USA";
console.log(person);
```
Output
```js
USA
```
### Breakdown why the output is `USA`

1. **Function Definition:**
   ```javascript
   function User(name) {
     this.name = name || "JsGeeks";
   }
   ```

   This defines a constructor function `User` which takes a parameter `name` and assigns it to the property `name` of the newly created object. If no name is provided, it defaults to `"JsGeeks"`.

2. **Object Creation and Property Assignment:**
   ```javascript
   var person = new User("xyz")["location"] = "USA";
   ```

   This line does a few things in sequence:
    - `new User("xyz")` creates a new object using the `User` constructor function and assigns the `name` property to `"xyz"`.
    - The resulting object from `new User("xyz")` is then used to create a new property `location` with the value `"USA"`.
    - According to ECMAScript Specification, section 12.14.4, the assignment operation returns the right-hand side value, which is `"USA"`.

3. **Logging the Result:**
   ```javascript
   console.log(person);
   ```

   Here, `person` holds the value returned by the assignment operation, which is `"USA"`. Therefore, when `console.log(person)` is called, it logs `"USA"`.

### Why the `name` Property is Not Printed

The assignment `new User("xyz")["location"] = "USA"` results in the value `"USA"` being assigned to `person`. The reference to the object created by `new User("xyz")` is lost because the assignment operation's result is what's assigned to `person`, not the object itself.

### Example to Illustrate

To better understand this, consider the following example:

```javascript
function User(name) {
  this.name = name || "JsGeeks";
}

var userInstance = new User("xyz");
userInstance["location"] = "USA";

console.log(userInstance); // Logs the object with both 'name' and 'location' properties
```

In this example, `userInstance` will be an object with properties `name` and `location`, and logging `userInstance` will show both properties.

In contrast, the original code assigns the result of the assignment operation (`"USA"`) to `person`, hence `person` only holds `"USA"` and not the object with `name`.

### Corrected Code

To see both `name` and `location` properties, you should store the object in a variable and then assign the `location` property:

```javascript
function User(name) {
  this.name = name || "JsGeeks";
}

var person = new User("xyz");
person["location"] = "USA";
console.log(person); // Logs the object with both 'name' and 'location' properties
```


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
    - The `Object.create` method creates a new object with the specified prototype object and properties. In this case, `emp1` is created with `Employee` as its prototype.

2. **Prototype Property:**
    - The `company` property is defined on the `Employee` object.
    - When `emp1` is created using `Object.create(Employee)`, it inherits the `company` property from `Employee`.

3. **Delete Operator:**
    - The `delete` operator is used to remove a property from an object.
    - `delete emp1.company` attempts to remove the `company` property from the `emp1` object.
    - Since `emp1` does not have its own `company` property (it is inherited from `Employee`), the `delete` operation does not affect the prototype property.

4. **Property Access:**
    - After attempting to delete `emp1.company`, when `emp1.company` is accessed, JavaScript looks for the `company` property on `emp1`.
    - Since `emp1` does not have its own `company` property, JavaScript looks up the prototype chain and finds the `company` property on the `Employee` object.

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

# Array
An array is a special variable that can hold more than one value at a time. It is a data structure that stores a 
collection of elements, each identified by an index or key.

### Associative Array
In JavaScript, an associative array is the same as an object. Even though there is no built-in function or property to
calculate the length/size of an object, we can write such a function ourselves.

Consider the following object:

```javascript
var counterArray = {
  A: 3,
  B: 4
};
counterArray["C"] = 1;
```
#### Method 1: Using `Object.keys`

The `Object.keys` method returns an array of a given object's own enumerable property names, and we can use it to calculate the length of the object.

```javascript
console.log(Object.keys(counterArray).length); // Output: 3
```

#### Method 2: Iterating Through the Object

We can also calculate the length of an object by iterating through it and counting its own properties. This way, we will ignore the properties that come from the object's prototype chain.

```javascript
function getLength(object) {
  var count = 0;
  for (var key in object) {
    // hasOwnProperty method checks for own property of object
    if (object.hasOwnProperty(key)) count++;
  }
  return count;
}
console.log(getLength(counterArray)); // Output: 3
```

#### Method 3: Using `Object.getOwnPropertyNames`

All modern browsers (including IE9+) support the `getOwnPropertyNames` method, so we can calculate the length using the following code:

```javascript
console.log(Object.getOwnPropertyNames(counterArray).length); // Output: 3
```

#### Method 4: Using Underscore or Lodash Libraries

The Underscore and Lodash libraries have a method `size` dedicated to calculating the object length. We don't recommend including one of these libraries just to use the `size` method, but if it's already used in your project, why not?

```javascript
console.log(_.size({one: 1, two: 2, three: 3})); // Output: 3
```

#### Summary:
- In the given code, `emp1` inherits the `company` property from the `Employee` object.
- The `delete` operator does not delete inherited properties, only own properties.
- Therefore, `emp1.company` still refers to the `company` property on the `Employee` object, which has the value `xyz`.

### Sources:
* [Understanding null, undefined and NaN.](https://codeburst.io/understanding-null-undefined-and-nan-b603cb74b44c)
* [Why does Number(null) return 0, and parseFloat(null) return NaN?](https://stackoverflow.com/questions/55459023/why-does-numbernull-return-0-and-parsefloatnull-return-nan)
* [Why `null >= 0 && null <= 0` but not `null == 0`?](https://stackoverflow.com/questions/2910495/why-null-0-null-0-but-not-null-0)
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)