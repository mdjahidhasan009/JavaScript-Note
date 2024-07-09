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

### `decodeURI()`
* Decodes a previously encoded URI.
* Reverses the effect of `encodeURI()`
```js
let decoded_uri = decodeURI(encoded_uri);
console.log(decoded_uri); // Outputs: employeeDetails?name=john&occupation=manager
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


