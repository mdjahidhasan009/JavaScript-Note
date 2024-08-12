# Observable
An Observable is a function that produces a stream of values over time. These values can be emitted synchronously or 
asynchronously. Observables are central to reactive programming, where they allow you to work with asynchronous data 
streams.

## Key Concepts

### Observer
The consumer that receives the values from the Observable. An observer is an object with methods like next, error, and
complete that handle the data, errors, or the completion of the stream.

### Subscription
The process of connecting an observer to an Observable, allowing the observer to start receiving values.

### Operators
Functions that allow you to manipulate the data emitted by an Observable. Operators can be used to filter, transform,
combine, or otherwise modify the data stream.

## Others
* subscribe(): This method connects the observer to the Observable. When you call subscribe(), the Observable starts 
  emitting values, which the observer can then react to.
* Synchronous vs. Asynchronous: Observables can emit values immediately (synchronously) or after a delay 
  (asynchronously), making them versatile for various scenarios, such as handling events, fetching data, or responding
  to user actions.

```js
import { Observable } from "rxjs";

const observable = new Observable((observer) => {
  setTimeout(() => {
    observer.next("Message from an Observable!");
  }, 3000);
});

observable.subscribe((value) => console.log(value));
```
* Observable Creation: The Observable is created with a function that takes an observer as an argument. This function will emit values using the next method of the observer.
* Asynchronous Emission: The setTimeout function is used to emit a value after a 3-second delay, demonstrating asynchronous behavior.
* Subscription: The subscribe method is called to connect an observer to the Observable, which logs the emitted value when it is received.

<img src="../images/design_patterns/observables.png" alt="observables" />

Note: Observables are not part of the JavaScript language yet but they are being proposed to be added to the language

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)