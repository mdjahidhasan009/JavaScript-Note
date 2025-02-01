# Throttling
Throttling is a technique used to limit the execution of an event handler function, even when this event triggers
continuously due to user actions.

The common use cases are 
* browser resizing, 
* window scrolling etc.

The below example creates a throttle function to reduce the number of events for each pixel change and trigger scroll
event for each 100ms except for the first event.
```js
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
window.addEventListener("scroll", () => {
  throttle(handleScrollAnimation, 100);
});
```

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)