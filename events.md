# Events
Events in JavaScript are actions or occurrences that happen in the browser, such as a user clicking a button, loading a
page, or resizing a window. JavaScript can detect these events and respond to them using event handlers.
### Common Event Types
* **Mouse Events:** `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`
* **Keyboard Events:** `keydown`, `keyup`, `keypress`
* **Form Events:** `submit`, `reset`, `focus`, `blur`, `change`
* **Window Events:** `load`, `resize`, `scroll`, `unload`
* **Document Events:** `DOMContentLoaded`, `readystatechange`
```js
document.getElementById("myButton").addEventListener("click", function() {
  alert("Button clicked!");
});
```

## `addEventListener` Method
The `addEventListener` method is used to attach an event handler to a specified element without overwriting existing event
handlers. It provides a flexible way to handle events by allowing multiple event listeners for the same event on the same 
element.
```js
element.addEventListener(event, function, useCapture);
```
* `event`: A string representing the event type to listen for (e.g., "click", "mouseover", "keydown").
* `function`: The function to be executed when the event occurs.
* `useCapture (optional)`: A boolean indicating whether the event should be captured or bubbled. Default is false.
  * `true`: The event handler is executed during the capturing phase.
  * `false`: The event handler is executed during the bubbling phase (default).

**Adding Event Listeners**
```html
<button id="myButton">Click Me</button>
```
```js
// Adding an event listener for the click event during the bubbling phase
document.getElementById("myButton").addEventListener("click", function() {
  alert("Button clicked!");
}, false);

// Adding another event listener for the same event
document.getElementById("myButton").addEventListener("click", function() {
  console.log("Button was clicked!");
}, false);
```

**Capturing and Bubbling Phases**
```html
<div id="outer">
  <div id="inner">
    <button id="targetButton">Click Me</button>
  </div>
</div>
```
```js
// Capturing phase
document.getElementById("outer").addEventListener("click", function() {
  console.log("Outer element clicked (capturing)");
}, true);

document.getElementById("inner").addEventListener("click", function() {
  console.log("Inner element clicked (capturing)");
}, true);

document.getElementById("targetButton").addEventListener("click", function() {
  console.log("Target button clicked (capturing)");
}, true);

// Bubbling phase
document.getElementById("outer").addEventListener("click", function() {
  console.log("Outer element clicked (bubbling)");
}, false);

document.getElementById("inner").addEventListener("click", function() {
  console.log("Inner element clicked (bubbling)");
}, false);

document.getElementById("targetButton").addEventListener("click", function() {
  console.log("Target button clicked (bubbling)");
}, false);
```
Output when clicking the button
```
Outer element clicked (capturing)
Inner element clicked (capturing)
Target button clicked (capturing)
Target button clicked (bubbling)
Inner element clicked (bubbling)
Outer element clicked (bubbling)
```
**Removing Event Listeners**
You can remove an event listener using the `removeEventListener` method. This method requires the same parameters used in
`addEventListener`.
```js
function handleClick() {
  alert("Button clicked!");
}

// Adding the event listener
document.getElementById("myButton").addEventListener("click", handleClick, false);

// Removing the event listener
document.getElementById("myButton").removeEventListener("click", handleClick, false);
```
Benefits of Using `addEventListener`
* **Multiple Event Listeners:** You can add multiple event listeners to the same element for the same event type.
* **Capturing and Bubbling:** Provides control over the event propagation phase (capturing vs. bubbling).
* **Separation of Concerns:** Keeps event handling separate from HTML markup, improving maintainability.



## Event Flow
Event flow refers to the order in which events are received and handled in the web page. When an event occurs on an 
element nested within several other elements, the event triggers at each of the parent elements before reaching the 
target element. This process starts at the top level, typically the global window object, and propagates down to the 
target element.

### Capture Phase (Capturing)
In the capture phase, the event travels from the root of the DOM tree down to the target element. During this phase, the
event has the opportunity to trigger event listeners set to listen during the capturing phase.
```html
<div id="outer">
  <div id="inner">
    <button id="targetButton">Click Me</button>
  </div>
</div>
```
```js
document.getElementById("outer").addEventListener("click", function() {
  console.log("Outer element clicked (capturing)");
}, true);

document.getElementById("inner").addEventListener("click", function() {
  console.log("Inner element clicked (capturing)");
}, true);

document.getElementById("targetButton").addEventListener("click", function() {
  console.log("Target button clicked (capturing)");
}, true);
```
Output
```
Outer element clicked (capturing)
Inner element clicked (capturing)
Target button clicked (capturing)
```
### Target Phase
In the target phase, the event reaches the target element. If the target element has any event listeners for the event,
they are triggered. This phase is straightforward as it involves the target element itself.
```js
document.getElementById("targetButton").addEventListener("click", function() {
  console.log("Target button clicked (target phase)");
}, false);
```
Output
```
Target button clicked (target phase)
```
### Bubble Phase (Bubbling)
In the bubble phase, the event bubbles up from the target element back to the root of the DOM tree. During this phase, 
the event has the opportunity to trigger event listeners set to listen during the bubbling phase.
```js
document.getElementById("outer").addEventListener("click", function() {
  console.log("Outer element clicked (bubbling)");
}, false);

document.getElementById("inner").addEventListener("click", function() {
  console.log("Inner element clicked (bubbling)");
}, false);

document.getElementById("targetButton").addEventListener("click", function() {
  console.log("Target button clicked (bubbling)");
}, false);
```
Output
```
Target button clicked (bubbling)
Inner element clicked (bubbling)
Outer element clicked (bubbling)
```

## Event Flow phases
Event flow refers to the sequence in which an event triggers handlers on elements in the Document Object Model (DOM).
When an event occurs, it can pass through three phases:
### Capture Phase (Capturing)


## Types of Event Flow
### Event Capturing (Top to Bottom)
Event capturing, also known as trickling, occurs in the first phase of event propagation. During this phase, the event 
starts from the root and travels down to the target element.

**HTML**
```html
<div id="outer">
  <div id="inner">
    <button id="targetButton">Click Me</button>
  </div>
</div>
```
**JavaScript**
```js
document.getElementById("outer").addEventListener("click", function() {
  console.log("Outer element clicked (capturing)");
}, true);

document.getElementById("inner").addEventListener("click", function() {
  console.log("Inner element clicked (capturing)");
}, true);

document.getElementById("targetButton").addEventListener("click", function() {
  console.log("Target button clicked");
}, true);
```
Output when clicking the button:
```
Outer element clicked (capturing)
Inner element clicked (capturing)
Target button clicked
```

### Event Bubbling (Bottom to Top)
Event bubbling is the opposite of event capturing. In this phase, the event starts from the target element and bubbles
up to the root.
**HTML**
```html
<div id="outer">
    <div id="inner">
        <button id="targetButton">Click Me</button>
    </div>
</div>
```
**JavaScript**
```js
document.getElementById("outer").addEventListener("click", function() {
  console.log("Outer element clicked (bubbling)");
}, false);

document.getElementById("inner").addEventListener("click", function() {
  console.log("Inner element clicked (bubbling)");
}, false);

document.getElementById("targetButton").addEventListener("click", function() {
  console.log("Target button clicked");
}, false);
```
Output when clicking the button
```
Target button clicked
Inner element clicked (bubbling)
Outer element clicked (bubbling)
```

### Event Delegation
Event delegation is a technique that takes advantage of event bubbling to handle events more efficiently. Instead of 
adding event listeners to multiple child elements, a single event listener is added to a common parent element.

**HTML**
```html
<ul id="parentList">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```
**JavaScript**
```js
document.getElementById("parentList").addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    console.log("List item clicked: " + event.target.textContent);
  }
});
```

## `mouseEvent`
The `mouseEvent getModifierState()` is used to return a boolean value that indicates whether the specified modifier key is
activated or not. The modifiers such as **CapsLock, ScrollLock and NumLock** are activated when they are clicked, and
deactivated when they are clicked again.

Let's take an input element to detect the CapsLock on/off behavior with an example,
```html
<input type="password" onmousedown="enterInput(event)" />

<p id="feedback"></p>

<script>
  function enterInput(e) {
    var flag = e.getModifierState("CapsLock");
    if (flag) {
      document.getElementById("feedback").innerHTML = "CapsLock activated";
    } else {
      document.getElementById("feedback").innerHTML =
        "CapsLock not activated";
    }
  }
</script>
```

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)