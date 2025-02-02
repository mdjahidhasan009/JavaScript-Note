# Service Worker
Service Workers are a technology that allows your web application to use cached resources first and provide a default 
experience offline before getting more data from the network later. This principle is commonly known as Offline First.

Also,

A Service worker is basically a script (JavaScript file) that runs in the background, separate from a web page and
provides features that don't need a web page or user interaction. Some of the major features of service workers are Rich 
offline experiences(offline first web application development), periodic background syncs, push notifications, intercept 
and handle network requests and programmatically managing a cache of responses.

#### Key Features of Service Workers

1. **Offline First:**
    - Service Workers enable web applications to load resources from cache first, providing an offline experience before 
      attempting to fetch data from the network.
2. **Promise-Based:**
    - Service Workers actively use promises, making it easier to handle asynchronous operations.
3. **Lifecycle:**
    - Service Workers have a lifecycle that includes installation, activation, and then they can react to fetch, push, 
      and sync events.
4. **Works on**
   - Service Workers only work on secure origins (HTTPS), except for `localhost` which can be used for testing.
5. **Push notification**
   - Service worker can be used for push notification.
6. **Background Synchronization**
   - Service worker can be used for background synchronization and handle background tasks.
7. **`postmessage`**
   - Use `postMessage` to communicate with controlled clients (web pages).

#### Service Worker Lifecycle

1. **Installation:**
    - The Service Worker is installed in the browser.

2. **Activation:**
    - Once installed, the Service Worker is activated and can start controlling web pages.

3. **Events:**
    - After activation, the Service Worker can handle events such as `fetch` (network requests), `push` (notifications), 
      and `sync` (background synchronization).

#### Example Use Case

Service Workers can be used to:
- Cache static assets (HTML, CSS, JavaScript files).
- Provide offline support for web applications.
- Improve performance by serving cached content.
- Handle background tasks like push notifications and background sync.

### Creating a service worker
```js
// service-worker.js

self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
  // Perform install steps
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
  // Perform activate steps
});

self.addEventListener('fetch', function(event) {
  console.log('Fetching:', event.request.url);
  // Respond to fetch events
});
```

## Manipulating the DOM Using a Service Worker
Service workers do not have direct access to the DOM. However, they can communicate with the web pages they control by 
responding to messages sent via the postMessage interface. The web pages, in turn, can manipulate the DOM based on the 
messages received from the service worker.

**Communicating with service worker**

`Service Worker (sw.js)`
```js
self.addEventListener('message', event => {
  // Process the message from the web page
  console.log('Received message from page:', event.data);
  
  // Send a response back to the web page
  event.ports[0].postMessage('Hello from the Service Worker');
});
```

`Web Page (main.js)`
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('Service Worker registered with scope:', registration.scope);

    // Create a message channel
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = event => {
      // Process the response from the service worker
      console.log('Received response from Service Worker:', event.data);

      // Manipulate the DOM based on the response
      document.getElementById('output').textContent = event.data;
    };

    // Send a message to the service worker
    navigator.serviceWorker.controller.postMessage('Hello from the page', [messageChannel.port2]);
  });
}
```

`HTML (index.html)`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Worker Communication</title>
</head>
<body>
  <h1>Service Worker Communication Example</h1>
  <p id="output"></p>
  <script src="main.js"></script>
</body>
</html>
```

## Reusing Information Across Service Worker Restarts
Service workers are designed to be terminated when not in use and restarted when needed. As a result, you cannot rely on
global state within a service worker's onfetch and onmessage handlers. To persist and reuse information across service
worker restarts, you can use the IndexedDB API.

**Using IndexedDB in a Service Worker**

`Service Worker (sw.js)`
```js
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const db = await openDatabase();
      // Store initial data or perform other setup tasks
    })()
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      const db = await openDatabase();
      const data = await getDataFromDatabase(db);
      // Use the persisted data to respond to the fetch event
      return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
    })()
  );
});

async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('my-database', 1);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore('data', { keyPath: 'id' });
    };

    request.onsuccess = event => {
      resolve(event.target.result);
    };

    request.onerror = event => {
      reject(event.target.error);
    };
  });
}

async function getDataFromDatabase(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('data', 'readonly');
    const store = transaction.objectStore('data');
    const request = store.get(1);

    request.onsuccess = event => {
      resolve(event.target.result);
    };

    request.onerror = event => {
      reject(event.target.error);
    };
  });
}
```

# Web worker
Web Workers provide a way to run scripts in background threads. This allows for the execution of heavy computations 
without blocking the main thread, thus improving the performance and responsiveness of web applications.

* Ideal for offloading heavy computations from the main thread to avoid UI blocking.
* Tied to the lifecycle of the web page that created them.
* Use `postMessage` to communicate with the main thread.

### Limitations of Web Workers
* **Window Object:** Web Workers don't have access to the window object.
* **Document Object:** Web Workers don't have access to the document object.
* **Parent Object:** Web Workers don't have access to the parent object.

### Creating a web worker
To create a Web Worker, you need to write a separate JavaScript file for the worker script and then create a worker in 
our main script using the `Worker` constructor.
**Worker Script (worker.js)**
```js
onmessage = function(event) {
  console.log('Received from main thread:', event.data);
  // Perform some computation
  let result = event.data * 2;
  // Send the result back to the main thread
  postMessage(result);
};
```
**Main Script (main.js)**
```js
// Create a new Web Worker
const worker = new Worker('worker.js');

// Send a message to the worker
worker.postMessage(10);

// Receive messages from the worker
worker.onmessage = function(event) {
  console.log('Received from worker:', event.data);
};
```

### Catching Messages
Messages can be sent between the main thread and the worker using the postMessage method. Messages received from the
worker can be caught using the onmessage event handler.

**Main Script (main.js)**
```js
worker.postMessage('Hello, worker!');

worker.onmessage = function(event) {
   console.log('Received from worker:', event.data);
};
```

**Worker Script (worker.js)**
```js
onmessage = function(event) {
   console.log('Received from main thread:', event.data);
   postMessage('Hello, main thread!');
};
```

### Terminating a Web Worker
You can terminate a Web Worker using the `terminate` method. This stops the worker immediately without an opportunity to 
complete its operations or clean up after itself.

**Main Script (main.js)**
```js
// Create a new Web Worker
const worker = new Worker('worker.js');

// Terminate the worker
worker.terminate();
console.log('Worker terminated');
```


## Check web workers browser support
```js
if (typeof Worker !== "undefined") {
  // code for Web worker support.
} else {
  // Sorry! No Web Worker support..
}
```

## `postMessage`
Service Workers and Web Workers use the postMessage method for communication, but they serve different purposes and have 
different contexts of usage.

### Web Workers
Web Workers use `postMessage` to communicate with the main thread (the web page that created the worker). Here’s how we 
can use `postMessage` in Web Workers:

**Main Thread (web page)**
```js
// main.js
const worker = new Worker('worker.js');

// Sending a message to the worker
worker.postMessage('Hello, worker!');

// Receiving a message from the worker
worker.onmessage = function(event) {
  console.log('Received from worker:', event.data);
};
```

**Web Worker**
```js
// worker.js
onmessage = function(event) {
  console.log('Received from main thread:', event.data);
  // Sending a message back to the main thread
  postMessage('Hello, main thread!');
};
```

### Service Workers
Service Workers use `postMessage` to communicate with the controlled pages (clients) and also between different Service 
Worker contexts. Here’s how we can use `postMessage` in Service Workers

**Main Thread(web page)**
```js
// main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    console.log('Service Worker registered with scope:', registration.scope);
    
    // Sending a message to the service worker
    navigator.serviceWorker.controller.postMessage('Hello, Service Worker!');
  });
  
  // Receiving a message from the service worker
  navigator.serviceWorker.onmessage = function(event) {
    console.log('Received from Service Worker:', event.data);
  };
}
```

**Service Worker**
```js
// service-worker.js
self.addEventListener('message', function(event) {
  console.log('Received from main thread:', event.data);
  // Sending a message back to the main thread
  event.source.postMessage('Hello, main thread!');
});
```

### Cross-Origin Communication with `postMessage`
The `postMessage` method enables cross-origin communication between Window objects. This allows scripts to interact with
each other even if they are on different pages, provided they follow the same-origin policy (same protocol, port number,
and host).

**Use Cases:**
* Communication between a page and a pop-up it spawned.
* Communication between a page and an embedded iframe.

**Parent Window**
```js
let iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage('Hello from parent', 'https://example.com');
```

**Iframe Window**
```js
window.addEventListener('message', function(event) {
  if (event.origin !== 'https://example.com') {
    return; // Ignore messages from unknown origins
  }
  console.log(event.data); // Outputs: Hello from parent
});
```

### PostMessage Security Considerations
PostMessages can be considered secure if used correctly, specifically by carefully checking the origin and source of the
arriving message. Failure to verify the source can lead to cross-site scripting (XSS) attacks, making it crucial to 
implement proper validation.

### Issues with Using Wildcard in PostMessage Target Origin
The postMessage method's second argument specifies which origin is allowed to receive the message. Using the wildcard * 
as the argument allows any origin to receive the message, creating a security risk. The sender window cannot verify if
the target window is still at the expected origin when sending the message. If the target window navigates to another 
origin, that origin could receive the data, leading to potential XSS vulnerabilities.

**Example of using wildcard:**
```js
targetWindow.postMessage(message, "*");
```

### Avoiding Malicious PostMessages
Attackers can exploit the postMessage method by sending a message from an unauthorized origin, tricking the receiver 
into believing it came from a legitimate source. To avoid this, the receiver should validate the origin of the message
using the message.origin attribute. For instance, to check the sender's origin on the receiver side:

Example

```js
// Listener on http://www.some-receiver.com/
window.addEventListener("message", function(message){
    if(/^http://www\.some-sender\.com$/.test(message.origin)){
         console.log('You received the data from a valid sender', message.data);
   }
});
```

### Necessity of Using PostMessages
Completely avoiding the use of postMessages is not feasible because many third-party scripts rely on postMessage to 
communicate with their respective services. Even if your application does not directly use postMessage, third-party 
scripts might use it without your knowledge, making it an integral part of web communication.

### PostMessages: Synchronous or Asynchronous?
The behavior of postMessages differs across browsers. In IE8, postMessages are synchronous, but in IE9 and all modern 
browsers (IE9+, Firefox, Chrome, Safari), they are asynchronous. Due to this asynchronous nature, developers often 
implement a callback mechanism to handle the return of the postMessage.



Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)