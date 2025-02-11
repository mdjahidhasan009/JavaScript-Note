# Higher Order Function
A higher-order function is a function that **accepts another function as an argument** or **returns a function as a 
return value**, or **both**. These functions enable powerful programming techniques such as **function composition**, 
**currying**, and **callbacks**.

* Need for writing modular and reusable code.

### Accepting Another Function as an Argument (Callback):
```js
function higherOrderFunction(callback) {
    // Function logic here
    callback();
}

function sayHello() {
    console.log('Hello!');
}

higherOrderFunction(sayHello); // Outputs: Hello!
```

### Returning a Function as a Return Value
```js
function higherOrderFunction() {
    return function() {
        console.log('This is a returned function.');
    };
}

const returnedFunction = higherOrderFunction();
returnedFunction(); // Outputs: This is a returned function.
```

### Both Accepting and Returning Functions:
```js
function higherOrderFunction(callback) {
    return function() {
        callback();
        console.log('This is the returned function.');
    };
}

function sayHello() {
    console.log('Hello!');
}

const composedFunction = higherOrderFunction(sayHello);
composedFunction(); // Outputs: Hello! This is the returned function.
```

## Example of higher order functions
There are several built-in higher order functions exists on arrays, strings, DOM and promise methods in javascript.
These higher order functions provides significant level of abstraction. The list of functions on these categories are
listed below,

#### Arrays
`map`, `filter`, `reduce`, `sort`, `forEach` some etc.

#### DOM
The DOM method `element.addEventListener(type, handler)` also accepts the function handler as a second argument.

#### Strings
`replace()` method.



## Benefits of Higher Order Functions
#### Abstraction
Higher-order functions allow you to abstract over actions, not just values. They enable you to create reusable code
that can be applied to different scenarios.

#### Code Reusability
Higher-order functions promote code reusability by allowing you to pass different functions to a common function,
avoiding code duplication.

#### Immutability
Higher-order functions can help enforce immutability by separating the logic for transforming data from the data itself.

#### Modularity
Higher-order functions promote modularity by breaking down complex operations into smaller, composable functions that
can be combined to achieve the desired result.


Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)