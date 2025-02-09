# Asynchronous
Asynchronous programming is a form of parallel programming that allows a unit of work to run separately from the main
application thread. When the work is complete, it notifies the main thread (usually by invoking a callback function).

### Asynchronous operation using callback
```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback('Data received!');
    }, 2000);
}

function displayData(data) {
    console.log(data);
}

fetchData(displayData);
```

### Asynchronous operation using Promises
```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data received!');
        }, 2000);
    });
}

fetchData().then(data => {
    console.log(data);
});
```

# Promises in JavaScript
**Definition:** Promises are a mechanism for handling asynchronous operations in JavaScript. They represent a value that 
may be available now, or in the future, or never.It is a way to handle asynchronous operations more elegantly compared
to traditional callback-based approaches. A promise is an object that supplies a standard-compliant `.then()` method.

A promise has three states: 
* **Pending:** The initial state of a promise before an operation begins.
* **Fulfilled:** Indicates that the specified operation was completed successfully.
* **Rejected:** Indicates that the operation did not complete successfully, often resulting in an error.


## Key Points
1. **Sequential Handling of Asynchronous Operations:** Promises are useful for handling async operations in a sequential 
   manner. For example, you can request a list of all flights and then request details for each flight based on the 
   initial results.
2. **State Machine:** A promise represents a future value and works like a state machine with states: **pending**, 
   **fulfilled**, and **rejected**.
3. **Then Method:** A promise object has a `then` method where you can specify what to do when the promise is fulfilled 
   or rejected.
4. **Chaining:** You can chain `then()` blocks to avoid callback hell and make the code more readable.
5. **Error Handling:** Errors can be handled in the `catch()` block.
6. **Immutability:** After a promise is set to a fulfilled or rejected state, it becomes immutable.

## Creating and Using a Promise
A `Promise` is an **object** representing the **eventual completion** or **failure** of an **asynchronous operation**.
It allows you to **associate handlers** with an **asynchronous action's eventual success value** or **failure reason**.

```js
const promise = new Promise(function (resolve, reject) {
  // promise description
});
```
**Promise Usage**
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

<img src="./images/promises.png" alt="promises"/>

Source [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)

The action flow of a promise begins with the promise in a pending state. Once the asynchronous operation completes, the
promise transitions to either a fulfilled state (if the operation was successful) or a rejected state (if the operation
failed).

### Why Promises are Needed

Promises are crucial for handling asynchronous operations in JavaScript. They offer a more readable and manageable
approach compared to traditional callbacks. Promises help avoid "callback hell," a scenario where multiple nested
callbacks make the code difficult to read and maintain. They enable writing cleaner and more structured asynchronous
code.


## `Promise.all`
`Promise.all` is a method that takes an array of promises as an input (an iterable), and it gets resolved when all the
promises in the array are resolved or any one of them gets rejected. It returns a single promise that resolves to an
array of the results of the input promises.

* All input promises must be resolved for `Promise.all` to resolve.
* If any input promise is rejected, `Promise.all` immediately rejects with the reason of the first promise that was
  rejected.
* The order of the output array matches the order of the input promises.

```js
Promise.all([Promise1, Promise2, Promise3])
    .then(result => {
        console.log(result);
    })
    .catch(error => console.log(`Error in promises: ${error}`));
```
Another example
```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(values => {
  console.log(values); // [3, 42, "foo"]
}).catch(error => {
  console.log(`Error in promises: ${error}`);
});
```


## `Promise.race`
`Promise.race` is a method that returns a promise that resolves or rejects as soon as one of the promises in the
iterable resolves or rejects, with the value or reason from that promise.

* `Promise.race` resolves or rejects as soon as one of the promises in the iterable resolves or rejects.
* The returned promise resolves with the value of the first resolved promise or rejects with the reason of the first
  rejected promise.

```js
Promise.race([Promise1, Promise2])
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error);
  });
```
Another example
```js
var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
var promise2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then(function (value) {
  console.log(value); // "two"
  // Both promises will resolve, but promise2 is faster
}).catch(function (error) {
  console.log(error);
});
```



## Promise chaining
The process of executing a sequence of asynchronous tasks one after another using promises is known as Promise chaining.
Let's take an example of promise chaining for calculating the final result,
```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 2
    return result * 3;
  })
  .then(function (result) {
    console.log(result); // 6
    return result * 4;
  });
```
In the above handlers, the result is passed to the chain of .then() handlers with the below work flow,

1. The initial promise resolves in 1 second,
2. After that .then handler is called by logging the result(1) and then return a promise with the value of result * 2.
3. After that the value passed to the next .then handler by logging the result(2) and return a promise with result * 3.
4. Finally, the value passed to the last .then handler by logging the result(6) and return a promise with result * 4.

### Promise Chaining with Fetch API
The `fetch` API returns a promise that resolves to the Response to that request, whether it is successful or not.
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
        console.error('E-ror:', error);
    });
```

## Pros and Cons of Promises Over Callbacks
### Improved Readability and Maintainability:
**Chaining**: Promises allow for chaining of asynchronous operations, making the code more readable and easier to
follow.

```js
asyncFunction1()
  .then(result => asyncFunction2(result))
  .then(result => asyncFunction3(result))
  .catch(error => console.error(error));
```

### Avoiding Callback Hell:
**Flattened Structure**: Promises help to avoid deeply nested callbacks, known as "callback hell" or "pyramid of doom".
```js
// Callback Hell
asyncFunction1(result1 => {
  asyncFunction2(result2 => {
    asyncFunction3(result3 => {
      console.log(result3);
    });
  });
});

// Using Promises
asyncFunction1()
  .then(result1 => asyncFunction2(result1))
  .then(result2 => asyncFunction3(result2))
  .then(result3 => console.log(result3))
  .catch(error => console.error(error));
```

### Error Handling
#### Pros of Promises
**Centralized Error Handling**: Promises provide a catch method that allows centralized error handling for a chain of
asynchronous operations.
```js
asyncFunction1()
  .then(result => asyncFunction2(result))
  .then(result => asyncFunction3(result))
  .catch(error => console.error("Error occurred:", error));
```
### Better Control Flow
**Synchronizing Asynchronous Operations**: Promises provide methods like Promise.all, Promise.race, and Promise.allSettled
to manage multiple asynchronous operations more effectively.
```js
Promise.all([asyncFunction1(), asyncFunction2(), asyncFunction3()])
  .then(results => {
    console.log("All functions completed:", results);
  })
  .catch(error => console.error("Error in one of the functions:", error));
```

### Inherent Return Values:
**Returning Promises**: Functions that return promises can be easily chained and combined, promoting a more functional
style of programming.
```js
function asyncFunction1() {
  return new Promise((resolve, reject) => {
    // Asynchronous code
  });
}

asyncFunction1()
  .then(result => {
    console.log("Function completed:", result);
  })
  .catch(error => console.error("Error:", error));
```
#### Cons of promise
* **Learning Curve/Complexity**: Promises introduce new concepts and methods that might have a learning curve for
  beginner like `then`, `catch`, `Promise.all`.
* **Debugging Challenges/Stack Traces**: Promises can sometimes lead to less informative stack traces compared to
  callbacks, making debugging more challenging.
* **Potential for Unhandled Rejections/Missed Errors**: If not handled properly, rejected promises can lead to unhandled
  promise rejections, which can be hard to track down.
  ```js
  asyncFunction1()
  .then(result => {
    // Error occurs here
    throw new Error("Something went wrong");
  })
  // Missing .catch leads to unhandled rejection
  ```
* **Browser Compatibility**: Promises might not be supported in older browsers without polyfills, which could be a
  limitation in some environments.






  



## Promise Error Swallowing
In JavaScript, promises can sometimes swallow errors, leading to unhandled rejections that do not always trigger visible
errors, especially in certain environments. This can make debugging difficult, as errors might silently fail without
providing any feedback.

### Common Scenarios Where Errors May Be Swallowed
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

### Ways to Prevent Promise Error Swallowing
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

### Use a Done Method
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

### Extend ES6 Promises with Bluebird
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




## Checking if an Object is a Promise
### Using `Promise.resolve()`
`Promise.resolve(value)` returns a promise if the value is thenable (i.e., it has a .then() method). If the value is
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

### Checking for `.then()` Method
Another method to check if an object is a promise is to verify if it has a `.then()` method that is of type function. 
All promises have a `.then()` method, so this check is a reliable way to identify a promise.
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




# Async/Await
An async function is a function declared with the async keyword, which allows you to write asynchronous code in a more
readable and manageable way by using the await keyword. It enables you to work with promises without needing to chain 
.then() calls, making the code more synchronous in appearance.

`async/await` is built on top of Promises.  It's syntactic sugar that makes working with Promises much easier and more
readable.  `async` functions implicitly return Promises, and `await` is used to pause the execution of the function 
until the Promise resolves (or rejects)

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















# Observables
Observables are a new way of handling async events in JavaScript. They are proposed as a better alternative to promises
for handling async operations and handling multiple values over time. Observables are part of the RxJS library, which is
a popular library for reactive programming in JavaScript.

Some of the most common use cases of observables are web sockets with push notifications, user input changes, repeating
intervals, etc

**Creating an Observable**
```js
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

observable.subscribe({
  next: value => console.log(value),
  error: error => console.error(error),
  complete: () => console.log('Observable completed'),
});
```

## Differences Between Promises and Observables

| **Promises**                                                       | **Observables**                                                                                 |
|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| Emits only a single value at a time                                | Emits multiple values over a period of time (stream of values ranging from 0 to multiple)       |
| Eager in nature; they are going to be called immediately           | Lazy in nature; they require subscription to be invoked                                         |
| Promise is always asynchronous even though it resolved immediately | Observable can be either synchronous or asynchronous                                            |
| Doesn't provide any operators                                      | Provides operators such as `map`, `forEach`, `filter`, `reduce`, `retry`, and `retryWhen`, etc. |
| Cannot be canceled                                                 | Canceled by using `unsubscribe()` method                                                        |


## RxJS Observables
Observables can be viewed as recyclable promises and offer more sophisticated ways to handle asynchronous data streams.

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

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
