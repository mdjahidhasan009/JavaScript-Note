# `for`

# `while`

# `do ... while`

## `for ... in`
The `for...in` loop is used to iterate over the enumerable properties of an object. It iterates over the properties of an
object in arbitrary order, including inherited properties from the prototype chain. It is not recommended for use with
arrays due to potential issues with the order of iteration and the inclusion of non-indexed properties. Also non-enumerable
properties are not included in the iteration.

```js
(function () {
  const person = {
    name: "Alice",
    age: 30,

    // Non-enumerable property
    [Symbol("id")]: 12345,
  };

  for (const key in person) {
    console.log(key, person[key]);
  }

// Output:
// name Alice
// age 30
})()
```
  

## `for ... of`
The `for...of` loop is used to iterate over the values of an iterable object, such as an array, string, or collection. It
provides a more concise and readable syntax compared to other loops, especially when working with arrays. Means
non-enumerable properties, inherited properties, and the prototype chain are not included in the iteration.

Allows the use of `break`, `continue`, and `return` statements. 

```js
(function (){
  const numbers = [1, 2, 3, 4, 5];
  for (const number of numbers) {
    console.log(number);
  }

// Output:
// 1
// 2
// 3
// 4
// 5

//Non-Eumerable properties are not included in the iteration
  const person = {
    name: "Alice",
    age: 30,

    // Non-enumerable property
    [Symbol("id")]: 12345,
  };

  for (const key in person) {
    console.log(key, person[key]);
  }

// Output:
// name Alice
// age 30
})()
```

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

## `Array.prototype.some()`
The some() method in JavaScript is used to determine whether at least one element in an array satisfies a condition
specified by a given function. It iterates over the array and applies the function to each element until it finds one 
that returns true. If such an element is found, the method returns true; otherwise, it returns false. This method is 
particularly useful when you need to check if any element in an array meets a certain criterion.

**Example**
```js
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var odd = (element) => element % 2 !== 0;

console.log(array.some(odd)); // true (there are odd elements in the array)
```
In this example, the some() method checks if there are any odd numbers in the array. Since the array contains odd 
numbers, the method returns true.



# Array.prototype.every()

# Array.prototype.filter()

# Array.prototype.map()

# Array.prototype.reduce()

# Array.prototype.reduceRight()

# Array.prototype.find()

# Array.prototype.findIndex()

### Array.prototype.includes()
Use the `Array.prototype.includes()` method to check if an array contains a specific element. It returns `true` if the
element is found, and `false` otherwise.
```js
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.includes(3)); // Output: true
console.log(numbers.includes(6)); // Output: false

var stringArray = ["green", "yellow", "blue"];
console.log(stringArray.includes("blue")); //true
```

## Array.prototype.indexOf()
The `Array.prototype.indexOf()` method returns the first index at which a given element can be found in the array. If the
element is not present, it returns -1.
```js
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.indexOf(3)); // Output: 2
console.log(numbers.indexOf(6)); // Output: -1

var stringArray = ["green", "yellow", "blue"];
console.log(stringArray.indexOf("blue")); //2
```

### Checking conditions with `indexOf()`
You can use `indexOf()` to check if an element exists in an array and perform conditional logic based on the result.
```js
// Verbose approach
if (
        input === "first" ||
        input === 1 ||
        input === "second" ||
        input === 2
) {
  someFunction();
}
// Shortcut
if (["first", 1, "second", 2].indexOf(input) !== -1) {
  someFunction();
}
```

# Array.prototype.lastIndexOf()

# Array.prototype.keys()

# Array.prototype.values()

# Array.prototype.entries()

## Array.prototype.length
The `length` property of an array returns the number of elements in the array. It is automatically updated when elements 
are added or removed from the array.

```js
const fruits = ["apple", "banana", "cherry"];
console.log(fruits.length); // Output: 3

fruits.push("date");
console.log(fruits.length); // Output: 4

fruits.pop();
console.log(fruits.length); // Output: 3
```

### Setting the `length` Property
You can also set the `length` property to change the number of elements in the array. If you set the `length` to a smaller
value, the array will be truncated, removing elements beyond the new length. If you set it to a larger value, the array
will be padded with `undefined` elements, and if set length to 0, it empties the array.

```js
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.length); // Output: 5

numbers.length = 3;
console.log(numbers); // Output: [1, 2, 3]

numbers.length = 7;
console.log(numbers); // Output: [1, 2, 3, <4 empty items>]

numbers.length = 0;
console.log(numbers); // Output: []
```

## Array.prototype.flat()
When working with nested arrays, the `Array.prototype.flat()` method can be used to flatten the array by one level. It
creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

```js
const arr = [1, [2, 3], 4, 5, [6, 7]];
const fllattenArr = arr.flat(); // [1, 2, 3, 4, 5, 6, 7]

// And for multiDemensional arrays
const multiDimensionalArr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
const oneStepFlat = multiDimensionalArr.flat(1); // [11, 22, 33, 44, [55, 66, [77, [88]], 99]]
const towStep = multiDimensionalArr.flat(2); // [11, 22, 33, 44, 55, 66, [77, [88]], 99]
const fullyFlatArray = multiDimensionalArr.flat(Infinity); // [11, 22, 33, 44, 55, 66, 77, 88, 99]
```

# Array.prototype.flatMap()

# Array.prototype.sort()

## Array.prototype.reverse()
The `Array.prototype.reverse()` method reverses the elements of an array in place. The first array element becomes the last,
and the last element becomes the first. And it mutates the original array.

```js
const originalArray = [1, 2, 3, 4, 5];
const newArray = originalArray.reverse();

console.log(originalArray); // [5, 4, 3, 2, 1]
console.log(newArray); // [5, 4, 3, 2, 1]
```

### Reverse the array without mutating the original array
#### Using slice and reverse methods
In this case, just invoke the slice() method on the array to create a shallow copy followed by reverse() method call on 
the copy.
```js
const originalArray = [1, 2, 3, 4, 5];
const newArray = originalArray.slice().reverse(); //Slice an array gives a new copy

console.log(originalArray); // [1, 2, 3, 4, 5]
console.log(newArray); // [ 5, 4, 3, 2, 1]
```

#### Using spread and reverse methods
In this case, let's use the spread syntax (...) to create a copy of the array followed by reverse() method call on the
copy.
```js
const originalArray = [1, 2, 3, 4, 5];
const newArray = [...originalArray].reverse();

console.log(originalArray); // [1, 2, 3, 4, 5]
console.log(newArray); // [ 5, 4, 3, 2, 1]
```

#### Using reduce and spread methods
Here execute a reducer function on an array elements and append the accumulated array on right side using spread syntax
```js
const originalArray = [1, 2, 3, 4, 5];
const newArray = originalArray.reduce((accumulator, value) => {
  return [value, ...accumulator];
}, []);

console.log(originalArray); // [1, 2, 3, 4, 5]
console.log(newArray); // [ 5, 4, 3, 2, 1]
```

#### Using reduceRight and spread methods
Here execute a right reducer function(i.e. opposite direction of reduce method) on an array elements and append the 
accumulated array on left side using spread syntax
```js
const originalArray = [1, 2, 3, 4, 5];
const newArray = originalArray.reduceRight((accumulator, value) => {
  return [...accumulator, value];
}, []);

console.log(originalArray); // [1, 2, 3, 4, 5]
console.log(newArray); // [ 5, 4, 3, 2, 1]
```

#### Using reduceRight and push methods
Here execute a right reducer function(i.e. opposite direction of reduce method) on an array elements and push the 
iterated value to the accumulator
```js
const originalArray = [1, 2, 3, 4, 5];
const newArray = originalArray.reduceRight((accumulator, value) => {
  accumulator.push(value);
  return accumulator;
}, []);

console.log(originalArray); // [1, 2, 3, 4, 5]
console.log(newArray); // [ 5, 4, 3, 2, 1]
```

# Array.prototype.copyWithin()

# Array.prototype.fill()

# Array.prototype.splice()

# Array.prototype.slice()

## Array.prototype.concat()
The concat() method in JavaScript is used to merge two or more arrays into a new array. It does not modify the existing
arrays but returns a new array containing the elements of the combined arrays. This method can be useful when you want
to create a single array from multiple arrays without altering the original arrays.

**Syntax** <br/>
```js
array1.concat(array2, array3, ..., arrayX)
```

**Example** <br/>
```js
var veggies = ["Tomato", "Carrot", "Cabbage"];
var fruits = ["Apple", "Orange", "Pears"];
var veggiesAndFruits = veggies.concat(fruits);

console.log(veggiesAndFruits); // ["Tomato", "Carrot", "Cabbage", "Apple", "Orange", "Pears"]
```
In this example, the concat() method is used to combine the veggies and fruits arrays into a new array called
veggiesAndFruits. The original arrays remain unchanged.

### Flattening an Array with `concat()`
The concat() method can also be used to flatten an array of arrays into a single array.

```js
const biDimensionalArr = [11, [22, 33], [44, 55], [66, 77], 88, 99];
const flattenArr = [].concat(...biDimensionalArr); // [11, 22, 33, 44, 55, 66, 77, 88, 99]
console.log(flattenArr);
```

```js
function flattenMultiArray(arr) {
  const flattened = [].concat(...arr);
  return flattened.some((item) => Array.isArray(item))
    ? flattenMultiArray(flattened)
    : flattened;
}
const multiDimensionalArr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
const flatArr = flattenMultiArray(multiDimensionalArr); // [11, 22, 33, 44, 55, 66, 77, 88, 99]
```

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

#### Assigning to an Empty Array

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

#### Setting the Length to 0

```javascript
arrayList.length = 0;
```

This code clears the existing array by setting its length to 0. This method also updates all reference variables that
point to the original array.

```javascript
var arrayList = ['a', 'b', 'c', 'd', 'e', 'f'];
var anotherArrayList = arrayList;
arrayList.length = 0;
console.log(anotherArrayList); // Output: []
```

#### Using `splice()`

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

#### Using a `while` Loop

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

##  Types of Loops
### Entry Controlled Loops
* For Loop
* While Loop
* For-In Loop
* For-Of Loop

#### Exit Controlled Loops
* do-while Loop

### Dense and sparse arrays
* An array contains items at each index starting from first(0) to last(array.length - 1) is called as Dense array.
* If at least one item is missing at any index, the array is called as sparse.
```js
const avengers = ["Ironman", "Hulk", "CaptainAmerica"];
console.log(avengers[0]); // 'Ironman'
console.log(avengers[1]); // 'Hulk'
console.log(avengers[2]); // 'CaptainAmerica'
console.log(avengers.length); // 3

const justiceLeague = ["Superman", "Aquaman", , "Batman"];
console.log(justiceLeague[0]); // 'Superman'
console.log(justiceLeague[1]); // 'Aquaman'
console.log(justiceLeague[2]); // undefined
console.log(justiceLeague[3]); // 'Batman'
console.log(justiceLeague.length); // 4
```

#### Different ways to create sparse arrays
##### Array Literal
Omit a value when using the array literal
```js
const justiceLeague = ["Superman", "Aquaman", , "Batman"];
console.log(justiceLeague); // ['Superman', 'Aquaman', empty ,'Batman']
```

##### Array() constructor
Invoking Array(length) or new Array(length) creates an array with the given length, but no values.
```js
const array = Array(3);
console.log(array); // [empty, empty ,empty]
```

##### Delete operator
Using delete array[index] operator on the array creates a sparse array.
```js
const justiceLeague = ["Superman", "Aquaman", "Batman"];
delete justiceLeague[1];
console.log(justiceLeague); // ['Superman', empty, ,'Batman']
```

##### Increase length property
Increasing length property of an array creates a sparse array.
```js
const justiceLeague = ["Superman", "Aquaman", "Batman"];
justiceLeague.length = 5;
console.log(justiceLeague); // ['Superman', 'Aquaman', 'Batman', empty, empty]
```

### Sources
- [JavaScript Interview: Can You Stop or Break a forEach Loop?](https://javascript.plainenglish.io/javascript-interview-can-you-stop-or-break-a-foreach-loop-9608ba2a1710)
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)