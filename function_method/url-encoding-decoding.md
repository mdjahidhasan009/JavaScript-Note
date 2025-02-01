# URL Encoding and Decoding 
In JavaScript, URL encoding and decoding are essential for safely transmitting data via URLs by converting special 
characters into a format that can be safely included in a URL. This is especially useful when dealing with query 
parameters that might include characters that have special meanings in URLs.

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
* `encodeURI()` and `decodeURI()`: Use these when dealing with entire URLs where you don't want to encode special URL 
   characters like :, /, ?, &, #, etc.
* `encodeURIComponent()` and `decodeURIComponent()`: Use these when dealing with individual components or query
   parameters of a URL where you need to ensure that all special characters are properly encoded.


### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)