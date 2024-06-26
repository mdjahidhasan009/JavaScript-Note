
### Difference Between `typeof` and `instanceof` in JavaScript

#### `typeof` Operator

The `typeof` operator returns a string indicating the type of the unevaluated operand.

The `typeof` operator checks if a value belongs to one of the seven basic types:
- `number`
- `string`
- `boolean`
- `object`
- `function`
- `undefined`
- `symbol`

Example:

```javascript
console.log(typeof 42);              // Output: "number"
console.log(typeof 'hello');         // Output: "string"
console.log(typeof true);            // Output: "boolean"
console.log(typeof {});              // Output: "object"
console.log(typeof function() {});   // Output: "function"
console.log(typeof undefined);       // Output: "undefined"
console.log(typeof Symbol());        // Output: "symbol"
```

Note that `typeof(null)` will return `"object"`:

```javascript
console.log(typeof null);            // Output: "object"
```

#### `instanceof` Operator

The `instanceof` operator checks the current object and returns `true` if the object is of the specified type, which works on the level of prototypes. It tests to see if the right operand appears anywhere in the prototype chain of the left operand.

Example:

```javascript
function Animal() {}
var dog = new Animal();
console.log(dog instanceof Animal);  // Output: true

var name = new String("xyz");
console.log(name instanceof String); // Output: true
```

### Key Differences

1. **Type Checking:**
    - `typeof` is used for primitive types.
    - `instanceof` is used for complex types (i.e., objects and functions).

2. **Returns:**
    - `typeof` returns a string indicating the type.
    - `instanceof` returns a boolean indicating whether the object is an instance of a particular type.

3. **Scope:**
    - `typeof` does not check the prototype chain.
    - `instanceof` checks the entire prototype chain.

### Example

Consider the following examples:

```javascript
console.log(typeof "foo"); // Output: "string"
console.log("foo" instanceof String); // Output: false

var color1 = new String("green");
console.log(color1 instanceof String); // Output: true

var color2 = "coral";
console.log(color2 instanceof String); // Output: false

function Person(name) {
  this.name = name;
}
var me = new Person('John');

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true
console.log(me instanceof Array);  // false
```

### Real-World Application

The `instanceof` operator is rarely useful in production code but can be useful in tests where you want to assert that
your code returns or creates objects of the correct types. By being explicit about the kinds of objects your code is
returning or creating, your tests become more powerful as a tool for understanding and documenting your code.


Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [What is the instanceof operator in JavaScript?](https://stackoverflow.com/questions/2449254/what-is-the-instanceof-operator-in-javascript)