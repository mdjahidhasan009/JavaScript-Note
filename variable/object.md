# Object
`Object` is a global object in JavaScript that has methods for creating and manipulating objects. It is a constructor
function that creates an object wrapper for the given value. It can also be used to create new objects.


## Ways of Creating Objects in JavaScript

### Method 1: Function Based

This method is useful if we want to create several similar objects. In the code sample below, we wrote the function 
`Employee` and used it as a constructor by calling it with the `new` operator.

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

### Method: 2 Function constructor with prototype
This is similar to function constructor but it uses prototype for their properties and methods,

```js
function Person() {}
Person.prototype.name = "Sudheer";
var object = new Person();
```
This is equivalent to creating an instance with `Object.create` method with a function prototype and then calling that 
function with an instance and parameters as arguments.
```js
function func() {}

new func(x, y, z);
```
or
```js
// Create a new instance using function prototype.
var newInstance = Object.create(func.prototype);

// Call the function
var result = func.call(newInstance, x, y, z);

// If the result is a non-null object then use it otherwise just use the new instance.
console.log(result && typeof result === 'object' ? result : newInstance);
```
### Method 3: Object Literal

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

### Method 4: From Object Using `new` Keyword / Object Constructor

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

Also, `new` is not required when creating an object using `Object` constructor.

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

### Method 5: Using `Object.create` Method

**`Object.create(obj)` will create a new object and set the `obj` as its prototype**. It’s a modern way to create objects 
that **inherit properties from other objects**. The `Object.create` function does not run the constructor. You can use 
`Object.create(null)` when you don’t want your object to inherit the properties of `Object`.

```javascript
var employee = {
  getName: function() {
    return this.name;
  }
};

var emp1 = Object.create(employee);
employee.name = 'Nishant';
console.log(employee.getName()); // Output: Nishant


emp1.getName = function() {
   console.log('xyz-Anonymous');
};

employee.getName(); //Nishant
emp1.getName();//xyz-Anonymous
```
```js
var employee = {
  name: 'Nishant',
  displayName: function () {
    console.log(this.name);
  }
};

var emp1 = Object.create(employee);
console.log(emp1.displayName());  // output "Nishant"

emp1.displayName = function() {
  console.log('xyz-Anonymous');
};

employee.displayName(); //Nishant
emp1.displayName();//xyz-Anonymous
```

In addition to this, the `Object.create()` method also allows specifying a second argument which is an object containing 
additional properties and methods to add to the new object.

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
In the example above, `emp1` is created with its own value for `name`, so calling `displayName()` method will display 
"John" instead of "Nishant".

Objects created in this manner give you full control over newly created objects. You are free to add or remove any 
properties and methods you want.

The following code creates a new empty object whose prototype is `null`.

```js
var object = Object.create(null);
```

### Method 6: Using `Object.assign()` Method
```js
const orgObject = { company: 'XYZ Corp'};
const carObject = { name: 'Toyota'};
const staff = Object.assign({}, orgObject, carObject);// { company: 'XYZ Corp', name: 'Toyota' }
```

### Method 7: ES6 Classes
```js
class Employee {
  constructor(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }
  incrementSalary(byValue) {
    this.salary = this.salary + byValue;
  }
}
```

### Method 8: Using Singleton Pattern
```js
var object = new (function () {
  this.name = "Sudheer";
})();
```

```js
var Singleton = (function () {
  var instance;

  function createInstance() {
    var object = new Object("I am the instance");
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
```

### Object literal vs Constructor for creating objects
- Literal are global objects in JavaScript. If we want singleton object and will share across the application then we
  can use object literal.
- If we want to create multiple objects then we can use constructor function as we can create multiple objects using
  constructor function and only one object using object literal.
- For OOP features like inheritance, polymorphism, encapsulation, we can use constructor function not object literal.

## Check if a key exits in an object
#### `in` Operator
```js
const user = {
    name: "John"
};

console.log("name" in user); // true
console.log("age" in user); // false
```
#### `hasOwnProperty` Method
```js
const user = {
  name: "John"
};

console.log(user.hasOwnProperty("name")); // true
console.log(user.hasOwnProperty("age")); // false
```
#### `undefined` Comparison
```js
const user = {
  name: "John"
};

console.log(user.name !== undefined); // true
console.log(user.age !== undefined); // false
```
#### `Object.keys` Method
```js
const user = {
  name: "John"
};

console.log(Object.keys(user).includes("name")); // true
console.log(Object.keys(user).includes("age")); // false
```
#### `Object.hasOwn` Method (ES2022)
```js
const user = {
  name: "John"
};

console.log(Object.keys(user).includes("name")); // true
console.log(Object.keys(user).includes("age")); // false
```

## Add a key value pair
* Using dot notation
* Using square bracket notation
```js
var object = {
  key1: value1,
  key2: value2,
};
object.key3 = "value3";
obj["key3"] = "value3";
```
Square bracket notation is useful when the name of the property is dynamically determined, such as when the property 
name is stored in a variable.
```js
var dynamicKey = "key4";
object[dynamicKey] = "value4";
console.log(object);
// Outputs: { key1: "value1", key2: "value2", key3: "value3", key4: "value4" }
```



## Check is the object empty
#### Using `Object.entries` (ECMA 7+)
```js
const obj = {};
console.log(Object.entries(obj).length === 0 && obj.constructor === Object); // true
```
#### `Object.keys` (ECMA 5+)
```js
const obj = {};
console.log(Object.keys(obj).length === 0 && obj.constructor === Object); // true
```
#### `for-in` Loop with `hasOwnProperty` (Pre-ECMA 5)
```js
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

const obj = {};

console.log(isEmpty(obj)); // true
```

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

Now we wish to create an `Employee` class which contains all the properties of the `Person` class and wanted to add some 
additional properties to the `Employee` class.

```javascript
function Employee(company){
  this.company = company;
}

// Prototypal Inheritance 
Employee.prototype = new Person("Nishant", 24, 5000);
```

In the example above, `Employee` type inherits from `Person`. It does so by assigning a new instance of `Person` to 
`Employee.prototype`. After that, every instance of `Employee` inherits its properties and methods from `Person`.

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

# Prototype Chain
The prototype chain is a series of objects linked together through their prototype properties. When you access a property
or method on an object, JavaScript will first look for it on the object itself. If it doesn't find it, it will look at the
object's prototype, and so on, until it reaches the end of the chain.

The prototype on object instance is available through `Object.getPrototypeOf(object)` or `__proto__ property` whereas 
prototype on constructor function is available through Object.prototype.

<img src="../images/object/prototype_chain.png" alt="prototype_chain">

# Prototype Property
The `prototype` property is used to add new properties and methods to an object constructor. It allows you to define 
properties and methods that will be shared by all instances of the object. When you create a new object using the 
constructor, the new object will inherit the properties and methods defined in the prototype.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
```
In the example above, the `Person` function is used as a constructor to create new `Person` objects. If you want to add 
a new method to all `Person` objects, you can do so by adding the method to the `Person.prototype` object.

```javascript
Person.prototype.greet = function() {
  return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
};
```
The `greet` method is added to the `Person.prototype` object, which means that all `Person` objects will have access to 
this method.

```javascript
const john = new Person('John', 30);
console.log(john.greet()); // Output: Hello, my name is John and I am 30 years old.
```
When you create a new `Person` object using the `Person` constructor, the `greet` method is available on the new object.

### Differences between `prototype` and `__proto__` in JavaScript


## Property
In JavaScript, objects can have properties that are either their own properties or inherited from their prototype.

### Own Property
An own property is a property that is directly defined on an object itself. It is not inherited from the object's prototype.

```javascript
var person = {
  name: 'John'
};
person.age = 30;

console.log(person.name); // John (own property)
console.log(person.age);  // 30 (own property)
```

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
    * **Own Properties:** Visible when iterating over the object's properties using methods like `Object.keys()` or 
    `for...in` loop.
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

ECMAScript 5 introduced several methods to prevent modification of objects, which lock down objects to ensure that no one,
accidentally or otherwise, can change their functionality.

### Three Levels of Preventing Modification

#### Prevent Extensions

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

#### Seal

Similar to `preventExtensions`, but it also prevents existing properties and methods from being added / deleted marking 
all existing properties as non-configurable. But values of present properties can still be changed as long as they are 
writable.

```javascript
var employee = {
 name: "Nishant"
};

// Seal the object 
Object.seal(employee);

console.log(Object.isExtensible(employee)); // false
// checking whether the object is sealed or not
console.log(Object.isSealed(employee)); // true

delete employee.name // Fails silently unless in strict mode

// Trying to add new property will give an error
employee.age = 30; // Fails silently unless in strict mode

console.log(employee) // Output: {name: 'Nishant'}
```

When an object is sealed, its existing properties and methods can't be removed. Sealed objects are also non-extensible.

#### Freeze

Similar to `seal`, but it also prevents existing properties and methods from being modified (all properties and methods
are read-only) means freeze an object. Freezing an object prevents adding new properties, removing existing properties, 
and changing the enumerability, configurability, or writability of existing properties. It returns the passed object and
does not create a frozen copy.

```js
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

console.log(employee) // Output: {name: 'Nishant'}
```

Frozen objects are considered both non-extensible and sealed.

```js
const obj = {
  prop: 100,
};

Object.freeze(obj);
obj.prop = 200; // Throws an error in strict mode

console.log(obj.prop); //100
```

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

### Limitations of Freezing Objects


#### Seal vs Freeze
* `Seal` prevents adding or removing properties, but allows changing existing properties.
* `Freeze` prevents adding, removing, or changing properties.
* Both `seal` and `freeze` make objects non-extensible.
* `Freeze` is more restrictive than `seal`.
* `Freeze` is useful when you want to ensure that an object's properties remain constant throughout its lifecycle.
* `Seal` is useful when you want to prevent adding or removing properties but allow changing existing properties.
* `Seal` and `freeze` are shallow operations, meaning they only affect the object's top-level properties, not nested objects.
* `Seal` and `freeze` do not prevent changes to nested objects.
* `Seal` and `freeze` do not prevent changes to the prototype chain.
* `Seal` and `freeze` do not prevent changes to the object's constructor.
* `Seal` and `freeze` do not prevent changes to the object's `__proto__` property.
* `Seal` and `freeze` do not prevent changes to the object's `prototype` property.
* `Seal` and `freeze` do not prevent changes to the object's `constructor` property.

#### Nested Object
Freezing is only applied to the top-level properties in objects, not nested objects. For example, let's try to freeze a 
user object that has employment details as a nested object and observe that details can still be changed.
```js
const user = {
  name: "John",
  employment: {
    department: "IT",
  },
};

Object.freeze(user);
user.employment.department = "HR"; // This change is allowed

console.log(user)
```
Output
```shell
{
  name: "John",
  employment: {
    department: "HR",
  },
};
```

**Benefits of Freezing Objects**
* Freezing Objects and Arrays:
  * Prevents adding new properties.
  * Prevents removing existing properties.
  * Prevents changing existing properties.
* Making Objects Immutable:
  * Ensures the object's state remains constant throughout its lifecycle.
  * Useful in scenarios where the object's integrity needs to be maintained, such as in functional programming or state 
    management.
  ```js
    let obj = {
        prop: 100,
    };

    Object.freeze(obj);
    obj.prop = 200; // Throws an error in strict mode

    console.log(obj.prop); // 100
    console.log(obj); // { prop: 100 }

    obj = {
      name: "jahid"
    };

    console.log(obj); // { name: "jahid" }
  ```
  In this example, the freeze method is used to make the obj immutable. This prevents any modifications to obj's 
  properties. Attempting to change `obj.prop` will not work `obj.prop = 200;`. <br/>

  This line does not modify the original frozen object but instead reassigns the obj variable to point to a new object. 
  This is allowed because freeze only affects the contents of the object, not the variable itself.
  ```js
    obj = {
        name: "jahid"
    };
  ```
* In the Object-oriented paradigm, an existing API contains certain elements that are not intended to be extended, 
  modified, or re-used outside of their current context. Hence it works as the `final` keyword which is used in various
  languages.



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

   This defines a constructor function `User` which takes a parameter `name` and assigns it to the property `name` of the
   newly created object. If no name is provided, it defaults to `"JsGeeks"`.

2. **Object Creation and Property Assignment:**
   ```javascript
   var person = new User("xyz")["location"] = "USA";
   ```

   This line does a few things in sequence:
    - `new User("xyz")` creates a new object using the `User` constructor function and assigns the `name` property to 
      `"xyz"`.
    - The resulting object from `new User("xyz")` is then used to create a new property `location` with the value `"USA"`.
    - According to ECMAScript Specification, section 12.14.4, the assignment operation returns the right-hand side value, 
      which is `"USA"`.

3. **Logging the Result:**
   ```javascript
   console.log(person);
   ```

   Here, `person` holds the value returned by the assignment operation, which is `"USA"`. Therefore, when 
   `console.log(person)` is called, it logs `"USA"`.

### Why the `name` Property is Not Printed

The assignment `new User("xyz")["location"] = "USA"` results in the value `"USA"` being assigned to `person`. The 
reference to the object created by `new User("xyz")` is lost because the assignment operation's result is what's 
assigned to `person`, not the object itself.

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

In this example, `userInstance` will be an object with properties `name` and `location`, and logging `userInstance` will 
show both properties.

In contrast, the original code assigns the result of the assignment operation (`"USA"`) to `person`, hence `person` only 
holds `"USA"` and not the object with `name`.

### Corrected Code

To see both `name` and `location` properties, you should store the object in a variable and then assign the `location` 
property:

```javascript
function User(name) {
  this.name = name || "JsGeeks";
}

var person = new User("xyz");
person["location"] = "USA";
console.log(person); // Logs the object with both 'name' and 'location' properties
```

### Copying Properties from One Object to Another
You can use the `Object.assign()` method to copy the values and properties from one or more source objects to a target 
object. It returns the target object with properties and values copied from the source objects.

Syntax
```js
Object.assign(target, ...sources);
```

Example <br/>
```js
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const returnedTarget = Object.assign(target, source);

console.log(target); // { a: 1, b: 3, c: 4 }
console.log(returnedTarget); // { a: 1, b: 3, c: 4 }
```

#### Multiple Sources

You can pass multiple source objects to Object.assign(), and their properties will be copied to the target object in the order they are passed.
```js
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

Object.assign(target, source1, source2);

console.log(target); // { a: 1, b: 3, c: 5, d: 6 }
```

### Use of `Object.assign()`
* It is used for cloning an object.
* It is used to merge objects with the same properties.

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

Write a `merge` function which will take two objects and add all the own properties of the second object into the first
object.

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
Both methods achieve the goal of merging two objects dynamically. The ES6 `Object.assign` method is more concise and 
preferred for modern JavaScript development. The custom `merge` function provides a deeper understanding of how property 
assignment works in JavaScript.


## Non-Enumerable Property of Object

### Introduction
Objects can have properties that don't show up when you iterate through the object using a `for...in` loop or when using 
`Object.keys()` to get an array of property names. These properties are known as non-enumerable properties.

### Example of Enumerable Properties

```javascript
var person = {
  name: 'John'
};
person.salary = '10000$';
person['country'] = 'USA';

console.log(Object.keys(person)); // ['name', 'salary', 'country']
```

In the example above, the `person` object has properties `name`, `salary`, and `country` that are enumerable and therefore 
show up when we call `Object.keys(person)`.

#### Getting Enumerable Key-Value Pairs
The `Object.entries()` method is used to return an array of a given object's own enumerable string-keyed property 
[key, value] pairs, in the same order as that provided by a for...in loop.

* Only the object's own enumerable string-keyed properties are included.
* The order of the properties is the same as that provided by a for...in loop, but it is not guaranteed to match the 
  order in which properties were defined in the object.

```js
const object = {
  a: "Good morning",
  b: 100,
};

for (let [key, value] of Object.entries(object)) {
  console.log(`${key}: ${value}`);
  // Output:
  // a: 'Good morning'
  // b: 100
}
```

#### Object.values
The `Object.values()` method returns an array of a given object's own enumerable property values, in the same order as
that provided by a `for...in` loop.

```js
const object = {
  a: "Good morning",
  b: 100,
};

for (let value of Object.values(object)) {
  console.log(`${value}`); // 'Good morning \n100'
}
```

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

Non-enumerable properties are useful in scenarios where you want to add properties to an object but don't want them to 
appear during enumeration (e.g., `for...in` loops, `Object.keys()`, or `JSON.stringify()`). Here are some common use cases:

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
* **Internal Properties:** Non-enumerable properties can be used to store internal data that is not relevant to external
  users of an object.
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
* **Performance Optimization:** Non-enumerable properties can improve performance by reducing the number of properties 
  that need to be iterated over.
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

* **Preventing Modification:** Non-enumerable properties can be used to prevent certain properties from being modified or 
  deleted.
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

Enumerable properties are used in scenarios where you want properties to be accessible and visible during enumeration. 
Here are some common use cases:

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

By understanding the differences between enumerable and non-enumerable properties, you can better manage the visibility 
and accessibility of properties in your JavaScript objects, providing a more controlled and organized codebase.


### Use Cases for Non-Enumerable Properties
* **Private Properties:** Non-enumerable properties can be used to store private data that should not be accessed or 
  modified directly.
* **Internal Properties:** Non-enumerable properties can be used to store internal data that is not relevant to external
  users of an object.
* **Metadata:** Non-enumerable properties can be used to store metadata or configuration information that should not be 
  exposed to external code.
* **Performance Optimization:** Non-enumerable properties can improve performance by reducing the number of properties 
  that need to be iterated over.
* **Preventing Modification:** Non-enumerable properties can be used to prevent certain properties from being modified 
  or deleted.
* **Avoiding Conflicts:** Non-enumerable properties can help avoid conflicts with other properties in the object.
* **Security:** Non-enumerable properties can be used to store sensitive data that should not be exposed to external 
  code.
* **Debugging:** Non-enumerable properties can be used to store debugging information that should not be displayed to 
  end users.
* **Customization:** Non-enumerable properties can be used to customize the behavior of an object without affecting its 
  public interface.
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
Non-enumerable properties are useful when you want to hide certain properties from enumeration. `Object.defineProperty()`
provides a flexible way to define properties with specific descriptors such as `enumerable` and `writable`, allowing for
more control over the behavior of object properties.

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

### `Object.is`
`Object.is()` method determines whether two values are the same. Here are some examples of its usage with different types
of values:

```js
Object.is("hello", "hello"); // true
Object.is(window, window); // true
Object.is([], []); // false
```

#### Conditions for Two Values to Be Considered the Same
Two values are considered the same if one of the following holds:

* Both are undefined
* Both are null
* Both are true or both are false
* Both are strings of the same length with the same characters in the same order
* Both are the same object (i.e., both objects have the same reference)
* Both are numbers and:
    * Both are +0
    * Both are -0
    * Both are NaN
    * Both are non-zero and not NaN and have the same value

```js
Object.is("hello", "hello"); // true
Object.is(100, 100); // true
Object.is(-0, +0); // false



const obj1 = { a: 1 };
const obj2 = obj1;
Object.is(obj1, obj2); // true

const obj3 = { a: 1 };
Object.is(obj1, obj3); // false
```

# Native Objects
Native objects are objects that are part of the JavaScript language as defined by the ECMAScript specification. These
objects are built into the language and are available in any JavaScript environment.

Examples of Native Objects
* `String`: Represents sequences of characters.
* `Number`: Represents numerical values.
* `Boolean`: Represents true/false values.
* `Object`: The base object for all objects.
* `Array`: Represents ordered collections of values.
* `Function`: Represents function objects.
* `Date`: Represents date and time.
* `Math`: Provides mathematical constants and functions.
* `RegExp`: Represents regular expressions.
```js
let str = new String("Hello, world!");
let num = new Number(42);
let bool = new Boolean(true);
let obj = new Object();
let arr = new Array(1, 2, 3);
let func = new Function("return 'Hello, world!'");
let date = new Date();
let regex = new RegExp("\\w+");
```

## `Math` object
Get random integers with a range of min, max
```js
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInteger(1, 100); // returns a random integer from 1 to 100
randomInteger(1, 1000); // returns a random integer from 1 to 1000
```

## `Date` object
Get the current date and time
```js
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
console.log(dateTime);
```
Converting to a Specific Timezone
```js
// Get the current date and time
var event = new Date();

// Convert to British English timezone (UTC)
console.log(event.toLocaleString("en-GB", { timeZone: "UTC" })); // Example Output: 29/06/2019, 09:56:00

// Convert to Eastern Time (New York)
console.log(event.toLocaleString("en-US", { timeZone: "America/New_York" })); // Example Output: 29/06/2019, 05:56:00

// Convert to Japan Standard Time (Tokyo)
console.log(event.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })); // Example Output: 29/06/2019, 18:56:00
```
Converting a Specific Date to a Different Timezone
```js
// Create a specific date and time
var date = new Date('2022-07-14T10:00:00Z'); // UTC time

// Convert to Pacific Time (Los Angeles)
var pacificTime = date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
console.log(pacificTime); // Example Output: 14/07/2022, 03:00:00

// Convert to Central European Time (Berlin)
var berlinTime = date.toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
console.log(berlinTime); // Example Output: 14/07/2022, 12:00:00
```

# Host Objects
Host objects are objects provided by the host environment, such as a web browser or Node.js runtime. These objects are 
not defined by the ECMAScript specification but are provided by the environment to allow interaction with the system, 
such as the browser's Document Object Model (DOM) or Node.js's file system API.

Examples of Host Objects
* `window`: The global object in web browsers.
* `document`: Represents the DOM in web browsers.
* `XMLHttpRequest`: Used to make HTTP requests.
* `console`: Provides access to the browser's debugging console.
* `Image`: Represents an HTML `<img>` element.
* `process`: Provides information and control over the current Node.js process (in Node.js).
* `fs`: File system module in Node.js.
* `http`: HTTP module in Node.js.
* `path`: Path module in Node.js.
* `os`: Operating system module in Node.js.
* 
```js
// In a browser environment
console.log(window.innerWidth);
document.getElementById("myElement");
let xhr = new XMLHttpRequest();

// In a Node.js environment
const fs = require('fs');
console.log(process.cwd());
```
## Image object
The `Image` object is provided by the browser to handle and manipulate images. It allows you to create, load, and manage 
images in a web page.

Get the dimensions of an image after loading
```js
var img = new Image();
img.src = 'https://example.com/image.jpg';
document.body.appendChild(img);

img.onload = function () {
    console.log(this.width + "x" + this.height);
};
```

### Get the image width and height
```js
var img = new Image();
img.onload = function () {
  console.log(this.width + "x" + this.height);
};
img.src = "http://www.google.com/intl/en_ALL/images/logo.gif";
```

# User defined Objects
User defined objects are objects defined in your JavaScript code. These objects are created by the developer to store and
manipulate data as required by the application.
```js
// Creating a user object for profile information
let userProfile = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

// Using the user object
userProfile.greet(); // Outputs: Hello, John Doe
```

### `Date` object
```js
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
document.write(today);
```
#### Compare two date objects
```js
var d1 = new Date();
var d2 = new Date(d1);

console.log(d1.getTime() === d2.getTime()); // True
console.log(d1 === d2); // False
```

# `arguments` object 
The arguments object is an array-like object accessible inside functions that contains the values of the arguments 
passed to that function. It allows functions to access all passed arguments without explicitly defining them in the 
function's parameter list.

The sum function uses the arguments object to iterate over all the arguments passed to it and calculates their sum.
```js
function sum() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sum(1, 2, 3)); // returns 6
```
### Converting arguments to a Real Array
Although the arguments object is array-like, it is not a real array, meaning you cannot directly use array methods like 
map, forEach, or reduce on it. To use these methods, you need to convert the arguments object to a real array.
```js
function sum() {
  var argsArray = Array.prototype.slice.call(arguments);
  return argsArray.reduce((total, current) => total + current, 0);
}

console.log(sum(1, 2, 3)); // returns 6
```

## Rest parameter
For functions where you want to handle an indefinite number of arguments, the rest parameter syntax can be a more modern 
and cleaner approach. The rest parameter syntax provides a way to represent an indefinite number of arguments as an array.
```js
const sum = (...args) => {
  return args.reduce((total, current) => total + current, 0);
};

console.log(sum(1, 2, 3)); // returns 6
```

```js
function sum(...args) {
  let total = 0;
  for (const i of args) {
    total += i;
  }
  return total;
}

console.log(sum(1, 2)); //3
console.log(sum(1, 2, 3)); //6
console.log(sum(1, 2, 3, 4)); //10
console.log(sum(1, 2, 3, 4, 5)); //15
```
Note: Rest parameter is added in ES2015 or ES6

#### Rest parameter should always the last argument
The rest parameter should be the last argument, as its job is to collect all the remaining arguments into an array. For
example, if you define a function like below it doesn’t make any sense and will throw an error.
```js
function someFunc(a,…b,c){
    //You code goes here
    return;
}
```

# Proxy Object
The Proxy object is used to define custom behavior for fundamental operations such as property lookup, assignment,
enumeration, and function invocation. A proxy is created with two parameters: a target object which you want to proxy
and a handler object which contains methods to intercept fundamental operations.

Syntax
```js
var p = new Proxy(target, handler);
```

**Customizing Property Lookup**
```js
const person = {
  name: 'Sudheer Jonna',
  age: 35
};

const handler = {
  get(target, prop) {
    if (prop === 'name') {
      return 'Mr. ' + target[prop];
    }
    return target[prop];
  }
};

const proxy = new Proxy(person, handler);

console.log(proxy.name); // Mr. Sudheer Jonna
console.log(proxy.age);  // 35
```
In this example, the get method customizes the behavior of property lookup on the person object, prefixing the name with
"Mr."

**Default Values for Non-existent Properties**
```js
var handler1 = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 100;
  },
};

var p = new Proxy({}, handler1);
p.a = 10;
p.b = null;

console.log(p.a, p.b); // 10, null
console.log("c" in p, p.c); // false, 100
```
In this example, the get method returns a default value of 100 for any properties that do not exist on the target object.


Applications of Proxy
Proxies can be used for various cross-cutting concerns such as:

* Logging: Intercept operations to log them.
* Authentication or Authorization: Validate access to properties or methods.
* Data Binding and Observables: Automatically update the UI when data changes.
* Function Parameter Validation: Ensure function parameters meet certain criteria.

NOTE: The Proxy object is a feature introduced in ES6 (ECMAScript 2015) and provides a powerful mechanism to control
interactions with objects.

### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)