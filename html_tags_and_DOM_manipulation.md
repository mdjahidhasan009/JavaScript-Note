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


# `form` Element in HTML
The `<form>` element is used to create an HTML form for user input. It can contain various types of input elements, such as
text fields, checkboxes, radio buttons, submit buttons, etc. The form element is used to collect user input and submit it
to a server for processing.

### Example
```html
<!DOCTYPE html>
<html>
<head>
  <title>Form Example</title>
</head>
<body>
  <h1>Contact Us</h1>
  <form action="/submit" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br><br>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required><br><br>
    
    <label for="message">Message:</label><br>
    <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>
    
    <input type="submit" value="Submit">
  </form>
</body>
</html>
```

## Perform form validation using JavaScript
JavaScript can be used to perform client-side validation on HTML forms to ensure that the data entered by a user meets
the requirements before the form is submitted. This can prevent unnecessary submissions to the server and provide
immediate feedback to the user.

**Example: Validating User Login Form** <br/>
Let's validate a simple user login form where the username field is required:
```html
<form name="myForm" onsubmit="return validateForm()" method="post">
  User name: <input type="text" name="uname" />
  <input type="submit" value="Submit" />
</form>

<script>
function validateForm() {
  var x = document.forms["myForm"]["uname"].value;
  if (x == "") {
    alert("The username shouldn't be empty");
    return false;
  }
}
</script>
```
In this example, the validateForm() function checks if the uname field is empty. If it is, an alert is shown, and the 
form submission is prevented by returning false.

## Perform form validation without JavaScript
You can perform basic form validation without JavaScript using HTML5 form attributes like required. This approach is 
simpler and works in modern browsers.

**Example: HTML5 Validation Without JavaScript** <br/>
```html
<form method="post">
  <input type="text" name="uname" required />
  <input type="submit" value="Submit" />
</form>
```
In this example, the required attribute ensures that the username field must be filled out before the form can be 
submitted. If the field is empty, the form will not submit, and the browser will automatically display a validation 
message.

NOTE: Automatic form validation does not work in Internet Explorer 9 or earlier.

## The DOM methods available for constraint validation
The following DOM methods are available for performing constraint validation on form inputs:
* `checkValidity()`: Returns true if the input element contains valid data.
* `setCustomValidity()`: Sets a custom validation message for the input element.
* `validity`: Provides a list of boolean properties indicating the validity state of the input element.
* `validationMessage`: Displays a message when the validity is false.
* `willValidate`: Indicates whether the input element will be validated when the form is submitted.

**Example: Using DOM Methods for Validation** <br/>
```html
<form method="post">
  User name: <input type="text" id="uname" required />
  <input type="submit" value="Submit" onclick="myFunction()" />
</form>

<p id="message"></p>

<script>
function myFunction() {
  var userName = document.getElementById("uname");
  if (!userName.checkValidity()) {
    document.getElementById("message").innerHTML =
      userName.validationMessage;
  } else {
    document.getElementById("message").innerHTML =
      "Entered a valid username";
  }
}
</script>
```
In this example, the checkValidity() method is used to validate the uname field. If the field is invalid, the validation 
message is displayed.

## Validity Properties
The validity property of an input element provides a set of boolean properties that describe the validity of the input 
data:

* `customError`: true if a custom validity message is set.
* `patternMismatch`: true if the value does not match the pattern attribute.
* `rangeOverflow`: true if the value is greater than the max attribute.
* `rangeUnderflow`: true if the value is less than the min attribute.
* `stepMismatch`: true if the value is invalid according to the step attribute.
* `tooLong`: true if the value exceeds the maxLength attribute.
* `typeMismatch`: true if the value is invalid according to the type attribute.
* `valueMissing`: true if the required attribute is set but the value is empty.
* `valid`: true if the input element's value is valid.

### `rangeOverflow` Property
The rangeOverflow property returns true if an input element's value is greater than its max attribute. Here's how to use
it:
```html
<input id="age" type="number" max="100" />
<button onclick="myOverflowFunction()">OK</button>

<script>
function myOverflowFunction() {
  if (document.getElementById("age").validity.rangeOverflow) {
    alert("The mentioned age is not allowed");
  }
}
</script>
```
In this example, if the user enters a value greater than 100, an alert is displayed indicating that the age is not allowed.


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