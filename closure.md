A closure is a function defined inside another function (called the parent function) and, as such, it has access to the variables declared and defined within its parent function's scope.

The closure has access to variables in three scopes:
1. Variables declared in its own scope.
2. Variables declared in its parent function's scope.
3. Variables declared in the global namespace.

#### Example of a Closure:

```javascript
var globalVar = "abc"; // Global variable

// Parent self-invoking function
(function outerFunction (outerArg) { // start of outerFunction's scope

  var outerFuncVar = 'x'; // Variable declared in outerFunction's function scope   
  
  // Closure self-invoking function
  (function innerFunction (innerArg) { // start of innerFunction's scope

    var innerFuncVar = "y"; // Variable declared in innerFunction's function scope
    console.log(         
      "outerArg = " + outerArg + "\n" +
      "outerFuncVar = " + outerFuncVar + "\n" +
      "innerArg = " + innerArg + "\n" +
      "innerFuncVar = " + innerFuncVar + "\n" +
      "globalVar = " + globalVar);
  	
  // end of innerFunction's scope
  
  })(5); // Pass 5 as parameter to our Closure

// end of outerFunction's scope

})(7); // Pass 7 as parameter to the Parent function
```

In this example:
- `globalVar` is a global variable.
- `outerFunction` is the parent function that takes `outerArg` as an argument and declares `outerFuncVar`.
- `innerFunction` is the closure that takes `innerArg` as an argument and declares `innerFuncVar`.

Because `innerFunction` is defined inside `outerFunction`, it has access to:
- Its own variables: `innerArg` and `innerFuncVar`.
- Variables of its parent function `outerFunction`: `outerArg` and `outerFuncVar`.
- Global variables: `globalVar`.

When executed, the code above will produce the following output:

```
outerArg = 7
outerFuncVar = x
innerArg = 5
innerFuncVar = y
globalVar = abc
```

This demonstrates how `innerFunction`, the closure, can access variables from its own scope, its parent function's scope, and the global scope. This is the essence of closures in JavaScript.

### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)