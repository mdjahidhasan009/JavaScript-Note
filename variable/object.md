# Object
`Object` is a global object in JavaScript that has methods for creating and manipulating objects. It is a constructor
function that creates an object wrapper for the given value. It can also be used to create new objects.


# Ways of Creating Objects in JavaScript

### Method 1: Function Based

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

### Method 2: Object Literal

Object Literal is the best way to create an object and is used frequently. Below is a code sample for creating an 
employee object that contains properties as well as methods.

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

### Method 3: From Object Using `new` Keyword / Object Constructor

In the code below, a sample object has been created using the `Object` constructor function.

```javascript
var employee = new Object(); // Created employee object using new keyword and Object()
employee.name = 'Nishant';
employee.getName = function() {
  return this.name;
}
```
Another way to create an object using the `Object` constructor is by passing an object literal as an argument.

```javascript
var employee = new Object({
  name: 'Nishant',
  salary: 245678,
  getName: function() {
    return this.name;
  }
});
```

Also, new is not required when creating an object using `Object` constructor.

```js
var employee = Object();
employee.name = 'Nishant';
employee.salary = 245678;
employee.getName = function() {
  return this.name;
}
console.log(employee) // { name: 'Nishant', salary: 245678, getName: [Function: getName] }
```

```js
var employee = Object({
  name: 'Nishant',
  salary: 245678,
  getName: function() {
    return this.name;
  }
});
console.log(employee) // { name: 'Nishant', salary: 245678, getName: [Function: getName] }
```

### Method 4: Using `Object.create` Method

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

### Object literal vs Constructor for creating objects
- Literal are global objects in JavaScript. If we want singleton object and will share across the application then we
  can use object literal.
- If we want to create multiple objects then we can use constructor function as we can create multiple objects using
  constructor function and only one object using object literal.
- For OOP features like inheritance, polymorphism, encapsulation, we can use constructor function not object literal.

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

Type-based inheritance is best used with developer-defined constructor functions rather than natively in JavaScript.
This also allows flexibility in how we create similar types of objects.

# Prototype Property
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

### Differences between `prototype` and `__proto__` in JavaScript


# Property
In JavaScript, objects can have properties that are either their own properties or inherited from their prototype.

## Own Property
An own property is a property that is directly defined on an object itself. It is not inherited from the object's prototype.

```javascript
var person = {
  name: 'John'
};
person.age = 30;

console.log(person.name); // John (own property)
console.log(person.age);  // 30 (own property)
```

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
console.log(john.name) // Own property Output: John
console.log(john.greet()); // Function definition (inherited from prototype) Output: Hello, my name is John and I am 30 years old.
```
When you create a new `Person` object using the `Person` constructor, the `greet` method is available on the new object.

We can also define prototype properties and methods for built-in objects like `Array`, `String`, `Number`, etc.

```js
Array.prototype.sum = function() {
  return this.reduce((acc, val) => acc + val, 0);
};
```
This will add a `sum` method to all arrays in JavaScript.

```js
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.sum()); // Output: 15
```

**Also, we can define prototype properties using `Object.create({})` method.**

Here, `person` object inherits properties `name` and `age` from the object passed to `Object.create()`. So, `name` and
`age` are prototype properties of `person`.

```js
let person = Object.create({
  name: "Nishant",
  age: 24
});

console.log(person.name); // Output: Nishant
console.log(person.age);  // Output: 24
console.log(person.hasOwnProperty('name')); // Output: false
console.log(person.hasOwnProperty('age'));  // Output: false
console.log(Object.keys(person)); // Output: []


//defining own property same as prototype property
person.name = "John";
console.log(person.name); // Output: John
console.log(person.hasOwnProperty('name')); // Output: true

//if we try to delete then it will first delete own property
delete person.name;
console.log(person.name); // Output: Nishant

//if we try to delete again then it will not delete prototype property
delete person.name;
console.log(person.name); // Output: Nishant
```

### Differences between Own Properties and Prototype Properties
* Definition Location:
    * **Own Properties:** Defined directly on the object.
    *  **Prototype Properties:** Defined on the prototype of the object.
* Inheritance:
    * **Own Properties:** Not inherited by other objects.
    * **Prototype Properties:** Inherited by other objects of the same type.
* Ownership:
    * **Own Properties:** Belong to the object itself.
    * **Prototype Properties:** Belong to the object's prototype.
* Visibility:
    * **Own Properties:** Visible when iterating over the object's properties using methods like `Object.keys()` or `for...in` loop.
    * **Prototype Properties:** Not visible when using `Object.keys()`, but visible in `for...in` loop.
* Access:
    * **Own Properties:** Accessed directly on the object.
    * **Prototype Properties:** Accessed through the object's prototype chain.
* Modifiability:
    * **Own Properties:** Can be modified directly on the object.
    * **Prototype Properties:** Can be modified on the prototype, affecting all objects of the same type.
* Deletion:
    * **Own Properties:** Can be deleted directly on the object using the `delete` operator.
    * **Prototype Properties:** Cannot be deleted directly on the object.
* Performance:
    * **Own Properties:** Faster to access than prototype properties.
    * **Prototype Properties:** Slower to access than own properties.
* Memory Usage:
    * **Own Properties:** Use more memory than prototype properties.
    * **Prototype Properties:** Shared among all objects of the same type, reducing memory usage.
* Clarity:
    * **Own Properties:** Clearly defined on the object.
    * **Prototype Properties:** May not be immediately visible when reading the object's definition.
* Use Cases:
    * **Own Properties:** For object-specific data that should not be shared.
    * **Prototype Properties:** For shared data and methods that should be inherited by all objects of the same type.
* Best Practices:
    * **Own Properties:** Use for unique data that varies between objects.
    * **Prototype Properties:** Use for shared data and methods that are common to all objects of the same type.

```js
(function() {
    var objA = Object.create({
        foo: 'foo'
    });
    var objB = objA;
    objB.foo = 'bar';
    console.log(objA); // {foo: 'bar'}
    console.log(objA.foo); // bar
    console.log(objB); // {foo: 'bar'}
    console.log(objB.foo); // bar

    delete objA.foo;
    console.log(objA); // {}
    console.log(objA.foo); // foo
    console.log(objB); // {}
    console.log(objB.foo); // foo
}());
```

```js
(function() {
	var objA = Object.create({
		foo: 'foo'
	});
	var objB = objA;
	objB.foo = 'bar';
	console.log(objA.foo); // bar
	console.log(objB.foo); // bar
}());
```

```js
(function() {
	var objA = {
		foo: 'foo'
	};
	var objB = objA;
	objB.foo = 'bar';

	delete objA.foo;
	console.log(objA.foo); // undefined
	console.log(objB.foo); // undefined
}());
```

## Inheritance in JavaScript


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


## Non-Enumerable Property of Object

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

## Equality Check for Object
```js
(function() {
	var objA = {
		foo: 'foo',
		bar: 'bar'
	};
	var objB = {
		foo: 'foo',
		bar: 'bar'
	};
  
	console.log(objA == objB);  // false
	console.log(objA === objB); // false
}());
```

```js
(function() {
	var objA = new Object({ foo: "foo" });
	var objB = new Object({ foo: "foo" });
  
	console.log(objA == objB);  // false
	console.log(objA === objB); // false
}());
```

```js
(function() {
	var objA = Object.create({
		foo: 'foo'
	});
	var objB = Object.create({
		foo: 'foo'
	});
  
	console.log(objA == objB);  // false
	console.log(objA === objB); // false 
}());
```

```js
(function() {
	var objA = Object.create({
		foo: 'foo'
	});
	var objB = Object.create(objA);
    var objC = objA;
	
    console.log(objA == objB);  // false
	console.log(objA === objB); // false

    console.log(objA.toString() == objB.toString());  // true
    console.log(objA.toString() === objB.toString()); // true
  
    console.log(objA == objC);  // true
    console.log(objA === objC);  // true
    console.log(objA.toString() == objC.toString());  // true
    console.log(objA.toString() === objC.toString());  // true
}());
```

```js
(function() {
	var objA = Object.create({
		foo: 'foo'
	});
	var objB = objA;
	objB.foo = 'bar';
	console.log(objA.foo); // bar
	console.log(objB.foo); // bar 
}());
```

### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)