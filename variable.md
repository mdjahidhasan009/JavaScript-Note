# `not defined` or `ReferenceError`
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


## Ways of Creating Objects in JavaScript

#### Method 1: Function Based

This method is useful if we want to create several similar objects. In the code sample below, we wrote the function `Employee` and used it as a constructor by calling it with the `new` operator.

```javascript
function Employee(fName, lName, age, salary) {
  this.firstName = fName;
  this.lastName = lName;
  this.age = age;
  this.salary = salary;
}

// Creating multiple objects which have similar properties but different values assigned to object properties.
var employee1 = new Employee('John', 'Moto', 24, '5000$');
var employee2 = new Employee('Ryan', 'Jor', 26, '3000$');
var employee3 = new Employee('Andre', 'Salt', 26, '4000$');
```

#### Method 2: Object Literal

Object Literal is the best way to create an object and is used frequently. Below is a code sample for creating an employee object that contains properties as well as methods.

```javascript
var employee = {
  name: 'Nishant',
  salary: 245678,
  getName: function() {
    return this.name;
  }
}
```

The code sample below is a Nested Object Literal, where `address` is an object inside the `employee` object.

```javascript
var employee = {
  name: 'Nishant',
  salary: 245678,
  address: {
    addressLine1: 'BITS Pilani',
    addressLine2: 'Vidya Vihar',
    phoneNumber: {
      workPhone: 7098889765,
      homePhone: 1234567898
    }
  }
}
```

#### Method 3: From Object Using `new` Keyword

In the code below, a sample object has been created using the `Object` constructor function.

```javascript
var employee = new Object(); // Created employee object using new keyword and Object()
employee.name = 'Nishant';
employee.getName = function() {
  return this.name;
}
```

#### Method 4: Using `Object.create`

`Object.create(obj)` will create a new object and set the `obj` as its prototype. It’s a modern way to create objects that inherit properties from other objects. The `Object.create` function doesn’t run the constructor. You can use `Object.create(null)` when you don’t want your object to inherit the properties of `Object`.

```javascript
var employeeProto = {
  getName: function() {
    return this.name;
  }
};

var employee = Object.create(employeeProto);
employee.name = 'Nishant';
console.log(employee.getName()); // Output: Nishant

emp1.displayName = function() {
   console.log('xyz-Anonymous');
};

employee.displayName(); //Nishant
emp1.displayName();//xyz-Anonymous
```

In addition to this, the `Object.create()` method also allows specifying a second argument which is an object containing additional properties and methods to add to the new object.

For example:
```javascript
var emp1 = Object.create(employee, {
  name: {
    value: "John"
  }
});

emp1.displayName(); // "John"
employee.displayName(); // "Nishant"
```
In the example above, `emp1` is created with its own value for `name`, so calling `displayName()` method will display "John" instead of "Nishant".

Objects created in this manner give you full control over newly created objects. You are free to add or remove any properties and methods you want.

## Prototype Property
The `prototype` property is used to add new properties and methods to an object constructor. It allows you to define properties and methods that will be shared by all instances of the object. When you create a new object using the constructor, the new object will inherit the properties and methods defined in the prototype.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
```
In the example above, the `Person` function is used as a constructor to create new `Person` objects. If you want to add a new method to all `Person` objects, you can do so by adding the method to the `Person.prototype` object.

```javascript
Person.prototype.greet = function() {
  return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
};
```
The `greet` method is added to the `Person.prototype` object, which means that all `Person` objects will have access to this method.

```javascript
const john = new Person('John', 30);
console.log(john.greet()); // Output: Hello, my name is John and I am 30 years old.
```
When you create a new `Person` object using the `Person` constructor, the `greet` method is available on the new object.

## Using Constructor Functions for Inheritance in JavaScript

Let's say we have a `Person` class which has `name`, `age`, and `salary` properties, and an `incrementSalary()` method.

```javascript
function Person(name, age, salary) {
  this.name = name;
  this.age = age;
  this.salary = salary;
  this.incrementSalary = function (byValue) {
    this.salary = this.salary + byValue;
  };
}
```

Now we wish to create an `Employee` class which contains all the properties of the `Person` class and wanted to add some additional properties to the `Employee` class.

```javascript
function Employee(company){
  this.company = company;
}

// Prototypal Inheritance 
Employee.prototype = new Person("Nishant", 24, 5000);
```

In the example above, `Employee` type inherits from `Person`. It does so by assigning a new instance of `Person` to `Employee.prototype`. After that, every instance of `Employee` inherits its properties and methods from `Person`.

```javascript
var emp1 = new Employee("Google");

console.log(emp1 instanceof Person); // true
console.log(emp1 instanceof Employee); // true
```

Let's understand constructor inheritance:

```javascript
// Defined Person class
function Person(name){
  this.name = name || "Nishant";
}

var obj = {};

// obj inherits Person class properties and methods 
Person.call(obj); // constructor inheritance

console.log(obj); // Object {name: "Nishant"}
```

Here we saw calling `Person.call(obj)` defines the `name` property from `Person` to `obj`.

```javascript
console.log(name in obj); // true
```

Type-based inheritance is best used with developer-defined constructor functions rather than natively in JavaScript. This also allows flexibility in how we create similar types of objects.

## Prototype Property
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


## How to Prevent Modification of Objects in JavaScript

ECMAScript 5 introduced several methods to prevent modification of objects, which lock down objects to ensure that no one, accidentally or otherwise, can change their functionality.

### Three Levels of Preventing Modification

1. **Prevent Extensions**

   No new properties or methods can be added to the object, but existing properties and methods can be changed.

   ```javascript
   var employee = {
     name: "Nishant"
   };

   // Lock the object 
   Object.preventExtensions(employee);

   // Now try to change the employee object property name
   employee.name = "John"; // Works fine 

   // Now try to add some new property to the object
   employee.age = 24; // Fails silently unless it's inside strict mode
   ```

2. **Seal**

   Similar to `preventExtensions`, but it also prevents existing properties and methods from being deleted.

   ```javascript
   var employee = {
     name: "Nishant"
   };

   // Seal the object 
   Object.seal(employee);

   console.log(Object.isExtensible(employee)); // false
   console.log(Object.isSealed(employee)); // true

   delete employee.name // Fails silently unless in strict mode

   // Trying to add new property will give an error
   employee.age = 30; // Fails silently unless in strict mode
   ```

   When an object is sealed, its existing properties and methods can't be removed. Sealed objects are also non-extensible.

3. **Freeze**

   Similar to `seal`, but it also prevents existing properties and methods from being modified (all properties and methods are read-only).

   ```javascript
   var employee = {
     name: "Nishant"
   };

   // Freeze the object
   Object.freeze(employee); 

   console.log(Object.isExtensible(employee)); // false
   console.log(Object.isSealed(employee));     // true
   console.log(Object.isFrozen(employee));     // true

   employee.name = "xyz"; // Fails silently unless in strict mode
   employee.age = 30;     // Fails silently unless in strict mode
   delete employee.name;  // Fails silently unless it's in strict mode
   ```

   Frozen objects are considered both non-extensible and sealed.

### Recommended Practice

If you decide to prevent modification, seal, or freeze the object, use strict mode so that you can catch the errors.

```javascript
"use strict";

var employee = {
  name: "Nishant"
};

// Freeze the object
Object.freeze(employee); 

console.log(Object.isExtensible(employee)); // false
console.log(Object.isSealed(employee));     // true
console.log(Object.isFrozen(employee));     // true

employee.name = "xyz"; // Throws error in strict mode
employee.age = 30;     // Throws error in strict mode
delete employee.name;  // Throws error in strict mode
```

## Deep Clone Object
A deep clone is a technique used to create a new object with the same properties and values as an existing object. The 
new object is a separate entity from the original object, meaning that changes made to one object will not affect the 
other.

```js
function deepClone(object){
	var newObject = {};
	for(var key in object){
		if(typeof object[key] === 'object'  && object[key] !== null ){
		 newObject[key] = deepClone(object[key]);
		} else{
		 newObject[key] = object[key];
		}
	}
	return newObject;
}

var objA = { foo: 'Bar', nested: { key: 'value' } };
var objB = deepClone(objA);

console.log(objA === objB); // false
console.log(objA == objB);  // false
console.log(objA.foo === objB.foo); // true (primitive value)
console.log(objA.number === objB.number); // true (primitive value)
console.log(objA.nested === objB.nested); // false (deep copy, different references)
```

## Shallow Clone Object
A shallow clone is a technique used to create a new object with the same properties and values as an existing object.
However, if the existing object contains nested objects, the new object will reference the same nested objects as the
original object But, changes made to the nested objects at the shallow will be reflected in both the original and new 
objects. With primitive values, changes will not be reflected in the parent object.

```js
function shallowClone(object){
    var newObject = {};
    for(var key in object){
        newObject[key] = object[key];
    }
    return newObject;
}

var objA = { foo: 'Bar', nested: { key: 'value' } };
var objB = shallowClone(objA);

console.log(objA === objB); // false
console.log(objA == objB);  // false
console.log(objA.foo === objB.foo); // true (primitive value)
console.log(objA.number === objB.number); // true (primitive value)
console.log(objA.nested === objB.nested); // true (shallow copy, same reference)
```


### Checking for undefined object properties
When working with objects in JavaScript, it's important to check if a property exists before accessing it. This is
especially useful when dealing with nested objects or when the property may not be present in all objects.

- `in` operator checks whether a property exists in an object, including the prototype chain, also inherited properties.
- `hasOwnProperty` method checks whether the object has a property as its own (not inherited).
- Checking for `undefined` value can help determine if a property exists but has no value.
- Using the `typeof` operator with `=== 'undefined'` can also check if a property is undefined also  a safe check that 
  avoids potential errors if the property is not declared.

```js
var obj = { a: 1 };

// Using the 'in' operator
console.log('b' in obj); // false

// Using hasOwnProperty method
console.log(obj.hasOwnProperty('b')); // false

// Checking for undefined value
console.log(obj.b === undefined); // true

// Using typeof operator
console.log(typeof obj.b === 'undefined'); // true
```

You can also check for the existence of nested properties using a combination of these methods:

```javascript
var nestedObj = { a: { b: { c: 1 } } };

// Check if 'a' exists and 'b' is an own property of 'a'
if (nestedObj.a && nestedObj.a.hasOwnProperty('b')) {
    console.log('b exists as a direct property of a');
} else {
    console.log('b does not exist as a direct property of a');
}

// Check if 'c' exists within 'b'
if (nestedObj.a && nestedObj.a.b && 'c' in nestedObj.a.b) {
    console.log('c exists in b');
} else {
    console.log('c does not exist in b');
}
```


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


## Merging Two JavaScript Objects Dynamically

### Problem Statement
Let’s say you have two objects:

```javascript
var person = {
  name: 'John',
  age: 24
};

var address = {
  addressLine1: 'Some Location x',
  addressLine2: 'Some Location y',
  city: 'NewYork'
}; 
```

Write a `merge` function which will take two objects and add all the own properties of the second object into the first object.

### Example
```javascript
merge(person, address); 
/* Now person should have 5 properties 
name, age, addressLine1, addressLine2, city */
```

### Method 1: Using ES6 `Object.assign` Method

```javascript
const merge = (toObj, fromObj) => Object.assign(toObj, fromObj);
```

### Method 2: Without Using Built-in Function

```javascript
function merge(toObj, fromObj) {
  // Make sure both of the parameters are objects
  if (typeof toObj === 'object' && typeof fromObj === 'object') {
    for (var prop in fromObj) {
      // Assign only own properties, not inherited properties
      if (fromObj.hasOwnProperty(prop)) {
        // Assign property and value
        toObj[prop] = fromObj[prop];
      }
    }
  } else {
    throw "Merge function can apply only on objects";
  }
}
```

### Conclusion
Both methods achieve the goal of merging two objects dynamically. The ES6 `Object.assign` method is more concise and preferred for modern JavaScript development. The custom `merge` function provides a deeper understanding of how property assignment works in JavaScript.


## Non-Enumerable Property in JavaScript

### Introduction
Objects can have properties that don't show up when you iterate through the object using a `for...in` loop or when using `Object.keys()` to get an array of property names. These properties are known as non-enumerable properties.

### Example of Enumerable Properties

```javascript
var person = {
  name: 'John'
};
person.salary = '10000$';
person['country'] = 'USA';

console.log(Object.keys(person)); // ['name', 'salary', 'country']
```

In the example above, the `person` object has properties `name`, `salary`, and `country` that are enumerable and therefore show up when we call `Object.keys(person)`.

### Creating a Non-Enumerable Property

To create a non-enumerable property, we use `Object.defineProperty()`. This is a special method for creating 
non-enumerable properties in JavaScript.

```javascript
var person = {
  name: 'John'
};
person.salary = '10000$';
person['country'] = 'USA';

// Create non-enumerable property
Object.defineProperty(person, 'phoneNo', {
  value: '8888888888',
  enumerable: false
});

console.log(Object.keys(person)); // ['name', 'salary', 'country']
```

In the example above, the `phoneNo` property doesn't show up because we made it non-enumerable by setting 
`enumerable: false`.

If we want to check if a property is enumerable, we can use the `propertyIsEnumerable()` method:

```javascript
console.log(person.propertyIsEnumerable('phoneNo')); // false
```

If we want to see all properties, enumerable or not, we can use `Object.getOwnPropertyNames()`:

```javascript
console.log(Object.getOwnPropertyNames(person)); // ['name', 'salary', 'country', 'phoneNo']
```

If we use `enumerable: true` in the `Object.defineProperty()` method, the property will be enumerable:

```javascript
var person = {
  name: 'John'
};
person.salary = '10000$';
person['country'] = 'USA';

// Create non-enumerable property
Object.defineProperty(person, 'phoneNo', {
  value: '8888888888',
  enumerable: true
});

console.log(Object.keys(person)); // ['name', 'salary', 'country', 'phoneNo']
```


### Use Cases for Non-Enumerable Properties

Non-enumerable properties are useful in scenarios where you want to add properties to an object but don't want them to appear during enumeration (e.g., `for...in` loops, `Object.keys()`, or `JSON.stringify()`). Here are some common use cases:

* **Internal State/Property**:
    - Storing internal state that should not be exposed to the user.
    - Example: Private counters, flags, or other internal variables.
   ```javascript
   var person = {
     name: 'John'
   };
   Object.defineProperty(person, '_id', {
     value: '12345',
     enumerable: false
   });
   ```
* **Internal Properties:** Non-enumerable properties can be used to store internal data that is not relevant to external users of an object.
    ```js
    var person = {
        name: 'John',
        getName: function() { return this.name; }
    };
    Object.defineProperty(person, '_internalId', {
        value: 12345,
        enumerable: false
    });
    ```
* **Private Methods**:
    - Defining methods that are intended for internal use only.
    - Example: Utility functions within an object.
   ```javascript
   var person = {
     name: 'John'
   };
   Object.defineProperty(person, 'calculateAge', {
     value: function() { /* some logic */ },
     enumerable: false
   });
   ```

* **Metadata**:
    - Adding metadata to objects that shouldn't be part of the main data set.
    - Example: Annotations or internal bookkeeping information.
   ```javascript
   var person = {
     name: 'John'
   };
   Object.defineProperty(person, '_metadata', {
     value: { created: '2023-06-23' },
     enumerable: false
   });
   ```
* **Performance Optimization:** Non-enumerable properties can improve performance by reducing the number of properties that need to be iterated over.
    ```js
    var largeObject = {};
    for (var i = 0; i < 1000; i++) {
        Object.defineProperty(largeObject, 'prop' + i, {
            value: i,
            enumerable: false
        });
    }
    ```
  
* **Compatibility or Polyfills**:
    - Adding methods or properties for backward compatibility or polyfills without cluttering the object's main structure.
    - Example: Shim functions for older browsers.
   ```javascript
   Object.defineProperty(Array.prototype, 'customMethod', {
     value: function() { /* custom logic */ },
     enumerable: false
   });
   ```

* **Framework or Library Code**:
    - Hiding framework or library-specific properties from user objects.
    - Example: Internal properties in a library that should not interfere with user code.
   ```javascript
   var frameworkObject = {};
   Object.defineProperty(frameworkObject, '_internalState', {
     value: { isActive: true },
     enumerable: false
   });
   ```

* **Preventing Modification:** Non-enumerable properties can be used to prevent certain properties from being modified or deleted.
    ```js
    var settings = {};
    Object.defineProperty(settings, 'appVersion', {
        value: '1.0.0',
        writable: false,
        enumerable: false
    });
    ```
* **Caching:** Non-enumerable properties can be used to cache values that are expensive to compute or retrieve.
    ```js
    var dataFetcher = {
        fetchData: function() {
            if (!this._cache) {
                this._cache = expensiveComputation();
            }
            return this._cache;
        }
    };
    Object.defineProperty(dataFetcher, '_cache', {
        value: null,
        writable: true,
        enumerable: false
    });
    ```  

### Use Cases for Enumerable Properties

Enumerable properties are used in scenarios where you want properties to be accessible and visible during enumeration. Here are some common use cases:

1. **Public Data**:
    - Storing public properties that should be easily accessible and iterable.
    - Example: Basic information in an object.
   ```javascript
   var person = {
     name: 'John',
     age: 30
   };
   ```

2. **Configuration Objects**:
    - Defining configuration objects where all properties should be visible and modifiable.
    - Example: Settings for a library or application.
   ```javascript
   var config = {
     apiUrl: 'https://api.example.com',
     timeout: 5000
   };
   ```

3. **Data Transfer Objects (DTOs)**:
    - Objects intended to transfer data where all properties should be included during serialization.
    - Example: JSON objects for API requests or responses.
   ```javascript
   var requestData = {
     userId: 123,
     action: 'login'
   };
   ```

4. **Forms and User Inputs**:
    - Collecting and processing user inputs where all fields need to be iterated over.
    - Example: Form data in a web application.
   ```javascript
   var formData = {
     username: 'johndoe',
     password: 'securepassword'
   };
   ```

5. **Dynamic Object Creation**:
    - Creating objects dynamically where properties are added and should be visible.
    - Example: Building objects from user input or external data sources.
   ```javascript
   var user = {};
   user.name = 'Jane';
   user.age = 28;
   ```

6. **Logging and Debugging**:
    - Including all properties in logs for debugging purposes.
    - Example: Logging the state of an object.
   ```javascript
   var user = {
     id: 1,
     name: 'Alice'
   };
   console.log(Object.keys(user)); // ['id', 'name']
   ```

By understanding the differences between enumerable and non-enumerable properties, you can better manage the visibility and accessibility of properties in your JavaScript objects, providing a more controlled and organized codebase.


### Use Cases for Non-Enumerable Properties
* **Private Properties:** Non-enumerable properties can be used to store private data that should not be accessed or modified directly.
* **Internal Properties:** Non-enumerable properties can be used to store internal data that is not relevant to external users of an object.
* **Metadata:** Non-enumerable properties can be used to store metadata or configuration information that should not be exposed to external code.
* **Performance Optimization:** Non-enumerable properties can improve performance by reducing the number of properties that need to be iterated over.
* **Preventing Modification:** Non-enumerable properties can be used to prevent certain properties from being modified or deleted.
* **Avoiding Conflicts:** Non-enumerable properties can help avoid conflicts with other properties in the object.
* **Security:** Non-enumerable properties can be used to store sensitive data that should not be exposed to external code.
* **Debugging:** Non-enumerable properties can be used to store debugging information that should not be displayed to end users.
* **Customization:** Non-enumerable properties can be used to customize the behavior of an object without affecting its public interface.
* **Caching:** Non-enumerable properties can be used to cache values that are expensive to compute or retrieve.


### Bonus: Creating Read-Only Properties

`Object.defineProperty()` also lets you create read-only properties. By default, the `writable` attribute of a property 
descriptor is set to `false`.

```javascript
// Create a read-only non-enumerable property
Object.defineProperty(person, 'phoneNo', {
  value: '8888888888',
  enumerable: false,
  writable: false
});

person.phoneNo = '7777777777'; // Attempt to change the value
console.log(person.phoneNo); // Output: 8888888888
```

In the example above, attempting to change the value of the `phoneNo` property doesn't work because it is non-writable.
In strict mode, this would throw an error. In non-strict mode, it fails silently without changing the value.

### Conclusion
Non-enumerable properties are useful when you want to hide certain properties from enumeration. `Object.defineProperty()` provides a flexible way to define properties with specific descriptors such as `enumerable` and `writable`, allowing for more control over the behavior of object properties.

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


### How to Check if the Value of a Variable is an Array in JavaScript

In JavaScript, it's often necessary to determine whether a variable is an array. Below are several methods to detect an array.

#### Method 1: Using `Object.prototype.toString.call`

Juriy Zaytsev (also known as kangax) proposed this elegant solution:

```javascript
function isArray(value){
  return Object.prototype.toString.call(value) === '[object Array]';
}
```

This approach is popular and recommended because the native `toString()` method on a given value produces a standard string in all browsers.

#### Method 2: Duck Typing

Duck typing tests for array type detection:

```javascript
// Duck typing arrays
function isArray(value){
  return typeof value.sort === 'function';
}
```

However, this method is not reliable because it returns `true` for any object with a `sort` method, not just arrays.

#### Method 3: Using `Array.isArray`

ECMAScript 5 introduced `Array.isArray()` specifically to detect arrays:

```javascript
function isArray(value){
  // ECMAScript 5 feature
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
}
```

#### Method 4: Querying the Constructor Name

You can check the constructor name of the value:

```javascript
function isArray(value) {
  return value.constructor.name === "Array";
}
```

#### Method 5: Using `instanceof`

You can check if a given value is an instance of `Array`:

```javascript
function isArray(value) {
  return value instanceof Array;
}
```

### Example Usage

```javascript
var arr = [1, 2, 3];
console.log(isArray(arr)); // true

var notArr = { foo: "bar" };
console.log(isArray(notArr)); // false
```

### Summary

- Method 1: `Object.prototype.toString.call(value) === '[object Array]'` - reliable and widely used.
- Method 2: Duck typing - not recommended due to potential false positives.
- Method 3: `Array.isArray()` - best and simplest method.
- Method 4: Checking the constructor name.
- Method 5: Using `instanceof`.

Each method has its use cases, but `Array.isArray()` is the most straightforward and reliable way to check if a variable is an array.


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

## Testing Strings as Literals and Objects in JavaScript

### Problem
In JavaScript, you can create strings using string literals and the `String` constructor function.

- **String Literal:**
  ```javascript
  var ltrlStr = "Hi I am string literal";
  ```

- **String Object:**
  ```javascript
  var objStr = new String("Hi I am string object");
  ```

### Solution
To test if a variable is a string, whether it's a string literal or a string object, you can use both the `typeof` operator and the `instanceof` operator.

### Explanation
- **String Literal:**
  ```javascript
  var ltrlStr = "Hi I am string literal";
  console.log(typeof ltrlStr); // "string"
  console.log(ltrlStr instanceof String); // false
  ```

- **String Object:**
  ```javascript
  var objStr = new String("Hi I am string object");
  console.log(typeof objStr); // "object"
  console.log(objStr instanceof String); // true
  ```

As shown above, `typeof` is sufficient for string literals but not for string objects. Conversely, `instanceof` works for string objects but not for string literals.

### Combined Check
By combining `typeof` and `instanceof`, you can accurately determine if a variable is a string in both cases:

```javascript
function isString(str) {
  return typeof(str) == 'string' || str instanceof String;
}

var ltrlStr = "Hi I am string literal";
var objStr = new String("Hi I am string object");
console.log(isString(ltrlStr)); // true
console.log(isString(objStr)); // true
```

### Explanation
- `typeof(str) == 'string'` checks for string literals.
- `str instanceof String` checks for string objects.

Both conditions together ensure that the function returns `true` for both string literals and string objects.

# `var` and `let`
`var` and `let` are both used for variable declaration in JavaScript, but they have some differences.

* `var` is function-scoped when declared inside a function, and globally scoped when declared outside a function. `let` 
  is block-scoped, meaning it is only accessible within the block it is defined in.
* Variables declared with `var` are hoisted to the top of their scope and initialized with `undefined`.  Variables 
  declared with `let` are hoisted to the top of their block but are not initialized.
* Redeclaring a variable with `var` is allowed, while redeclaring a variable with `let` in the same scope is not allowed.
* `let` is a relatively new feature introduced in ES6, while `var` has been around since the beginning of JavaScript.
* It is recommended to use `let` over `var` for variable declaration in modern JavaScript code.
* `const` is another keyword used for variable declaration, but it is used for constants that cannot be reassigned.


### Understanding `var` Scope and `setTimeout` in JavaScript
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
Due to the function scope of `var`, all `setTimeout` callbacks share the same `i` variable, which ends up being the length of the array after the loop finishes. Therefore, all logs will show the value 4.
### Correcting the Scope Issue

To capture the correct index value for each iteration, use an IIFE (Immediately Invoked Function Expression), `let`, or `forEach` to create a block-scoped variable:

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



# Best Way to Detect Reference Values of Any Type in JavaScript

In JavaScript, objects are called reference types. Any value other than a primitive is considered a reference type. There are several built-in reference types such as Object, Array, Function, Date, null, and Error.

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


### Sources:
* [Understanding null, undefined and NaN.](https://codeburst.io/understanding-null-undefined-and-nan-b603cb74b44c)
* [Why does Number(null) return 0, and parseFloat(null) return NaN?](https://stackoverflow.com/questions/55459023/why-does-numbernull-return-0-and-parsefloatnull-return-nan)
* [Why `null >= 0 && null <= 0` but not `null == 0`?](https://stackoverflow.com/questions/2910495/why-null-0-null-0-but-not-null-0)
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)