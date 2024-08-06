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

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)