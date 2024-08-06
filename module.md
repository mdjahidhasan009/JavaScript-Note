# Module
Modules in JavaScript refer to small units of independent, reusable code that can be exported from one module and imported into another. They serve as the foundation of many JavaScript design patterns and promote modularity and maintainability in codebases.

## Key Characteristics
### Independence/Dependency Management
Modules are self-contained units of code that encapsulate functionality. They operate independently and can be developed, tested, and debugged in isolation.

### Reusability
Modules are designed to be reused across different parts of an application or even in different projects. This promotes code reuse and reduces redundancy.

### Encapsulation
Modules encapsulate their internal implementation details, exposing only what is necessary through their public API. This prevents external code from relying on or manipulating internal states.

### Maintainability
By breaking down a codebase into smaller modules, it becomes easier to manage, understand, and maintain the code. Changes in one module are less likely to impact other parts of the application.

### Namespacing
Modules help prevent naming conflicts by encapsulating variables and functions within their own scope.


## Types of module export
### Object Literals
Modules can export an object that contains multiple properties and methods.
```js
// math.js
const math = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
};

export default math;
```

### Functions
Modules can export individual functions that perform specific tasks.
```js
// add.js
export function add(a, b) {
  return a + b;
}

// subtract.js
export function subtract(a, b) {
  return a - b;
}
```

### Constructors/Classes
Modules can export constructors or classes that define objects with specific properties and methods.
```js
// Bike.js
export class Bike {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }

  getDetails() {
    return `${this.model} bike has ${this.color} color`;
  }
}
```

## Examples of JavaScript Modules
### ES6 Modules
ES6 introduced a standardized module system with the `export` and `import` keywords.

**Exporting from a Module**
```js
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default function multiply(a, b) {
  return a * b;
}
```
**Importing into Another Module**
```js
// main.js
import multiply, { add, subtract } from './math.js';

console.log(add(2, 3));        // Outputs: 5
console.log(subtract(5, 2));   // Outputs: 3
console.log(multiply(3, 4));   // Outputs: 12
```

### CommonJS Modules
CommonJS is used in Node.js applications and relies on `module.exports` and `require`.
**Exporting from a Module**
```js
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

module.exports = { add, subtract, multiply };
```
**Importing into Another Module**
```js
// main.js
const { add, subtract, multiply } = require('./math');

console.log(add(2, 3));        // Outputs: 5
console.log(subtract(5, 2));   // Outputs: 3
console.log(multiply(3, 4));   // Outputs: 12
```

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)