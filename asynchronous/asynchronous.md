## Promises in JavaScript

**Definition:** Promises are a mechanism for handling asynchronous operations in JavaScript. They represent a value that 
may be available now, or in the future, or never. A promise has three states: **pending**, **fulfilled**, and 
**rejected**.

**Key Points:**
1. **Sequential Handling of Asynchronous Operations:** Promises are useful for handling async operations in a sequential 
   manner. For example, you can request a list of all flights and then request details for each flight based on the 
   initial results.
2. **State Machine:** A promise represents a future value and works like a state machine with states: pending, 
   fulfilled, and rejected.
3. **Then Method:** A promise object has a `then` method where you can specify what to do when the promise is fulfilled 
   or rejected.
4. **Chaining:** You can chain `then()` blocks to avoid callback hell and make the code more readable.
5. **Error Handling:** Errors can be handled in the `catch()` block.
6. **Immutability:** After a promise is set to a fulfilled or rejected state, it becomes immutable.

**Basic Usage Example:**
```javascript
let promise = new Promise((resolve, reject) => {
    // Do something async
    let success = true;
    if (success) {
        resolve('Success!');
    } else {
        reject('Error!');
    }
});

promise.then(result => {
    console.log(result); // Output: Success!
}).catch(error => {
    console.log(error); // Output: Error!
});
```

**Chaining Example:**
```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return fetch('https://api.example.com/other-data');
    })
    .then(response => response.json())
    .then(otherData => {
        console.log(otherData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

**Advanced Concepts:**

## Async/Await
An async function is a function declared with the async keyword, which allows you to write asynchronous code in a more
readable and manageable way by using the await keyword. It enables you to work with promises without needing to chain 
.then() calls, making the code more synchronous in appearance.

### `async` Keyword
Adding async before a function ensures that the function always returns a promise. If the function explicitly returns a 
value, the value is wrapped in a resolved promise automatically. If the function throws an error, the error is wrapped 
in a rejected promise.

### `await` Keyword
Used inside an async function to pause execution until the promise is resolved. The result of the promise is returned 
once it resolves. If the promise is rejected, the await expression throws the rejected value.

```javascript
async function fetchData() {
   try {
       let response = await fetch('https://api.example.com/data');
       let data = await response.json();
       console.log(data);
       let otherResponse = await fetch('https://api.example.com/other-data');
       let otherData = await otherResponse.json();
       console.log(otherData);
   } catch (error) {
       console.error('Error:', error);
   }
}

fetchData();
```
**It is basically syntax sugar over ES2015 promises and generators.**

<details>
<summary>Using await Outside an Async Function Prior to ES2022</summary>

Before the introduction of ES2022, the await keyword could only be used inside async functions. If you tried to use
await outside an async function, you would encounter a SyntaxError.

```js
await Promise.resolve(console.log("Hello await")); 
// SyntaxError: await is only valid in async function
```

This error occurs because the JavaScript engine expects await to be used within the scope of an async function, which 
provides the necessary context for asynchronous code execution.

### Workaround Using IIFE
To work around this limitation, developers often used an Immediately Invoked Function Expression (IIFE) that is declared
as async. This allowed `await` to be used within the IIFE, circumventing the restriction.

```js
(async function () {
    await Promise.resolve(console.log("Hello await"));
    // Output: Hello await
})();
```

The async keyword before the function ensures that await can be used inside it. The function is then immediately invoked,
allowing you to use await even in places where top-level await was not supported.

### Top-Level Await in ES2022
With the introduction of ES2022, JavaScript now supports top-level await. This means you can use await at the top level
of a module, without needing to wrap it in an async function.

```js
await Promise.resolve(console.log("Hello await")); 
// Output: Hello await
```

In this example, the `await` is used directly at the top level, and it works as expected without any errors. This makes 
writing asynchronous code simpler and more intuitive in modern JavaScript.
</details>












## RxJS Observables
- Observables can be viewed as recyclable promises and offer more sophisticated ways to handle asynchronous data streams.
```javascript
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const observable = from(fetch('https://api.example.com/data').then(response => response.json()));

observable.pipe(
   map(data => {
       console.log(data);
       return fetch('https://api.example.com/other-data').then(response => response.json());
   }),
   catchError(error => {
       console.error('Error:', error);
       throw error;
   })
).subscribe(otherData => {
   console.log(otherData);
});
```





## Promise
A promise is an **object** representing the **eventual completion** or **failure** of an **asynchronous operation**. It 
allows you to **associate handlers** with an **asynchronous action's eventual success value** or **failure reason**.

```javascript
let promise = new Promise((resolve, reject) => {
    // Do something async
    let success = true;
    if (success) {
        resolve('Success!');
    } else {
        reject('Error!');
    }
});

promise.then(result => {
    console.log(result); // Output: Success!
}).catch(error => {
    console.log(error); // Output: Error!
});
```

### Promise Error Swallowing
In JavaScript, promises can sometimes swallow errors, leading to unhandled rejections that do not always trigger visible 
errors, especially in certain environments. This can make debugging difficult, as errors might silently fail without
providing any feedback.

#### Common Scenarios Where Errors May Be Swallowed
**Resolving and Throwing**
```js
Promise.resolve("promised value").then(function () {
    throw new Error("error");
});
```
**Rejecting and Throwing**
```js
Promise.reject("error value").catch(function () {
  throw new Error("error");
});
```
**Throwing in a New Promise**
```js
new Promise(function (resolve, reject) {
  throw new Error("error");
});
```
In some environments, these scenarios might not print the expected error messages to the console, leading to silent 
failures.

#### Ways to Prevent Promise Error Swallowing
**Add a Catch Block at the End of Each Chain** <br/>
To ensure that errors are handled and logged, you can append a catch block to the end of each promise chain.
```js
Promise
        .resolve("promised value")
        .then(function () {
            throw new Error("error");
        })
        .catch(function (error) {
            console.error(error.stack);
        });
```
**Pros**: Simple and effective. <br/>
**Cons**: Verbose and repetitive, especially in large codebases.

#### Use a Done Method
Replace the then and catch blocks with a done method, which can handle any errors at the end of the chain.
```js
Promise.resolve("promised value").done(function () {
  throw new Error("error");
});
```
**Example Use Case:**
```js
getDataFromHttp()
  .then(function (result) {
    return processDataAsync(result);
  })
  .done(function (processed) {
    displayData(processed);
  });
```
Pros: Simplifies the code and ensures errors are not silently swallowed. <br/>
Cons: If the done method is omitted, errors can still be swallowed. It also relies on extending the native promise 
behavior, which might not be ideal in every environment.

#### Extend ES6 Promises with Bluebird
Use the Bluebird library to extend ES6 promises. Bluebird offers enhanced functionality, including an automatic 
rejection handler that prints all unhandled rejections.

Installation: After installing Bluebird, you can set up an error handler.
```js
Promise.onPossiblyUnhandledRejection(function (error) {
  throw error;
});
```
Pros: Bluebird’s default behavior helps avoid silent errors by printing unhandled rejections. It also provides additional features for working with promises.
Cons: Adds a dependency to your project and may introduce overhead compared to native promises.

### Checking if an Object is a Promise
#### Using `Promise.resolve()`
Promise.resolve(value) returns a promise if the value is thenable (i.e., it has a .then() method). If the value is 
already a promise, Promise.resolve(value) will return the same promise. To check if an object is a promise, you can 
compare the result of Promise.resolve(object) with the original object. If they are the same, the object is a promise.
```js
function isPromise(object) {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) === object;
  } else {
    throw "Promise not supported in your environment";
  }
}

var i = 1;
var promise = new Promise(function (resolve, reject) {
  resolve();
});

console.log(isPromise(i)); // false
console.log(isPromise(promise)); // true
```
Example

In this example, Promise.resolve(object) will return the same object if it is already a promise. Therefore, if 
Promise.resolve(object) === object evaluates to true, then object is a promise.

#### Checking for .then() Method
Another method to check if an object is a promise is to verify if it has a .then() method that is of type function. All 
promises have a .then() method, so this check is a reliable way to identify a promise.
```js
function isPromise(value) {
  return Boolean(value && typeof value.then === "function");
}

var i = 1;
var promise = new Promise(function (resolve, reject) {
  resolve();
});

console.log(isPromise(i)); // false
console.log(isPromise(promise)); // true
```
This method checks whether the object has a .then() method and whether that method is a function. If both conditions are
met, the object is likely a promise.

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
