# IndexedDB
IndexedDB is a low-level API for client-side storage of larger amounts of structured data, including files and blobs. This API uses indexes to enable high-performance searches of this data.

**Key Features:**
* **Storage of large amounts of data:** Unlike cookies ,local/session storage, IndexedDB can store significant amounts of data.
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
Web storage provides a mechanism for browsers to store key/value pairs locally within the user's browser, offering an 
intuitive alternative to cookies. There are two types of web storage:

The Window object implements the `WindowLocalStorage` and `WindowSessionStorage` objects, which have `localStorage` 
(`window.localStorage`) and `sessionStorage` (`window.sessionStorage`) properties, respectively. These properties create
an instance of the `Storage` object, through which data items can be set, retrieved, and removed for a specific domain 
and storage type (session or local).

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

## Storage Event and Event Handler
The `StorageEvent` fires when a storage area has been changed in the context of another document. The `onstorage` property 
is an event handler for processing storage events.
````js
window.onstorage = function(e) {
  console.log(
    "The " +
    e.key +
    " key has been changed from " +
    e.oldValue +
    " to " +
    e.newValue +
    "."
  );
};
````

## Checking Web Storage Browser Support
To check is browser support `localstorage` and `sessionStorage` we can use following code
```js
if (typeof Storage !== "undefined") {
  // Code for localStorage/sessionStorage.
} else {
  // Sorry! No Web Storage support..
}
```



# Cookies
A cookie is a piece of data stored on your computer that can be accessed by your browser. Cookies are saved as key/value
pairs. For example, you can create a cookie named username as follows:
```js
document.cookie = "username=John";
```

Cookies are often used to remember user information, such as login details, across sessions. This can enhance the user 
experience by retaining settings or information between visits to a website.

Cookies have several properties:

* **Name/Value:** Basic data stored in the cookie.
* **Expiry Date:** Determines how long the cookie will persist before being automatically deleted.
* **Path:** Defines the URL path for which the cookie is valid.
* **Domain:** Specifies the domain that can access the cookie.
* **Secure:** A flag indicating that the cookie should only be sent over secure (HTTPS) connections.

By default cookie gets deleted when the browser is closed to prevent this we can add expire date.
To set an expiry date for a cookie, you can use the expires attribute:
```js
document.cookie = "username=John; expires=Fri, 31 Dec 2024 23:59:59 GMT";
```
To delete a cookie, set its expiry date to a past date:
```js
document.cookie = "username=John; expires=Thu, 01 Jan 1970 00:00:00 GMT";
```
Note: We should define the cookie path option to ensure that you delete the right cookie. Some browsers doesn't allow 
to delete a cookie unless you specify a path parameter.
```js
document.cookie =
  "username=; expires=Fri, 07 Jun 2019 00:00:00 UTC; path=/;";
```



By default, the cookie belongs to a current page. But you can tell the browser what path the cookie belongs to using a 
path parameter.
````js
document.cookie = "username=John; path=/services";
````
<img src="./images/cookie.png" alt="cookie" />

Source [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)

## Differences Between Cookie, Local Storage, and Session Storage

| Feature              | Cookie                         | Local Storage                | Session Storage               |
|----------------------|--------------------------------|------------------------------|-------------------------------|
| Accessed on          | Both server-side & client-side | Client-side only             | Client-side only              |
| Lifetime             | As configured using Expires option | Until deleted                 | Until tab is closed           |
| SSL support          | Supported                      | Not supported                | Not supported                 |
| Maximum data size    | 4KB                            | 5 MB                         | 5 MB                          |

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)