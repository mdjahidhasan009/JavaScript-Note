# Event Loop
The event loop is a process that continuously monitors both the call stack and the event queue and checks whether or not
the call stack is empty. If the call stack is empty and there are pending events in the event queue, the event loop
dequeues the event from the event queue and pushes it to the call stack. The call stack executes the event, and any 
additional events generated during the execution are added to the end of the event queue.

Note: The event loop allows Node.js to perform non-blocking I/O operations, even though JavaScript is single-threaded,
by offloading operations to the system kernel whenever possible. Since most modern kernels are multi-threaded, they can
handle multiple operations executing in the background.

# Call Stack
Call Stack is a data structure for javascript interpreters to keep track of function calls(creates execution context) 
in the program. It has two major actions,
* Whenever you call a function for its execution, you are pushing it to the stack.
* Whenever the execution is completed, the function is popped out of the stack.

# Event Queue
The event queue follows the queue data structure. It stores async callbacks to be added to the call stack. It is also
known as the Callback Queue or Macrotask Queue.

Whenever the call stack receives an async function, it is moved into the Web API. Based on the function, Web API 
executes it and awaits the result. Once it is finished, it moves the callback into the event queue (the callback of the 
promise is moved into the microtask queue).

The event loop constantly checks whether or not the call stack is empty. Once the call stack is empty and there is a 
callback in the event queue, the event loop moves the callback into the call stack. But if there is a callback in the
microtask queue as well, it is moved first. The microtask queue has a higher priority than the event queue.


Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)