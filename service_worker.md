# Service Worker
Service Workers are a technology that allows your web application to use cached resources first and provide a default 
experience offline before getting more data from the network later. This principle is commonly known as Offline First.

Also,

A Service worker is basically a script (JavaScript file) that runs in the background, separate from a web page and provides features that don't need a web page or user interaction. Some of the major features of service workers are Rich offline experiences(offline first web application development), periodic background syncs, push notifications, intercept and handle network requests and programmatically managing a cache of responses.

#### Key Features of Service Workers

1. **Offline First:**
    - Service Workers enable web applications to load resources from cache first, providing an offline experience before 
      attempting to fetch data from the network.
2. **Promise-Based:**
    - Service Workers actively use promises, making it easier to handle asynchronous operations.

3. **Lifecycle:**
    - Service Workers have a lifecycle that includes installation, activation, and then they can react to fetch, push, 
      and sync events.

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


## Manipulating the DOM Using a Service Worker
Service workers do not have direct access to the DOM. However, they can communicate with the web pages they control by responding to messages sent via the postMessage interface. The web pages, in turn, can manipulate the DOM based on the messages received from the service worker.

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
Service workers are designed to be terminated when not in use and restarted when needed. As a result, you cannot rely on global state within a service worker's onfetch and onmessage handlers. To persist and reuse information across service worker restarts, you can use the IndexedDB API.

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

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)