In JavaScript, the `window` and `document` **objects** are two core components of the `Browser Object Model (BOM)` and the 
`Document Object Model (DOM)`, respectively. They play crucial roles in interacting with the web page and its elements.

# `window` object
The `window` object represents the **browser's window containing the web page**. It is the global object in the 
client-side JavaScript environment, meaning all global JavaScript objects, functions, and variables automatically become
members of the window object. By default it is available throw `window` object.

## Properties
* `window.innerHeight`: The inner height of the browser window.
* `window.innerWidth`: The inner width of the browser window.
* `window.location`: The Location object, which contains information about the current URL.
* `window.history`: The History object, which provides access to the browser's session history.
* `window.navigator`: The Navigator object, which contains information about the browser.
## Methods
* `window.alert(message)`: Displays an alert dialog with the specified message.
* `window.confirm(message)`: Displays a dialog with a specified message and OK and Cancel buttons.
* `window.open(url)`: Opens a new browser window or tab with the specified URL.
* `window.close()`: Closes the current window.
* `window.setTimeout(function, milliseconds)`: Calls a function or evaluates an expression after a specified number of 
   milliseconds.
* `window.setInterval(function, milliseconds)`: Calls a function or evaluates an expression at specified intervals (in 
   milliseconds).

```js
// Display an alert dialog
window.alert("Hello, world!");

// Get the current URL
console.log(window.location.href);

// Open a new window
window.open("https://www.example.com");

// Set a timeout to log a message after 2 seconds
window.setTimeout(function() {
  console.log("This message is shown after 2 seconds");
}, 2000);
```

**`window.history`**
The window.history object contains the browser's history. You can load previous and next URLs in the history using back() 
and next() methods.
```js
function goBack() {
  window.history.back();
}
function goForward() {
  window.history.forward();
}
```
Note: You can also access history without window prefix.

# `document` Object
The `document` object represents the HTML or XML document loaded in the browser window. It serves as the entry point to 
the content of the web page, providing methods and properties to manipulate the DOM. Can be accessed by `window.document`
or `document`.

## Properties
* **`document.title`**: Gets or sets the title of the document.
* **`document.body`**: Returns the <body> element of the document.
* **`document.head`**: Returns the <head> element of the document.
* **`document.forms`**: Returns a collection of all forms in the document.
* **`document.links`**: Returns a collection of all links in the document.
* **`document.readyState`**: Returns the current state of the document (loading, interactive, complete).

## Methods
* **`document.getElementById(id)`**: Returns the element with the specified ID.
* **`document.getElementsByClassName(className)`**: Returns a collection of elements with the specified class name.
* **`document.getElementsByTagName(tagName)`**: Returns a collection of elements with the specified tag name.
* **`document.querySelector(selector)`**: Returns the first element that matches the specified CSS selector.
* **`document.querySelectorAll(selector)`**: Returns a collection of elements that match the specified CSS selector.
* **`document.createElement(tagName)`**: Creates a new element with the specified tag name.
* **`document.createTextNode(text)`**: Creates a new text node with the specified text.
* **`document.write(html)`**: Writes HTML expressions or JavaScript code to a document.

```js
// Get the element with ID "myElement"
var element = document.getElementById("myElement");

// Change the content of the element
element.innerHTML = "Hello, world!";

// Create a new paragraph element
var newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph.";

// Append the new paragraph to the body
document.body.appendChild(newParagraph);

// Log the title of the document
console.log(document.title);

// Query all elements with class name "myClass"
var elements = document.getElementsByClassName("myClass");
console.log(elements);
```

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)