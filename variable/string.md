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

<br/><br/>

**Some Example**
<details>
<summary>Validating an Email</summary>

You can validate an email in JavaScript using regular expressions. It is recommended to do validations on the server 
side as well, because JavaScript can be disabled on the client side.
```js
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
```
* Regular Expression: The regular expression re checks for the common structure of an email address.
  * ^ and $ denote the start and end of the string.
  * ([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*) checks the local part of the email address.
  * ((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})) checks the domain part of 
    the email address.
* test Method: The test method of the regular expression object is used to test whether the email string matches the 
  pattern.
* String(email).toLowerCase(): Converts the email to a string and changes it to lowercase before testing, ensuring case
  insensitivity.
</details>

<details>
<summary>Make first letter of string uppercase</summary>

You can create a function which uses a chain of string methods such as charAt, toUpperCase and slice methods to generate 
a string with the first letter in uppercase.
```js
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
```
</details>


### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
