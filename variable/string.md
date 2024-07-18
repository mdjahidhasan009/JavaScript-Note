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

### `split()` method
The `split()` method splits a string into an array of substrings using a specified separator.
```js
var msg = "Hello John";
var n = msg.split(/\s/); // Outputs: ["Hello", "John"]
```

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


### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
