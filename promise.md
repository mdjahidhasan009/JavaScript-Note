# `promise`
A promise in JavaScript is an object representing the eventual completion (or failure) of an asynchronous operation and 
its resulting value. It is a way to handle asynchronous operations more elegantly compared to traditional callback-based 
approaches. A promise is an object that supplies a standard-compliant `.then()` method

**States of promise**<br/>
A promise can be in one of three states:
* **Pending:** The initial state of a promise before an operation begins.
* **Fulfilled:** Indicates that the specified operation was completed successfully.
* **Rejected:** Indicates that the operation did not complete successfully, often resulting in an error.

A pending promise may transition into either fulfilled or rejected state. A fulfilled or rejected promise is settled and
it must not transition into any other state. Once a promise is settled, the value must not change.

## Creating and Using a Promise
Here’s how we can create a promise and use it:
**Promise Creation**
```js
const promise = new Promise(function (resolve, reject) {
  // promise description
});
```
**Promise Usage**
```js
const promise = new Promise(
  (resolve) => {
    setTimeout(() => {
      resolve("I'm a Promise!");
    }, 5000);
  },
  (reject) => {}
);

promise.then((value) => console.log(value));
```

<img src="./images/promises.png" alt="promises"/>

Source [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)

The action flow of a promise begins with the promise in a pending state. Once the asynchronous operation completes, the 
promise transitions to either a fulfilled state (if the operation was successful) or a rejected state (if the operation 
failed).

**Why Promises are Needed**

Promises are crucial for handling asynchronous operations in JavaScript. They offer a more readable and manageable 
approach compared to traditional callbacks. Promises help avoid "callback hell," a scenario where multiple nested 
callbacks make the code difficult to read and maintain. They enable writing cleaner and more structured asynchronous 
code.

## `Promise.all`
`Promise.all` is a method that takes an array of promises as an input (an iterable), and it gets resolved when all the
promises in the array are resolved or any one of them gets rejected. It returns a single promise that resolves to an 
array of the results of the input promises.

* All input promises must be resolved for `Promise.all` to resolve.
* If any input promise is rejected, `Promise.all` immediately rejects with the reason of the first promise that was rejected.
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
`Promise.race` is a method that returns a promise that resolves or rejects as soon as one of the promises in the iterable
resolves or rejects, with the value or reason from that promise.

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

#### Promise chaining
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
4. Finally the value passed to the last .then handler by logging the result(6) and return a promise with result * 4.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)