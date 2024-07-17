# Progressive Web Applications (PWAs)
Progressive Web Applications (PWAs) are a type of application software delivered through the web, built using standard
web technologies including HTML, CSS, and JavaScript. PWAs are designed to work on any platform that uses a 
standards-compliant browser, including both desktop and mobile devices.

#### Key Characteristics
* **Progressive:** Work for every user, regardless of browser choice, because they are built with progressive enhancement 
  as a core principle.
* **Responsive:** Fit any form factor, from desktop to mobile devices, making them versatile and accessible.
* **Connectivity Independent:** Enhanced with service workers to work offline or on low-quality networks.
* **App-like Interactions:** Use app-shell architecture to provide app-style navigations and interactions.
* **Sync:** Always up-to-date thanks to the service worker update process.
* **Safe:** Served via HTTPS to prevent snooping and ensure content hasn’t been tampered with.
* **Discoverable:** Identifiable as “applications” thanks to W3C manifests and service worker registration, and can be
  indexed by search engines.
* **Re-engageable:** Make re-engagement easy through features like push notifications.
* **Installable:** Allow users to “keep” apps they find most useful on their home screen without the hassle of an app
  store.
* **Linkable:** Easily shared via a URL and do not require complex installation.

#### Benefits of PWAs
* **Improved Performance:** Fast loading times and smooth animations enhance user experience.
* **Offline Support:** Service workers enable offline capabilities, allowing users to interact with the app without an
  internet connection.
* **Push Notification:** Can send push notifications to re-engage users.
* **App-like Feel:** Provides a seamless, app-like experience with features such as home screen installation and 
  full-screen modes.
* **Cost-effective:** Build once and deploy everywhere, reducing development and maintenance costs compared to building
  separate native apps for different platforms.

### Example of PWA Features
* **Service Workers:** JavaScript files that run in the background and handle caching, push notifications, and background 
  sync.
  ```js
    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open('static-v1').then(cache => {
          return cache.addAll([
            '/',
            '/index.html',
            '/styles.css',
            '/app.js',
          ]);
        })
      );
  });

  self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
        return response || fetch(event.request);
        })
    );
  });
  ```
* **Web App Manifest:** A JSON file that provides metadata about the application, including name, icons, and start URL.
  ```json
    {
      "name": "My PWA",
      "short_name": "PWA",
      "start_url": "/index.html",
      "display": "standalone",
      "background_color": "#ffffff",
      "description": "An example of a progressive web application",
      "icons": [
        {
          "src": "icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    }
  ```
* **Push Notifications:** Using the Push API to re-engage users with timely notifications.
  ```js
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Hello, world!');
     }
    });
  ```

## App Shell Model
The application shell (or app shell) model is an architectural approach to building Progressive Web Apps (PWAs) that 
aims to deliver a reliable and instant user experience similar to native applications. The app shell model separates the 
static resources (the shell) from the dynamic content, allowing for a fast initial load and a smooth user experience.
### Key concepts
* **Application Shell**
  * The app shell is the minimal HTML, CSS, and JavaScript required to power the user interface of the app.
  * It is cached locally using service workers, enabling it to load instantly on repeat visits without a network connection.
* **Dynamic Content**
  * The dynamic content (e.g., user data, images, articles) is loaded separately from the network or cache.
  * This content is fetched and rendered within the app shell.
#### Benefits of the App Shell Model
* **Instant Loading:** The app shell can be cached locally and served immediately on subsequent visits, providing a 
  near-instant loading experience.
* **Offline Support:** By caching the app shell and other necessary resources, users can access the app even when 
  offline or on a slow network.
* **Improved Performance:** Separating the static shell from dynamic content reduces the initial load time and enhances 
  the perceived performance of the app.

### How It Works
* **Initial Load**
  * On the first visit, the app shell is loaded from the network and cached using a service worker.
  * The dynamic content is then fetched and rendered within the shell.
* **Subsequent Loads:** 
  * On repeat visits, the app shell is served from the cache, ensuring a fast initial load.
  * Dynamic content is fetched from the network or updated from the cache.

### Example Structure
**index.html(App Shell)**
```html
<!DOCTYPE html>
<html>
<head>
  <title>App Shell Example</title>
  <link rel="stylesheet" href="styles.css">
  <script src="app.js" defer></script>
</head>
<body>
  <header>
    <h1>My App</h1>
  </header>
  <main id="content">
    <!-- Dynamic content will be loaded here -->
  </main>
  <footer>
    <p>&copy; 2024 My App</p>
  </footer>
</body>
</html>
```
**app.js (Service Worker Registration)**
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })
    .catch(error => {
      console.log('ServiceWorker registration failed: ', error);
    });
}

// Fetch dynamic content
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = data.content;
  });
```
**service-worker.js (Service Worker for Caching)**
```js
const CACHE_NAME = 'app-shell-cache-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/app.js',
  '/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
```

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)