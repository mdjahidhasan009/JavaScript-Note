# Memoization
Memoization is a functional programming technique used to improve the performance of functions by caching their previously computed results. When a memoized function is called, it checks if the result for the given parameters is already in the cache. If it is, the cached result is returned. If not, the function is executed, and the result is stored in the cache for future use.
```js
const memoizeAdditionTwenty = () => {
  let cache = {};
  return (value) => {
    if (value in cache) {
      console.log("Fetching from cache");
      return cache[value]; // Accessing cache using square bracket notation
    } else {
      console.log("Calculating result");
      let result = value + 20;
      cache[value] = result;
      return result;
    }
  };
};

// Returned function from memoizeAdditionTwenty
const additionTwenty = memoizeAdditionTwenty();

console.log(additionTwenty(20)); // Output: 40 calculated
console.log(additionTwenty(20)); // Output: 40 cached
```

### `clearTimeout` Method
The clearTimeout() function is used in JavaScript to clear a timer set with the setTimeout() function before it executes.
The setTimeout() function returns a timeout ID, which can be passed to clearTimeout() to cancel the timer.

Example
In the following example, the setTimeout method sets a timer to display an alert message after 3 seconds. This timer can 
be stopped using the clearTimeout method.
```html
<!DOCTYPE html>
<html>
<head>
  <title>clearTimeout Example</title>
</head>
<body>
  <button onclick="start()">Start</button>
  <button onclick="stop()">Stop</button>

  <script>
    var msg;

    function greeting() {
      alert('Good morning');
    }

    function start() {
      msg = setTimeout(greeting, 3000);
    }

    function stop() {
      clearTimeout(msg);
    }
  </script>
</body>
</html>
```

### `clearInterval` Method
The clearInterval() function is used in JavaScript to stop a timer set with the setInterval() function. The setInterval()
function returns an interval ID, which can be passed to clearInterval() to cancel the interval.

Example
In the following example, the setInterval method sets a timer to display an alert message every 3 seconds. This interval 
can be stopped using the clearInterval method.
```html
<!DOCTYPE html>
<html>
<head>
  <title>clearInterval Example</title>
</head>
<body>
  <button onclick="start()">Start</button>
  <button onclick="stop()">Stop</button>

  <script>
    var msg;

    function greeting() {
      alert('Good morning');
    }

    function start() {
      msg = setInterval(greeting, 3000);
    }

    function stop() {
      clearInterval(msg);
    }
  </script>
</body>
</html>
```

# URL Encoding and Decoding 
In JavaScript, URL encoding and decoding are essential for safely transmitting data via URLs by converting special characters into a format that can be safely included in a URL. This is especially useful when dealing with query parameters that might include characters that have special meanings in URLs.

### `encodeURI()`
* Encodes a URI by escaping characters that are not allowed in URLs.
* Suitable for the entire URL.
* Does not encode characters like :, /, ?, &, #, etc
```js
let uri = "employeeDetails?name=john&occupation=manager";
let encoded_uri = encodeURI(uri);
console.log(encoded_uri); // Outputs: employeeDetails?name=john&occupation=manager
```
```js
var uri = "https://mozilla.org/?x=шеллы";
var encoded = encodeURI(uri);
console.log(encoded); // https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B
```

### `decodeURI()`
* Decodes a previously decode a Uniform Resource Identifier (URI) previously created by encodeURI().
* Reverses the effect of `encodeURI()`
```js
let decoded_uri = decodeURI(encoded_uri);
console.log(decoded_uri); // Outputs: employeeDetails?name=john&occupation=manager
```
```js
var uri = "https://mozilla.org/?x=шеллы";
var encoded = encodeURI(uri);
console.log(encoded); // https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B
try {
  console.log(decodeURI(encoded)); // "https://mozilla.org/?x=шеллы"
} catch (e) {
  // catches a malformed URI
  console.error(e);
}
```

### `encodeURIComponent()`

* Encodes a URI component by escaping characters that have special meanings in URLs (e.g., ?, &, #, =, etc.).
* Suitable for encoding individual query parameters or parts of a URL.
```javascript
let param = "name=john&occupation=manager";
let encoded_param = encodeURIComponent(param);
console.log(encoded_param); // Outputs: name%3Djohn%26occupation%3Dmanager
```

### `decodeURIComponent()`
* Decodes a previously encoded URI component.
* Reverses the effect of `encodeURIComponent()`
```js
let decoded_param = decodeURIComponent(encoded_param);
console.log(decoded_param); // Outputs: name=john&occupation=manager
```

### When to Use Which Function
* `encodeURI()` and `decodeURI()`: Use these when dealing with entire URLs where you don't want to encode special URL characters like :, /, ?, &, #, etc.
* `encodeURIComponent()` and `decodeURIComponent()`: Use these when dealing with individual components or query parameters of a URL where you need to ensure that all special characters are properly encoded.


### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)