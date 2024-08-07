# Attribute
Attributes are **defined on the HTML markup**. They provide additional information about HTML elements and are always
represented as strings. Attributes are part of the initial HTML document and are used to configure or initialize elements.
```html
<input type="text" value="Name:">
```
In this example, the input element has two attributes: `type` and `value`.
## Accessing Attributes
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

## Changing the Style of an HTML Element in JavaScript
### Using the `style` Property
The style property allows you to set inline styles directly on an HTML element. This method is useful for applying styles 
dynamically or when you need to change individual style properties.
```html
<!DOCTYPE html>
<html>
<head>
  <title>Change Style Example</title>
</head>
<body>
  <h1 id="title">Hello World</h1>
  <button onclick="changeStyle()">Change Style</button>

  <script>
    function changeStyle() {
      document.getElementById("title").style.fontSize = "30px";
      document.getElementById("title").style.color = "blue";
    }
  </script>
</body>
</html>
```
In this example, clicking the button will change the font size of the `h1` element to `30px` and the text color to `blue`.

### Using the `classList` Property
The className property allows you to change the entire class of an element. This method is useful when you want to apply
a set of predefined styles defined in a CSS class.
```html
<!DOCTYPE html>
<html>
<head>
  <title>Change Class Example</title>
  <style>
    .custom-title {
      font-size: 30px;
      color: blue;
    }
  </style>
</head>
<body>
  <h1 id="title">Hello World</h1>
  <button onclick="changeClass()">Change Class</button>

  <script>
    function changeClass() {
      document.getElementById("title").className = "custom-title";
    }
  </script>
</body>
</html>
```
In this example, clicking the button will apply the styles defined in the `.custom-title` CSS class to the `h1` element.

## Detecting JavaScript Disabled on a Page
### Why Detect JavaScript Disabled?
Sometimes, users may have JavaScript disabled in their browsers for security or performance reasons. As a result, any
JavaScript code on your web page will not execute, potentially breaking functionality or rendering the page unusable. 
Detecting if JavaScript is disabled allows you to provide alternative content or instructions to these users, ensuring
they can still navigate your site.

### How to Detect Using <noscript> Tag
The <noscript> tag is an HTML element designed to handle such cases. It allows you to specify content that should be 
displayed only when JavaScript is disabled in the user's browser.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Detection Example</title>
    <script type="text/javascript">
        // JS related code goes here
        console.log("JavaScript is enabled!");
    </script>
</head>
<body>
    <h1>Welcome to Our Website</h1>
    <noscript>
        <p>JavaScript is disabled in your browser. Some features may not work as expected. Please enable JavaScript or click the link below to continue.</p>
        <a href="next_page.html?noJS=true">Click here to proceed without JavaScript</a>
    </noscript>
</body>
</html>
```

# Getting Metadata of a Module
You can use the import.meta object, which is a meta-property that exposes context-specific metadata to a JavaScript 
module. This object contains information about the current module, such as the module's URL. The metadata available in
import.meta can vary depending on the environment (e.g., browsers vs. Node.js).

#### Example in Browsers
* import.meta provides information such as the URL of the module.
* Useful for knowing the context and origin of the module.

In a browser environment, import.meta can provide the URL of the current module:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Module Metadata Example</title>
</head>
<body>
  <script type="module">
    console.log(import.meta);
    // Example output: { url: "file:///home/user/welcome-module.js" }
  </script>
</body>
</html>
```

##### Explanation
* import.meta is a built-in object in JavaScript modules that provides context-specific metadata.
* In a browser, it often includes the URL of the module.


#### Example in Node.js
* import.meta can be used to get metadata about the module in a Node.js environment.
* Must run the script as an ES module.

In Node.js, import.meta can provide different metadata, including the file URL of the module. To use import.meta in 
Node.js, you need to run the script as an ES module (using the .mjs extension or by setting "type": "module" in your 
package.json).
```js
// Example Node.js module file (e.g., welcome-module.mjs)
console.log(import.meta);
// Example output: { url: "file:///home/user/welcome-module.mjs" }
```

Notes
* The `import.meta` object is part of the ES6 module system and is only available within module scripts (i.e., scripts 
  with type="module" in HTML or using .mjs extension in Node.js).
* The exact properties and their values within import.meta can vary between different JavaScript environments and their 
  respective implementations.

### React Applications and JavaScript Dependency
React applications are heavily dependent on JavaScript. The entire component-based architecture of React relies on
JavaScript to render and update the user interface dynamically. If JavaScript is disabled, a React application would
typically fail to render or function as intended.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)