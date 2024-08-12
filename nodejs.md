# Nodejs
Node.js is a server-side platform built on Chrome's JavaScript runtime for easily building fast and scalable network
applications. It is characterized by:

## Event-Based
Handles operations through events, enabling asynchronous programming.
## Non-Blocking
Uses non-blocking, asynchronous I/O operations to ensure high performance.
## Google's V8 JavaScript Engine
Executes JavaScript code efficiently. V8 is an open source high-performance JavaScript engine used by the Google Chrome 
browser, written in C++. It is also being used in the node.js project. It implements ECMAScript and WebAssembly, and
runs on Windows 7 or later, macOS 10.12+, and Linux systems that use x64, IA-32, ARM, or MIPS processors. Note: It can
run standalone, or can be embedded into any C++ application.
## libuv Library
Provides support for asynchronous I/O operations.

## Single Threaded or Multi-Threaded?
Node.js is often described as a single-threaded platform, but this characterization is only partially accurate. The truth 
is more nuanced:

### Single-Threaded Event Loop:

####JavaScript Execution
Node.js runs JavaScript code in a single thread, using an event loop to handle asynchronous operations. This design 
enables Node.js to efficiently manage I/O-bound tasks without blocking the main thread. The event loop is at the heart 
of Node.js's non-blocking, asynchronous nature, allowing it to handle many connections simultaneously without requiring
multiple threads.

### Multi-Threaded Operations:
#### Libuv and Background Threads
Under the hood, Node.js uses the libuv library to manage asynchronous operations. While the main JavaScript code runs on
a single thread, libuv uses a thread pool to handle certain tasks concurrently. This means that some operations, such as 
file system (fs module) tasks, DNS lookups, and cryptographic functions, can run in parallel using multiple threads.
This thread pool typically has four threads by default, but this can be adjusted.

#### Asynchronous I/O Operations
For example, when you perform a file system operation like fs.readFile(), the JavaScript function initiates the request,
but the actual file I/O operation is handed off to the libuv thread pool. Once the operation is complete, the callback
is queued in the event loop to be executed on the main thread.

#### Worker Threads Module
Node.js also provides a worker_threads module, introduced in Node.js v10.5.0, that allows developers to create additional
threads for CPU-bound tasks. This is especially useful for computationally intensive operations that would otherwise 
block the event loop.

#### Concurrency and Non-Blocking I/O:
Non-Blocking Nature: Node.js achieves high concurrency through its non-blocking I/O model. While it might be 
single-threaded at the JavaScript execution level, it can still handle many simultaneous operations without being 
blocked by slow or synchronous operations, thanks to its ability to offload certain tasks to background threads.

### Sources
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)