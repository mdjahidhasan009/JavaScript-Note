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



## Shim vs Polyfill
### Shim
A shim is a library that allows older environments to support newer APIs or functionalities by implementing them using 
the existing capabilities of that environment. It's not limited to web applications and can be applied to any software 
environment. An example is es5-shim.js, which emulates ES5 features in older browsers.

### Polyfill   
A polyfill is a specific type of shim that is focused on providing missing functionalities in web browsers. It is used 
to mimic the behavior of native APIs that are not supported in certain browsers. In essence, a polyfill is a shim that
specifically targets browser APIs.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)