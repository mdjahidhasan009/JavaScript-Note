## Difference Between __proto__ and prototype

* `__proto__` is the actual object used in the lookup chain to resolve methods and properties.
* `prototype` is the object used to build `__proto__` when an object is created with new.

Examples:
```js
new Employee().__proto__ === Employee.prototype;
new Employee().prototype === undefined;
```

Differences:

| Feature     | Prototype                                                    | proto                                                      |
|-------------|--------------------------------------------------------------|-------------------------------------------------------------|
| Access	   | All function constructors have prototype properties.         | All objects have proto property.                            |
| Purpose	   | Used to reduce memory wastage with a single copy of function. | Used in lookup chain to resolve methods, constructors, etc. |
| ECMAScript  | Introduced in ES6                                            | Introduced in ES5                                           |
| Usage       | Frequently used                                              | 	Rarely used                                              |

This table outlines the key differences between `prototype` and `__proto__`, highlighting their access, purpose, and 
usage within JavaScript.

## Mixins
In JavaScript, a mixin is a way to add functionality to a class without using inheritance. JavaScript only allows an 
object to inherit from a single prototype (known as single inheritance). However, there are situations where you might
want to add functionality from multiple sources. Mixins provide a solution by allowing methods from one object to be
copied onto another.

A mixin is essentially an object that contains methods, which can then be "mixed in" to another class. This is done 
using Object.assign() to copy the methods from the mixin to the prototype of the class.

**Example** <br/>
Suppose you have a User class and a CleanRoom mixin that adds a cleaning functionality. Here's how you can mix this
functionality into the User class:

```js
// Mixin with cleaning functionality
let cleanRoomMixin = {
  cleanRoom() {
    alert(`Hello ${this.name}, your room is clean now`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  },
};

// User class
class User {
  constructor(name) {
    this.name = name;
  }
}

// Apply the mixin to the User class
Object.assign(User.prototype, cleanRoomMixin);

// Now instances of User can use the cleanRoom method
let user = new User("Dude");
user.cleanRoom(); // Output: "Hello Dude, your room is clean now!"
user.sayBye();    // Output: "Bye Dude"
```
In this example, the User class did not originally have the cleanRoom or sayBye methods. By using the mixin, these 
methods were added to the User class, allowing any instance of User to use them.






### Sources
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)