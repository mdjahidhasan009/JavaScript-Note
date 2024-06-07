
# Lecture 11 - Async Iterator & Generator in JavaScript | Project Requirements

## Table of contents

- [Introduction](#introduction)
- [Iterator](#iterator)
- [Generator](#generator)
- [Async Iterator and Generator](#async-iterator-and-async-generator)
- [Project Requirements](#project-requirements)
- [Resources for this lecture](#resource-for-this-lecture)
- [Source Code](#source-code)

## Introduction

In the last class, we discussed Asynchronous Programming. In today's class, we will finish our programming fundamentals and start a project. Let's take a look at today's agenda.

- Iterator and Generator
- For of loop
- Async Iterator and Generator
- Project Requirements

## Iterator

An iterator is an object that knows what is happening currently and knows that something will happen in the future but doesn't know what it will be. We can manage our programming career without it. So why do we need an iterator? It is an object that allows us to work with loops. A for loop can be done using an iterator as well. We need to iterate through a list where it is present. We call running a loop iterating. Iterate, iterable, and iterator are not the same thing. Iterating is looping from the st...

```js
const arr = [1, 2, 3, 4];

for (let i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}
```

Once we start a loop, there's no way to pause it. It won't stop until it completes. If we use break to stop it, the entire loop will stop. We cannot pause it. Suppose you are a teacher calling roll. In the middle, you start chatting with someone. After a while, you realize you need to continue the roll call. You start again from where you left off. The loop won't give you this pause. But sometimes, we need this pause feature. For example, when fetching data from the internet, we need this feature. Suppose...

```js
const arr = [1, 2, 3, 4];
let index = 0;
function next() {
	return arr[index++];
}

console.log(next()); // 1
console.log(next()); // 2
console.log(next()); // 3
console.log(next()); // 4
console.log(next()); // undefined
```

It continues giving data as long as it gets it. When no more data is available, it returns undefined. Not everything needs to be done today. I might want to work with the first data this year, the second data next year. I can set it up like that. Now there is no loop. I can control it. If I call next the first time, do thousands of tasks in between, and then call next again, it will return 2 in the second call. What happens in between is not our concern. Every time we call next, it gives the next data. T...

```js
const channel = 'Stack';
```

Although a string is a data type, it is actually an array of characters. And a string is an iterable object. In JavaScript, we can make anything iterable or call it iterable if it has a special property. What is it, and how do we make it iterable? It is `channel[Symbol.iterator]`. This Symbol.iterator is already given in a string as a function. If we log it, we will see it returns a function.

```js
const channel = 'Stack';
console.log(channel[Symbol.iterator]); // [Function: [Symbol.iterator]]
console.log(channel[Symbol.iterator].toString()); // function [Symbol.iterator]() { [native code] }
```

Since we see it is a function, let's call it and see what it returns.

```js
const channel = 'Stack';
const channelIterator = channel[Symbol.iterator]();
console.log(channelIterator); // Object [String Iterator] {}
```

It returns an object. This object has three methods: next, return, throw. We need next. Let's call the next method and see what comes.

```js
const channel = 'Stack';
const channelIterator = channel[Symbol.iterator]();
console.log(channelIterator.next()); // { value: 'S', done: false }
```

The first time we call next, we get an object. Here, the value is 'S' from 'Stack', and another property `done: false` indicates the iteration is not finished. It still has data. Let's call next a few more times.

```js
const channel = 'Stack';
const channelIterator = channel[Symbol.iterator]();
console.log(channelIterator.next()); // { value: 'S', done: false }
console.log(channelIterator.next()); // { value: 't', done: false }
console.log(channelIterator.next()); // { value: 'a', done: false }
console.log(channelIterator.next()); // { value: 'c', done: false }
console.log(channelIterator.next()); // { value: 'k', done: false }
console.log(channelIterator.next()); // { value: undefined, done: true }
console.log(channelIterator.next()); // { value: undefined, done: true }
```

We see that we get the subsequent data one by one. When no more data is available, it returns undefined and `done: true`. This means the iteration is complete, and there is no more data.

Now, what is the benefit of doing this? The benefit is that we can use the for-of loop because of this. The for-of loop can be used only if it is an iterator. Otherwise, it cannot be used.

```js
for (const v of channel) {
	console.log(v);
}
/* 
S
t
a
c
k
*/
```

Now, if we didn't have the for-of loop, how would we loop through it? In that case, we would use a while loop.

```js
const channel = 'Stack';
const channelIterator = channel[Symbol.iterator]();

while (true) {
	const data = channelIterator.next();
	if (data.done) {
		break;
	}
	console.log(data.value);
}
```

This will give the same output. But we can do all of this in just three lines using the for-of loop.

Now let's create our own iterator.

```js
const range = {
	start: 0,
	stop: 100,
	step: 5,
};
```

First, we take an object that starts from 0, stops at 100, and increments by 5. Can we run a for-of loop over it? Let's see.

```js
for (let v of range) {
	console.log(v);
}
```

This will give us an error: `TypeError: range is not iterable`. Now the question is, how do we make range iterable? Let's see the process of making it iterable.

```js
range[Symbol.iterator] = function () {
	return {
		next() {},
	};
};
```

First, we need to take `range[Symbol.iterator]`. This will contain a function that returns an object. That object will have a next function. This next function will return two properties: value and done.

```js
range[Symbol.iterator] = function () {
	return {
		next() {
            return {
                value: 0,
                done: false,
            };
        },
	};
};
```

If we run the for-of loop now, it will run an infinite loop and always return 0. Now at least we understand that the range object has become iterable. Now we need to work on the next function.

```js
range[Symbol.iterator] = function () {
	let current = this.start;
	const stop = this.stop;
	const step = this.step;
	return {
		next() {
			const o = {
				value: current,
				done: current > stop,
			};
			current += step;
			return o;
		},
	};
};
```

Now our iterator function is ready. Let's call it.

```js
const rangeIterator = range[Symbol.iterator]();
console.log(rangeIterator.next()); // { value: 0, done: false }
console.log(rangeIterator.next()); // { value: 5, done: false }
console.log(rangeIterator.next()); // { value: 10, done: false }
```

That means our iterator function is working. Now let's see what happens if we run the for-of loop.

```js
for (let v of range) {
	console.log(v);
}
```


We can see that it outputs values up to 100, incrementing by 5 each time.

## Generator

Just as Async Await came to simplify the work with Promises, Generators came to simplify the work with Iterators. To write a generator function, simply add an asterisk (*) after the function keyword.

```js
function* myGenerator() {}
```

As we know, a function will return undefined if it doesn't explicitly return anything. Similarly, a generator function will return an iterator, even if it doesn't explicitly return anything. Here's the proof:

![Generator](./Screenshot_1.png)

Previously, when we created an iterator, we first wrote [Symbol.iterator], then took a function that returned an object, and inside that object, we created the next function. We can simplify all this work by using a generator function.

```js
function* myGenerator() {
	yield 1;
	yield 2;
	yield 3;
}

const iterator = myGenerator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

We achieved what we did with the iterator in just four lines. Yield means giving one data at a time. yield 1 means give me 1, yield 2 means give me 2. Each time we call next, it will output one yield at a time. When yields are exhausted, it returns undefined.

If we have to write yield for each data point, it would be cumbersome. Let's solve the previous problem using generators instead of creating an iterator. We will create a range function using a generator.

```js
function* range(start = 0, stop = 100, step = 5) {
	for (let i = start; i <= stop; i += step) {
		yield i;
	}
}

const rangeIt = range(1, 10, 3);
console.log(rangeIt.next()); // { value: 1, done: false }
console.log(rangeIt.next()); // { value: 4, done: false }
console.log(rangeIt.next()); // { value: 7, done: false }
console.log(rangeIt.next()); // { value: 10, done: false }
console.log(rangeIt.next()); // { value: undefined, done: true }
```

This is the power of generators. We don't need to write so much code to create an iterator. By creating a generator function, we can easily make an iterator. We can also use the for-of loop.

```js
for (let v of range()) {
	console.log(v);
}
```

It will print values from 0 to 100 with a step of 5. Hopefully, you understand how generators simplify the work of iterators.

What is a real-life example of this? Where we have asynchronous tasks, we can use generators for iteration. Let's create an ID maker.

```js
function* generateId() {
	let index = 1;
	while (true) {
		yield index++;
	}
}

const generateUserId = generateId();
const generateProductId = generateId();
console.log('User', generateUserId.next().value); // User 1
console.log('User', generateUserId.next().value); // User 2
console.log('User', generateUserId.next().value); // User 3

console.log('Product', generateProductId.next().value); // Product 1
console.log('Product', generateProductId.next().value); // Product 2
console.log('Product', generateProductId.next().value); // Product 3
console.log('Product', generateProductId.next().value); // Product 4
```

## Async iterator and Async generator

Async iterator and Async generator are used primarily for asynchronous tasks. Let's look at an example. We want to fetch our users from an API.

```js
const axios = require('axios').default;

async function getUsers() {
	const url = 'https://jsonplaceholder.typicode.com/users';
	const { data: users } = await axios.get(url);
	return users;
}
```


```js
getUsers()
	.then(async (users) => {
		console.log(users);
	})
	.catch((e) => {
		console.log(e);
	});
```

We are getting the users. But we don't need this data as it is. We need to fetch the number of posts each user has at specific intervals. In this case, we can create a generator function.

```js
async function* getPostsByUser(users) {
	const url = 'https://jsonplaceholder.typicode.com/posts';
	for (let i = 0; i < users.length; i++) {
		const { data: posts } = await axios.get(`${url}?userId=${users[i].id}`);
		yield posts;
	}
}
```

Here, we take the user data we previously fetched as a parameter. Then, we run a for loop to yield each post. When needed, we can get them one by one. Since this is an async task, we use async await here. This is called an async generator.

Now, we can create an iterator from this function.

```js
getUsers()
	.then(async (users) => {
		const userIterator = await getPostsByUser(users);
		await userIterator.next();
		await userIterator.next();
		console.log((await userIterator.next()).value);
	})
	.catch((e) => {
		console.log(e);
	});
```

Since the iterator's next function is called twice initially, the posts of the third user ID will be printed. Hopefully, you now understand the purpose of iterators. If I ran a loop, I couldn't fetch data for only the third user ID. Generators have simplified the work of iterators.

Now, if I want to see the data of all users together, I can just run a for-of loop.

```js
getUsers()
	.then(async (users) => {
		for await (let v of getPostsByUser(users)) {
			console.log(v);
		}
	})
	.catch((e) => {
		console.log(e);
	});
```

We will get the data of all users.

We can also achieve the above task in another way.

```js
const axios = require('axios').default;

async function getUsers() {
	const url = 'https://jsonplaceholder.typicode.com/users';
	const { data: users } = await axios.get(url);
	return users.map((user) =>
		axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
	);
}

(async () => {
	const users = await getUsers();
	for await (let v of users) {
		console.log(v.data);
	}
})();
```

Here, we don't return any users from the getUsers function. Instead, we return a promise or API call for each user so that we can fetch posts when needed. This way, we don't need a generator function or iterator. However, we won't have any control over it. All the data will come at once.

## Project Requirements

Our project is about to start. For the first project, we will build an attendance system. The client has given some requirements for that system. They are listed below.

We need an attendance system. Students can create their own profile. Admin can see the list of students and their attendances. Admin can enable and disable the attend button. Also, this button can be disabled based on a timer. Each time the admin enables the attend button, students can participate only once. Each day, a student will have a timesheet of attendance.

Students can see their own time logs and the attend button when enabled.

In the next class, we will see how a developer starts a project step by step.

## Resource for this lecture

All resources for this lecture are available at [Lecture 11](../../resources/lecture-11/README.md).

## Source Code

All source code for this lecture is available at this [link](../../src/lecture-11/app.js).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)
