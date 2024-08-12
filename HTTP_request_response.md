JavaScript provides the XMLHttpRequest object to interact with servers and retrieve data from them. You can use 
XMLHttpRequest to make both synchronous and asynchronous HTTP requests.

# Synchronous HTTP Request
A synchronous HTTP request blocks the execution of code until the response is received. This can be useful for simple 
tasks but should generally be avoided in modern web development due to its blocking nature, which can lead to a poor user 
experience.
```js
function httpGet(theUrl) {
  var xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.open("GET", theUrl, false); // false for synchronous request
  xmlHttpReq.send(null);
  return xmlHttpReq.responseText;
}

// Usage
var response = httpGet('https://api.example.com/data');
console.log(response);
```
* `xmlHttpReq.open("GET", theUrl, false)` opens a synchronous GET request.
* `xmlHttpReq.send(null)` sends the request to the server.
* The function returns the response text once the request is completed.

# Asynchronous HTTP Request
An asynchronous HTTP request does not block the execution of code while waiting for the server's response. Instead, it
uses a callback function to handle the response once it is received.
```js
function httpGetAsync(theUrl, callback) {
  var xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.onreadystatechange = function () {
    if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200)
      callback(xmlHttpReq.responseText);
  };
  xmlHttpReq.open("GET", theUrl, true); // true for asynchronous
  xmlHttpReq.send(null);
}

// Usage
httpGetAsync('https://api.example.com/data', function(response) {
  console.log(response);
});
```
* `xmlHttpReq.open("GET", theUrl, true)` opens an asynchronous GET request.
* `xmlHttpReq.onreadystatechange` is set to a function that checks if the request has completed (`readyState == 4`) and
  if the response was successful (`status == 200`).
* The callback function is called with the response text once the request is completed.

## AbortController
The AbortController interface represents a controller object that allows you to abort one or more Web requests as and 
when desired. The AbortController object works in conjunction with the fetch() method and the AbortSignal interface.

To cancel a fetch request in JavaScript, you can use the AbortController API, which provides a way to signal that a 
request should be aborted. Here's how you can use it:
* Create an AbortController Instance: This controller will be used to signal the request to be aborted.
* Obtain the Signal: Get the signal property from the AbortController instance. This signal will be passed as an option 
  to the fetch call.
* Pass the Signal to Fetch: Include the signal in the fetch request options.
* Abort the Request: Call the abort() method on the AbortController instance to cancel all requests using that signal.

```js
// Step 1: Create an AbortController instance
const controller = new AbortController();
const { signal } = controller;

// Step 2: Use the signal in fetch requests
fetch("http://localhost:8000", { signal })
  .then((response) => {
    console.log(`Request 1 is complete!`);
  })
  .catch((e) => {
    if (e.name === "AbortError") {
      // Handle the abort
      console.log('Request 1 was aborted');
    }
  });

fetch("http://localhost:8000", { signal })
  .then((response) => {
    console.log(`Request 2 is complete!`);
  })
  .catch((e) => {
    if (e.name === "AbortError") {
      // Handle the abort
      console.log('Request 2 was aborted');
    }
  });

// Step 3: Abort both requests after 2 seconds
setTimeout(() => controller.abort(), 2000);
```

Key Points
* AbortSignal: The signal property of AbortController is an instance of AbortSignal, which is used to communicate with 
  the fetch request about the need to abort.
* AbortError: When a request is aborted, it throws an AbortError, which you can handle in the catch block.
* Cancelling Multiple Requests: If you pass the same signal to multiple fetch requests, calling controller.abort() will
  cancel all requests associated with that signal.

This method provides a clean and effective way to manage request cancellation, particularly useful in scenarios like user navigation or complex data fetching operations where requests may need to be terminated prematurely.

### Different ways to make an HTTP request in JavaScript
1. Callbacks
2. Promises
3. Async/Await
4. Third-party libraries like Axios, jQuery, etc.

## AJAX
AJAX (Asynchronous JavaScript and XML) is  is a group of related technologies(HTML, CSS, JavaScript, XMLHttpRequest API 
etc.) used to display data asynchronously. It allows web pages to be updated asynchronously by exchanging small amounts 
of data with the server behind the scenes. This means that it is possible to update parts of a web page without reloading 
the entire page.

## Fetch API
The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to
anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.

The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests
and responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources
asynchronously across the network.

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)