# Class 
In ES6 (ECMAScript 2015), JavaScript introduced a new syntax for creating objects and dealing with inheritance called 
classes. This class syntax provides a cleaner and more intuitive way to create and manage objects compared to the 
traditional prototype-based inheritance.

## Key Points
* **Syntactic Sugar:** ES6 classes are syntactic sugar over JavaScript’s existing prototype-based inheritance. They 
  provide a more straightforward and clearer syntax for creating objects and handling inheritance.
* **Class Declaration:** 
  * Classes are declared using the `class` keyword followed by the class name.
  * The `constructor` method is used for creating and initializing an object created with a class.


  
## Class Using Prototype-Based Inheritance with Function Expressions
Before ES6, inheritance and object creation were typically done using constructor functions and the prototype chain:
```js
function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return this.model + " bike has " + this.color + " color";
};

const bike1 = new Bike('Yamaha', 'red');
console.log(bike1.getDetails()); // Outputs: Yamaha bike has red color
```  

### Prototype-Based Inheritance Explained
* **Constructor Function (`Bike`):** The `Bike` function acts as a constructor. When you create a new `Bike` object 
  using `new Bike('Yamaha', 'red')`, this function is executed. The `this` keyword inside the constructor refers to the 
  *new* object being created. The constructor initializes the object's own properties (`model` and `color`).
* **Prototype (`Bike.prototype`):** **Every function in JavaScript has a `prototype` property**. For constructor 
  functions (like `Bike`), the `prototype` property is an object that serves as a blueprint for objects created with 
  that constructor. Think of it as a template.
* **Adding Methods to the Prototype:** The line `Bike.prototype.getDetails = function () { ... };` is crucial. It adds
  the `getDetails` function to the `Bike` prototype. This means that *all* objects created with the `Bike` constructor 
  will *share* this `getDetails` function. They don't each get their own copy; they all point back to the same function 
  on the prototype.
* **Object Creation (`const bike1 = new Bike(...)`):** When you create `bike1` using `new Bike('Yamaha', 'red')`, the
  following happens:
  * A new object is created.
  * The `Bike` constructor function is called, and the new object is bound to `this`. The constructor initializes the
    `model` and `color` properties *directly on the `bike1` object*.
  * Crucially, the new object's internal `[[Prototype]]` (a hidden property) is set to point to `Bike.prototype`. This
    is the link in the prototype chain.
* **Method Lookup (`bike1.getDetails()`):** When you call `bike1.getDetails()`, JavaScript's engine does the following:
  * It first looks for a `getDetails` property *directly on the `bike1` object*. It doesn't find it there.
  * Because `bike1` has a `[[Prototype]]` link to `Bike.prototype`, the engine then looks on `Bike.prototype` for the 
    `getDetails` property. It *finds* it there.
  * The `getDetails` function on `Bike.prototype` is executed. The `this` context *inside* `getDetails` is set to 
    `bike1`. This is why `this.model` and `this.color` correctly access the properties on `bike1`.
  
**In summary:** `bike1` *inherits* the `getDetails` method from `Bike.prototype`. This inheritance is *prototypal* 
because it's based on objects (prototypes) rather than classes. The prototype chain (`bike1` -> `Bike.prototype`) is
what makes this inheritance mechanism work. This is the fundamental way inheritance is implemented in JavaScript (even
with the `class` syntax introduced in ES6, which is just syntactic sugar over this prototypal inheritance).



## Example of ES6 Classes
The same functionality can be achieved using ES6 classes in a more concise and readable way:
```js
class Bike {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }

  getDetails() {
    return `${this.model} bike has ${this.color} color`;
  }
}

const bike1 = new Bike('Yamaha', 'red');
console.log(bike1.getDetails()); // Outputs: Yamaha bike has red color
```



## Constructor Method
The constructor method is a special method in a class for creating and initializing objects. It is automatically called
when a new instance of the class is created. If a constructor is not explicitly defined in a class, JavaScript provides
a default constructor.

#### Example
```js
class Employee {
  constructor() {
    this.name = "John";
  }
}

var employeeObject = new Employee();

console.log(employeeObject.name); // John
```
In this example, the `Employee` class has a constructor that initializes the `name` property with the value `"John"`. 
When a new `Employee` object is created, the constructor is called, setting `employeeObject.name` to `"John"`.

### Default Constructor
A default constructor is an implicit constructor provided by JavaScript if no explicit constructor is defined in a 
class. The default constructor simply calls the parent class's constructor if the class extends another class. **If the 
class does not extend any other class, the default constructor does nothing**.

#### Class Without an Explicit Constructor
```js
class Employee {
  // No constructor defined
}

var employeeObject = new Employee();
console.log(employeeObject); // Employee {}
```
In this example, since there is no explicit constructor defined in the Employee class, JavaScript automatically provides
a default constructor that does nothing. The `employeeObject` is created without any properties.

#### Default Constructor in an Inherited Class
```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Employee extends Person {
  // No constructor defined
}

var employeeObject = new Employee("John");
console.log(employeeObject.name); // John
```
In this example, the Employee class extends the Person class, and no constructor is defined in the `Employee` class. The
default constructor is automatically provided, which calls the parent class (Person) constructor with the argument 
`John`. As a result, `employeeObject.name` is set to `John`.

### Constructor with Parameters
Constructors can also accept parameters to initialize the object with specific values.

```js
class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

var employeeObject = new Employee("John", 30);
console.log(employeeObject.name); // John
console.log(employeeObject.age); // 30
```

#### Calling the Parent Constructor
In a subclass, the `super()` method is used to call the constructor of the parent class.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Employee extends Person {
  constructor(name, empId) {
    super(name);
    this.empId = empId;
  }
}

var employeeObject = new Employee("John", 1001);
console.log(employeeObject.name); // John
console.log(employeeObject.empId); // 1001
```

#### Multiple Constructors in a Class
**A class can only have one constructor**. If you try to define multiple constructors within a class, it will result in 
a SyntaxError.

```js
class Employee {
  constructor() {
    this.name = "John";
  }
  constructor() {   // Uncaught SyntaxError: A class may only have one constructor
    this.age = 30;
  }
}

var employeeObject = new Employee();
```



## Class Inheritance
ES6 classes support inheritance using the `extends` keyword, allowing one class to inherit properties and methods from 
another class.

```js
class Vehicle {
    constructor(type) {
        this.type = type;
    }
  
    getType() {
        return this.type;
    }
}

class Bike extends Vehicle {
    constructor(model, color) {
        super('Bike');
        this.model = model;
        this.color = color;
    }

    getDetails() {
        return `${this.model} bike has ${this.color} color and is a ${this.type}`;
    }
}

const bike1 = new Bike('Yamaha', 'red');
console.log(bike1.getDetails()); // Outputs: Yamaha bike has red color and is a Bike
```



## Static Methods
Static methods are **defined on the class itself rather than on instances of the class**. They are called on the class, 
not on the objects created from the class.

```js
class MathUtilities {
  static add(a, b) {
      return a + b;
  }
}

console.log(MathUtilities.add(2, 3)); // Outputs: 5
```



## Getters and Setters / JavaScript Accessors
ECMAScript 5 introduced JavaScript **object accessors** or **computed properties** through getters and setters. Getters 
and setters allow you to define methods that are called when a property is accessed or modified.

* The getter is defined on the prototype of the class.

```js
class Bike {
    constructor(model, color) {
        this._model = model;
        this._color = color;
    }

    get model() {
        return this._model;
    }

    set model(newModel) {
        this._model = newModel;
    }

    getDetails() {
        return `${this._model} bike has ${this._color} color`;
    }
}

const bike1 = new Bike('Yamaha', 'red');
console.log(bike1.getDetails()); // Outputs: Yamaha bike has red color
bike1.model = 'Honda';
console.log(bike1.getDetails()); // Outputs: Honda bike has red color
```

### Adding Getter and Setter using `Object.defineProperty()`
```js
var obj = { counter: 0 };

// Define getters
Object.defineProperty(obj, "increment", {
  get: function () {
    this.counter++;
    return this.counter;
  },
});

Object.defineProperty(obj, "decrement", {
  get: function () {
    this.counter--;
    return this.counter;
  },
});

// Define setters
Object.defineProperty(obj, "add", {
  set: function (value) {
    this.counter += value;
  },
});

Object.defineProperty(obj, "subtract", {
  set: function (value) {
    this.counter -= value;
  },
});

obj.add = 10;
obj.subtract = 5;
console.log(obj.increment); //6
console.log(obj.decrement); //5
```

### Advantages of Getters and Setters
* They provide simpler syntax
* They are used for defining computed properties, or accessors in JS.
* Useful to provide equivalence relation between properties and methods
* They can provide better data quality
* Useful for doing things behind the scenes with the encapsulated logic.



## Instance vs Non-Instance Properties
### Instance Properties
> Instance properties are defined within the constructor and are unique to each instance of the class.

#### Defined in the Constructor

```js
class Bike {
  constructor(model, color) {
    this.model = model; // Instance property
    this.color = color; // Instance property
  }
}

const bike1 = new Bike('Yamaha', 'red');
const bike2 = new Bike('Honda', 'blue');

console.log(bike1.model); // Outputs: Yamaha
console.log(bike2.model); // Outputs: Honda
```

#### Defined Outside the Constructor
Instance properties can also be defined outside the constructor, but they are not recommended as they may lead to
confusion.

```js
class Bike {
  model; // Instance property
  color; // Instance property

  constructor(model, color) {
    this.model = model;
    this.color = color;
  }
}

const bike1 = new Bike('Yamaha', 'red');
const bike2 = new Bike('Honda', 'blue');

console.log(bike1.model); // Outputs: Yamaha
console.log(bike2.model); // Outputs: Honda
```

### Non-Instance Properties
Non-instance properties are defined outside the constructor and are shared among all instances of the class.
#### Static properties and methods
Static properties are defined on the class itself and are shared among all instances of the class. They are accessed 
using the class name.

```js
class Bike {
  constructor(model, color) {
    this.model = model; // Instance property
    this.color = color; // Instance property
  }

  static count = 0; // Non-instance property, static property

  static incrementCount() { // Non-instance method, static method
    Bike.count++;
  }
}

const bike1 = new Bike('Yamaha', 'red');
const bike2 = new Bike('Honda', 'blue');

Bike.incrementCount();
console.log(Bike.count); // Outputs: 1
console.log(bike1.count); // Outputs: undefined
console.log(bike2.count); // Outputs: undefined
```

#### Private Class Fields
Private class fields are non-instance properties that are accessible only within the class. They are defined using the
`#` symbol.

```js
class Bike {
  #count = 0; // Private class field

  incrementCount() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}

const bike1 = new Bike();
bike1.incrementCount();
console.log(bike1.getCount()); // Outputs: 1

const bike2 = new Bike();
bike2.incrementCount();
console.log(bike2.getCount()); // Outputs: 1
```

##### Private Class Fields with Getters and Setters
Private class fields can also be used with getters and setters to provide controlled access to the private field.

```js
class Bike {
  #count = 0; // Private class field

  get count() {
    return this.#count;
  }

  set count(value) {
    if (value >= 0) {
      this.#count = value;
    }
  }
}

const bike1 = new Bike();
bike1.count = 5;
console.log(bike1.count); // Outputs: 5

bike1.count = -1;
console.log(bike1.count); // Outputs: 5
```

#### prototype Properties
Prototype properties are defined on the prototype of the class and are shared among all instances of the class.

```js
class Bike {
  constructor(model, color) {
    this.model = model; // Instance property
    this.color = color; // Instance property
  }
}

Bike.prototype.count = 0; // Non-instance property, prototype property

Bike.prototype.incrementCount = function() { // Non-instance method, prototype method
  Bike.prototype.count++;
};

const bike1 = new Bike('Yamaha', 'red');
const bike2 = new Bike('Honda', 'blue');

Bike.prototype.incrementCount();
console.log(Bike.prototype.count); // Outputs: 1
```

























# Hidden Classes in JavaScript

In JavaScript, **objects are dynamic**, meaning you can **add or remove properties and methods at runtime**. This
dynamic nature typically leads to dictionary lookups when retrieving properties, as objects are often implemented as 
hash tables in memory. However, this flexibility can impact performance compared to the contiguous memory models used in 
statically typed languages.

## Example of Dynamic Property Addition:
```javascript
function Person(name) {
  this.name = name;
}

var person1 = new Person('John');
var person2 = new Person('Randy');

person1.age = 40;           // This is a new property it does not defined in the constructor
person1.gender = "Male";    // This is a new property it does not defined in the constructor

person2.gender = "Female";  // This is a new property it does not defined in the constructor
person2.age = 50;           // This is a new property it does not defined in the constructor

console.log(person1);
// Output:

// {
//   "name": "John",
//         "age": 40,
//         "gender": "Male"
// }

console.log(person2);
// Output

// {
//   "name": "Randy",
//         "gender": "Female",
//         "age": 50
// }
```
**Explanation:** Here, the properties `age` and `gender` are added to `person1` and `person2` objects dynamically after
they have been created. In Java or C#, you would define these properties in the class definition, but in JavaScript, you
can add them at runtime.



## Impact on Performance:
The dynamic addition of properties like `age` and `gender` can lead to inefficiencies, as each property lookup may 
require a dictionary search. This could slow down performance.

To address the performance concerns arising from dynamic properties, the V8 JavaScript engine (used in Chrome and 
Node.js) introduces a concept called **hidden classes**. Hidden classes are a performance optimization technique 
designed to reduce the overhead of property lookups.

## How Hidden Classes Work:
- When a constructor function (e.g., `Person`) is first executed, V8 creates a hidden class (e.g., `Class01`) for 
  objects created by that constructor.
- As properties are added to an object, V8 creates new hidden classes (e.g., `Class02`, `Class03`, etc.), each 
  inheriting properties from the previous class and adding the new property. This process continues as more properties
  are added.

### Example:
- When `this.name = name;` is executed, V8 creates `Class02` with an offset for the `name` property.
- As `age` and `gender` are added, V8 creates `Class03` and `Class04`, each representing a new "shape" of the object.

## Hidden Class Transitions:
As properties are added in a consistent order, objects can share the same hidden classes, leading to faster property
access because V8 can use **Inline Caching**—a technique that allows properties to be accessed without dictionary 
lookups.

### Example of Hidden Class Transition:
- Both `person1` and `person2` start by sharing `Class01` and `Class02` because their `name` property is added in the 
  same order.
- However, when additional properties (`age` and `gender`) are added in different orders, the hidden class transitions
  differ, and the shared optimization is lost.

```javascript
// Hidden Class Transition Example
person1.age = 40;   // Transition: Class02 -> Class03
person1.gender = "Male";  // Transition: Class03 -> Class04

person2.gender = "Female";  // Transition: Class02 -> Class05 (not shared with person1)
person2.age = 50;   // Transition: Class05 -> Class06 (not shared with person1)
```

## Effect on Performance:
- If two objects have the same hidden classes, V8 can optimize property access using inline caching, making property 
  retrieval faster.
- If objects have different hidden classes (due to different property addition orders), V8 must revert to slower 
  dictionary lookups.

### Summary:
- **Hidden Classes** are an internal optimization technique used by V8 to improve performance by tracking the "shape" of
  an object as properties are added.
- **Consistent Property Order:** For the best performance, add properties to objects in a consistent order to ensure 
  that objects share hidden classes, enabling V8 to optimize access using inline caching.
- **Inline Caching:** When hidden classes are shared, V8 uses inline caching to speed up property lookups, bypassing the
  need for dictionary lookups.

Hidden classes are a crucial aspect of how V8 optimizes JavaScript code execution, making property access faster and
improving overall performance.



Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)