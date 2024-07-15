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


Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)