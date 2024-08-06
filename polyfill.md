# Polyfill
A polyfill is a piece of JavaScript code that provides modern functionality on older browsers that do not natively
support it. Polyfills essentially mimic the behavior of modern JavaScript features, allowing developers to use those 
features while ensuring compatibility with older browsers.

Polyfills are particularly useful when you want to use modern JavaScript features but need to ensure that your code runs 
on older browsers that do not support these features.

For example, a polyfill for the `Array.prototype.includes` method might look like this:
```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function(element) {
    return this.indexOf(element) !== -1;
  };
}
```

Some popular polyfill library are `Core.js`, `Polyfill.io`

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)