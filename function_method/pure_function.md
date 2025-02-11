# Pure Function
A pure function is a function that, **given the same set of inputs, will always return the same output** and has no side
effects. Pure functions are a fundamental concept in functional programming and offer several advantages, including 
**predictability**, **testability**, and **easier debugging**.

Side effects refer to any interaction with the outside world (like modifying a global variable, logging to the
console, or altering the state of an object or data structure).

### Characteristics of Pure Functions
* **Deterministic/Predictability:** Pure functions always produce the same output for the same input. They also avoid
  tight coupling and make it harder to break your application by not having any side effects. These principles are
  coming together with the Immutability concept of ES6: giving preference to const over let usage.
  ```js
  function add(a, b) {
      return a + b;
  }

  console.log(add(2, 3)); // Outputs: 5
  console.log(add(2, 3)); // Outputs: 5 (always the same result)
  ```
* **No Side Effect:** Pure functions do not modify any external state or rely on external state changes.
  ```js
  let counter = 0;

  // Impure function
  function increment() {
      counter++;
  }

  increment(); // This modifies the external variable 'counter'

  // Pure function
  function pureIncrement(value) {
    return value + 1;
  }

  console.log(pureIncrement(0)); // Outputs: 1 (no external state modified)
  ```
* **Easier Testing:** Pure functions are easier to test because they do not depend on or alter any external state. Also
  do not have any dependency injection.
  ```js
  console.assert(add(2, 3) === 5, 'Add function test failed');
  console.assert(multiply(2, 3) === 6, 'Multiply function test failed');
  ```
* **Referential Transparency:** Pure functions ensure referential transparency, meaning that a function call can be
  replaced with its corresponding output value without changing the program's behavior.
* **Simplified Debugging:** Debugging is simpler because pure functions do not depend on external states or cause side
  effects, reducing the potential for unexpected behavior.

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)