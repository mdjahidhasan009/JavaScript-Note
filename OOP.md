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