# ES6
ES6, also known as ECMAScript 2015, is the sixth edition of the JavaScript language and was released in June 2015. It 
introduced several new features and syntax improvements to the language, aimed at making the code more concise, 
maintainable, and powerful. ES6 is widely supported by modern browsers, but for compatibility with older browsers,
transpilers like Babel.js are often used.

# Key Features of ES6

## Constants or Immutable Variables
The introduction of the const keyword allows the declaration of variables whose values cannot be reassigned.

## Block-Scoped Variables
The let and const keywords provide block-scoping, which limits the scope of variables to the block, statement, or 
expression in which they are used, unlike var, which has function scope.

## Arrow Functions
Arrow functions (=>) offer a concise syntax for writing functions and lexically bind the this value, making them a great 
alternative to traditional function expressions.

## Default Parameters
In ES6, default function parameters allow you to initialize function parameters with default values if no value or 
undefined is passed. This feature simplifies the process of setting default values, which in ES5 required the use of 
logical OR operators.

**Example in ES5:**
```js
var calculateArea = function (height, width) {
  height = height || 50;
  width = width || 60;
  return width * height;
};

console.log(calculateArea()); // Outputs: 300
```

**Example in ES6:**
```js
var calculateArea = function (height = 50, width = 60) {
  return width * height;
};

console.log(calculateArea()); // Outputs: 300
```
In this example, if calculateArea is called without arguments, height and width are automatically set to 50 and 60, 
respectively.

## Rest and Spread Parameters
The `...` syntax allows functions to accept an indefinite number of arguments as an array (rest) and also enables the
expansion of arrays and objects (spread).

```js
const stringArray = [..."John Resig"];
console.log(stringArray); // Outputs: ["J", "o", "h", "n", " ", "R", "e", "s", "i", "g"]
```

## Template Literals
Template literals, introduced in ES6, are string literals that allow embedded expressions. These strings are enclosed by
back-ticks (`) instead of single or double quotes. This feature enables string interpolation, which allows you to embed 
variables and expressions directly within the string.

**Example in ES6:**
```js
var firstName = "John";
var lastName = "Doe";
var greeting = `Welcome to JS World, Mr. ${firstName} ${lastName}.`;

console.log(greeting); // Outputs: Welcome to JS World, Mr. John Doe.
```
In ES5, string concatenation would require breaking the string into multiple parts and concatenating them with the `+`
operator.

**Example in ES5:**
```js
var greeting = 'Welcome to JS World, Mr. ' + firstName + ' ' + lastName;
console.log(greeting); // Outputs: Welcome to JS World, Mr. John Doe.
```

### Multi-line Strings with Template Literals
Template literals also support multi-line strings without the need for newline escape characters (\n) or concatenation.
**Example in ES6:**
```js
console.log(`This is string sentence 1
This is string sentence 2`);
```
In contrast, in ES5, you would need to use newline characters and concatenate the strings:
**Example in ES5:**
```js
console.log("This is string sentence 1\n" + "This is string sentence 2");
```
Template literals thus provide a more convenient and readable way to work with strings in JavaScript.

## Nesting Templates
Nesting templates in JavaScript allow you to use inner backticks inside a placeholder ${ } within a template literal.
This feature makes your code more compact and readable, especially when dealing with conditional logic.

**Example**
```js
const iconStyles = `icon ${
  isMobilePlatform()
    ? ""
    : `icon-${user.isAuthorized ? "submit" : "disabled"}`
}`;
```
In this example, the template checks if the platform is mobile. If it is not, it then checks if the user is authorized
to determine the appropriate icon style.

**Example Without Nesting Templates:**
```js
const iconStyles = `icon ${
  isMobilePlatform()
    ? ""
    : user.isAuthorized
    ? "icon-submit"
    : "icon-disabled"
}`;
```
The code without nesting templates is more verbose, but nesting templates make it more concise.

## Tagged Templates
Tagged templates are an advanced form of template literals where a function, known as a "tag," is used to parse the 
template literal. The tag function can manipulate the template strings and expressions as needed.
**Example**
```js
var user1 = "John";
var skill1 = "JavaScript";
var experience1 = 15;

function myInfoTag(strings, userExp, experienceExp, skillExp) {
  var expertiseStr;
  if (experienceExp > 10) {
    expertiseStr = "expert developer";
  } else if (experienceExp > 5 && experienceExp <= 10) {
    expertiseStr = "senior developer";
  } else {
    expertiseStr = "junior developer";
  }

  return `${strings[0]}${userExp}${strings[1]}${expertiseStr}${strings[2]}${skillExp}`;
}

var output1 = myInfoTag`Mr/Ms. ${user1} is a/an ${experience1} in ${skill1}`;
console.log(output1); // Outputs: Mr/Ms. John is a/an expert developer in JavaScript
```
Tagged templates allow for more dynamic and complex string processing based on the values passed into the template.

## Raw Strings
The String.raw() method in ES6 provides a way to create raw strings, where escape sequences are not processed. This is
particularly useful when dealing with strings that contain special characters or when you want the string to appear 
exactly as typed.
**Example**
```js
var calculationString = String.raw`The sum of numbers is \n${1 + 2 + 3 + 4}!`;
console.log(calculationString); // Outputs: The sum of numbers is \n10!
```
Without using String.raw(), the newline character (\n) would be processed, and the string would be split into multiple 
lines.

**Example Without Raw Strings:**
```js
var calculationString = `The sum of numbers is \n${1 + 2 + 3 + 4}!`;
console.log(calculationString);
// Outputs:
// The sum of numbers is 
// 10!
```
Raw strings allow you to work with the exact string format you need, without any automatic processing of escape sequences.

## Multi-Line Strings
With template literals, multi-line strings are easily created without the need for escape characters.

## Destructuring Assignment
This feature allows the extraction of values from arrays or properties from objects into distinct variables using a 
succinct syntax.

## Enhanced Object Literals
ES6 introduced several shorthand notations and features in object literals, making it easier to define objects.

## Promises
Promises provide a cleaner, more flexible way to handle asynchronous operations, offering an alternative to callbacks.

## Classes
ES6 introduced a more straightforward and syntactically cleaner way to define and work with classes and inheritance in 
JavaScript.

## Modules
ES6 modules allow for the modularization of code, enabling better organization, dependency management, and code
reusability.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)