# Same-Origin Policy
The same-origin policy is a security concept implemented by web browsers to restrict how resources on a web page can 
interact with resources on another web page. It is designed to prevent malicious scripts on one page from accessing 
sensitive data on another page through the Document Object Model (DOM).

**Definition of Origin**
An origin is defined by the combination of:
* **URI scheme (protocol)**: For example, http or https.
* **Hostname**: For example, www.example.com.
* **Port number**: For example, 80 for HTTP and 443 for HTTPS.

**Two URLs have the same origin if they share the same protocol, hostname, and port number.**
Example of Same-Origin
* `http://www.example.com/page1` and `http://www.example.com/page2` have the same origin.
Example of Different Origin
* `http://www.example.com` and `https://www.example.com` have different origins because the protocol is different.
* `http://www.example.com` and `http://api.example.com` have different origins because the subdomain is different.
* `http://www.example.com` and `http://www.example.com:8080` have different origins because the port number is different.

### Same-Origin Policy Restrictions
The same-origin policy restricts how documents or scripts loaded from one origin can interact with resources from another
origin. Here are some key restrictions:

* **DOM Access:** A script from one origin cannot read or modify the DOM of a document from a different origin.
* **XMLHttpRequest:** AJAX requests can only be made to the same origin from which the script was loaded. Cross-origin 
  requests are blocked unless the server explicitly allows them through Cross-Origin Resource Sharing (CORS).
* **Cookies, Storage, and Other Web APIs:** Access to cookies, local storage, and other web APIs is restricted to the
  same origin.

## Bypassing Same-Origin Policy
There are several ways to bypass the same-origin policy in a controlled and secure manner:
* **Cross-Origin Resource Sharing (CORS):** 
  * CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the
    domain from which the resource originated.
  * The server responds with appropriate headers to allow cross-origin requests.
  ```js
    Access-Control-Allow-Origin: *
  ```  
* **JSONP (JSON with Padding):** A technique used for requesting data from a server residing in a different domain by 
  adding a `<script>` tag with the URL of the server.
* **Proxy Server:** Use a server-side script to act as a proxy to fetch resources from another domain.