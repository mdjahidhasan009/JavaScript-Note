# `new` keyword
The `new` keyword is used to create an instance object of a **class** or **a constructor function**. 

## `new` with Constructor Function
When you use the `new` keyword with a constructor function, the following steps are executed:
* A new empty object `{}` is created.
* The `this` keyword inside the function refers to the newly created object.
* Properties and methods are assigned to `this`.
* The newly created object is returned (unless another object is explicitly returned).
* Create a new context for the function.

```js
function Person(name, age) {  
  this.name = name;  
  this.age = age;  
}  

var person1 = new Person("Alice", 25);
console.log(person1); // Output: Person { name: 'Alice', age: 25 }
```

### `new` keyword in function execution context
* When `new` is used with a function, it treats the function as a constructor, creating a new instance of an object.
* Without `new`, the function behaves as a regular function and returns `undefined` (unless it explicitly returns a
  value).
* If a function does not return an object explicitly, `new` ensures an object is returned.

```js
function Car(model) {
    if (!(this instanceof Car)) {
        return new Car(model); // Ensures `new` is used if the function is called without `new` keyword. like Car("Tesla")
    }
    this.model = model;
}

var car1 = new Car("Tesla");
console.log(car1); // Output: Car { model: 'Tesla' }

// If `new` is not used, it still creates a new object.
console.log(Car("Tesla")); // Output: Car { model: 'Tesla' }
```

```js
function Car(model) {
    this.model = model;
}

console.log(new Car("Tesla")); // Output: Car { model: 'Tesla' }
console.log(Car("Tesla")); // Output: undefined
```


## `new` with Class
* A new object `{}` is created.
* The `constructor` method of the class is called.
* The `this` keyword inside the constructor refers to the newly created object.
* Properties and methods are assigned to `this`.
* The new object is returned.
* `new` is required when creating an instance of a class. 
* A class constructor cannot be called without `new`, unlike functions.
* Methods inside a class are added to the prototype of the created object, making them memory efficient.

```js
class Employee {  
  constructor(id, name) {  
    this.id = id;  
    this.name = name;  
  }  

  display() {  
    console.log(`ID: ${this.id}, Name: ${this.name}`);  
  }  
}  

// Creating an instance using `new`
const emp1 = new Employee(101, "Alice");  
emp1.display(); // Output: ID: 101, Name: Alice
```