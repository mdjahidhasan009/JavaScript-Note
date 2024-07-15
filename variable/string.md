## How to Check Whether a String Contains a Substring
### Using includes Method
The `includes` method, introduced in ES6, determines whether one string may be found within another string, returning 
`true` or `false`.

Syntax
```js
string.includes(substring, [start])
```
* substring: The substring to search for.
* start (optional): The position in the string at which to begin searching.

Example
```js
var mainString = "hello";
var subString = "hell";
console.log(mainString.includes(subString)); // Outputs: true
```

### Using indexOf Method
The indexOf method returns the index within the calling string of the first occurrence of the specified value, or -1 if
it is not found.

Syntax
```js
string.indexOf(substring, [fromIndex])
```
* substring: The substring to search for.
* fromIndex (optional): The position in the string at which to start searching.

Example
```js
var mainString = "hello";
var subString = "hell";
console.log(mainString.indexOf(subString) !== -1); // Outputs: true
```

### Using Regular Expressions
The test method of a RegExp object searches for a match between a regular expression and a specified string.
Returns true or false.

Syntax
```js
regex.test(string)
```
* regex: The regular expression to test against.
* string: The string to test.

Example
```js
var mainString = "hello";
var regex = /hell/;
console.log(regex.test(mainString)); // Outputs: true
```

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
