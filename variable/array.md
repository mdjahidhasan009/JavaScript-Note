# Array
An array is a special variable that can hold more than one value at a time. It is a data structure that stores a
collection of elements, each identified by an index or key.


## How to Check if the Value of a Variable is an Array in JavaScript
In JavaScript, it's often necessary to determine whether a variable is an array. Below are several methods to detect an array.

#### Method 1: Using `Object.prototype.toString.call`

Juriy Zaytsev (also known as kangax) proposed this elegant solution:

```javascript
function isArray(value){
  return Object.prototype.toString.call(value) === '[object Array]';
}
```

This approach is popular and recommended because the native `toString()` method on a given value produces a standard string in all browsers.

#### Method 2: Duck Typing

Duck typing tests for array type detection:

```javascript
// Duck typing arrays
function isArray(value){
  return typeof value.sort === 'function';
}
```

However, this method is not reliable because it returns `true` for any object with a `sort` method, not just arrays.

#### Method 3: Using `Array.isArray`

ECMAScript 5 introduced `Array.isArray()` specifically to detect arrays:

```javascript
function isArray(value){
  // ECMAScript 5 feature
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
}
```

#### Method 4: Querying the Constructor Name

You can check the constructor name of the value:

```javascript
function isArray(value) {
  return value.constructor.name === "Array";
}
```

#### Method 5: Using `instanceof`

You can check if a given value is an instance of `Array`:

```javascript
function isArray(value) {
  return value instanceof Array;
}
```

### Example Usage

```javascript
var arr = [1, 2, 3];
console.log(isArray(arr)); // true

var notArr = { foo: "bar" };
console.log(isArray(notArr)); // false
```

### Summary

- Method 1: `Object.prototype.toString.call(value) === '[object Array]'` - reliable and widely used.
- Method 2: Duck typing - not recommended due to potential false positives.
- Method 3: `Array.isArray()` - best and simplest method.
- Method 4: Checking the constructor name.
- Method 5: Using `instanceof`.

Each method has its use cases, but `Array.isArray()` is the most straightforward and reliable way to check if a variable is an array.


## Associative Array
In JavaScript, an associative array is the same as an object. Even though there is no built-in function or property to
calculate the length/size of an object, we can write such a function ourselves.

Consider the following object:

```javascript
var counterArray = {
  A: 3,
  B: 4
};
counterArray["C"] = 1;
```
#### Method 1: Using `Object.keys`

The `Object.keys` method returns an array of a given object's own enumerable property names, and we can use it to calculate the length of the object.

```javascript
console.log(Object.keys(counterArray).length); // Output: 3
```

#### Method 2: Iterating Through the Object

We can also calculate the length of an object by iterating through it and counting its own properties. This way, we will ignore the properties that come from the object's prototype chain.

```javascript
function getLength(object) {
  var count = 0;
  for (var key in object) {
    // hasOwnProperty method checks for own property of object
    if (object.hasOwnProperty(key)) count++;
  }
  return count;
}
console.log(getLength(counterArray)); // Output: 3
```

#### Method 3: Using `Object.getOwnPropertyNames`

All modern browsers (including IE9+) support the `getOwnPropertyNames` method, so we can calculate the length using the following code:

```javascript
console.log(Object.getOwnPropertyNames(counterArray).length); // Output: 3
```

#### Method 4: Using Underscore or Lodash Libraries

The Underscore and Lodash libraries have a method `size` dedicated to calculating the object length. We don't recommend including one of these libraries just to use the `size` method, but if it's already used in your project, why not?

```javascript
console.log(_.size({one: 1, two: 2, three: 3})); // Output: 3
```

#### Summary:
- In the given code, `emp1` inherits the `company` property from the `Employee` object.
- The `delete` operator does not delete inherited properties, only own properties.
- Therefore, `emp1.company` still refers to the `company` property on the `Employee` object, which has the value `xyz`.

## Testing Strings as Literals and Objects in JavaScript

### Problem
In JavaScript, you can create strings using string literals and the `String` constructor function.

- **String Literal:**
  ```javascript
  var ltrlStr = "Hi I am string literal";
  ```

- **String Object:**
  ```javascript
  var objStr = new String("Hi I am string object");
  ```

### Solution
To test if a variable is a string, whether it's a string literal or a string object, you can use both the `typeof` operator and the `instanceof` operator.

### Explanation
- **String Literal:**
  ```javascript
  var ltrlStr = "Hi I am string literal";
  console.log(typeof ltrlStr); // "string"
  console.log(ltrlStr instanceof String); // false
  ```

- **String Object:**
  ```javascript
  var objStr = new String("Hi I am string object");
  console.log(typeof objStr); // "object"
  console.log(objStr instanceof String); // true
  ```

As shown above, `typeof` is sufficient for string literals but not for string objects. Conversely, `instanceof` works for string objects but not for string literals.

### Combined Check
By combining `typeof` and `instanceof`, you can accurately determine if a variable is a string in both cases:

```javascript
function isString(str) {
  return typeof(str) == 'string' || str instanceof String;
}

var ltrlStr = "Hi I am string literal";
var objStr = new String("Hi I am string object");
console.log(isString(ltrlStr)); // true
console.log(isString(objStr)); // true
```

### Explanation
- `typeof(str) == 'string'` checks for string literals.
- `str instanceof String` checks for string objects.

Both conditions together ensure that the function returns `true` for both string literals and string objects.

```js
(function() {
    var array1 = [];
    console.log(array1); // []
    console.log(array1.length); // 0
  
	var array2 = new Array('100');
	console.log(array2); // ['100']
	console.log(array2.length); // 1
  
    var array3 = new Array(100);
    console.log(array3); // [empty x 100]
    console.log(array3.length); // 100

    var array4 = new Array(['1',2,'3',4,5.6]);
    console.log(array4); // [['1',2,'3',4,5.6]]
    console.log(array4.length); // 1

    var array5 = new Array('a', 'b', 'c', 'd', 'e');
    console.log(array5); // ['a', 'b', 'c', 'd', 'e']
    array5[10] = 'f';
    console.log(array5); // ['a', 'b', 'c', 'd', 'e', empty x 5, 'f']
    delete array5[10];
    console.log(array5); // ['a', 'b', 'c', 'd', 'e', empty x 6]
    console.log(array5.length); // 11
}());
```

```js
(function(){
	var animal1 = ['cow','horse'];
    animal1.push('cat');
    animal1.push('dog','rat','goat');
    console.log(animal1); // ['cow', 'horse', 'cat', 'dog', 'rat', 'goat']
    console.log(animal1.length); // 6

    var animal = ['cow','horse'];
    animal.push('cat');
    animal.unshift('dog','rat','goat');
    console.log(animal); // ['dog', 'rat', 'goat', 'cow', 'horse', 'cat']
})();
```

### `filter`
- The `filter` method creates a new array with all elements that pass the test implemented by the provided function.
- The `filter` method does not change the original array.
- The `filter` method calls the provided function once for each element in the array.
- The provided function should return `true` to keep the element, or `false` to remove it.
- The `filter` method does not execute the function for array elements without values.

```js
(function(){
  var numbers = [2,3,4,8,9,11,13,12,16];
  var even = numbers.filter(function(element, index){
    return element % 2 === 0;
  });
  console.log(even); // [2, 4, 8, 12, 16]
})();
```

```js
  var containers = [2, 0, false, "", '12', true];
  containers = containers.filter(Boolean);
  console.log(containers); // [2, '12', true]
  containers = containers.filter(Number);
  console.log(containers); // [2, '12', true]
  containers = containers.filter(String);
  console.log(containers); // [2, '12', true]
  containers = containers.filter(Object);
  console.log(containers); // [2, '12', true]
```
Explanation:
```js
(function(){
  var containers = [2, 0, false, "", '12', true];

  // Filter out falsy values
  containers = containers.filter(Boolean);
  console.log(containers); // [2, '12', true]
})();
```
1. **Initial Array: `[2, 0, false, "", '12', true]`**
   * `2` is truthy (remains in the array)
   * `0` is falsy (filtered out)
   * `false` is falsy (filtered out)
   * `""` (empty string) is falsy (filtered out)
   * `'12'` (non-empty string) is truthy (remains in the array)
   * `true` is truthy (remains in the array)
   
   Resulting Array: `[2, '12', true]`
2. **Filtering by `Number`**
   ```js
   // Now the array is [2, '12', true]
   containers = containers.filter(Number); // Filter out non-numeric values
   console.log(containers); // [2, '12', true]
   ```
   The `Number` function is used as the filter function. It converts each element to a number.
   * `Number(2)` returns `2`, which is truthy (kept)
   * `Number('12')` returns `12`, which is truthy (kept)
   * `Number(true)` returns `1`, which is truthy (kept)
   * Result: `[2, '12', true]`
3. **Filtering by `String`**
   ```js
    // Now the array is [2, '12', true]
    containers = containers.filter(String); // Filter out non-string values
    console.log(containers); // [2, '12', true]
    ```
    The `String` function is used as the filter function. It converts each element to a string.
    * `String(2)` returns `'2'`, which is truthy (kept)
    * `String('12')` returns `'12'`, which is truthy (kept)
    * `String(true)` returns `'true'`, which is truthy (kept)
    * Result: `[2, '12', true]`
4. **Filtering by `Object`**
    ```js
     // Now the array is [2, '12', true]
     containers = containers.filter(Object); // Filter out non-object values
     console.log(containers); // [2, '12', true]
     ```
     The `Object` function is used as the filter function. It converts each element to an object.
     * `Object(2)` returns `Number {2}`, which is truthy (kept)
     * `Object('12')` returns `String {'12'}`, which is truthy (kept)
     * `Object(true)` returns `Boolean {true}`, which is truthy (kept)
     * Result: `[2, '12', true]`

### `map`
- The `map` method creates a new array with the results of calling a provided function on every element in the array.
- The `map` method does not change the original array.
- The `map` method calls the provided function once for each element in the array.
- The provided function should return the value that will be added to the new array.
- The `map` method does not execute the function for array elements without values.

### `reduce`
- The `reduce` method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
- The `reduce` method does not change the original array.
- The `reduce` method takes two arguments: the reducer function and an initial value for the accumulator.
- The reducer function takes four arguments: the accumulator, the current element, the current index, and the array.
- The reducer function returns the new value of the accumulator.
- The `reduce` method does not execute the function for array elements without values.

### `forEach`
- The `forEach` method executes a provided function once for each array element.
- The `forEach` method does not change the original array.
- The `forEach` method does not return a value.
- The `forEach` method does not execute the function for array elements without values.


### `every`
- The `every` method tests whether all elements in the array pass the test implemented by the provided function.
- The `every` method returns `true` if the callback function returns a truthy value for every array element; otherwise, it returns `false`.
- The `every` method does not change the original array.
- The `every` method stops the iteration once a falsy value is returned.
- The `every` method does not execute the function for array elements without values.

### `find`
- The `find` method returns the value of the first element in the array that satisfies the provided testing function.
- The `find` method returns `undefined` if no elements pass the test.
- The `find` method does not change the original array.
- The `find` method stops the iteration once a truthy value is returned.
- The `find` method does not execute the function for array elements without values.
- The `find` method returns the first element that satisfies the condition.
- The `find` method is useful when you need to find a single element in an array based on a condition.

### `findIndex`
- The `findIndex` method returns the index of the first element in the array that satisfies the provided testing function.
- The `findIndex` method returns `-1` if no elements pass the test.
- The `findIndex` method does not change the original array.
- The `findIndex` method stops the iteration once a truthy value is returned.
- The `findIndex` method does not execute the function for array elements without values.
- The `findIndex` method returns the index of the first element that satisfies the condition.
- The `findIndex` method is useful when you need to find the index of a single element in an array based on a condition.
- The `findIndex` method is similar to the `find` method, but it returns the index instead of the value.

### `includes`
- The `includes` method determines whether an array includes a certain element, returning `true` or `false` as appropriate.
- The `includes` method returns `true` if the array contains the specified element; otherwise, it returns `false`.
- The `includes` method does not change the original array.
- The `includes` method uses strict equality (`===`) to determine if an element is included.
- The `includes` method returns `true` for `NaN` values, even though `NaN !== NaN`.
- The `includes` method does not work for comparing objects or arrays because they are compared by reference, not by value.
- The `includes` method can take an optional second argument that specifies the index at which to start the search.
  like `array.includes(searchElement, fromIndex)`.
- If the `fromIndex` is greater than or equal to the array's length, the method returns `false`.
- If the `fromIndex` is negative, the method starts the search from the end of the array.
- If the `fromIndex` is negative and its absolute value is greater than or equal to the array's length, the method starts
  the search from index `0`.
- If the `fromIndex` is omitted, the method starts the search from index `0`.

### `join`

## `slice`
- The `slice` method returns a **shallow copy** of a portion of the original array into **a new array object** selected 
   from`begin` to `end` (`end` not included).
- The `slice` method does not change the original array.
- If the `begin` index is omitted, the `slice` method starts from index `0`.
- If the `end` index is omitted, the `slice` method extracts through the end of the array.
- The `slice` method can take negative indices, which specify an offset from the end of the array.
- The `slice` method is a **non-mutating method**, meaning it does not change the original array.

```js
(function(){
	var list = ['foo','bar','john','ritz'];
    console.log(list.slice(1));	// ['bar','john','ritz']
    console.log(list.slice(1,3)); // ['bar','john']
    console.log(list.slice()); // ['foo','bar','john','ritz']
    console.log(list.slice(2,2)); // []
    console.log(list); // ['foo','bar','john','ritz']		
    console.log(list.slice(-2)); // ['john','ritz']
    console.log(list.slice(-2, -1)); // ['john']
    console.log(list.slice(-2, -2)); // []
    console.log(list.slice(-3)); // ['bar','john','ritz']
   
})();
```

### `splice`
`array.splice(index, count, item1, ....., itemX)`

| Parameter   | Description |
|-------------| ------- |
| `index`     | Required. The index (position) to add or remove items. A negative value counts from the end of the array. |
| `count`     | Optional. Number of items to be removed. |
| `item1,...` | Optional. The new element(s) to be added. |

- The `splice` method changes the contents of the original array by removing or adding new elements.
- It changes the original array(mutating method).
- The `splice` method takes three arguments: 
  - the `start` index, 
  - the number of elements to remove, 
  - and the elements to add.
- The `splice` method returns an array containing the removed elements.
- If the `start` index is negative, it specifies an offset from the end of the array.
- If the number of elements to remove is `0`, no elements are removed.
- If the number of elements to remove is omitted, all elements from the `start` index to the end of the array are removed.
- If no elements are specified to add, only elements are removed.
- The `splice` method can be used to add, remove and replace elements in an array.
- The `splice` method is a mutating method, meaning it changes the original array.
- The `splice` method is useful for modifying the contents of an array in place.
- The `splice` method is commonly used to remove elements from an array.
- The `splice` method is commonly used to add elements to an array.

```js
(function(){
    var list = ['foo','bar','john'];
    console.log(list.splice(1)); // ['bar','john']		
    console.log(list.splice(1,2)); // []
    console.log(list); // ['foo']

    let arrayIntegersOriginal1 = [1, 2, 3, 4, 5];
    let arrayIntegersOriginal2 = [1, 2, 3, 4, 5];
    let arrayIntegersOriginal3 = [1, 2, 3, 4, 5];
    
    let arrayIntegers1 = arrayIntegersOriginal1.splice(0, 2); // returns [1, 2]; original array: [3, 4, 5]
    let arrayIntegers2 = arrayIntegersOriginal2.splice(3); // returns [4, 5]; original array: [1, 2, 3]
    let arrayIntegers3 = arrayIntegersOriginal3.splice(3, 1, "a", "b", "c"); //returns [4]; original array: [1, 2, 3, "a", "b", "c", 5]
})(); 
```

### `sort`
- The `sort` method sorts the elements of an array in place and returns the sorted array.
- The `sort` method changes the original array.
- By default, the `sort` method sorts the elements as strings in alphabetical and ascending order.
- The `sort` method converts elements to strings and compares their sequences of UTF-16 code units values.
- The `sort` method can take an optional compare function to define the sort order.
- The compare function should return a negative value if the first argument should come before the second, a positive value if the first argument should come after the second, or `0` if they are equal.
- The `sort` method can be used to sort an array of numbers, strings, or objects.
- The `sort` method is a mutating method, meaning it changes the original array.
- The `sort` method is useful for sorting the elements of an array in place.
- The `sort` method is commonly used to sort arrays of strings or numbers.
- The `sort` method is commonly used to sort arrays of objects based on a specific property.

```js
(function(){
    var numbers = [2,3,4,8,9,11,13,12,16];
    numbers.sort();
    console.log(numbers); // [11, 12, 13, 16, 2, 3, 4, 8, 9]
    numbers.sort(function(a,b){
      return a - b;
    });
    console.log(numbers); // [2, 3, 4, 8, 9, 11, 12, 13, 16]
})();
```

### Explanation of Array Sorting in JavaScript

The provided JavaScript code snippet sorts an array of numbers and then prints the sorted array:

```javascript
(function(){
    var arrayNumb = [2, 8, 15, 16, 23, 42];
    arrayNumb.sort();
    console.log(arrayNumb);
})();
```

#### Output:
```
[15, 16, 2, 23, 42, 8]
```

#### Explanation:
The `sort()` method in JavaScript, by default, sorts elements as strings. Therefore, when sorting numbers, the `sort()` method converts the numbers to strings and compares their UTF-16 code unit values.

Here's how the default sorting works in this case:
1. **Convert numbers to strings**: `["2", "8", "15", "16", "23", "42"]`
2. **Compare strings lexicographically**:
  - "15" comes before "16"
  - "16" comes before "2"
  - "2" comes before "23"
  - "23" comes before "42"
  - "42" comes before "8"
3. **Resulting sorted array**: `["15", "16", "2", "23", "42", "8"]`

To sort numbers correctly, you need to pass a comparison function to the `sort()` method:

```javascript
(function(){
    var arrayNumb = [2, 8, 15, 16, 23, 42];
    arrayNumb.sort(function(a, b) {
        return a - b;
    });
    console.log(arrayNumb);
})();
```

Using a comparison function ensures that the numbers are compared numerically:

1. **Compare numbers numerically**:
  - 2 comes before 8
  - 8 comes before 15
  - 15 comes before 16
  - 16 comes before 23
  - 23 comes before 42
2. **Resulting sorted array**: `[2, 8, 15, 16, 23, 42]`

### `some`
- The `some` method tests whether at least one element in the array passes the test implemented by the provided function.
- The `some` method returns `true` if the callback function returns a truthy value for any array element; otherwise, it returns `false`.
- The `some` method does not change the original array.
- The `some` method stops the iteration once a truthy value is returned.
- The `some` method does not execute the function for array elements without values.

```js
(function(){
  var numbers = [2,3,4,8,9,11,13,12,16];

  var containsDivisibleby3 = numbers.some(function(element, index){
    return element % 3 === 0;
  });

  console.log(containsDivisibleby3); // true
})();
```

### `indexOf`
- The `indexOf` method returns the first index at which a given element can be found in the array.
- If the element is not found, it returns `-1`.
- The `indexOf` method compares search elements using strict equality (`===`).
- It does not work for comparing objects or arrays because they are compared by reference, not by value.
- The `indexOf` method can take an optional second argument that specifies the index at which to start the search.
  like `array.indexOf(searchElement, fromIndex)`.
- If the `fromIndex` is greater than or equal to the array's length, the method returns `-1`.
- If the `fromIndex` is negative, the method starts the search from the end of the array.
- If the `fromIndex` is negative and its absolute value is greater than or equal to the array's length, the method starts
  the search from index `0`.
- If the `fromIndex` is omitted, the method starts the search from index `0`.

```js
var array = [1,2,3,4,5];
	console.log(array.indexOf(2)); // 1
	console.log([{name: 'John'},{name : 'John'}].indexOf({name:'John'})); // -1
	console.log([[1],[2],[3],[4]].indexOf([3])); // -1
	console.log("abcdefgh".indexOf('e')); // 4
```
Explanation:
- In the first example, `2` is found at index `1`.
- In the second example, the object `{name: 'John'}` is not found because **objects are compared by reference**, not by value.
- In the third example, the array `[3]` is not found because **arrays are compared by reference**, not by value.
- In the fourth example, the character `'e'` is found at index `4`.

```js
(function(){
	var array = [1,2,3,4,5,1,2,3,4,5,6];
	console.log(array.indexOf(2)); // 1
	console.log(array.indexOf(2,3)); // 6
	console.log(array.indexOf(2,10)); // -1
})();
```
Explanation:
- The first example returns the index of the first occurrence of `2`, which is `1`.
- The second example starts searching from index `3` and returns the index of the next occurrence of `2`, which is `6`.
- The third example starts searching from index `10` and does not find `2`, so it returns `-1`.

### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)