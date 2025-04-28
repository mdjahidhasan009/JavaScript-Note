# Array
An array is a special variable that can hold more than one value at a time. It is a data structure that stores a
collection of elements, each identified by an index or key.

## How to Check if the Value of a Variable is an Array in JavaScript
In JavaScript, it's often necessary to determine whether a variable is an array. Below are several methods to detect an
array.

#### Method 1: Using `Object.prototype.toString.call`

Juriy Zaytsev (also known as kangax) proposed this elegant solution:

```javascript
function isArray(value){
  return Object.prototype.toString.call(value) === '[object Array]';
}
```

This approach is popular and recommended because the native `toString()` method on a given value produces a standard
string in all browsers.

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

Each method has its use cases, but `Array.isArray()` is the most straightforward and reliable way to check if a variable
is an array.

## How to Empty an Array in JavaScript
There are several ways to empty an array in JavaScript. Below are some common methods to clear an array.

### Setting the Length Property to 0
You can set the `length` property of an array to `0`:

```javascript
var arr = [1, 2, 3, 4, 5];
arr.length = 0;
console.log(arr); // []
```

This method is the fastest way to clear an array because it directly changes the `length` property.

### Using the `splice` Method
You can use the `splice` method to remove all elements from an array:

```javascript
var arr = [1, 2, 3, 4, 5];
arr.splice(0, arr.length);
console.log(arr); // []
```

The `splice` method removes elements from an array and returns the removed elements. By specifying `0` as the starting 
index and `arr.length` as the number of elements to remove, you effectively clear the array.

### Using the `pop` Method
You can use the `pop` method to remove elements from the end of an array:

```javascript
var arr = [1, 2, 3, 4, 5];
while (arr.length) {
  arr.pop();
}
console.log(arr); // []
```

This method is less efficient than the previous two methods because it removes elements one by one from the end of the 
array.

### Using the `shift` Method
You can use the `shift` method to remove elements from the beginning of an array:

```javascript
var arr = [1, 2, 3, 4, 5];
while (arr.length) {
  arr.shift();
}
console.log(arr); // []
```

This method is less efficient than the first two methods because it removes elements one by one from the beginning of
the array.




# Associative Array
> In JavaScript, an associative array is a data structure that allows **you to store key-value pairs, where the keys 
> are strings (or symbols) and the values can be of any data type**.

While JavaScript does not have a dedicated "associative array" type like some other programming languages (e.g., PHP), 
you can achieve the same functionality using **objects** or **Maps** .

Even though there is no built-in function or property to calculate the length/size of an object, we can write such a
function ourselves.

Consider the following object:

**Creating an associative array using an object**
```js
let person = {};

// Adding key-value pairs
person["name"] = "John Doe";
person["age"] = 30;
person["isEmployed"] = true;

// Accessing values
console.log(person["name"]); // Output: John Doe
console.log(person.age);     // Output: 30

// Iterating over keys and values
for (let key in person) {
    if (person.hasOwnProperty(key)) { // Ensures we only iterate over own properties
        console.log(`${key}: ${person[key]}`);
    }
}

// output
//name: John Doe
//15 age: 30
//isEmployed: true
```

**Creating an associative array using a Map**
```js
let person = new Map();

// Adding key-value pairs
person.set("name", "Jane Doe");
person.set("age", 25);
person.set(true, "Is Employed"); // Key can be a boolean

// Accessing values
console.log(person.get("name")); // Output: Jane Doe
console.log(person.get("age"));  // Output: 25
console.log(person.get(true));   // Output: Is Employed

// Checking size
console.log(person.size); // Output: 3

// Iterating over keys and values
for (let [key, value] of person) {
  console.log(`${key}: ${value}`);
}

// output
//name: Jane Doe
//age: 25
//true: Is Employed
```


#### Method 1: Using `Object.keys`

The `Object.keys` method returns an array of a given object's own enumerable property names, and we can use it to 
calculate the length of the object.

```javascript
console.log(Object.keys(counterArray).length); // Output: 3
```

#### Method 2: Iterating Through the Object

We can also calculate the length of an object by iterating through it and counting its own properties. This way, we will
ignore the properties that come from the object's prototype chain.

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

All modern browsers (including IE9+) support the `getOwnPropertyNames` method, so we can calculate the length using the 
following code:

```javascript
console.log(Object.getOwnPropertyNames(counterArray).length); // Output: 3
```

#### Method 4: Using Underscore or Lodash Libraries

The Underscore and Lodash libraries have a method `size` dedicated to calculating the object length. We don't recommend 
including one of these libraries just to use the `size` method, but if it's already used in your project, why not?

```javascript
console.log(_.size({one: 1, two: 2, three: 3})); // Output: 3
```

#### Summary:
- In the given code, `emp1` inherits the `company` property from the `Employee` object.
- The `delete` operator does not delete inherited properties, only own properties.
- Therefore, `emp1.company` still refers to the `company` property on the `Employee` object, which has the value `xyz`.





# Testing Strings as Literals and Objects in JavaScript

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
To test if a variable is a string, whether it's a string literal or a string object, you can use both the `typeof`
operator and the `instanceof` operator.

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

As shown above, `typeof` is sufficient for string literals but not for string objects. Conversely, `instanceof` works
for string objects but not for string literals.

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
- The `filter` method **creates a new array** with all elements that pass the test implemented by the provided function.
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

#### Filtering Falsy Values from an Array

```js
  var containers = [2, 0, false, "", '12', true];
  containers = containers.filter(Boolean); // is same as myArray.filter(x => x);
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
- The `map` method **creates a new array** with the results of calling a provided function on every element in the array.
- The `map` method does not change the original array.
- The `map` method calls the provided function once for each element in the array.
- The provided function should return the value that will be added to the new array.
- The `map` method does not execute the function for array elements without values.

### `reduce`
- The `reduce` method applies a function against an accumulator and each element in the array (from left to right) to 
  reduce it to a single value.
- The `reduce` method **does not change the original array**.
- The `reduce` method takes two arguments: the reducer function and an initial value for the accumulator.
- The reducer function takes four arguments: the accumulator, the current element, the current index, and the array.
- The reducer function returns the new value of the accumulator.
- The `reduce` method does not execute the function for array elements without values.

```js
(function(){
    var numbers = [1, 2, 3, 4, 5];
    var sum1 = numbers.reduce((accumutor, currentValue) => {
        return accumutor + currentValue;
    }, 0);
    console.log(sum1); // 15
    
    
    var sum2 = numbers.reduce(function(accumulator, currentValue){
        return accumulator + currentValue;
    }, 0);
    console.log(sum2); // 15
})();
```

### `forEach`
- The `forEach` method executes a provided function once for each array element.
- The `forEach` **method does not change the original array**.
- The `forEach` **method does not return a value**.
- The `forEach` method does not execute the function for array elements without values.


### `every`
- The `every` method tests whether all elements in the array pass the test implemented by the provided function.
- The `every` method returns `true` if the callback function returns a truthy value for every array element; otherwise,
  it returns `false`.
- The `every` method does not change the original array.
- The `every` method stops the iteration once a falsy value is returned.
- The `every` method does not execute the function for array elements without values.

### `find`
- The `find` method returns the value of the **first element in the array that satisfies the provided testing function**.
- The `find` method returns `undefined` if no elements pass the test.
- The `find` method does not change the original array.
- The `find` method stops the iteration once a truthy value is returned.
- The `find` method does not execute the function for array elements without values.
- The `find` method returns the first element that satisfies the condition.
- The `find` method is useful when you need to find a single element in an array based on a condition.

### `findIndex`
- The `findIndex` method returns the index of the **first element in the array that satisfies the provided testing 
  function.**
- The `findIndex` method returns `-1` if no elements pass the test.
- The `findIndex` method does not change the original array.
- The `findIndex` method stops the iteration once a truthy value is returned.
- The `findIndex` method does not execute the function for array elements without values.
- The `findIndex` method returns the index of the first element that satisfies the condition.
- The `findIndex` method is useful when you need to find the index of a single element in an array based on a condition.
- The `findIndex` method is similar to the `find` method, but it returns the index instead of the value.

### `includes`
- The `includes` method determines whether an array includes a certain element, returning `true` or `false` as 
  appropriate.
- The `includes` method returns `true` if the array contains the specified element; otherwise, it returns `false`.
- The `includes` method does not change the original array.
- The `includes` method **uses strict equality (`===`)** to determine if an element is included.
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
- It return from index equal to `begin` to `end-1` as `end` is not included.
- If the `begin` index is omitted, the `slice` method starts from index `0`.
- If negative `begin` index is provided, it starts from the end of the array to `begin` amount of elements.
- If the `end` index is omitted, the `slice` method extracts through the end of the array.
- The `slice` method can take negative indices, which specify an offset from the end of the array.
- The `slice` method is a **non-mutating method**, meaning it does not change the original array.

```js
(function(){
	var list = ['foo','bar','john','ritz'];
    console.log(list.slice(1));	// ['bar','john','ritz'] // as it starts from index 1 and end index not provided
    console.log(list.slice(1,3)); // ['bar','john'] // start from index 1 and end at index 3, riz is not included because end index is not included
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

| Parameter   | Description                                                                                               |
|-------------|-----------------------------------------------------------------------------------------------------------|
| `index`     | Required. The index (position) to add or remove items. A negative value counts from the end of the array. |
| `count`     | Optional. Number of items to be removed.                                                                  |
| `item1,...` | Optional. The new element(s) to be added.                                                                 |

- The `splice` method changes the contents of the original array by removing or adding new elements.
- It **changes the original array(mutating method)**.
- The `splice` method takes three arguments: 
  - the `start` index, 
  - the number of elements to remove, 
  - and the elements to add.
- The `splice` method returns an array containing the removed elements.
- If the `start` index is negative, it specifies an offset from the end of the array.
- If the number of elements to remove is `0`, no elements are removed.
- If the number of elements to remove is omitted, all elements from the `start` index to the end of the array are 
  removed.
- If no elements are specified to add, only elements are removed.
- The `splice` method can be used to add, remove and replace elements in an array.
- The `splice` method is a mutating method, meaning it changes the original array.
- The `splice` method is useful for modifying the contents of an array in place.
- The `splice` method is commonly used to remove elements from an array.
- The `splice` method is commonly used to add elements to an array.

```js
(function(){
    var list = ['foo','bar','john'];
    console.log(list.splice(1)); // ['bar','john'] // as the count is not given so it removes from start to end of the array		
    console.log(list); // ['foo']
    
    console.log(list.splice(1,2)); // [] // It does not have index 1
    console.log(list); // ['foo']

    let arrayIntegersOriginal1 = [1, 2, 3, 4, 5];
    let arrayIntegersOriginal2 = [1, 2, 3, 4, 5];
    let arrayIntegersOriginal3 = [1, 2, 3, 4, 5];
    
    let arrayIntegers1 = arrayIntegersOriginal1.splice(0, 2); // returns [1, 2]; original array: [3, 4, 5]
    let arrayIntegers2 = arrayIntegersOriginal2.splice(3); // returns [4, 5]; original array: [1, 2, 3]
    let arrayIntegers3 = arrayIntegersOriginal3.splice(3, 1, "a", "b", "c"); //returns [4]; original array: [1, 2, 3, "a", "b", "c", 5]
})(); 
```

## `Array.from()`
- The `Array.from()` method creates a new, shallow-copied array instance from an array-like or iterable object.
- The `Array.from()` method does not change the original array.
- The `Array.from()` method can convert an array-like object or iterable object into an array.
- The `Array.from()` method can take an optional map function to modify the elements during the conversion.
- The `Array.from()` method is useful for converting array-like objects (e.g., `arguments`) or iterable objects (e.g., 
  `Set`, `Map`) into arrays.

### Map array without `map` method
#### Using `Array.from()`
```js
(function () {
    const countries = [
        { name: "India", capital: "Delhi" },
        { name: "US", capital: "Washington" },
        { name: "Russia", capital: "Moscow" },
        { name: "Singapore", capital: "Singapore" },
        { name: "China", capital: "Beijing" },
        { name: "France", capital: "Paris" },
    ];

    const cityNames = Array.from(countries, ({ capital }) => capital);
    console.log(cityNames); // ['Delhi, 'Washington', 'Moscow', 'Singapore', 'Beijing', 'Paris']
})()
```

## `array.sort()`

- The `sort` method sorts the elements of an array in place and returns the sorted array.
- The `sort` method changes the original array **(mutating method)**.
- By default, the `sort` method's sort order is ascending, based on the string Unicode order.
- The `sort` method converts elements to strings and compares their sequences of UTF-16 code units values.
- The `sort` method can take an optional compare function to define the sort order.
- The compare function should return a **negative value if the first argument should come before the second**, **a 
  positive value if the first argument should come after the second**, or **`0` if they are equal**.
- The `sort` method can be used to sort an array of numbers, strings, or objects.
- The `sort` method is useful for sorting the elements of an array in place.
- The `sort` method is commonly used to sort arrays of strings or numbers, arrays of objects based on a specific
  property value, or custom sorting criteria.

```js
array.sort([compareFunction])
```
### `compareFunction` (optional)
A function that defines the sort order. 
* It takes two arguments, often referred to as a and b, which represent two elements from the array being compared.
* If omitted, the array elements are converted to strings and sorted according to each character's Unicode code point
  value.

**The `compareFunction` needs to return:**
* A **negative value** if `a` should come before `b`.
* **Zero** if `a` and `b` are considered equal.
* A **positive value** if `a` should come after `b`.

#### Sorting Numbers in Ascending Order
```js   
(function(){
    var numbers = [2,3,4,8,9,11,13,12,16];
    numbers.sort(function(a,b){
      return a - b;
    });
    console.log(numbers); // [2, 3, 4, 8, 9, 11, 12, 13, 16]
})();
```
In this example:
* If `a` is less than `b`, the result of `a - b` will be negative, placing `a` before `b`. => [a, b]
* If `a` is greater than `b`, the result will be positive, placing `a` after `b`. => [b, a]

#### Sorting Numbers in Descending Order
```js
(function(){
    var numbers = [2,3,4,8,9,11,13,12,16];
    numbers.sort(function(a,b){
      return b - a;
    });
    console.log(numbers); // [16, 13, 12, 11, 9, 8, 4, 3, 2]
})();
```
In this example:
* If `b` is less than `a`, the result of `b - a` will be negative, placing `b` before `a`.
* If `b` is greater than `a`, the result will be positive, placing `b` after `a`.

#### Sorting Strings Alphabetically
```js
(function(){
    var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
    fruits.sort();
    console.log(fruits); // ['Apple', 'Banana', 'Mango', 'Orange']
})();
```

OR

```js
(function(){
    var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
    fruits.sort(function(a, b){
      return a.localeCompare(b);
    });
    console.log(fruits); // ['Apple', 'Banana', 'Mango', 'Orange']
})();
```
In this example:
* The `localeCompare` method compares two strings in the current locale and returns a number indicating their sort order.
  * If `a` should come before `b`, the result will be negative.
  * If `a` should come after `b`, the result will be positive.

#### Sorting Objects by a Property Value
```js
(function(){
    var people = [
      {name: 'John', age: 30},
      {name: 'Jane', age: 25},
      {name: 'Jim', age: 40}
    ];
    people.sort(function(a, b){
      return a.age - b.age;
    });
    console.log(people);
    // [
    //   {name: 'Jane', age: 25},
    //   {name: 'John', age: 30},
    //   {name: 'Jim', age: 40}
    // ]
})();
```
In this example:
* The `sort` method is used with a compare function that sorts the array of objects based on the `age` property.
* The compare function subtracts the `age` of object `a` from the `age` of object `b`, resulting in a numerical
  comparison.
* The array of objects is sorted in ascending order based on the `age` property.

####  Sorting by Multiple Criteria
```js
(() => {
    let items = [
        { name: "banana", price: 50 },
        { name: "apple", price: 50 },
        { name: "cherry", price: 20 }
    ];

    items.sort((a, b) => {
        if (a.price === b.price) {
            return a.name.localeCompare(b.name);
        }
        return a.price - b.price;
    });

    console.log(items);
// [
//   { name: "cherry", price: 20 },
//   { name: "apple", price: 50 },
//   { name: "banana", price: 50 }
// ]
})();
```

#### Explanation of Array Sorting in JavaScript

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
The `sort()` method in JavaScript, by default, sorts elements as strings. Therefore, when sorting numbers, the `sort()`
method converts the numbers to strings and compares their UTF-16 code unit values.

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

# `reverse`
- The `reverse` method reverses the elements of an array in place.
- The `reverse` method changes the original array(mutating method).
- The `reverse` method does not create a new array; it modifies the original array.
- The `reverse` method is useful for reversing the order of elements in an array.

```js
(function(){
    var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
    fruits.reverse();
    console.log(fruits); // ['Mango', 'Apple', 'Orange', 'Banana']
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


# Some Example
### Negating an Array Empty Array
```js
(function() {
    console.log(![]) // false
})();
```
})()

##### Explanation:
- The `!` operator negates the truthiness of the array.
- An empty array is a truthy value in JavaScript.
- Negating a truthy value results in `false`.
- Therefore, `![]` evaluates to `false`.

#### Negating an Array with Elements
```js
(function() {
    console.log(![1, 2, 3]) // false
})();
```

##### Explanation:
- The `!` operator negates the truthiness of the array.
- An array with elements is a truthy value in JavaScript.
- Negating a truthy value results in `false`.
- Therefore, `![1, 2, 3]` evaluates to `false`.


#### Negating an Array with Zero
```js
(function() {
    console.log(![0]) // false
})();
```

##### Explanation:
- The `!` operator negates the truthiness of the array.
- An array with a single element `0` is a truthy value in JavaScript.
- Negating a truthy value results in `false`.
- Therefore, `![0]` evaluates to `false`.

#### Adding Two Arrays
```js
(function() {
    var arr1 = [1, 2, 3];
    var arr2 = [4, 5, 6];
    console.log(arr1 + arr2); // "1,2,34,5,6"
})();
```

##### Explanation:
- When you use the `+` operator with arrays, JavaScript implicitly converts the arrays to strings and concatenates them.
- The resulting string contains the elements of both arrays separated by a comma.
- Therefore, `arr1 + arr2` evaluates to `"1,2,34,5,6"`.

```js
(function() {
    var arr1 = [1, 2, 3];
    var arr2 = [4, 5, 6];
    console.log(arr1.concat(arr2)); // [1, 2, 3, 4, 5, 6]
})();
```

##### Explanation:
- The `concat` method concatenates the arrays `arr1` and `arr2` and returns a new array.
- The original arrays `arr1` and `arr2` remain unchanged.
- Therefore, `arr1.concat(arr2)` evaluates to `[1, 2, 3, 4, 5, 6]`.

```js
(function() {
    var arr1 = [1, 2, 3];
    var arr2 = [4, 5, 6];
    console.log([...arr1, ...arr2]); // [1, 2, 3, 4, 5, 6]
})();
```

##### Explanation:
- The spread operator `...` expands the elements of the arrays `arr1` and `arr2` into a new array.
- The original arrays `arr1` and `arr2` remain unchanged.
- Therefore, `[...arr1, ...arr2]` evaluates to `[1, 2, 3, 4, 5, 6]`.

```js
(function() {
    console.log(["a"] + ["b"]); // "ab"
    console.log([] + []); // ""
    console.log(![] + []); // "false", because ![] returns false.
})();
```

##### Explanation:
- When you use the `+` operator with arrays, JavaScript implicitly converts the arrays to strings and concatenates them.
- The ["a"] array is converted to the string "a", and the ["b"] array is converted to the string "b".
- Therefore, `["a"] + ["b"]` evaluates to `"ab"`.
- An empty array is converted to an empty string.
- Therefore, `[] + []` evaluates to `""`.
- The `!` operator negates the truthiness of the empty array, resulting in `false`.
- The `false` value is then concatenated with the empty array, resulting in `"false"`.

### Converting an Array to an Object
```js
(function() {
    var array = [1, 2, 3];
    console.log(typeof array); // "object"
    console.log(array instanceof Object); // true
    console.log(array instanceof Array); // true
    console.log(Object.prototype.toString.call(array)); // "[object Array]"
    console.log(Object.keys(array)); // ["0", "1", "2"]
})();
```

##### Explanation:
- In JavaScript, arrays are a type of object.
- The `typeof` operator returns `"object"` for arrays.
- The `instanceof` operator returns `true` when checking if an array is an instance of `Object` or `Array`.
- The `Object.prototype.toString.call(array)` method returns `"[object Array]"` for arrays.
- The `Object.keys(array)` method returns an array of the object's own enumerable property names (in this case, the array indices).

```js
(function (){
    var fruits = ["banana", "apple", "orange", "watermelon"];
    var fruitsObject = { ...fruits };
    console.log(fruitsObject); // {0: "banana", 1: "apple", 2: "orange", 3: "watermelon"}
})()
```

##### Explanation:
- The spread operator `{ ...fruits }` expands the elements of the `fruits` array into a new object.
- The object keys are the array indices, and the values are the array elements.
- Therefore, `{ ...fruits }` creates an object with keys `"0"`, `"1"`, `"2"`, and `"3"`, corresponding to the array indices.
- The resulting object `{0: "banana", 1: "apple", 2: "orange", 3: "watermelon"}` represents the array as an object.
- The original array `fruits` remains unchanged.


### Create an array with some data
```js
(function() {
    var array = Array(3).fill(0);
    console.log(array); // [0, 0, 0]
})();
```

### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
