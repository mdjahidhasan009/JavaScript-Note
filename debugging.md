# debugger
The debugger statement is a built-in feature in JavaScript that halts the execution of code and invokes any available 
debugging functionality. It acts as a programmatic breakpoint, allowing developers to inspect the state of the program 
at a specific point.

Syntax
```js
debugger;
```

## Purpose of Breakpoints in Debugging
Breakpoints are markers that you set in your code to instruct the JavaScript engine to pause execution at a specific
point. They are a fundamental tool in debugging, allowing you to examine the state of your application, such as the 
values of variables, the call stack, and the flow of execution.

## Benefits of Using Breakpoints
* **Inspect Variable Values:** At each breakpoint, you can inspect the values of variables and understand how they change 
  over time.
* **Step Through Code:** You can step through your code line by line to see how the program executes and identify where
  things go wrong.
* **Examine the Call Stack:** Breakpoints allow you to see the call stack and understand how the program reached a 
  particular point.
  * **Step Into Functions:** You can step into functions to see how they are executed and what values they return.
  * **Step Over Functions:** You can step over functions to skip their execution and focus on the higher-level logic.
  * **Step Out of Functions:** You can step out of functions to return to the calling context and continue execution.
  * **Resume Execution:** You can resume execution after inspecting the state of the program.
  * **Conditional Breakpoints:** You can set breakpoints that trigger only when certain conditions are met.
  * **Log Messages:** You can log messages to the console at specific points in your code to track its execution.
  * **Evaluate Expressions:** You can evaluate expressions and run snippets of code in the context of the paused execution.
  * **Modify Variables:** You can modify variable values at runtime to test different scenarios and see their impact.
  * **Watch Expressions:** You can watch the values of specific expressions and track how they change over time.
  * **Network Requests:** You can inspect network requests and responses to debug issues related to data fetching.
  * **Event Listeners:** You can inspect event listeners and their associated functions to understand how events are handled.
  * **Memory Profiling:** You can analyze memory usage and identify memory leaks in your application.
  * **Performance Profiling:** You can measure the performance of your code and identify bottlenecks that affect its speed.
  * **Source Maps:** You can use source maps to debug minified or transpiled code and map it back to the original source.
  * **Browser DevTools:** You can leverage browser DevTools to debug JavaScript code, inspect the DOM, and analyze network activity.
  * **Node.js Debugging:** You can debug Node.js applications using the built-in debugger or external tools like `ndb` or `inspect`.
* **Evaluate Expressions:** You can evaluate expressions and run snippets of code in the context of the paused execution.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)