# Strict Mode
Strict Mode is a feature introduced in ECMAScript 5 that allows you to enforce a stricter parsing and error handling in
your JavaScript code. By placing your code in a "strict" operating context, it prevents certain actions from being taken
and throws more exceptions, helping you to write more secure and robust code.

The literal expression "use strict"; is used to enable strict mode. When placed at the beginning of a script or a 
function, it instructs the JavaScript engine to execute the code in strict mode.

## Why Do We Need Strict Mode?
Strict mode is useful for writing "secure" JavaScript by converting silent errors into throw errors, thereby making it easier to debug and maintain your code. Here are some key benefits of using strict mode:

* **Eliminates Silent Errors:** Throws errors for common mistakes such as assigning to undeclared variables.
* **Disallows Certain Syntax:** Prevents the use of certain syntax that is likely to be problematic, such as with statements.
* **Prevents Accidental Globals:** Throws an error when assigning a value to an undeclared variable, helping to avoid the accidental creation of global variables.
* **Enhances Security:** Disallows the use of eval() to create variables in the surrounding scope, reducing potential security vulnerabilities.
* **Ensures Cleaner Code:** Forces better coding practices and helps identify potential issues early in the development process.

## How to Declare Strict Mode
Strict mode can be declared at the beginning of a script or within a function.

**Global Scope**

When declared at the beginning of a script, strict mode applies to the entire script
```js
"use strict";
x = 3.14; // This will cause an error because x is not declared
```

**Local Scope**

When declared inside a function, strict mode applies only to the code within that function
```js
x = 3.14; // This will not cause an error
myFunction();

function myFunction() {
  "use strict";
  y = 3.14; // This will cause an error because y is not declared
}
```

### Examples of Strict Mode Errors
**Undeclared Variables**
```js
"use strict";
x = 3.14; // ReferenceError: x is not defined
```
**Assignment to a Non-Writable Property**
```js
"use strict";
const obj = {};
Object.defineProperty(obj, "x", { value: 42, writable: false });
obj.x = 9; // TypeError: Cannot assign to read only property 'x'
```
**Assignment to a Getter-Only Property**
```js
"use strict";
const obj = {
  get x() {
    return 42;
  }
};
obj.x = 9; // TypeError: Cannot set property x of #<Object> which has only a getter
```
**Deleting an Undeletable Property**
```js
"use strict";
delete Object.prototype; // TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
```
**Duplicate Parameter Names**
```js
"use strict";
function sum(a, a, c) { // SyntaxError: Duplicate parameter name not allowed in this context
  return a + a + c;
}
```

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)