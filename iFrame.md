# iFrame

## Invoking JavaScript Code in an iFrame from a Parent Page
To invoke JavaScript code in an iframe from a parent page, you need to first access the iframe and then use its
contentWindow property to execute the target function.

### Steps to Invoke JavaScript in an iFrame:
#### Access the iFrame
You can access the iframe using either document.getElementById or window.frames.

#### Use the contentWindow Property
The contentWindow property of the iframe gives you access to the window object inside the iframe, allowing you to call 
any function defined there.

```js
// Accessing the iFrame by ID
document.getElementById("targetFrame").contentWindow.targetFunction();

// Accessing the iFrame using window.frames (may not work in the latest versions of Chrome and Firefox)
window.frames[0].frameElement.contentWindow.targetFunction();
```
Using window.frames may have compatibility issues with newer browser versions, especially in Chrome and Firefox, so the 
first approach is generally recommended.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)