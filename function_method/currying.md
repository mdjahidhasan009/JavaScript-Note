# Currying function
Currying is a technique in functional programming where **a function is transformed into a sequence of functions**, each
taking a single argument. Instead of taking all arguments at once, a curried function takes the first argument and
returns a new function that takes the second argument, and so on, until all arguments have been provided. This allows
for partial application of functions and more flexible and reusable code.

### Basic
```js
function add(x) {
    return function(y) {
        return x + y;
    };
}

const addFive = add(5);
console.log(addFive(3)); // Outputs: 8
console.log(add(5)(3)); // Outputs: 8
```

### Using more argument
```js
function multiply(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        };
    };
}

const multiplyByTwo = multiply(2);
const multiplyByTwoAndThree = multiplyByTwo(3);
console.log(multiplyByTwoAndThree(4)); // Outputs: 24 as 2 * 3 * 4 = 24
console.log(multiply(2)(3)(4)); // Outputs: 24
```

### Generic Curring Function
```js
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return function(...nextArgs) {
                return curried(...args, ...nextArgs);
            };
        }
    };
}

function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // Outputs: 6
console.log(curriedSum(1, 2)(3)); // Outputs: 6
console.log(curriedSum(1)(2, 3)); // Outputs: 6
```

#### Benefits of Currying
* **Reusability:** Curried functions allow for easy reuse of functions with partial application. You can fix certain
  arguments and create specialized functions.
* **Functional Composition:** Currying enables the creation of more modular and composable functions, making it easier
  to build complex logic from simpler functions.
* **Enhanced Readability:** Curried functions can lead to more readable and declarative code, especially when dealing
  with functions that are applied in a sequence


Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)