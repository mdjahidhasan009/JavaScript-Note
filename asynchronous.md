
### Promises in JavaScript

**Definition:**
Promises are a mechanism for handling asynchronous operations in JavaScript. They represent a value that may be available now, or in the future, or never. A promise has three states: pending, fulfilled, and rejected.

**Key Points:**
1. **Sequential Handling of Asynchronous Operations:** Promises are useful for handling async operations in a sequential manner. For example, you can request a list of all flights and then request details for each flight based on the initial results.
2. **State Machine:** A promise represents a future value and works like a state machine with states: pending, fulfilled, and rejected.
3. **Then Method:** A promise object has a `then` method where you can specify what to do when the promise is fulfilled or rejected.
4. **Chaining:** You can chain `then()` blocks to avoid callback hell and make the code more readable.
5. **Error Handling:** Errors can be handled in the `catch()` block.
6. **Immutability:** After a promise is set to a fulfilled or rejected state, it becomes immutable.

**Basic Usage Example:**
```javascript
let promise = new Promise((resolve, reject) => {
    // Do something async
    let success = true;
    if (success) {
        resolve('Success!');
    } else {
        reject('Error!');
    }
});

promise.then(result => {
    console.log(result); // Output: Success!
}).catch(error => {
    console.log(error); // Output: Error!
});
```

**Chaining Example:**
```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return fetch('https://api.example.com/other-data');
    })
    .then(response => response.json())
    .then(otherData => {
        console.log(otherData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

**Advanced Concepts:**

1. **Async/Await:**
    - `async/await` makes the code appear more linear and easier to read.
   ```javascript
   async function fetchData() {
       try {
           let response = await fetch('https://api.example.com/data');
           let data = await response.json();
           console.log(data);
           let otherResponse = await fetch('https://api.example.com/other-data');
           let otherData = await otherResponse.json();
           console.log(otherData);
       } catch (error) {
           console.error('Error:', error);
       }
   }

   fetchData();
   ```

2. **RxJS Observables:**
    - Observables can be viewed as recyclable promises and offer more sophisticated ways to handle asynchronous data streams.
   ```javascript
   import { from } from 'rxjs';
   import { map, catchError } from 'rxjs/operators';

   const observable = from(fetch('https://api.example.com/data').then(response => response.json()));

   observable.pipe(
       map(data => {
           console.log(data);
           return fetch('https://api.example.com/other-data').then(response => response.json());
       }),
       catchError(error => {
           console.error('Error:', error);
           throw error;
       })
   ).subscribe(otherData => {
       console.log(otherData);
   });
   ```

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
