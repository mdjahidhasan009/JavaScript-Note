# Global Variables
Global variables are variables that are accessible from anywhere in your JavaScript code. They are defined in the global
scope, meaning they can be used in any function or block of code. In a browser environment, global variables are properties
of the window object.

## Declaring Global Variables
Global variables can be declared in two main ways:
* **Implicit Declaration** By assigning a value to a variable without using `var`, `let`, or `const`. This creates a global 
  variable.
  ```js
  a = 10; // Implicitly declared global variable
  console.log(window.a); // 10
  ```
* **Explicit Declaration** By declaring a variable using `var` outside any function or block. Note that `let` and `const`
  do not create global variables when declared in the global scope.
   ```js
   var b = 20; // Explicitly declared global variable
   console.log(window.b); // 20
   ```
* **Accessing Global Variables** Global variables can be accessed from anywhere in your code, including inside functions
  and blocks.
   ```js
   var c = 30;
   
   function exampleFunction() {
     console.log(c); // 30
   }
   
   exampleFunction();
   console.log(c); // 30
   ```

## Global Variables and the `window` Object
In a browser environment, all global variables declared using `var` are properties of the `window` object. However, global 
variables declared using `let` and `const` do not become properties of the window object.
```js
var d = 40;
let e = 50;
const f = 60;

console.log(window.d); // 40
console.log(window.e); // undefined
console.log(window.f); // undefined
```

## Potential Issues with Global Variables
* **Namespace Pollution:** Global variables can lead to namespace pollution, where multiple scripts might define variables
  with the same name, causing conflicts.
* **Difficulty in Debugging** Excessive use of global variables can make debugging difficult, as it becomes harder to 
  track the changes and dependencies of these variables.
* **Memory Leaks** Since global variables persist for the lifetime of the application, they can lead to memory leaks if
  not managed properly.
* **Accidental Globals** Variables declared without `var`, `let`, or `const` inside functions or blocks create accidental
  global variables.
   ```js
   function createGlobal() {
     g = 70; // Creates an accidental global variable
   }
   
   createGlobal();
   console.log(window.g); // 70
   ```

## Best Practices for Global Variables
* **Minimize Use** Limit the use of global variables to reduce the risk of conflicts and make the code easier to maintain.
* **Use let and const** Prefer using `let` and `const` to declare variables, which have block scope and do not create 
  properties on the `window` object.
* **Encapsulation** Encapsulate code in functions or modules to avoid polluting the global namespace.
* **Use Namespaces** Create namespaces for global variables to group related variables together and avoid conflicts.
   ```js
   var MyApp = {};
   MyApp.value = 100;
   MyApp.method = function() {
     console.log(MyApp.value);
   };
   MyApp.method(); // 100
   ```

# `window`,`document`
In JavaScript, the `window` and `document` **objects** are two core components of the `Browser Object Model (BOM)` and the 
`Document Object Model (DOM)`, respectively. They play crucial roles in interacting with the web page and its elements.

## `window` object
The `window` object represents the **browser's window containing the web page**. It is the global object in the 
client-side JavaScript environment, meaning all global JavaScript objects, functions, and variables automatically become
members of the window object. By default it is available throw `window` object.

### Properties
* `window.innerHeight`: The inner height of the browser window.
* `window.innerWidth`: The inner width of the browser window.
* `window.location`: The Location object, which contains information about the current URL.
  * `window.location.href` returns the entire url path.
  * `window.location.protocol` return protocol of the url
  * `window.location.host` return the hostname of the url
  * `window.location.port` return the port number.
  * `window.location.pathname` return the pathname of the url.
  * `window.location.search` return the query portion of the url.
    ```js
    const urlParams = new URLSearchParams(window.location.search);
    const clientCode = urlParams.get("clientCode");
    ```
  * `window.location.hash` return the anchor of the url.
* `window.history`: The History object, which provides access to the browser's session history.
* `window.navigator`: The Navigator object, which contains information about the browser.
### Methods
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

### Methods to redirect
* `window.location.href` This is the most common method to redirect to a new page.
  ```js
  function redirect() {
    window.location.href = "newPage.html";
  }
  ```
* `window.location.assign()` This method is similar to window.location.href and can be used to load a new document.
  ```js
  function redirect() {
    window.location.assign("newPage.html");
  }
  ```
* `window.location.replace()` This method replaces the current document with the new one. The difference from assign is 
  that it does not create an entry in the browser's history, meaning the user cannot navigate back to the original 
  document using the back button.
  ```js
  function redirect() {
    window.location.replace("newPage.html");
  }
  ```
* `window.location.pathname` This method can be used to redirect within the same domain.
  ```js 
  function redirect() {
    window.location.pathname = "/newPage.html";
  }
  ```

### `navigator`
The navigator object is a global variable in JavaScript. It is part of the Browser Object Model (BOM) and provides 
information about the browser and the operating system. The navigator object is accessible from any script running in the
browser, and it does not require any special declaration or inclusion.

The navigator object contains various properties and methods that provide information and control over the browser.
* `navigator.appName`: The name of the browser.
* `navigator.appVersion`: The version of the browser.
* `navigator.userAgent`: The user agent string for the browser.
* `navigator.platform`: The platform the browser is running on.
* `navigator.language`: The preferred language of the user.
* `navigator.onLine`: A boolean value indicating whether the browser is online.
* `navigator.cookieEnabled`: A boolean value indicating whether cookies are enabled.
* `navigator.geolocation`: Provides access to the geolocation API.
  ```js
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
    });
  } else {
    console.log("Geolocation is not available.");
  }
  ```
* `navigator.mediaDevices`: Provides access to media devices such as cameras and microphones.
   ```js
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function(stream) {
        console.log("Got access to media devices.");
        }
    )
    .catch(function(err) {
        console.log("Error accessing media devices: " + err);
    }
  );
   ```
```js
console.log("Browser Name: " + navigator.appName);
console.log("Browser Version: " + navigator.appVersion);
console.log("User Agent: " + navigator.userAgent);
console.log("Platform: " + navigator.platform);
console.log("Language: " + navigator.language);
console.log("Online: " + navigator.onLine);
console.log("Cookies Enabled: " + navigator.cookieEnabled);
```

## `document` Object
The `document` object represents the HTML or XML document loaded in the browser window. It serves as the entry point to 
the content of the web page, providing methods and properties to manipulate the DOM. Can be accessed by `window.document`
or `document`.

### Properties
* **`document.title`**: Gets or sets the title of the document.
* **`document.body`**: Returns the <body> element of the document.
* **`document.head`**: Returns the <head> element of the document.
* **`document.forms`**: Returns a collection of all forms in the document.
* **`document.links`**: Returns a collection of all links in the document.
* **`document.readyState`**: Returns the current state of the document (loading, interactive, complete).

### Methods
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

### `document.forms`
We can submit a form programmatically using JavaScript in various ways. One of the simplest methods is using the 
`document.forms[0].submit()` method, which submits the first form on the page. This can be particularly useful for 
handling form submissions dynamically without requiring user interaction.

#### `document.forms[0].submit()`
The `document.forms` collection contains all the forms on a web page. By accessing the first form in the collection with
`document.forms[0]` and calling the submit method, you can submit the form programmatically.
```html
<!DOCTYPE html>
<html>
<head>
  <title>Form Submission</title>
</head>
<body>
  <form id="myForm" action="/submit" method="post">
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <input type="submit" value="Submit">
  </form>
  <button onclick="submitForm()">Submit Form using JavaScript</button>

  <script>
    function submitForm() {
      document.forms[0].submit();
    }
  </script>
</body>
</html>
```
In this example, clicking the button labeled "Submit Form using JavaScript" will trigger the `submitForm` function, which 
submits the form.

#### Using the `onsubmit` Event Handler
We can also handle form submission by using the onsubmit event handler to validate or manipulate form data before 
submission.
```html
<!DOCTYPE html>
<html>
<head>
  <title>Form Submission</title>
</head>
<body>
  <form id="myForm" action="/submit" method="post" onsubmit="return validateForm()">
    <input type="text" id="username" name="username" placeholder="Username">
    <input type="password" id="password" name="password" placeholder="Password">
    <input type="submit" value="Submit">
  </form>

  <script>
    function validateForm() {
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      if (username === "" || password === "") {
        alert("Both fields are required!");
        return false;
      }
      return true;
    }
  </script>
</body>
</html>
```
In this example, the validateForm function checks if both the username and password fields are filled out before allowing
the form to be submitted. If either field is empty, an alert is displayed, and the form submission is prevented.


Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)