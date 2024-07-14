# Server-Sent Events (SSE)
Server-Sent Events (SSE) is a server push technology that enables a browser to receive automatic updates from a server 
via a single HTTP connection. Unlike WebSockets, which provide full-duplex communication, SSE provides a one-way 
communication channel from the server to the client. This technology is useful for applications that require real-time
updates, such as social media feeds, stock price updates, and news feeds.

**Key Characteristics:**

* **One-Way Communication:** Events flow from server to client only.
* **Uses HTTP Connection:** Operates over standard HTTP connections.
* **Automatic Reconnection:** The browser automatically reconnects to the server if the connection is lost.

#### Receiving Server-Sent Event Notifications
To receive server-sent event notifications, you can use the `EventSource` object. Here is an example of how to receive 
messages from a server:
```js
if (typeof EventSource !== "undefined") {
  var source = new EventSource("sse_generator.js");
  source.onmessage = function(event) {
    document.getElementById("output").innerHTML += event.data + "<br>";
  };
}
```
#### Checking Browser Support for Server-Sent Events
Before using SSE, it is important to check if the browser supports it. You can perform this check using the following code:
```js
if (typeof EventSource !== "undefined") {
  // Server-sent events supported. Let's have some code here!
} else {
  // No server-sent events supported
}
```
#### Events Available for Server-Sent Events
There are several events available for handling server-sent events:

| Event      | Description                                   |
|------------|-----------------------------------------------|
| `onopen`   | Used when a connection to the server is opened. |
| `onmessage`| Used when a message is received from the server. |
| `onerror`  | Used when an error occurs.                    |

**Example: Handling Different Events:** `onopen`, `onmessage`, `onerror`
```js
var source = new EventSource("sse_generator.js");

source.onopen = function(event) {
  console.log("Connection to server opened.");
};

source.onmessage = function(event) {
  console.log("New message: ", event.data);
};

source.onerror = function(event) {
  if (event.readyState == EventSource.CLOSED) {
    console.log("Connection to server closed.");
  } else {
    console.log("Error occurred: ", event);
  }
};
```

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)