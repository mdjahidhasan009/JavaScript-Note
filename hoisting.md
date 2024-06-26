
### Hoisting
- **Hoisting** is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.
- This means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local.
- **Note:** Only declarations are hoisted, not initializations.

### Example: Function Hoisting

Consider the following function expression:

```javascript
var foo = function foo() {
  return 12;
};
```

In JavaScript, `var`-declared variables and functions are hoisted. Let's take function hoisting first. The JavaScript interpreter looks ahead to find all variable declarations and hoists them to the top of the function where they're declared.

```javascript
foo(); // Here foo is still undefined
var foo = function foo() {
  return 12;
};
```

The code above, behind the scenes, looks something like this:

```javascript
var foo = undefined;
foo(); // Here foo is undefined
foo = function foo() {
  // Some code stuff
};
foo(); // Now foo is defined here
```

If you use `let`, will that get hoisted?

### Hoisting with `let`

In JavaScript, `let` and `const` declared variables are hoisted but are not initialized. This means that the variable is in a "temporal dead zone" from the start of the block until the declaration is encountered. Trying to access the variable before the declaration results in a `ReferenceError`.

```javascript
foo(); // ReferenceError: Cannot access 'foo' before initialization
let foo = function foo() {
  return 12;
};
```

### Example: Variable Hoisting

What will be the output of the following code?

```javascript
var salary = "1000$";

(function () {
  console.log("Original salary was " + salary);

  var salary = "5000$";

  console.log("My New Salary " + salary);
})();
```

#### Answer

The code above will output: `undefined`, `5000$` because of hoisting. In the code presented above, you might be expecting `salary` to retain its value from the outer scope until the point that `salary` was re-declared in the inner scope. But due to hoisting, `salary` value was `undefined` instead. To understand it better, have a look at the following code, where the `salary` variable is hoisted and declared at the top in function scope. When we print its value using `console.log`, the result is `undefined`. Afterwards, the variable is redeclared and the new value `"5000$"` is assigned to it.

```javascript
var salary = "1000$";

(function () {
  var salary = undefined;
  console.log("Original salary was " + salary);

  salary = "5000$";

  console.log("My New Salary " + salary);
})();
```

### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)