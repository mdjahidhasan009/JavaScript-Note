# Polyfill
A polyfill is a piece of JavaScript code that provides modern functionality on older browsers that do not natively
support it. Polyfills essentially mimic the behavior of modern JavaScript features, allowing developers to use those 
features while ensuring compatibility with older browsers.

Polyfills are particularly useful when you want to use modern JavaScript features but need to ensure that your code runs 
on older browsers that do not support these features.

For example, a polyfill for the `Array.prototype.includes` method might look like this:
```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function(element) {
    return this.indexOf(element) !== -1;
  };
}
```

Some popular polyfill library are `Core.js`, `Polyfill.io`

## Custom Polyfill
### `map`
The built-in Array.map method syntax will be helpful to write polyfill. The map method takes the callback function as an
argument and that callback function can have below three arguments passed into it.
* `currentValue`: The current element being processed in the array.
* `index`: The index of the current element being processed in the array(optional).
* `array`: The array map was called upon(optional).

The syntax would like below,
```js
let newArray = arr.map(callback(currentValue[, index, arr) {
   // return new array after executing the code
})
```
Let's build our map polyfill based on the above syntax,
```js
  Array.prototype.myMap = function(cb) {
    let newArr = [];
    for(let i=0; i< this.length; i++) {
      newArr.push(cb(this[i], i, this));
    }
    return newArr;
  };

  const nums = [1, 2, 3, 4, 5];
  const multiplyByTwo = nums.myMap(x => x * 2);
  console.log(multiplyByTwo); // [2, 4, 6, 8, 10]
```
In the above code, custom method name 'myMap' has been used to avoid conflicts with built-in method.

### `filter`
Similar to map method, Array.filter method takes callback function as an argument and the callback function can have 
three agurguments passed into it.
* `currentValue`: The current element being processed in the array.
* `index`: The index of the current element being processed in the array(optional).
* `array`: The array filter was called upon(optional).

The syntax would like below,
```js
let newArray = arr.filter(callback(currentValue[, index, arr) {
  // return new array whose elements satisfy the callback conditions
})
```

Let's build our filter polyfill based on the above syntax,
```js
Array.prototype.myFilter = function(cb) {
    let newArr = [];
    for(let i=0; i< this.length; i++) {
        if(cb(this[i], i, this)) {
            newArr.push(this[i]);
        }
    }
    return newArr;
}

const nums = [1, 2, 3, 4, 5, 6];
const evenNums = nums.myFilter(x => x % 2);
console.log(evenNums); // [2, 4, 6]
```

### `reduce`
The built-in Array.reduce method syntax will be helpful to write our own polyfill. The reduce method takes the callback
function as first argument and the initial value as second argument.

The callback function can have four arguments passed into it
* `accumulator`: The accumulator accumulates the callback's return values. It is the accumulated value previously returned
  in the last invocation of the callback, or initialValue, if supplied.
* `currentValue`: The current element being processed in the array.
* `index`: The index of the current element being processed in the array(optional).
* `array`: The array reduce was called upon(optional).

The syntax would like below,
```js
arr.reduce(callback((acc, curr, i, arr) => {}), initValue);
```

Let's build our reduce polyfill based on the above syntax,
```js
Array.prototype.myReduce = function(cb, initialValue) {
    let accumulator = initialValue;
    for(let i=0; i< this.length; i++) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
    }
    return accumulator;
}
  const nums = [1, 2, 3, 4, 5, 6];
  const sum = nums.myReduce((acc, curr, i, arr) => {
    return acc += curr
  }, 0);
  console.log(sum); // 21
```


## Shim vs Polyfill
### Shim
A shim is a library that allows older environments to support newer APIs or functionalities by implementing them using 
the existing capabilities of that environment. It's not limited to web applications and can be applied to any software 
environment. An example is es5-shim.js, which emulates ES5 features in older browsers.

### Polyfill   
A polyfill is a specific type of shim that is focused on providing missing functionalities in web browsers. It is used 
to mimic the behavior of native APIs that are not supported in certain browsers. In essence, a polyfill is a shim that
specifically targets browser APIs.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)