## Attribute
Attributes are **defined on the HTML markup**. They provide additional information about HTML elements and are always
represented as strings. Attributes are part of the initial HTML document and are used to configure or initialize elements.
```html
<input type="text" value="Name:">
```
In this example, the input element has two attributes: `type` and `value`.
#### Accessing Attributes
Attributes can be accessed using methods like `getAttribute` and `setAttribute`.
```js
const input = document.querySelector("input");
console.log(input.getAttribute("value")); // Outputs: "Name:"
```

## Properties
Properties are **defined on the DOM (Document Object Model)**. They represent the current state of HTML elements and can 
be of any data type (string, number, boolean, object, etc.). Properties are live and can change as the user interacts 
with the web page.
```html
const input = document.querySelector("input");
console.log(input.value); // Outputs: "Name:"
```
