
# Lecture 10 - Asynchronous Programming in JavaScript

## Introduction

Today's lecture is basically about Asynchronous Programming. Let's take a look at today's agenda.

- Understand Asynchronous Programming
- Event Loop
- Ways we can handle Asynchronous Tasks
  - Callback
  - Promise
  - Async Await
  - Async Iterator
  - Async Generator

Each topic will be discussed one by one.

## Table of contents

- [Understand Asynchronous Programming](#understand-asynchronous-programming)
- [Event Loop](#event-loop)
- [Ways we can handle Asynchronous Tasks](#ways-we-can-handle-asynchronous-tasks)
  - [Callback](#callback)
  - [Promise](#promise)
  - [Async Await](#async-await)

## Understand Asynchronous Programming

Imagine you are standing in line at a bank. The next person's work will start only after the previous person's work is finished. This is called blocking. If the current task is not completed, the next task cannot be started. You will get bored standing in line.

Nowadays, some banks have introduced such services where you enter, collect a token, and then wait in the waiting lounge. When your turn comes, you will be called. You no longer have to stand in line. In the first system, once you entered the bank, you couldn't do any other work. But now you can take a token and browse the internet, do necessary work on your laptop, or even go outside to run some small errands. Because you know your serial number and can roughly estimate how much time it might take. This is called non-blocking. And the method is called Asynchronous way.

Let's give an example of synchronous programming.

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);
```

In this case, 10 will not be executed until 9 is executed. This is called synchronous programming. Each line will be executed sequentially, one after another.

In the asynchronous way, a process can take on another task request while one is ongoing. For example, at a bank, one person may withdraw 5000, and another 50 million. The one withdrawing 5000 has less work, while the one withdrawing 50 million has more. A common misconception is that asynchronous way takes less time, but it actually takes the same amount of time. However, our request does not get blocked. We are making a request by taking a token. After the current work is done, the next one will proceed. The user cannot understand what is happening in the background. Asynchronous tasks are mainly in the backend, hardly on the frontend.

Let's explain a bit better. Suppose I have a server. Many clients will send requests. Initially, the server is open. As soon as a request comes from a client, the server closes. It takes 5 seconds for the server to complete that task. During those 5 seconds, the server's mouth is closed. No other client request can enter. We face this problem when viewing results. We keep refreshing but cannot enter. Because unless one request is handled, another cannot enter. This is called blocking.

In non-blocking, the server does not block the request but puts it in a queue. All incoming requests are queued up. Responses are sent serially from that queue. No request is blocked here. This is called non-blocking, which is the asynchronous way. This small concept has brought a big revolution in the programming world.

A language can never be synchronous or asynchronous. This feature is present in the compiler or runtime of that language. In the case of JavaScript, the V8 engine is asynchronous.

Let's look at an example of an asynchronous task.

```js
console.log(1);

setTimeout(() => {
	console.log(2);
}, 0);

setTimeout(() => {
	console.log(3);
}, 0);

setTimeout(() => {
	console.log(4);
}, 0);

setTimeout(() => {
	console.log(5);
}, 0);

setTimeout(() => {
	console.log(6);
}, 0);

setTimeout(() => {
	console.log(7);
}, 0);

console.log(8);
```

Even though the time is set to 0, meaning it will not wait, as soon as `setTimeout` is there, the task will go to the queue and work asynchronously. So first `1` will be executed, then `8`, and then `2`, `3`, `4`, `5`, `6`, `7` one by one.

To understand better, let's see another example.

```js
function main() {
	setTimeout(() => {
		console.log('load last');
	}, 10);

	setTimeout(() => {
		console.log('load first');
		test();
	}, 0);

	test();
}

function test() {
	console.log('test');
}

main();
```

To better visualize this code, you can run it on [JavaScript Visualizer 9000](https://www.jsv9000.app/).

Here, the `main` function goes to the call stack first. After entering the main function, it sees two asynchronous tasks. Those two go to the task queue. Then it goes to `test`. The `test` function goes to the call stack and executes. The `test` exits the call stack. With that, the main function's work is also done, so it exits the call stack. Now, the call stack will bring the asynchronous tasks from the queue. It will bring the task with the shortest execution time first. In this case, it will bring the 0 execution time task to the call stack. `load first` will be printed. After finding the `test` function there, `test` will come to the call stack and run. It will exit the call stack. Then, the 10 milliseconds task will come to the call stack from the queue and execute.

This means all synchronous tasks will go to the call stack first and all asynchronous tasks will go to the queue. After the synchronous tasks are done and the call stack is empty, tasks with shorter execution times will come to the call stack from the queue and execute. This is the concept of asynchronous tasks. You can copy the code and see it more clearly by running it on the above site.

Keep in mind that you can never assign the value of an asynchronous task to a variable.

To learn more about asynchronous programming, read this article: [Asynchronous JavaScript - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous).

## Event Loop

The event loop is when we first put a request in the queue, then once the call stack is empty, one by one, we send tasks from the queue to the call stack. This process of sending tasks from the queue to the call stack works like a loop, and this is the event loop. The following diagram will make it clearer.

![event-loop](./event-loop.gif)

To learn more about the event loop, you can read these articles: [The event loop - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop), [The JavaScript Event Loop: Explained - Towards Dev](https://towardsdev.com/event-loop-in-javascript-672c07618dc9), [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://youtu.be/8aGhZQkoFbQ).

## Ways we can handle Asynchronous Tasks

When dealing with asynchronous tasks, we need answers to two questions:

- When will this code execute?
- How will we handle the data we get after the code executes?

We have already got the answer to the first question. The answer to the second question is discussed below:

### Callback

One way to handle asynchronous tasks is by using callbacks. However, there is a problem with callbacks called callback hell. It means one callback inside another, and another inside that, and so on until you get the final data. This is a big problem. The biggest problem is not writing the code or reading it, but debugging it. Since we cannot store the result of the first callback anywhere, we have to use another callback to get its result. So even though a callback is a simple way to handle asynchronous tasks, we should not use it.

Suppose we have a task given to us. The details are given below:

```js
/**
 * 1. find user by username
 * 2. find post by userId
 * 3. find the latest post
 * 4. find comments by post id
 * 5. find the latest comment
 * 6. find the username of the latest commented user
 */
```

We do not have any API where we can provide a username and get the name of the user who commented. We have many different APIs in our system. We have to find from these APIs. Let's write down our API endpoints.

```js
/**
 * /users?username=[username]
 * /posts?user_id=[user_id]
 * /comments?post_id=[post_id]
 * /users?username=[username]
 */
```

First, we have to find the username. Once we get the username, we will get the userId. Using that, we can find the latest post. Once we get the post, we will get the post id. Using that id, we can find the comment. From the comment, we will get the username. Then we have to hit the first endpoint again. That means there are a total of 4 asynchronous tasks. How do we know these are asynchronous tasks? Because we are communicating from one server to another. Communicating from one server to another is an asynchronous task. Besides, setTimeout, setInterval, reading files are also asynchronous tasks.

```js
function get(path, cb) {
	const data = {}; // somehow process it
	cb(data);
}

function getUserNameFromComment(username) {
	get(`users?username=${username}`, (user) => {
		get(`posts?user_id=${user.id}`, (posts) => {
			get(`comments?post_id=${posts[0].id}`, (comments) => {
				get(`users?username=${comments[0].username}`, (user) => {
					console.log(user);
				});
			});
		});
	});
}

getUserNameFromComment('arif');
```

First, we took a function to get our user. As we have already said, the result of an asynchronous task cannot be stored in any variable, so we need a callback function to get the data. Now we created another function. We gave the path to the get endpoint for getting our username and another callback function to get the post. After getting the post, we created another function to get the latest post id. Then we created another function to get the name of the user who made the latest comment. Since we cannot store that name in any variable, we have to create another callback function to print that name. Now think, here we have only 4 tasks. What if it is 100, 1000 tasks, how will you debug? You will go crazy. That's why we will never use this callback. So what is a better solution? Let's see.


To better visualize this code, you can run it on [JavaScript Visualizer 9000](https://www.jsv9000.app/).

Here, the `main` function goes to the call stack first. After entering the main function, it sees two asynchronous tasks. Those two go to the task queue. Then it goes to `test`. The `test` function goes to the call stack and executes. The `test` exits the call stack. With that, the main function's work is also done, so it exits the call stack. Now, the call stack will bring the asynchronous tasks from the queue. It will bring the task with the shortest execution time first. In this case, it will bring the 0 execution time task to the call stack. `load first` will be printed. After finding the `test` function there, `test` will come to the call stack and run. It will exit the call stack. Then, the 10 milliseconds task will come to the call stack from the queue and execute.

This means all synchronous tasks will go to the call stack first and all asynchronous tasks will go to the queue. After the synchronous tasks are done and the call stack is empty, tasks with shorter execution times will come to the call stack from the queue and execute. This is the concept of asynchronous tasks. You can copy the code and see it more clearly by running it on the above site.

Keep in mind that you can never assign the value of an asynchronous task to a variable.

To learn more about asynchronous programming, read this article: [Asynchronous JavaScript - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous).

## Event Loop

The event loop is when we first put a request in the queue, then once the call stack is empty, one by one, we send tasks from the queue to the call stack. This process of sending tasks from the queue to the call stack works like a loop, and this is the event loop. The following diagram will make it clearer.

![event-loop](./event-loop.gif)

To learn more about the event loop, you can read these articles: [The event loop - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop), [The JavaScript Event Loop: Explained - Towards Dev](https://towardsdev.com/event-loop-in-javascript-672c07618dc9), [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://youtu.be/8aGhZQkoFbQ).

## Ways we can handle Asynchronous Tasks

When dealing with asynchronous tasks, we need answers to two questions:

- When will this code execute?
- How will we handle the data we get after the code executes?

We have already got the answer to the first question. The answer to the second question is discussed below:

### Callback

One way to handle asynchronous tasks is by using callbacks. However, there is a problem with callbacks called callback hell. It means one callback inside another, and another inside that, and so on until you get the final data. This is a big problem. The biggest problem is not writing the code or reading it, but debugging it. Since we cannot store the result of the first callback anywhere, we have to use another callback to get its result. So even though a callback is a simple way to handle asynchronous tasks, we should not use it.

Suppose we have a task given to us. The details are given below:

```js
/**
 * 1. find user by username
 * 2. find post by userId
 * 3. find the latest post
 * 4. find comments by post id
 * 5. find the latest comment
 * 6. find the username of the latest commented user
 */
```

We do not have any API where we can provide a username and get the name of the user who commented. We have many different APIs in our system. We have to find from these APIs. Let's write down our API endpoints.

```js
/**
 * /users?username=[username]
 * /posts?user_id=[user_id]
 * /comments?post_id=[post_id]
 * /users?username=[username]
 */
```

First, we have to find the username. Once we get the username, we will get the userId. Using that, we can find the latest post. Once we get the post, we will get the post id. Using that id, we can find the comment. From the comment, we will get the username. Then we have to hit the first endpoint again. That means there are a total of 4 asynchronous tasks. How do we know these are asynchronous tasks? Because we are communicating from one server to another. Communicating from one server to another is an asynchronous task. Besides, setTimeout, setInterval, reading files are also asynchronous tasks.

```js
function get(path, cb) {
	const data = {}; // somehow process it
	cb(data);
}

function getUserNameFromComment(username) {
	get(`users?username=${username}`, (user) => {
		get(`posts?user_id=${user.id}`, (posts) => {
			get(`comments?post_id=${posts[0].id}`, (comments) => {
				get(`users?username=${comments[0].username}`, (user) => {
					console.log(user);
				});
			});
		});
	});
}

getUserNameFromComment('arif');
```

First, we took a function to get our user. As we have already said, the result of an asynchronous task cannot be stored in any variable, so we need a callback function to get the data. Now we created another function. We gave the path to the get endpoint for getting our username and another callback function to get the post. After getting the post, we created another function to get the latest post id. Then we created another function to get the name of the user who made the latest comment. Since we cannot store that name in any variable, we have to create another callback function to print that name. Now think, here we have only 4 tasks. What if it is 100, 1000 tasks, how will you debug? You will go crazy. That's why we will never use this callback. So what is a better solution? Let's see.

### Promise

A Promise in JavaScript is an object that initially doesn't hold a value but will in the future. It may or may not resolve. Now, how can we create a Promise? Since we mentioned that a Promise is an object in JavaScript, the syntax for creating it is the same as any object: `new Promise()`. This Promise will contain a callback function that takes two parameters: resolve and reject. Promises are usually made either to be kept or broken. For keeping, we use resolve, and for breaking, we use reject.

```js
const isResolved = true;

const promise = new Promise((resolve, reject) => {
	if (isResolved) {
		resolve('completed');
	} else {
		reject('data');
	}
});

console.log(promise); // Promise { 'completed' }
```

If `isResolved = true`, the output will be as shown. However, if it is false, it will display a large error. To avoid this error, we can use a `catch` block. A Promise has three functions:

- then: This block is called when the promise resolves.
- catch: This block handles errors when the promise cannot resolve and is rejected.
- finally: This block is called at the end, whether the promise resolves or rejects.

```js
promise
	.then((result) => {
		console.log(result);
	})
	.catch((e) => {
		console.log('Rejected');
	});
```

Besides this, we can also use `Promise.resolve()` and `Promise.reject()` directly. Now, you might wonder, if we can do it directly, why do we need to create a promise? Some APIs or functions only accept promises as arguments. In such cases, we have to convert our data into a promise. See the image below to understand how to create a promise.

![Promise](./Screenshot_1.png)

After creating the promise, we can do all the tasks we could do with it. Let's take a look.

![Promise2](./Screenshot_2.png)

Let's try to create a small timer-type application.

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(1000).then(() => {
	console.log('Done in 1000ms');
});

wait(2000).then(() => {
	console.log('Done in 2000ms');
});

wait(3000).then(() => {
	console.log('Done in 3000ms');
});
```

It will execute three times, each after one second.

Now, let's see how we can use promises to handle the requirements we worked on with callbacks.

If one task depends on another, we can create a chain in the case of promises. Instead of using callbacks inside callbacks as we did before, we will create a chain. Suppose we have a function that returns a promise. If it returns a promise, we can proceed to the `then` function; otherwise, we cannot.

```js
const get = (url) => Promise.resolve(url);

get(`/users?username=anarul`)
	.then((user) => {
		/** do all other operations here */
		return get(`/posts?user_id=${user.id}`);
	})
	.then((posts) => {
		const latestPost = posts[0];
		return get(`/comments?post_id=${latestPost.id}`);
	})
	.then((comments) => {
		const latestComment = comments[0];
		return get(`/users?username=${latestComment.username}`);
	})
	.then((user) => {
		console.log(user);
	})
	.catch(() => {
		console.log('Error');
	});
```

Even here, we had to do a lot of work. However, compared to callbacks, this code is much more readable. Imagine if we had to use a try-catch block for each function in the callback; it would be very tedious. In the case of promises, we can handle all errors with just one `catch` block. And because it's in a chain format, we can easily understand the code.

However, it's still quite cumbersome. It hasn't become much easier. There is an even simpler solution. Let's take a look.

### Async Await

With Async Await, if there is a promise, there is no need to write `then` and `catch`. We can directly get the result. One condition is that the function must be async; otherwise, we cannot await it. The meaning of await is to wait. Async Await is like the synchronous syntax of asynchronous programming. It looks synchronous, but it works asynchronously. To make a function async, just add the async keyword before the function keyword. Now, whether this function does something or not, it will return a prom...

![Async](./Screenshot_3.png)

When we didn't use the async keyword, the function returned undefined. But when we wrote the async function, it returned a promise.

Now, let's perform our previous task using Async Await.


To better visualize this code, you can run it on [JavaScript Visualizer 9000](https://www.jsv9000.app/).

Here, the `main` function goes to the call stack first. After entering the main function, it sees two asynchronous tasks. Those two go to the task queue. Then it goes to `test`. The `test` function goes to the call stack and executes. The `test` exits the call stack. With that, the main function's work is also done, so it exits the call stack. Now, the call stack will bring the asynchronous tasks from the queue. It will bring the task with the shortest execution time first. In this case, it will bring the 0 execution time task to the call stack. `load first` will be printed. After finding the `test` function there, `test` will come to the call stack and run. It will exit the call stack. Then, the 10 milliseconds task will come to the call stack from the queue and execute.

This means all synchronous tasks will go to the call stack first and all asynchronous tasks will go to the queue. After the synchronous tasks are done and the call stack is empty, tasks with shorter execution times will come to the call stack from the queue and execute. This is the concept of asynchronous tasks. You can copy the code and see it more clearly by running it on the above site.

Keep in mind that you can never assign the value of an asynchronous task to a variable.

To learn more about asynchronous programming, read this article: [Asynchronous JavaScript - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous).

## Event Loop

The event loop is when we first put a request in the queue, then once the call stack is empty, one by one, we send tasks from the queue to the call stack. This process of sending tasks from the queue to the call stack works like a loop, and this is the event loop. The following diagram will make it clearer.

![event-loop](./event-loop.gif)

To learn more about the event loop, you can read these articles: [The event loop - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop), [The JavaScript Event Loop: Explained - Towards Dev](https://towardsdev.com/event-loop-in-javascript-672c07618dc9), [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://youtu.be/8aGhZQkoFbQ).

## Ways we can handle Asynchronous Tasks

When dealing with asynchronous tasks, we need answers to two questions:

- When will this code execute?
- How will we handle the data we get after the code executes?

We have already got the answer to the first question. The answer to the second question is discussed below:

### Callback

One way to handle asynchronous tasks is by using callbacks. However, there is a problem with callbacks called callback hell. It means one callback inside another, and another inside that, and so on until you get the final data. This is a big problem. The biggest problem is not writing the code or reading it, but debugging it. Since we cannot store the result of the first callback anywhere, we have to use another callback to get its result. So even though a callback is a simple way to handle asynchronous tasks, we should not use it.

Suppose we have a task given to us. The details are given below:

```js
/**
 * 1. find user by username
 * 2. find post by userId
 * 3. find the latest post
 * 4. find comments by post id
 * 5. find the latest comment
 * 6. find the username of the latest commented user
 */
```

We do not have any API where we can provide a username and get the name of the user who commented. We have many different APIs in our system. We have to find from these APIs. Let's write down our API endpoints.

```js
/**
 * /users?username=[username]
 * /posts?user_id=[user_id]
 * /comments?post_id=[post_id]
 * /users?username=[username]
 */
```

First, we have to find the username. Once we get the username, we will get the userId. Using that, we can find the latest post. Once we get the post, we will get the post id. Using that id, we can find the comment. From the comment, we will get the username. Then we have to hit the first endpoint again. That means there are a total of 4 asynchronous tasks. How do we know these are asynchronous tasks? Because we are communicating from one server to another. Communicating from one server to another is an asynchronous task. Besides, setTimeout, setInterval, reading files are also asynchronous tasks.

```js
function get(path, cb) {
	const data = {}; // somehow process it
	cb(data);
}

function getUserNameFromComment(username) {
	get(`users?username=${username}`, (user) => {
		get(`posts?user_id=${user.id}`, (posts) => {
			get(`comments?post_id=${posts[0].id}`, (comments) => {
				get(`users?username=${comments[0].username}`, (user) => {
					console.log(user);
				});
			});
		});
	});
}

getUserNameFromComment('arif');
```

First, we took a function to get our user. As we have already said, the result of an asynchronous task cannot be stored in any variable, so we need a callback function to get the data. Now we created another function. We gave the path to the get endpoint for getting our username and another callback function to get the post. After getting the post, we created another function to get the latest post id. Then we created another function to get the name of the user who made the latest comment. Since we cannot store that name in any variable, we have to create another callback function to print that name. Now think, here we have only 4 tasks. What if it is 100, 1000 tasks, how will you debug? You will go crazy. That's why we will never use this callback. So what is a better solution? Let's see.

### Promise

A Promise in JavaScript is an object that initially doesn't hold a value but will in the future. It may or may not resolve. Now, how can we create a Promise? Since we mentioned that a Promise is an object in JavaScript, the syntax for creating it is the same as any object: `new Promise()`. This Promise will contain a callback function that takes two parameters: resolve and reject. Promises are usually made either to be kept or broken. For keeping, we use resolve, and for breaking, we use reject.

```js
const isResolved = true;

const promise = new Promise((resolve, reject) => {
	if (isResolved) {
		resolve('completed');
	} else {
		reject('data');
	}
});

console.log(promise); // Promise { 'completed' }
```

If `isResolved = true`, the output will be as shown. However, if it is false, it will display a large error. To avoid this error, we can use a `catch` block. A Promise has three functions:

- then: This block is called when the promise resolves.
- catch: This block handles errors when the promise cannot resolve and is rejected.
- finally: This block is called at the end, whether the promise resolves or rejects.

```js
promise
	.then((result) => {
		console.log(result);
	})
	.catch((e) => {
		console.log('Rejected');
	});
```

Besides this, we can also use `Promise.resolve()` and `Promise.reject()` directly. Now, you might wonder, if we can do it directly, why do we need to create a promise? Some APIs or functions only accept promises as arguments. In such cases, we have to convert our data into a promise. See the image below to understand how to create a promise.

![Promise](./Screenshot_1.png)

After creating the promise, we can do all the tasks we could do with it. Let's take a look.

![Promise2](./Screenshot_2.png)

Let's try to create a small timer-type application.

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(1000).then(() => {
	console.log('Done in 1000ms');
});

wait(2000).then(() => {
	console.log('Done in 2000ms');
});

wait(3000).then(() => {
	console.log('Done in 3000ms');
});
```

It will execute three times, each after one second.

Now, let's see how we can use promises to handle the requirements we worked on with callbacks.

If one task depends on another, we can create a chain in the case of promises. Instead of using callbacks inside callbacks as we did before, we will create a chain. Suppose we have a function that returns a promise. If it returns a promise, we can proceed to the `then` function; otherwise, we cannot.

```js
const get = (url) => Promise.resolve(url);

get(`/users?username=anarul`)
	.then((user) => {
		/** do all other operations here */
		return get(`/posts?user_id=${user.id}`);
	})
	.then((posts) => {
		const latestPost = posts[0];
		return get(`/comments?post_id=${latestPost.id}`);
	})
	.then((comments) => {
		const latestComment = comments[0];
		return get(`/users?username=${latestComment.username}`);
	})
	.then((user) => {
		console.log(user);
	})
	.catch(() => {
		console.log('Error');
	});
```

Even here, we had to do a lot of work. However, compared to callbacks, this code is much more readable. Imagine if we had to use a try-catch block for each function in the callback; it would be very tedious. In the case of promises, we can handle all errors with just one `catch` block. And because it's in a chain format, we can easily understand the code.

However, it's still quite cumbersome. It hasn't become much easier. There is an even simpler solution. Let's take a look.

### Async Await

With Async Await, if there is a promise, there is no need to write `then` and `catch`. We can directly get the result. One condition is that the function must be async; otherwise, we cannot await it. The meaning of await is to wait. Async Await is like the synchronous syntax of asynchronous programming. It looks synchronous, but it works asynchronously. To make a function async, just add the async keyword before the function keyword. Now, whether this function does something or not, it will return a prom...

![Async](./Screenshot_3.png)

When we didn't use the async keyword, the function returned undefined. But when we wrote the async function, it returned a promise.

Now, let's perform our previous task using Async Await.

```js
const get = (url) => Promise.resolve(url);

async function getUserName(username) {
	try {
		const mainUser = await get(`/users?username=${username}`);
		const posts = await get(`/posts?user_id=${mainUser.id}`);
		const comments = await get(`/comments?post_id=${posts[0].id}`);
		const user = await get(`/users?username=${comments[0].username}`);
		console.log(user);
	} catch (e) {
		console.log(e);
	}
}
```

When it comes to fetching data, it takes some time to arrive. To prevent blocking during this time, `await` is used to indicate that your request is being processed and will take some time, so you should wait. We are storing the incoming data in variables and printing the user data at the end. Notice that a single try-catch block handles everything. There is no chain. Since we can store data in variables, we can debug it variable by variable. It is very readable. Compared to promises and callbacks, asynchr...

Now, let's look at a real-life example. For that, we need to install the axios package and fetch data from [jsonPlacehlder](https://jsonplaceholder.typicode.com).

```js
const axios = require('axios').default;
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

async function getComments(username) {
	try {
		const { data: user } = await axios.get(`${USERS_URL}?username=${username}`);
		const { data: posts } = await axios.get(
			`${POSTS_URL}?userId=${user[0].id}`
		);
		const { data: comments } = await axios.get(
			`${COMMENTS_URL}?postId=${posts[0].id}`
		);

		const { data: userWithComment } = await axios.get(
			`${USERS_URL}?email=${comments[1].email}`
		);
		console.log(userWithComment);
	} catch (error) {
		console.log('Error Occurred', error.toJSON());
	}
}

getComments('Bret');
```

First, we declared the URLs for users, posts, and comments in variables. Then, we created an async function. Initially, we fetched the user data using the username and stored it. Next, we used the user ID to fetch all the posts. Then, using the first post ID, we fetched the comments. From the first comment, we extracted the user email. Finally, we hit the endpoint to fetch the user data using the email. If no user is found, it returns an empty array []. For error handling, we used a try-catch block.

Async Iterator and Async Generator will be discussed in the next class.

## Resource for this lecture

All resources for this lecture are available at [Lecture 10](../../resources/lecture-10/README.md).

## Source Code

All source code for this lecture is available at this [link](../../src/lecture-10/app.js).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)
