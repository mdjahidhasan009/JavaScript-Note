## CallBack Function
A callback function is a function passed into another function as an argument, which is then invoked inside the outer 
function to complete a specific action.

**Example**
```js
function callbackFunction(name) {
  console.log("Hello " + name);
}

function outerFunction(callback) {
  let name = prompt("Please enter your name.");
  callback(name);
}

outerFunction(callbackFunction);
```
Callbacks are essential in JavaScript because it is an event-driven language. Instead of waiting for a response, 
JavaScript continues executing other code while listening for other events. This is particularly useful for handling 
asynchronous operations, like API calls.

Another example
```js
function firstFunction() {
  // Simulate a code delay
  setTimeout(function () {
    console.log("First function called");
  }, 1000);
}
function secondFunction() {
  console.log("Second function called");
}
firstFunction();
secondFunction();

// Output:
// Second function called
// First function called
```
As observed from the output, JavaScript does not wait for the response of the first function and continues executing the 
next code block. Callbacks are used to ensure certain code executes only after other code has finished execution.

## Callback Hell
Callback Hell is an anti-pattern that occurs when there are multiple nested callbacks, making the code hard to read and 
debug. This often happens when dealing with complex asynchronous logic.
```js
async1(function(){
    async2(function(){
        async3(function(){
            async4(function(){
                // ...
            });
        });
    });
});
```
To mitigate callback hell, promises and async/await patterns are preferred. These approaches make the code more readable 
and maintainable by flattening the structure of nested asynchronous calls.

## Example 6: Simulating a Promise-like Object

This code snippet demonstrates simulating a Promise-like object with a `then` method.

```javascript
function getDataFromServer(apiUrl){
    var name = "John";
    return {
        then: function(fn){
            fn(name);
        }
    }
}

getDataFromServer('www.google.com').then(function(name){
    console.log(name); // Output: John
});
```

### Explanation:
- **Simulating a Promise**: The `getDataFromServer` function returns an object with a `then` method, which immediately
  invokes the provided callback with the `name` variable.
- **Logging Name**: The `then` method is called with a function that logs the name, resulting in the output `John`.

## Example 7: Overriding Array `sort` Method (Incorrect Implementation)

This code snippet demonstrates overriding the `Array.prototype.sort` method incorrectly.

```javascript
(function(){
    var arrayNumb = [2, 8, 15, 16, 23, 42];
    Array.prototype.sort = function(a, b){
        return a - b;
    };
    arrayNumb.sort();
    console.log(arrayNumb); // Output: [2, 8, 15, 16, 23, 42]
})();
```

### Explanation:
- **Incorrect Override**: The `Array.prototype.sort` method is overridden with a function that expects two arguments (`a` and `b`), which is incorrect for overriding `Array.prototype.sort`.
- **Sorting Array**: Despite the incorrect override, the original `sort` method's behavior is preserved and the array is sorted correctly.

## Example 8: Correct Array `sort` Implementation with Custom Function

This code snippet demonstrates sorting an array with a custom compare function.

```javascript
(function(){
    var numberArray = [2, 8, 15, 16, 23, 42];
    numberArray.sort(function(a, b){
        if(a == b){
            return 0;
        } else {
            return a < b ? -1 : 1;
        }
    });
    console.log(numberArray); // Output: [2, 8, 15, 16, 23, 42]
})();
```

### Explanation:
- **Custom Sort Function**: The `sort` method is used with a custom compare function that returns `0` if elements are equal, `-1` if `a` is less than `b`, and `1` otherwise.
- **Sorting Array**: The array is correctly sorted in ascending order.

## Example 9: Simplified Array `sort` Implementation

This code snippet demonstrates sorting an array using a simplified compare function.

```javascript
(function(){
    var numberArray = [2, 8, 15, 16, 23, 42];
    numberArray.sort(function(a, b){
        return a - b;
    });
    console.log(numberArray); // Output: [2, 8, 15, 16, 23, 42]
})();
```

### Explanation:
- **Simplified Sort Function**: The `sort` method is used with a simplified compare function that directly returns the difference between `a` and `b`.
- **Sorting Array**: The array is correctly sorted in ascending order.


#### Callback in callback
You can nest one callback inside in another callback to execute the actions sequentially one by one. This is known as 
callbacks in callbacks.
```js
loadScript("/script1.js", function (script) {
  console.log("first script is loaded");

  loadScript("/script2.js", function (script) {
    console.log("second script is loaded");

    loadScript("/script3.js", function (script) {
      console.log("third script is loaded");
      // after all scripts are loaded
    });
  });
});
```

## Debouncing 
Debouncing is a programming pattern that allows delaying execution of some piece of code until a specified time to avoid
unnecessary CPU cycles, API calls and improve performance. The debounce function make sure that your code is only 
triggered once per user input. The common usecases are Search box suggestions, text-field auto-saves, and eliminating
double-button clicks.

Let's say you want to show suggestions for a search query, but only after a visitor has finished typing it. So here you
write a debounce function where the user keeps writing the characters with in 500ms then previous timer cleared out
using clearTimeout and reschedule API call/DB query for a new time—300 ms in the future.
```js
function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function fetchResults() {
  console.log("Fetching input suggestions");
}
const processChange = debounce(() => fetchResults());
```
The debounce() function can be used on input, button and window events

**Input**
```js
<input type="text" onkeyup="processChange()" />
```

**Button**
```js
<button onclick="processChange()">Click me</button>
```

**Windows Event**
```js
window.addEventListener("scroll", processChange);
```

## Throttling
Throttling is a technique used to limit the execution of an event handler function, even when this event triggers
continuously due to user actions. The common use cases are browser resizing, window scrolling etc.

The below example creates a throttle function to reduce the number of events for each pixel change and trigger scroll 
event for each 100ms except for the first event.
```js
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
window.addEventListener("scroll", () => {
  throttle(handleScrollAnimation, 100);
});
```

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
