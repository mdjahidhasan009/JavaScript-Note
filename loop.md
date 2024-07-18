# `for`

# `while`

# `do ... while`

# `for ... in`

# `for ... of`
Allows the use of `break`, `continue`, and `return` statements.


# ``forEach``
`forEach` is a method that is used to iterate over every element of an array. It takes a function as an argument and calls that function 
for each element in the array. However, unlike traditional `for` or `while` loops, `forEach` is designed to execute the 
function for every element, without a built-in mechanism to stop or break the loop prematurely.

### `break` in `forEach` loop
If you try to use `break` inside a `forEach`, you'll encounter a syntax error because break is not applicable within a 
callback function.
```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(number => {
  if (number > 3) {
    break; // Syntax Error: Illegal break statement
  }
  console.log(number);
});
```

### `return` in `forEach` loop
In other loops or functions, the `return` statement exits the loop or function, returning a value if specified.

In the context of `forEach`, `return` does not break out of the loop. Instead, it merely exits the current iteration of the 
callback function and moves on to the next element in the array.
```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(number => {
  if (number === 3) {
    return; // Exits only the current iteration
  }
  console.log(number);
});
```
Output
```
1
2
4
5
```

## Breaking a forEach Loop Using Exceptions 
We can break out of a `forEach` loop by throwing an exception. This is not recommended as it can lead to unexpected behavior
and make the code harder to read and maintain.
```js
const numbers = [1, 2, 3, 4, 5];
try {
  numbers.forEach(number => {
    if (number > 3) {
      throw new Error('Loop stopped');
    }
    console.log(number);
  });
} catch (e) {
  console.log('Loop was stopped due to an exception.');
}
// Output: 1, 2, 3, Loop was stopped due to an exception.
```

# Array.prototype.some()

# Array.prototype.every()

# Array.prototype.filter()

# Array.prototype.map()

# Array.prototype.reduce()

# Array.prototype.reduceRight()

# Array.prototype.find()

# Array.prototype.findIndex()

# Array.prototype.includes()

# Array.prototype.indexOf()

# Array.prototype.lastIndexOf()

# Array.prototype.keys()

# Array.prototype.values()

# Array.prototype.entries()

# Array.prototype.flat()

# Array.prototype.flatMap()

# Array.prototype.sort()

# Array.prototype.reverse()

# Array.prototype.copyWithin()

# Array.prototype.fill()

# Array.prototype.splice()

# Array.prototype.slice()

# Array.prototype.concat()

# Array.prototype.join()

# Array.prototype.toString()

# Array.prototype.toLocaleString()

# Array.prototype.push()

# Array.prototype.pop()

# Array.prototype.shift()

# Array.prototype.unshift()


## How to Empty an Array in JavaScript?

To empty an array in JavaScript, you can use several methods. Here are the possible ways to empty an array:

#### Example Array:

```javascript
var arrayList = ['a', 'b', 'c', 'd', 'e', 'f'];
```

#### Method 1: Assigning to an Empty Array

```javascript
arrayList = [];
```

This code sets the variable `arrayList` to a new empty array. This method is recommended if you don't have references to the original `arrayList` elsewhere because it creates a new empty array. Be cautious with this method if the array is referenced by another variable, as the original reference will remain unchanged.

```javascript
var arrayList = ['a', 'b', 'c', 'd', 'e', 'f'];
var anotherArrayList = arrayList;
arrayList = [];
console.log(anotherArrayList); // Output: ['a', 'b', 'c', 'd', 'e', 'f']
```

#### Method 2: Setting the Length to 0

```javascript
arrayList.length = 0;
```

This code clears the existing array by setting its length to 0. This method also updates all reference variables that point to the original array.

```javascript
var arrayList = ['a', 'b', 'c', 'd', 'e', 'f'];
var anotherArrayList = arrayList;
arrayList.length = 0;
console.log(anotherArrayList); // Output: []
```

#### Method 3: Using `splice()`

```javascript
arrayList.splice(0, arrayList.length);
```

This implementation also works perfectly. It empties the array and updates all references of the original array.

```javascript
var arrayList = ['a', 'b', 'c', 'd', 'e', 'f'];
var anotherArrayList = arrayList;
arrayList.splice(0, arrayList.length);
console.log(anotherArrayList); // Output: []
```

#### Method 4: Using a `while` Loop

```javascript
while(arrayList.length) {
  arrayList.pop();
}
```

This implementation can also empty the array, but it is not recommended to use often due to its less efficient approach.

```javascript
var arrayList = ['a', 'b', 'c', 'd', 'e', 'f'];
while(arrayList.length) {
  arrayList.pop();
}
console.log(arrayList); // Output: []
```

Each method has its use cases, and you should choose the one that best fits your situation.

## How to Check if an Object is an Array in JavaScript?

<details>
<summary>Array.isArray()</summary>

The Array.isArray() method is the most reliable and straightforward way to check if an object is an array. It returns 
true if the object is an array, and false otherwise.
```js
var arrayList = ['a', 'b', 'c'];
console.log(Array.isArray(arrayList)); // Output: true

var notArray = { key: 'value' };
console.log(Array.isArray(notArray)); // Output: false
```
</details>

<details>
<summary> `instanceof` Operator</summary>

The `instanceof` operator checks if an object is an instance of a specific constructor. It can be used to check if an 
object is an array, but it may not always work correctly across different frames or windows.
```js
var arrayList = ['a', 'b', 'c'];
console.log(arrayList instanceof Array); // Output: true

var notArray = { key: 'value' };
console.log(notArray instanceof Array); // Output: false
```
</details>

<details>
<summary>`Object.prototype.toString.call()`</summary>

The `Object.prototype.toString.call()` method returns a string representation of the object type. For arrays, it returns 
`[object Array]`.
```js
var arrayList = ['a', 'b', 'c'];
console.log(Object.prototype.toString.call(arrayList) === '[object Array]'); // Output: true

var notArray = { key: 'value' };
console.log(Object.prototype.toString.call(notArray) === '[object Array]'); // Output: false
```
</details>

<details>
<summary>`constructor` Property</summary>

The `constructor` property can be used to check if an object's constructor is `Array`. However, this method can be unreliable
if the constructor property has been changed or if the object was created in a different frame or window.
```js
var arrayList = ['a', 'b', 'c'];
console.log(arrayList.constructor === Array); // Output: true

var notArray = { key: 'value' };
console.log(notArray.constructor === Array); // Output: false
```
</details>

**Summary**
* `Array.isArray():` The most reliable and recommended method to check if an object is an array.
* `instanceof:` Checks if an object is an instance of Array, but may fail across different frames or windows.
* `Object.prototype.toString.call():` Returns a string representation of the object type, reliable across different frames.
* `constructor:` Checks the constructor property, but can be unreliable if the property is modified or the object is from a different frame.

Using `Array.isArray()` is generally the best approach to determine if an object is an array in JavaScript.

## JavaScript Labels
The `label` statement in JavaScript allows you to name loops and blocks of code. Labels can be used with `break` and 
`continue`statements to control the flow of code more precisely.

Syntax<br/>
``js
labelName: statement
``
* **labelName:** An identifier that you define to name the loop or block.
* **statement:** A JavaScript statement (usually a loop or block) to be labeled.
#### Using Labels with `continue`
Consider the following example where labels are used to avoid printing numbers when they are the same:
```js
var i, j;

loop1: for (i = 0; i < 3; i++) {
  loop2: for (j = 0; j < 3; j++) {
    if (i === j) {
      continue loop1;
    }
    console.log("i = " + i + ", j = " + j);
  }
}

// Output:
//   "i = 1, j = 0"
//   "i = 2, j = 0"
//   "i = 2, j = 1"
```
* `loop1` and `loop2` are labels for the outer and inner `for` loops, respectively.
* The `continue loop1` statement skips the current iteration of `loop1` whenever `i` is equal to `j`, thus avoiding 
  printing the numbers when they are the same.

#### Using Labels with `break`
You can also use labels with the `break` statement to exit out of a labeled loop.
```js
var i, j;

loop1: for (i = 0; i < 3; i++) {
  for (j = 0; j < 3; j++) {
    if (i === 2 && j === 1) {
      break loop1;
    }
    console.log("i = " + i + ", j = " + j);
  }
}

// Output:
//   "i = 0, j = 0"
//   "i = 0, j = 1"
//   "i = 0, j = 2"
//   "i = 1, j = 0"
//   "i = 1, j = 1"
//   "i = 1, j = 2"
//   "i = 2, j = 0"
```
* The `break loop1` statement causes the execution to exit `loop1` entirely when `i` is 2 and `j` is 1.

### Sources
- [JavaScript Interview: Can You Stop or Break a forEach Loop?](https://javascript.plainenglish.io/javascript-interview-can-you-stop-or-break-a-foreach-loop-9608ba2a1710)
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)