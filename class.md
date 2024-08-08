# Class 
In ES6 (ECMAScript 2015), JavaScript introduced a new syntax for creating objects and dealing with inheritance called classes. This class syntax provides a cleaner and more intuitive way to create and manage objects compared to the traditional prototype-based inheritance.

## Key Points
* **Syntactic Sugar:** ES6 classes are syntactic sugar over JavaScript’s existing prototype-based inheritance. They provide a more straightforward and clearer syntax for creating objects and handling inheritance.
* **Class Declaration:** 
  * Classes are declared using the `class` keyword followed by the class name.
  * The `constructor` method is used for creating and initializing an object created with a class.

## Inheritance

### Prototype-Based Inheritance with Function Expressions
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

### Example of ES6 Classes
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

# Features or Concepts of ES6 Classes

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

#### Default Constructor
A default constructor is an implicit constructor provided by JavaScript if no explicit constructor is defined in a class. 
The default constructor simply calls the parent class's constructor if the class extends another class. If the class 
does not extend any other class, the default constructor does nothing.

**Class Without an Explicit Constructor**
```js
class Employee {
  // No constructor defined
}

var employeeObject = new Employee();
console.log(employeeObject); // Employee {}
```
In this example, since there is no explicit constructor defined in the Employee class, JavaScript automatically provides
a default constructor that does nothing. The employeeObject is created without any properties.

**Default Constructor in an Inherited Class**
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
In this example, the Employee class extends the Person class, and no constructor is defined in the Employee class. The
default constructor is automatically provided, which calls the parent class (Person) constructor with the argument 
"John". As a result, employeeObject.name is set to "John".

#### Constructor with Parameters
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
A class can only have one constructor. If you try to define multiple constructors within a class, it will result in a SyntaxError.
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
ES6 classes support inheritance using the `extends` keyword, allowing one class to inherit properties and methods from another class.
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
Static methods are defined on the class itself rather than on instances of the class. They are called on the class, not on the objects created from the class.
  ```js
  class MathUtilities {
  static add(a, b) {
      return a + b;
  }
  }

  console.log(MathUtilities.add(2, 3)); // Outputs: 5
  ```

## Getters and Setters / Javascript Accessors
ECMAScript 5 introduced javascript **object accessors** or **computed properties** through getters and setters. Getters 
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

#### Adding Getter and Setter using `Object.defineProperty()`
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

#### Advantages of Getters and Setters
* They provide simpler syntax
* They are used for defining computed properties, or accessors in JS.
* Useful to provide equivalence relation between properties and methods
* They can provide better data quality
* Useful for doing things behind the scenes with the encapsulated logic.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)