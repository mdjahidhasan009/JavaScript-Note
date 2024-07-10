# IndexedDB
IndexedDB is a low-level API for client-side storage of larger amounts of structured data, including files and blobs. This API uses indexes to enable high-performance searches of this data.

**Key Features:**
* **Storage of large amounts of data:** Unlike cookies or local storage, IndexedDB can store significant amounts of data.
* **Asynchronous:** Operations are asynchronous to prevent blocking the user interface.
* **Transactions:** All operations are performed within transactions to ensure data integrity.
* **Indexes:** IndexedDB supports indexes for high-performance searches.

```js
let db;
let request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  let objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id' });
  objectStore.createIndex('name', 'name', { unique: false });
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log('Database opened successfully');
};

request.onerror = function(event) {
  console.log('Error opening database:', event.target.errorCode);
};
```

# Web Storage
Web storage provides a mechanism for browsers to store key/value pairs locally within the user's browser, offering an intuitive alternative to cookies. There are two types of web storage:

## Local Storage
* Stores data for the current origin with no expiration date.
* Data persists even after the browser is closed and reopened.
```js
// Set item
localStorage.setItem('name', 'John Doe');

// Get item
let name = localStorage.getItem('name');
console.log(name); // Outputs: John Doe

// Remove item
localStorage.removeItem('name');

// Clear all items
localStorage.clear();
```

## Session Storage
Stores data for one session, and the data is lost when the browser tab is closed.

```js
// Set item
sessionStorage.setItem('name', 'John Doe');

// Get item
let name = sessionStorage.getItem('name');
console.log(name); // Outputs: John Doe

// Remove item
sessionStorage.removeItem('name');

// Clear all items
sessionStorage.clear();
```

## `postMessage`
The `postMessage` method enables cross-origin communication between Window objects. This allows scripts to interact with each other even if they are on different pages, provided they follow the same-origin policy (same protocol, port number, and host).

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

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)