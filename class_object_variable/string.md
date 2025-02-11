## `includes` Method
The `includes` method, introduced in ES6, determines whether one string may be found within another string, returning 
`true` or `false`.

Syntax
```js
string.includes(substring, [start])
```
* substring: The substring to search for.
* start (optional): The position in the string at which to begin searching.

#### How to Check Whether a String Contains a Substring
```js
var mainString = "hello";
var subString = "hell";
console.log(mainString.includes(subString)); // Outputs: true
```

## `indexOf` Method
The indexOf method returns the index within the calling string of the first occurrence of the specified value, or -1 if
it is not found.

Syntax
```js
string.indexOf(substring, [fromIndex])
```
* substring: The substring to search for.
* fromIndex (optional): The position in the string at which to start searching.

#### How to Check Whether a String Contains a Substring
```js
var mainString = "hello";
var subString = "hell";
console.log(mainString.indexOf(subString) !== -1); // Outputs: true
```

# Regular Expressions
A regular expression is a sequence of characters that forms a search pattern. You can use this search pattern for
searching data in a text. Returns true or false.

Syntax
```js
regex.test(string)
```
* regex: The regular expression to test against.
* string: The string to test.

## Modifiers in Regular Expressions
Modifiers can be used to perform case-insensitive, global, and multiline searches. Common modifiers include:

### `i`: Case-insensitive matching
```js
var text = 'Hello World';
var pattern = /hello/i;
console.log(pattern.test(text)); // Outputs: true
```
### `g`: Global matching (does not stop at the first match)
```js
var text = 'Learn JS one by one';
var pattern = /one/g;
console.log(text.match(pattern)); // Outputs: ["one", "one"]
```
### `m`: Multiline matching
```js
var text = 'First line\nSecond line';
var pattern = /^Second/m;
console.log(pattern.test(text)); // Outputs: true
```

## Regular Expression Patterns
Regular expressions provide a group of patterns to match characters. They are categorized into three types:
### Brackets: Find a range of characters.
* `[abc]`: Any of the characters between the brackets (a, b, c)
* `[0-9]`: Any digit between the brackets
* `(a|b)`: Any of the alternatives separated with `|`
```js
var text = 'Hello World';
var pattern = /[abc]/;
console.log(pattern.test(text)); // Outputs: true
```
### Metacharacters: Characters with special meanings.
* `\d`: Digit
* `\s`: Whitespace character
* `\b`: Match at the beginning or ending of a word
* `.`: Any character except newline
* `^`: Start of the string
* `$`: End of the string
```js
var text = 'Hello World';
var pattern = /\s/;
console.log(pattern.test(text)); // Outputs: true
```
### Quantifiers: Define quantities.
* `n+`: Matches for any string that contains at least one `n`
* `n*`: Matches for any string that contains zero or more occurrences of `n`
* `n?`: Matches for any string that contains zero or one occurrences of `n`
* `n{X}`: Matches for any string that contains a sequence of `X` `n`'s
* `o{X,Y}`: Matches for any string that contains a sequence of `X` to `Y` `o`'s
* `n$`: Matches for any string with `n` at the end
```js
var text = 'Hello World';
var pattern = /o+/;
console.log(pattern.test(text)); // Outputs: true
```


## String Methods that Accept Regular Expressions

### `search()` method
The `search()` method searches a string for a match against a regular expression and returns the index of the match.
```js
var msg = "Hello John";
var n = msg.search(/John/i); // Outputs: 6
```

### `replace()` method
The `replace()` method returns a new string with some or all matches of a pattern replaced by a replacement.
```js
var msg = "ball bat";
var n = msg.replace(/b/i, "c"); // Outputs: "call bat"
```

#### Remove Line Breaks from a String
To remove all line breaks from a string in JavaScript, you can use the replace function combined with a regular 
expression to detect and replace newline characters with an empty string.

```js
function remove_linebreaks(message) {
    return message.replace(/[\r\n]+/gm, "");
}
```

Explanation:
* **Regular Expression**: `/[\r\n]+/gm`
  * `[\r\n]+`: This pattern matches one or more occurrences of carriage return (`\r`) or newline (`\n`) characters.
  * `g`: The global flag ensures that all matches in the string are replaced, not just the first one.
  * `m`: The multiline flag allows the pattern to match line breaks across multiple lines.
* **replace Function**: The replace method replaces all matches of the regular expression in the string with an empty
  string "", effectively removing all line breaks.

Example:
```js
let message = "Hello,\nThis is a message with\r\nmultiple line breaks.";
let cleanedMessage = remove_linebreaks(message);
console.log(cleanedMessage); // Output: "Hello,This is a message withmultiple line breaks."
```
In this example, the function removes both newline (\n) and carriage return (\r) characters from the string, resulting 
in a continuous string without line breaks.

#### Remove Whitespace from a String
To remove all whitespace characters (spaces, tabs, line breaks) from a string in JavaScript, you can use the replace
function combined with a regular expression to detect and replace whitespace characters with an empty string.

```js
function remove_whitespace(message) {
    return message.replace(/\s+/g, "");
}
```

Explanation:
* **Regular Expression**: `/\s+/g`
  * `\s+`: This pattern matches one or more occurrences of whitespace characters (spaces, tabs, line breaks).
  * `g`: The global flag ensures that all matches in the string are replaced, not just the first one.
* The replace function replaces all matches of the regular expression in the string with an empty string "", effectively
  removing all whitespace characters.


#### Converting a String to Title Case in JavaScript
Title case means that the first letter of each word is capitalized. You can convert a string to title case using the
function below:
```js
const str = "good morning john";
const tempStr = str.replace(/\w\S*/g, function(text) {
  return text;
})
console.log(tempStr) //Output: good morning john
```

```js
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

console.log(toTitleCase("good morning john")); // Good Morning John
```
* Regular Expression (/\w\S*/g)
  * `\w` matches any word character (equivalent to `[a-zA-Z0-9_]`).
  * `\S*` matches any number of non-whitespace characters.
  * The `g` flag ensures that all matches in the string are replaced.
* Callback Function:
  * For each match (`txt`), `txt.charAt(0).toUpperCase()` converts the first character to uppercase.
  * `txt.substring(1).toLowerCase()` converts the rest of the string to lowercase.
  * The concatenation of these two parts ensures that each word starts with an uppercase letter followed by lowercase letters.

### `replaceAll()` method
The replaceAll() method returns a new string with all matches of a pattern replaced by a replacement.
```js
var msg = "ball bat";
var n = msg.replaceAll(/b/i, "c"); // Outputs: "call cat"
```

### `match()` method
The `match()` method retrieves the matches when matching a string against a regular expression.
```js
var msg = "Hello John";
var n = msg.match(/[A-Z]/g); // Outputs: ["H", "J"]
```

### `matchAll()` method
The `matchAll()` method returns an iterator of all matched results when matching a string against a regular expression.
```js
var msg = "Hello John";
var iterator = msg.matchAll(/[A-Z]/g); 
console.log(Array.from(iterator)); // Outputs: [["H"], ["J"]]
```

```js
let regexp = /Hello(\d?)/g;
let greeting = "Hello1Hello2Hello3";

let greetingList = [...greeting.matchAll(regexp)];

console.log(greetingList[0][0]); //Hello1
console.log(greetingList[1][0]); //Hello2
console.log(greetingList[2][0]); //Hello3
```

### `split()` method
The `split()` method splits a string into an array of substrings using a specified separator.
```js
var msg = "Hello John";
var n = msg.split(/\s/); // Outputs: ["Hello", "John"]
```

## `repeat`
In JavaScript, you can use the repeat() method to create a new string that contains a specified number of copies of an 
existing string, concatenated together. This method is particularly useful when you need to repeat a string multiple 
times in a concise manner. The repeat() method was introduced in the ECMAScript 2015 (ES6) specification.

**Syntax** <br/>
```js
string.repeat(count)
```
* string: The original string you want to repeat.
* count: The number of times you want to repeat the string. This must be a non-negative integer.

Example <br/>
```js
"Hello".repeat(4); // 'HelloHelloHelloHello'
```
In this example, the string "Hello" is repeated 4 times, resulting in the new string 'HelloHelloHelloHello'.


## RegExp Object
The RegExp object is a regular expression object with predefined properties and methods.
```js
var regexp = new RegExp("\\w+");
console.log(regexp); // Outputs: /\w+/
```

#### How to Check Whether a String Contains a Substring
```js
var mainString = "hello";
var regex = /hell/;
console.log(regex.test(mainString)); // Outputs: true
```
#### Validating an Email
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


## `toUpperCase` method
#### Make first letter of string uppercase
You can create a function which uses a chain of string methods such as charAt, toUpperCase and slice methods to generate
a string with the first letter in uppercase.
```js
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
```

## `startsWith` method
#### Check is a string starts with another string
```js
"Good morning".startsWith("Good"); // true
"Good morning".startsWith("morning"); // false
```

## `trim` method
`trim` method on string types to remove any whitespace from the beginning and end of a string. The trim method is 
straightforward and directly available on string objects.
```js
var str = "  Hello World   ";
var trimmedStr = str.trim();
console.log(trimmedStr); // Outputs: "Hello World"
```
Polyfill for Older Browsers
For browsers that do not support the trim method (such as Internet Explorer versions older than IE9), you can use the 
following polyfill:
```js
if (!String.prototype.trim) {
  (function () {
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function () {
      return this.replace(rtrim, "");
    };
  })();
}
```

### `trimStart`, `trimEnd`
In JavaScript, you can trim whitespace from the beginning or the end of a string using specific methods:
#### trimStart() or trimLeft()
These methods remove whitespace from the beginning (left side) of a string.
#### trimEnd() or trimRight()
These methods remove whitespace from the end (right side) of a string.

While trimStart() and trimEnd() are the more modern names, trimLeft() and trimRight() are still widely used and function 
the same way.
```js
var greeting = "   Hello, Goodmorning!   ";

console.log(greeting); // "   Hello, Goodmorning!   "

console.log(greeting.trimStart()); // "Hello, Goodmorning!   "
console.log(greeting.trimLeft());  // "Hello, Goodmorning!   "

console.log(greeting.trimEnd());   // "   Hello, Goodmorning!"
console.log(greeting.trimRight()); // "   Hello, Goodmorning!"
```
In this example:
* trimStart() and trimLeft() remove the leading spaces before "Hello".
* trimEnd() and trimRight() remove the trailing spaces after "Goodmorning!".

### Multiline string
#### Using the `\n` Character
```js
var str = "This is a \nvery lengthy \nsentence!";
console.log(str);
/**
 Output
 This is a
 very lengthy
 sentence!
 **/ 
```
#### Using Template Literals (ES6)
```js
var str = `This is a
very lengthy
sentence!`;
console.log(str);
/**
 Ouput
 This is a
 very lengthy
 sentence! 
**/
```
#### Using String Concatenation
```js
var str = "This is a " +
  "very lengthy " +
  "sentence!";
console.log(str);
```

## `charCodeAt`
### Converting character to ASCII code
To convert a character to its ASCII code in JavaScript, you can use the String.prototype.charCodeAt() method. This 
method returns the Unicode value (which corresponds to the ASCII value for characters in the ASCII range) of the 
character at a specified index in a string.

**Example** <br/>
To find the ASCII code for the first character of the string "ABC":
```js
const asciiCode = "ABC".charCodeAt(0); // returns 65
```
In this example, "ABC".charCodeAt(0) returns 65, which is the ASCII code for the character 'A'.

## `fromCharCode`
### Converting ASCII code to character
To convert an ASCII code back to a character, you can use the String.fromCharCode() method. This method takes one or
more numeric values representing ASCII codes and returns the corresponding string.

**Example** <br/>
To convert the ASCII codes 65, 66, and 67 back to the string 'ABC':
```js
const str = String.fromCharCode(65, 66, 67); // returns 'ABC'
```
In this example, String.fromCharCode(65, 66, 67) returns 'ABC', where 65, 66, and 67 are the ASCII codes for 'A', 'B', 
and 'C', respectively.


## ArrayBuffer
An ArrayBuffer is an object in JavaScript used to represent a fixed-length sequence of raw binary data. The contents of 
an ArrayBuffer cannot be directly manipulated, but you can use views to interpret and manipulate the data in various 
formats such as integers, floating-point numbers, or even strings.

**Example** <br/>
To create an ArrayBuffer of length 16 bytes:
```js
let buffer = new ArrayBuffer(16); // Creates a buffer of length 16 bytes
console.log(buffer.byteLength); // Outputs: 16
```
In this example, the ArrayBuffer object buffer is created with a length of 16 bytes. The byteLength property returns the 
size of the buffer.

#### Manipulating ArrayBuffer
To manipulate the contents of an ArrayBuffer, you must use a view, such as DataView, Uint8Array, Int32Array, etc. These
views provide a way to read and write different types of data to and from the buffer.

**Example** <br/>
To create a DataView referring to the buffer:
```js
let view = new DataView(buffer);
```
In this example, the DataView object view is created, which allows you to manipulate the data within the ArrayBuffer
buffer.




### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
