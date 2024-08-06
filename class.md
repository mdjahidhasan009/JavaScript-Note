# Class 
In ES6 (ECMAScript 2015), JavaScript introduced a new syntax for creating objects and dealing with inheritance called classes. This class syntax provides a cleaner and more intuitive way to create and manage objects compared to the traditional prototype-based inheritance.

## Key Points
* **Syntactic Sugar:** ES6 classes are syntactic sugar over JavaScript’s existing prototype-based inheritance. They provide a more straightforward and clearer syntax for creating objects and handling inheritance.
* **Class Declaration:** 
  * Classes are declared using the `class` keyword followed by the class name.
  * The `constructor` method is used for creating and initializing an object created with a class.


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

#### Example of ES6 Classes
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

# Features of ES6 Classes

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

#### Advantages
* They provide simpler syntax
* They are used for defining computed properties, or accessors in JS.
* Useful to provide equivalence relation between properties and methods
* They can provide better data quality
* Useful for doing things behind the scenes with the encapsulated logic.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)