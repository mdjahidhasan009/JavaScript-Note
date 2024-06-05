
# Lecture 5 - Array Operations - Imperative vs Declarative and Lecture 6 - JavaScript Array and Object Deep Dive

In these two lectures, we will discuss arrays and objects in detail. Since these two lectures are related to each other, it made sense to me to write an overview of both together. Our agenda for today is:

- Array Operations
  - Imperative traverse
  - Declarative traverse
  - Update
  - Delete
  - Mutation
  - Map
  - Filter
  - Reduce

- Object Deep Dive
  - Object Operations
  - Function vs Method

- Object as a Data Structure
  - Array Operations
  - Object Over Array

## Table of Contents

- [Array Operations](#array-operations)
  - [Imperative traverse](#imperative-traverse)
  - [Declarative traverse](#declarative-traverse)
  - [Update](#update)
  - [Delete](#delete)
  - [Mutation](#mutation)
  - [Map](#map)
  - [Filter](#filter)
  - [Reduce](#reduce)

- [Object Deep Dive](#object-deep-dive)
  - [Object Operations](#object-operations)
  - [Function vs Method](#function-vs-method)

- [Object as a Data Structure](#object-as-a-data-structure)
  - [Array](#array)
  - [Object Over Array](#object-over-array)
  - [Comparison of object and array operation costs](#comparison-of-object-and-array-operation-costs)

## Array Operations

### Imperative Traverse

If we are asked to traverse an array, we can easily run a loop to traverse it. Now, the question might come up: what is traverse? Traversing means touching each element of an array with a loop to perform the necessary operations. For example:

```js
const numbers = [2, 5, 6, 7, 89, 100];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
```

We can print all the elements of the `numbers` array this way. If we want to multiply each element by 2 and show that output, we can do that too.

```js
const numbers = [2, 5, 6, 7, 89, 100];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i] * 2);
}
```

If we want to find the sum of all elements, we can do that too.

```js
const numbers = [2, 5, 6, 7, 89, 100];

let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}

console.log(sum);
```

This is called Imperative Traversing. Because we have specified where the loop will start, where it will stop, how it will increment, and what operation will be performed. That's why this is Imperative Traversing.

### Declarative Traverse

We usually don't need to use a `for` loop to work with JavaScript. Since JavaScript is a high-level language, it has various methods that allow us to traverse declaratively. We will learn what functions and methods are later. If we want to do declarative traversing the same way we did imperative traversing, there is a nice method called `forEach`. Let's try to understand this method.

```js
const numbers = [2, 5, 6, 7, 89, 100];

numbers.forEach(function () {
    console.log('Hello World');
});
```

If we run this program now, we will see that `Hello World` is printed six times. Why six times? Because there are six elements in `numbers`. The job of `forEach` is to run the loop as many times as there are elements. A callback function is passed as an argument to `forEach`. We can write the function outside and pass its name to `forEach`. Now, we haven't called the inner function anywhere, so how is it being called? `forEach` has called that function for us in some way. There are some parameters in this callback function. These are stored in a data structure called `arguments`. It works somewhat like an array, but it is not an array; it is a different type of data structure. An example will help understand this clearly.


# Lecture 5 - Array Operations - Imperative vs Declarative and Lecture 6 - JavaScript Array and Object Deep Dive

In these two lectures, we will discuss arrays and objects in detail. Since these two lectures are related to each other, it made sense to me to write an overview of both together. Our agenda for today is:

- Array Operations
  - Imperative traverse
  - Declarative traverse
  - Update
  - Delete
  - Mutation
  - Map
  - Filter
  - Reduce

- Object Deep Dive
  - Object Operations
  - Function vs Method

- Object as a Data Structure
  - Array Operations
  - Object Over Array

## Table of Contents

- [Array Operations](#array-operations)
  - [Imperative traverse](#imperative-traverse)
  - [Declarative traverse](#declarative-traverse)
  - [Update](#update)
  - [Delete](#delete)
  - [Mutation](#mutation)
  - [Map](#map)
  - [Filter](#filter)
  - [Reduce](#reduce)

- [Object Deep Dive](#object-deep-dive)
  - [Object Operations](#object-operations)
  - [Function vs Method](#function-vs-method)

- [Object as a Data Structure](#object-as-a-data-structure)
  - [Array](#array)
  - [Object Over Array](#object-over-array)
  - [Comparison of object and array operation costs](#comparison-of-object-and-array-operation-costs)

## Array Operations

### Imperative Traverse

If we are asked to traverse an array, we can easily run a loop to traverse it. Now, the question might come up: what is traverse? Traversing means touching each element of an array with a loop to perform the necessary operations. For example:

```js
const numbers = [2, 5, 6, 7, 89, 100];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
```

We can print all the elements of the `numbers` array this way. If we want to multiply each element by 2 and show that output, we can do that too.

```js
const numbers = [2, 5, 6, 7, 89, 100];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i] * 2);
}
```

If we want to find the sum of all elements, we can do that too.

```js
const numbers = [2, 5, 6, 7, 89, 100];

let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}

console.log(sum);
```

This is called Imperative Traversing. Because we have specified where the loop will start, where it will stop, how it will increment, and what operation will be performed. That's why this is Imperative Traversing.

### Declarative Traverse

We usually don't need to use a `for` loop to work with JavaScript. Since JavaScript is a high-level language, it has various methods that allow us to traverse declaratively. We will learn what functions and methods are later. If we want to do declarative traversing the same way we did imperative traversing, there is a nice method called `forEach`. Let's try to understand this method.

```js
const numbers = [2, 5, 6, 7, 89, 100];

numbers.forEach(function () {
    console.log('Hello World');
});
```

If we run this program now, we will see that `Hello World` is printed six times. Why six times? Because there are six elements in `numbers`. The job of `forEach` is to run the loop as many times as there are elements. A callback function is passed as an argument to `forEach`. We can write the function outside and pass its name to `forEach`. Now, we haven't called the inner function anywhere, so how is it being called? `forEach` has called that function for us in some way. There are some parameters in this callback function. These are stored in a data structure called `arguments`. It works somewhat like an array, but it is not an array; it is a different type of data structure. An example will help understand this clearly.

```js
const numbers = [2, 5, 6, 7, 89, 100];

numbers.forEach(function () {
    console.log(arguments);
});

/* * Output
[Arguments] { '0': 2, '1': 0, '2': [ 2, 5, 6, 7, 89, 100 ] }
[Arguments] { '0': 5, '1': 1, '2': [ 2, 5, 6, 7, 89, 100 ] }
[Arguments] { '0': 6, '1': 2, '2': [ 2, 5, 6, 7, 89, 100 ] }
[Arguments] { '0': 7, '1': 3, '2': [ 2, 5, 6, 7, 89, 100 ] }
[Arguments] { '0': 89, '1': 4, '2': [ 2, 5, 6, 7, 89, 100 ] }
[Arguments] { '0': 100, '1': 5, '2': [ 2, 5, 6, 7, 89, 100 ] }
*/
```

From the output, we see that within the object, '0' contains each value of our array, '1' contains the corresponding index number of that value, and '2' contains the entire array. So, we understand that the function within `forEach` has three parameters. Let's check this:

```js
const numbers = [2, 5, 6, 7, 89, 100];

numbers.forEach(function (value, index, array) {
    console.log(value, index, array);
});

/* * Output
2 0 [ 2, 5, 6, 7, 89, 100 ]
5 1 [ 2, 5, 6, 7, 89, 100 ]
6 2 [ 2, 5, 6, 7, 89, 100 ]
7 3 [ 2, 5, 6, 7, 89, 100 ]
89 4 [ 2, 5, 6, 7, 89, 100 ]
100 5 [ 2, 5, 6, 7, 89, 100 ]
*/
```

We get the exact output we got with `arguments`. `arguments` is very useful. When you work with any library or framework, you can easily figure out the arguments of any method.

Now, let's come back to `forEach`. With this, we can do all the tasks we did with the `for` loop. Let's see the summation task we did with the `for` loop using `forEach`.

```js
const numbers = [2, 5, 6, 7, 89, 100];

let sum = 0;
numbers.forEach(function (value) {
    sum += value;
});
console.log(sum); // 209
```

We get the same result. Here's something to note: if we don't need anything except `value`, then taking only `value` as the function parameter is sufficient. But if we need only `array`, we must write `value, index, array`. Otherwise, the program will give incorrect output. Now, if we want to print only the even elements, we can do that too.

```js
const numbers = [2, 5, 6, 7, 89, 100];

numbers.forEach(function (value) {
    if (value % 2 === 0) {
        console.log(value);
    }
});
```

Here, we didn't create the `forEach` function. We just used it. So, this is a declarative method. Now, many of you might want to know what is done inside the `forEach` method. Those interested in learning about `forEach`, arrays, and array methods can watch this [playlist](https://youtube.com/playlist?list=PL_XxuZqN0xVDr08QgQHljCecWtA4jBLnS) by Stack Learner.

Now, if we want to find the sum of only the first 4 elements, what should we do?

```js
const numbers = [2, 5, 6, 7, 89, 100];

let sum = 0;
numbers.forEach(function (value, index) {
    if (index <= 3) {
        sum += value;
    }
});
console.log(sum);
```

An easy way to remember the `forEach` method is that we don't need to write the `for` loop anymore. `forEach` has done it for us. We just need to write what we used to write in the loop body within the callback function body.

Let's say we have an array like this:

```js
const arr = [1, 2, 3, null, false, 4, 5, '', 'test', 6, 7];
```

Now, we want to filter out everything except the numbers. We don't want to do this in a declarative way. We want to do it imperatively. How can we do this?

We can start like this:

```js
const arr = [1, 2, 3, null, false, 4, 5, '', 'test', 6, 7];

for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'number') {
        arr[i] = undefined;
    }
}
```


```js
console.log(arr); // [1, 2, 3, undefined, undefined, 4, 5, undefined, undefined, 6, 7];
```

Now, the problem here is how to remove these `undefined` values. We need to think differently. We can do something like assigning the next value if the element type at any position is not a number. If we look at the steps, it will be clear.

```js
// step 1: [1, 2, 3, false, 4, 5, '', 'test', 6, 7, undefined]
// step 2: [1, 2, 3, 4, 5, '', 'test', 6, 7, undefined, undefined]
// step 3: [1, 2, 3, 4, 5, 'test', 6, 7, undefined, undefined, undefined]
// step 4: [1, 2, 3, 4, 5, 6, 7, undefined, undefined, undefined, undefined]
```

Now, let's convert our idea into code.

```js
const arr = [1, 2, 3, null, false, 4, 5, '', 'test', 6, 7];

for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length - 1; j++) {
        if (!arr[j] || typeof arr[j] !== 'number') {
            arr[j] = arr[j + 1];
            arr[j + 1] = undefined;
        }
    }
}

console.log(arr); // [1, 2, 3, 4, 5, 6, 7, undefined, undefined, undefined, undefined];
```

So, we got our step 4. Now we need to remove the `undefined` values. We can do one thing for that.

```js
const arr = [1, 2, 3, null, false, 4, 5, '', 'test', 6, 7];

count = 0;
for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length - 1; j++) {
        if (!arr[j] || typeof arr[j] !== 'number') {
            arr[j] = arr[j + 1];
            arr[j + 1] = undefined;
        }
    }

    if (arr[i] == undefined) {
        count++;
    }
}
arr.length -= count;

console.log(arr); // [1, 2, 3, 4, 5, 6, 7];
```

What did we do? If an element is undefined, it will count it and store it in the `count` variable. Finally, by subtracting `count` from `arr.length`, the array size is reduced, and all `undefined` values are removed.

Let's analyze the code a bit. We'll try to understand with a small array.

```txt
const arr = [1, false, true, '', 2, 3]
When i = 0:
  j = 0:
    arr[0] = 1, which is a number
  j = 1:
    arr[1] = false, which is not a number
    so, arr[1] = true
    arr[2] = undefined
  j = 2:
    arr[2] = undefined
    so arr[2] = ''
    arr[3] = undefined
  j = 3:
    arr[3] = undefined
    so arr[3] = 2
    arr[4] = undefined
  j = 4:
    arr[4] = undefined
    so arr[4] = 3
    arr[5] = undefined
  count = 1
After completion of the first loop the array becomes like this [1, true, '', 2, 3, undefined]
After completion of the loop the array looks like this [1, 2, 3, undefined, undefined, undefined] and count will be 3. After subtracting count from arr.length (6) we get 3. So the array of length 3 will look like this [1, 2, 3]
```

Now, if we did this not imperatively but declaratively, it would be much easier.

```js
const arr = [1, 2, 3, null, false, 4, 5, '', 'test', 6, 7];

const filteredArray = arr.filter((val) => typeof val === 'number');
console.log(filteredArray);
```

But there is a problem here. The `filter` method uses extra memory behind the scenes. When we do front-end development, we generally don't do such complex imperative ways. We use built-in methods. Hence, sometimes when the data is large, the application hangs. Now, should we always work in an imperative way? Or how do we know when to work imperatively and when declaratively? The first thing is that 90-95% of the time, built-in methods will suffice. But in some cases, the complexity of our application is so high that we may need to go beyond built-in methods. Suppose our array now has just numbers, strings, etc. But if each element is a giant object and each object's size is about 1MB (though it's difficult to make 1MB data, I'm giving an example for understanding), if there are 100 such objects, the total array size will be 100MB. Now, if my operation on this 100MB data costs another 100MB memory, it will be a big problem. So, in this case, we need to work completely imperatively. If we didn't have memory constraints here, we could easily do this in an imperative way.

```jsx
const arr = [1, 2, 3, null, false, 4, 5, '', 'test', 6, 7];

const newArr = [];
for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number') {
        newArr.push(arr[i]);
    }
}
console.log(newArr);
```

When building a frontend application, we need to keep in mind that a user can use a PC with 64 GB of RAM or a PC with 2 GB of RAM. The cost for the data on the backend is borne by me or my company. But when it comes to the frontend, it is entirely user-centric. I want my application to be usable on a PC with 64 GB of RAM, a PC with 2 GB of RAM, and also on a mobile device. Therefore, we need to pay attention to many small details in frontend development. This is where the challenge of frontend development lies.

> **To understand the next steps of the array well, you need to know about objects. So, first, read these topics well: [Object Operations](#object-operations), [Function vs Method](#function-vs-method), [Array](#array), [Object Over Array](#object-over-array), [Comparison of object and array operation costs](#comparison-of-object-and-array-operation-costs). Then proceed to the next steps.**

### Update

There is no need to do updates imperatively. Updates are very simple. If we know the index of an array, we can easily update its data. For example:

```js
const arr = [1, 2, 3, 4, 5];

arr[3] = 300;

console.log(arr); // [1, 2, 3, 300, 5]
```

If the index is not known, then we need to find the index first. Then it can be updated. For example:

```js
const arr = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 50 },
];

const index = arr.findIndex((item) => item.id === 4);
arr[index].value = 400;

console.log(arr);

// [
//   { id: 1, value: 10 },
//   { id: 2, value: 20 },
//   { id: 3, value: 30 },
//   { id: 4, value: 400 },
//   { id: 5, value: 50 }
// ]
```

It can also be updated without finding the index. In that case, we need to use the `find` method. For example:

```js
const arr = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 50 },
];

const obj = arr.find((val) => val.id === 4);
obj.value = 400;

console.log(obj); // { id: 4, value: 400 }
console.log(arr);

/* 
[
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
  { id: 4, value: 400 },
  { id: 5, value: 50 }
]
*/
```

Here, we see that if we change the value of `obj`, the value of `arr` also changes. This is because the way we see arrays here is not actually the way it is. No matter how much data we put in the array, there are just some addresses in the array. The addresses of those data. When we find it in `obj`, we bring that address from the array. So, wherever we change the address, it also changes in the original array. This is called mutation. And the `find` method is mutable.

Let's see an example.

```js
const arr = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 50 },
];

const obj = arr.find((val) => val.id === 4);
obj.value = 400;

console.log(arr[3] === obj); // true

const a = { a: 10 };
const b = { a: 10 };
const c = a;
console.log(a === c); // true
console.log(a === b); // false
```

This will create complete confusion for any beginner. When `obj` finds something, it brings the reference from the array. That's why `obj` and `arr[3]` have the same reference, so it gave `true` as output. Similarly, `c` and `a` have the same reference. So, it gave true. But `a` and `b` have completely different references. No matter how much the two objects have the same value, the references of the two objects will never be the same. No matter how similar two buildings look, the addresses of the two build...


### Delete

Now we will see how to delete data from an array. We have already seen how to delete data imperatively in the array traversal example. Here, we will use two methods to delete data: `splice` and `filter`. The difference between them is that the `splice` method is mutable, and `filter` is immutable. Let's see how.

```js
const arr = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 50 },
];

const index = arr.findIndex((item) => item.id === 4);
const arr1 = arr.splice(index, 1);

console.log(arr1); // [ { id: 4, value: 40 } ]
console.log(arr);
/* [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
  { id: 5, value: 50 }
] */
```

Here, we see that the `splice` method has directly deleted data from the original array. This means mutation has occurred.

```js
const arr = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 50 },
];

const arr2 = arr.filter((item) => item.id !== 4);

console.log(arr2);
/* 
[
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
  { id: 5, value: 50 }
]
*/
console.log(arr);
/* 
[
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
  { id: 4, value: 40 },
  { id: 5, value: 50 }
]
*/
```

Here, the original array remains unchanged. But after filtering, the `filter` method gives a new array where the item we wanted to delete is not present. This means the `filter` method is immutable.

### Mutation

We have already discussed mutation. I hope everyone understands the concept.

### Map

`map` generally creates a clone version of the original array. If there are 10 data items in the original array, there will be 10 data items in the new array as well. Now, the data can be the same or different. For example:

```js
const numbers = [1, 2, 3, 4];
const strs = numbers.map((v) => v.toString());
console.log(strs);
```

It will output the string version of all the numbers. One thing to keep in mind is that the length of the array will not change after mapping. Only the data will change. The number of data items will remain the same.

### Filter

The `filter` method filters the data we want from an array. Suppose we have an array.

```js
const numbers = [1, 2, 3, 4, false, '', NaN, 5, 6];
```

We want to filter out all the falsy values and only keep the truthy values. In this case, we need to use the `filter` method.

```js
const filteredArr = numbers.filter((v) => v);
console.log(filteredArr);
```

This will return all the truthy values. But there might be situations where we want the truthy values but cannot return them. In that case, we can put two `!!` before `v` to get the truthy values.


### Reduce

Let's look at the example below.

```js
const numbers = [1, 2, 3, 4, false, '', NaN, 5, 6];
const filteredArr = numbers.filter((v) => v);
const strs = filteredArr.map((v) => v.toString());
console.log(strs);
```

There are some issues here. When filtering, it traverses `n` times. Again, when mapping, it traverses `n` times. This increases the time complexity. It can also be done by chaining.

```js
const numbers = [1, 2, 3, 4, false, '', NaN, 5, 6];
const filteredArr = numbers.filter((v) => v).map((v) => v.toString());
console.log(filteredArr);
```

Here, the time complexity is somewhat reduced but not entirely efficient. For this, we need to use the `reduce` method.

In many YouTube tutorials, `reduce` is often used for one task, summation.

```jsx
const numbers = [1, 2, 3, 4, 5, 6];
const sum = numbers.reduce((a, b) => a + b);
console.log(sum);
```

But `reduce` is way more powerful than summation. `reduce` is so powerful that it is unimaginable. If you understand `reduce` properly, you can work with it instead of using `map` and `filter`. `map` returns a new array of the same length. `filter` returns an array of filtered values. Its length may or may not be equal to the original array. But `reduce`, what it will return, no one knows. Only we will know. It can return any possible value like a string, number, boolean, etc.

Let's look at the structure of `reduce`.

```js
numbers.reduce((acc, cur) => {
    return acc;
}, '');
```

We have provided `acc` (accumulator/previous value) as the first parameter and `cur` (current value) as the second parameter. After `acc` and `cur`, we can provide the index and the entire array, but we don't need that. The advantage of the `reduce` method is that we can provide an initial value here. Instead of '', we can use an empty object `{}`, an empty array `[]`, or any initializer we want. This means the current value of `acc` is the initializer we provided. In the end, we will return our `acc`. W...

```js
const numbers = [1, 2, 3, 4, false, '', NaN, 5, 6];
const result = numbers.reduce((acc, cur) => {
    acc += cur.toString();
    return acc;
}, '');

console.log(result); // 1234falseNaN56
```

What did we do here? We assumed the value of `acc` as ''. Then we added the `cur` value's `toString` to it. And we stored our result in a variable. When we output, we got exactly what we wanted.

Now, we want to take only the truthy values from this array, not the falsy values. In that case, we can put a condition.

```js
const numbers = [1, 2, 3, 4, false, '', NaN, 5, 6];
const result = numbers.reduce((acc, cur) => {
    if (cur) {
        acc += cur.toString();
    }
    return acc;
}, '');

console.log(result); // 123456
```

If we want to add a comma (,) at the end of each, we can do that too.

```js
const numbers = [1, 2, 3, 4, false, '', NaN, 5, 6];
const result = numbers.reduce((acc, cur, index) => {
    if (cur) {
        acc += cur.toString() + (index < numbers.length - 1 ? ', ' : '');
    }
    return acc;
}, '');

console.log(result); // 1, 2, 3, 4, 5, 6
```

We can also give a shape to the array.

```js
const numbers = [1, 2, 3, 4, false, '', NaN, 5, 6];
const result = numbers.reduce((acc, cur, i) => {
    if (i === 0) {
        acc += '[';
    }
    if (cur) {
        acc += cur.toString() + (i < numbers.length - 1 ? ', ' : '');
    }
    if (i === numbers.length - 1) {
        acc += ']';
    }
    return acc;
}, '');
console.log(result); // [1, 2, 3, 4, 5, 6]
```

So, we can understand the power of `reduce`. This is one type of power. There are many other powers of the `reduce` method. For example, now we don't want `acc` as a string. We want an array of all truthy values. That can also be done with `reduce`.


```js
const numbers = [1, 2, 3, 4, false, '', NaN, 5, 6];
const result = numbers.reduce((acc, cur) => {
    if (cur) {
        acc.push(cur.toString());
    }
    return acc;
}, []);
console.log(result); // [ '1', '2', '3', '4', '5', '6' ]
```

Here we took an empty array as `acc`. Then we wrote a condition to get the truthy values. Then we pushed the `toString` version of those values into `acc` since `acc` is an array. We are getting the same result through a better solution.

Let's compare the time complexity of `map/filter` operations with `reduce` operations.

```js
const arr = [];
for (let i = 1; i < 5000000; i++) {
    arr.push(i);
}

console.time('not-optimized');
arr.filter((item) => item % 2 === 0).map((item) => item * 2);
console.timeEnd('not-optimized'); // not-optimized: 325.853ms

console.time('optimized');
arr.reduce((acc, cur) => {
    if (cur % 2 === 0) {
        acc.push(cur * 2);
    }
    return acc;
}, []);
console.timeEnd('optimized'); // optimized: 198.256ms
```

So, we see that the `reduce` method is more optimized. Now, let's look at the implementation of the `reduce` method. We can create our `reduce` function. Since we haven't discussed the prototype, we won't create a method. We will just create a function.

```js
function myReduce(arr, cb, init) {
    let acc = init;
    for (let i = 0; i < arr.length; i++) {
        acc = cb(acc, arr[i], i, arr);
    }
    return acc;
}
```

This is our `reduce` function. Let's explain what we did here. We took three parameters. The first parameter will be an array. The second parameter will be a callback function. And the third parameter will be our initializer. The initializer we used in the `reduce` method. Now, we took `init` as `acc`. Then we ran a loop. Within the loop, `acc` is being updated according to the callback function. The parameters of the callback function are `acc`, the array element, the index, and our array. And this func...

```js
const sum = myReduce([1, 2, 3, 4], (a, b) => a + b, 0);
console.log(sum); // 10

const arr = [1, 2, '', false, 3, NaN, false, 4, 5, NaN, 6];
const result = myReduce(
    arr,
    (acc, cur) => {
        if (cur) {
            acc.push(cur ** 2);
        }
        return acc;
    },
    []
);
console.log(result); // [1, 4, 9, 16, 25, 36]
```

How amazing is this! The deeper you go into JavaScript, the more fun you get. We created our `reduce` function and worked with it. And we also learned how the `reduce` method works behind the scenes.

Let's see another example of `reduce`. For that, we need to install the `axios` package. Let's install it. Now, if we go to the [json placeholder](https://jsonplaceholder.typicode.com/posts) site, we will find some dummy data for posts. Notice that this data is given as an array. But for me, traversing is less important than updating and deleting. Although the backend developer has provided it as an array for their convenience, we need to convert it to an object for our needs. Here we don't need the body...

```js
const axios = require('axios').default;
const url = 'https://jsonplaceholder.typicode.com/posts';

async function getData() {
    const { data } = await axios.get(url);
    const result = data.slice(0, 10).map((item) => {
        return {
            userId: item.userId,
            id: item.id,
            title: item.title,
        };
    });
    return result;
}

getData()
    .then((data) => console.log(data))
    .catch((e) => console.log(e));

/* 
[
    {
        userId: 1,
        id: 1,
        title:
            'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    },
    { userId: 1, id: 2, title: 'qui est esse' },
    {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    },
    { userId: 1, id: 4, title: 'eum et est occaecati' },
    { userId: 1, id: 5, title: 'nesciunt quas odio' },
    { userId: 1, id: 6, title: 'dolorem eum magni eos aperiam quia' },
    { userId: 1, id: 7, title: 'magnam facilis autem' },
    { userId: 1, id: 8, title: 'dolorem dolore est ipsam' },
    {
        userId: 1,
        id: 9,
        title: 'nesciunt iure omnis dolorem tempora et accusantium',
    },
    { userId: 1, id: 10, title: 'optio molestias id quia eum' },
];
*/
```

We used `map` to get the first 10 data and removed the body. But it still returns an array. `map` will never return an object because `map` always returns an array. Now let's work with `reduce`. With `reduce`, we can specify the type of data we want through initialization.

```js
const axios = require('axios').default;
const url = 'https://jsonplaceholder.typicode.com/posts';

async function getData() {
    const { data } = await axios.get(url);
    const result = data.slice(0, 10).reduce((acc, cur) => {
        acc[cur.id] = {
            ...cur,
        };
        delete acc[cur.id].body;
        return acc;
    }, {});
    return result;
}

getData()
    .then((data) => console.log(data))
    .catch((e) => console.log(e));

/* 
{
  '1': {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
  },
  '2': { userId: 1, id: 2, title: 'qui est esse' },
  '3': {
    userId: 1, id: 3, title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut'
  },
  '4': { userId: 1, id: 4, title: 'eum et est occaecati' },
  '5': { userId: 1, id: 5, title: 'nesciunt quas odio' },
  '6': { userId: 1, id: 6, title: 'dolorem eum magni eos aperiam quia' },
  '7': { userId: 1, id: 7, title: 'magnam facilis autem' },
  '8': { userId: 1, id: 8, title: 'dolorem dolore est ipsam' },
  '9': {
    userId: 1, id: 9, title: 'nesciunt iure omnis dolorem tempora et accusantium'
  },
  '10': { userId: 1, id: 10, title: 'optio molestias id quia eum' }
}
*/
```

Here we took an empty object (`{}`) as `acc`. The key of that object will be the current value's `id`. We stored all current values in that object with the `id` as the key. Now, we don't need the `body`, so we simply deleted the `body` using the `delete` keyword. And at the end of the day, `acc` will be returned. Finally, when we ran it, wow, we got our object. The power of `reduce` is on another level. Its power is endless.

Let's look at one last example of this `reduce` method. Suppose we have an array of names.

```js
const names = [
    'Ayman',
    'Abu Rayhan',
    'Anik',
    'Elias Emon',
    'Engr. Sabbir',
    'Fahim Faisal',
    'Feroz Khan',
    'Habib',
    'HM Azizul',
    'Hridoy Saha',
    'Jahid Hassan',
    'Johir',
    'Md Al-Amin',
    'Md Arafatul',
    'Md Ashraful',
    'Parvez',
];
```


We want to get the output like below.

```txt
----------- A -----------
Ayman
Abu Rayhan
Anik

----------- E -----------
Elias Emon
Engr. Sabbir

----------- F -----------
Fahim Faisal
Feroz Khan

----------- H -----------
Habib
HM Azizul
Hridoy Saha

----------- J -----------
Jahid Hassan
Johir

----------- M -----------
Md Al-Amin
Md Arafatul
Md Ashraful

----------- P -----------
Parvez
```

How can we get this? We have an array. If we imagine this task as the structure below, it will be much easier.

```js
const namesGroup = {
    A: ['Ayman', 'Abu Rayhan', 'Anik'],
    E: ['Elias Emon', 'Engr. Sabbir'],
    F: ['Fahim Faisal', 'Feroz Khan'],
};
```

Now, we need to convert our array into this object structure. And this can be done with `reduce`. So let's do it.

```js
const namesGrouped = names.reduce((acc, cur) => {
    const firstLetter = cur[0].toUpperCase();
    if (firstLetter in acc) {
        acc[firstLetter].push(cur);
    } else {
        acc[firstLetter] = [cur];
    }
    return acc;
}, {});
console.log(namesGrouped);

/* 
{
  A: [ 'Ayman', 'Abu Rayhan', 'Anik' ],
  E: [ 'Elias Emon', 'Engr. Sabbir' ],
  F: [ 'Fahim Faisal', 'Feroz Khan' ],
  H: [ 'Habib', 'HM Azizul', 'Hridoy Saha' ],
  J: [ 'Jahid Hassan', 'Johir' ],
  M: [ 'Md Al-Amin', 'Md Arafatul', 'Md Ashraful' ],
  P: [ 'Parvez' ]
}
*/
```

First, we took our `acc` as an empty object. Then we will check the first letter to see if it is in `acc`. What to do if it exists and what to do if it does not. So first, we stored the first letter of the current value in uppercase in a variable. Now, we wrote a condition. If `firstLetter` does not exist in `acc`, it will create a key with `firstLetter` and take an array of the current value in that key. If `firstLetter` exists in `acc`, it will just push the current value into the array. Now, if we loo...

```js
Object.keys(namesGrouped).forEach((groupKey) => {
    console.log('-----------', groupKey, '-----------');
    namesGrouped[groupKey].forEach((name) => console.log(name));
    console.log();
});
```

I hope there is nothing to explain here. A simple `forEach` method as we saw earlier. Running it, you will see that we got our desired output.

If we know `filter`, `map`, `reduce` well, we can create optimized applications in some cases without using other data structures and algorithms.

## Object Deep Dive

### Object Operations

Everything we see around us is an object. Suppose we have a microphone in front of us. This is also an object. Let's see how.

```js
const microphone = {
    brand: 'Fifine',
    indictor: true,
    price: 8000,
    color: 'Black',
    startRecording() {
        console.log('recording started');
    },
    stopRecording() {
        console.log('recording stopped');
    },
};
```


When we need multiple pieces of information to represent a subject or object, we need an object. If it was just one piece of information, we could have used a variable. But since it's more than one, we need an object to represent that subject or object. The same thing is called a class in Java, a dictionary in Python, and a structure in C. Now, using objects doesn't mean object-oriented programming. Object-oriented programming is the theorem of how to beautifully organize and represent these objects. We...

We know that an object can have many properties. The properties of an object can be divided into two parts, namely:

1. Noun / Adjective (State/data/property/field) - Properties that represent our data. In the example above, `brand`, `indicator`, `price`, `color` are all properties because they represent data. These data can be of any data type like string, number, boolean.
2. Verb (functionalities -> start, stop) - Like our microphone has some functionalities such as the start button, stop button, recording button, etc. In the example above, `startRecording`, `stopRecording`.

So, one part of an object will represent our data, and the other part will perform tasks related to the data. These two parts together form an object.

Now, there are many hidden properties in addition to the properties we wrote. For example, if we write `microphone.toString()`, the output will be `[object Object]`. But we didn't write the `toString` method anywhere. So where did this come from? It came from `Object`. This `Object` is called the object constructor.

We can create objects in another way besides the way we created them before. Let's see that process.

```js
const testObj = new Object();
testObj.name = 'Test Object';
testObj.time = new Date();
console.log(testObj); // { name: 'Test Object', time: 2022-06-16T07:09:01.373Z }
```

In the output, we can see that an object has been created. That means we can create objects in two ways. The first way we created it is called `Object Literal`, and the way we created it later is called `Constructor Function`. No matter how we create it, the `Object` constructor is always working behind the scenes. This `Object` has some properties that will be inherited by every object we create in the world. Let's try to see those properties. For this, we need to go to the browser's console. Please n...

![Object methods](./Screenshot_1.png)

First, there is the constructor. The object we created by writing `new` before `Object` is called the constructor. Then there is `hasOwnProperty`, which we can use to check if a property is the object's own property. Additionally, there are properties like `toString`, `valueOf`, `toLocaleString`, etc., which we can use even if we don't define them in the object. These will be useful when we start object-oriented programming. Although with the advent of ES6, deep object-oriented programming is not always ...

Among these properties, let's look at the `freeze` property. Suppose we want to add a new property to our microphone object. Then we have to write the code below.

```js
const microphone = {
    brand: 'Fifine',
    indictor: true,
    price: 8000,
    color: 'Black',
    startRecording() {
        console.log('recording started');
    },
    stopRecording() {
        console.log('recording stopped');
    },
};

microphone.newProperty = 'New Property';
console.log(microphone);
/* {
  brand: 'Fifine',
  indictor: true,
  price: 8000,
  color: 'Black',
  startRecording: [Function: startRecording],
  stopRecording: [Function: stopRecording],
  newProperty: 'New Property'
} */
```

But sometimes we might work with objects where we want to restrict data entry. In simple terms, we don't want to allow data input here. In such cases, the `freeze` method is very useful.

```js
const microphone = {
    brand: 'Fifine',
    indictor: true,
    price: 8000,
    color: 'Black',
    startRecording() {
        console.log('recording started');
    },
    stopRecording() {
        console.log('recording stopped');
    },
};

Object.freeze(microphone);
microphone.newProperty = 'New Property';
console.log(microphone);
/* {
  brand: 'Fifine',
  indictor: true,
  price: 8000,
  color: 'Black',
  startRecording: [Function: startRecording],
  stopRecording: [Function: stopRecording],
} */
```

Notice that our object did not update here. Using this method, we can lock the object. Let's look at two more methods: `keys` and `values`.

```js
console.log(Object.keys(microphone)); // ['brand', 'indictor', 'price', 'color', 'startRecording', 'stopRecording'];
console.log(Object.values(microphone));

/* 
[
  'Fifine',
  true,
  8000,
  'Black',
  [Function: startRecording],
  [Function: stopRecording]
]
*/
```

`Object.keys()` will return all the keys of the object as an array, and `Object.values()` will return all the values of the object as an array. Now, why do we need these? We can also loop through the keys and values without these methods, like this:

```js
for (let k in microphone) {
    console.log(k, microphone[k]);
}

/* 
brand Fifine
indictor true
price 8000
color Black
startRecording [Function: startRecording]
stopRecording [Function: stopRecording]
*/
```

The notation used to access values here is called array notation. We can access object values using two notations:

- Dot notation (microphone.brand)
- Array notation (microphone['brand'])

When we dynamically take a key, we don't know what it will be. So we will always use array notation in this case. Now let's get back to the main point. We are getting keys and values this way. So what's the use of those two methods? Let's see.

```js
const empty = {};
console.log(empty); // {}
console.log(Boolean(empty)); // true
```

If we want to know if our object is really empty, we can't check it this way because an empty object, empty array will always return true. In that case, we will take the help of `Object.keys()`.

```js
const empty = {};
console.log(Object.keys(empty)); // []
```

Now, an empty array will also return true because an empty array is a truthy value. To properly check if our object is empty, we need to do the following:

```js
const empty = {};
console.log(Object.keys(empty).length === 0); // true
```

So if the length is 0, we can assume our object is empty.

There is also the `Object.entries()` method. Let's see what it does.

```js
console.log(Object.entries(microphone));
/*
[
  [ 'brand', 'Fifine' ],
  [ 'indictor', true ],
  [ 'price', 8000 ],
  [ 'color', 'Black' ],
  [ 'startRecording', [Function: startRecording] ],
  [ 'stopRecording', [Function: stopRecording] ]
]
*/
```

It was an object, and now it has become separate arrays for keys and values. This will be very useful in the future.

Now, suppose we have an array, and we want to make an object from it. For that, we will use the `fromEntries` method.

```js
const arr = [
    ['brand', 'Fifine'],
    ['indictor', true],
    ['price', 8000],
    ['color', 'Black'],
];

console.log(Object.fromEntries(arr)); // { brand: 'Fifine', indictor: true, price: 8000, color: 'Black' }
```

### Function vs Method

When a function is inside an object, we call it a method. So, the array methods like array.filter(), array.push(), array.map(), array.splice() that we have used are all methods, not functions. The only difference between functions and methods is that functions can be called independently anywhere, but methods cannot. Let's understand this with an example.

```js
const microphone = {
    brand: 'Fifine',
    indictor: true,
    price: 8000,
    color: 'Black',
    startRecording() {
        console.log('recording started');
    },
    stopRecording() {
        console.log('recording stopped');
    },
};

function startRecording() {
    console.log('recording started');
}
```

### Functions vs Methods

In the code snippets provided, there are two instances of the `startRecording` function:

```js
startRecording();

microphone.startRecording();
```

Here, the `startRecording` function exists both independently and within an object (`microphone`). While the independent function can be called directly, the function within the object must be called using the object name, like `microphone.startRecording()`. This is the basic difference: methods are functions that belong to objects, and standalone functions can be called directly.

## Object as a Data Structure

Let's say we want to store information about several students, each having a unique ID, name, and email. First, we create a function to generate a unique ID.

```js
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
```

This function is taken from Google. We can store student information using either an array or an object. Arrays and objects each have their pros and cons depending on the task. First, let's work with arrays.

### Array

We store all student information in an array.

```js
const students = [
    {
        id: uuidv4(),
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    {
        id: uuidv4(),
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    {
        id: uuidv4(),
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
];
```

Since we're not working with a UI, we don't want the ID to change each time. We generate the output once and store it:

```js
const students = [
    {
        id: '67de71e5-0eac-474f-ab51-850ba9b31ed5',
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    {
        id: 'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e',
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    {
        id: 'ee729e84-a84e-4adf-b32c-4647a7114d5b',
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
];
```

Storing data in an array provides several benefits:

1. Create a new one
2. Update
3. Delete
4. Filter
5. Easily Traverse

Let's go through each of these operations.

- Create a new one

This is the simplest operation. We can use two methods to insert data into an array. If we want to insert at the end, we use the `push` method. If we want to insert at the beginning, we use the `unshift` method. However, `unshift` is more expensive. Why? Because it shifts each element one position to the right, causing more operations. Its complexity is O(n), where n is the size of the array. On the other hand, the `push` method simply adds data to the end, with a complexity of O(1). O(n) depends on the data size, taking more time for larger sizes. O(1) has a constant execution time regardless of data size. For inserting data, we use the `push` method.

```js
students.push({
    id: '0a2c956c-a9f4-48b9-83fa-551b432dfb2b',
    name: 'Fahim Faisal',
    email: 'fahim@test.com',
});
```

Now, running our program will show the new data in the array.

- Update

We can update in two ways: finding the object with the `find` method and updating it, or finding the index with the `findIndex` method and updating it by index. There is a problem with updating by object, let's see.



### Functions vs Methods

In the code snippets provided, there are two instances of the `startRecording` function:

```js
startRecording();

microphone.startRecording();
```

Here, the `startRecording` function exists both independently and within an object (`microphone`). While the independent function can be called directly, the function within the object must be called using the object name, like `microphone.startRecording()`. This is the basic difference: methods are functions that belong to objects, and standalone functions can be called directly.

## Object as a Data Structure

Let's say we want to store information about several students, each having a unique ID, name, and email. First, we create a function to generate a unique ID.

```js
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
```

This function is taken from Google. We can store student information using either an array or an object. Arrays and objects each have their pros and cons depending on the task. First, let's work with arrays.

### Array

We store all student information in an array.

```js
const students = [
    {
        id: uuidv4(),
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    {
        id: uuidv4(),
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    {
        id: uuidv4(),
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
];
```

Since we're not working with a UI, we don't want the ID to change each time. We generate the output once and store it:

```js
const students = [
    {
        id: '67de71e5-0eac-474f-ab51-850ba9b31ed5',
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    {
        id: 'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e',
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    {
        id: 'ee729e84-a84e-4adf-b32c-4647a7114d5b',
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
];
```

Storing data in an array provides several benefits:

1. Create a new one
2. Update
3. Delete
4. Filter
5. Easily Traverse

Let's go through each of these operations.

- Create a new one

This is the simplest operation. We can use two methods to insert data into an array. If we want to insert at the end, we use the `push` method. If we want to insert at the beginning, we use the `unshift` method. However, `unshift` is more expensive. Why? Because it shifts each element one position to the right, causing more operations. Its complexity is O(n), where n is the size of the array. On the other hand, the `push` method simply adds data to the end, with a complexity of O(1). O(n) depends on the ...

```js
students.push({
    id: '0a2c956c-a9f4-48b9-83fa-551b432dfb2b',
    name: 'Fahim Faisal',
    email: 'fahim@test.com',
});
```

Now, running our program will show the new data in the array.

- Update

We can update in two ways: finding the object with the `find` method and updating it, or finding the index with the `findIndex` method and updating it by index. There is a problem with updating by object, let's see.

```js
const idToUpdate = 'ee729e84-a84e-4adf-b32c-4647a7114d5b';
const updatedData = {
    name: 'Habiba Akhtar',
    email: 'habiba@test.com',
};

let updatedObj = students.find((item) => item.id === idToUpdate);
updatedObj = {
    id: idToUpdate,
    ...updatedData,
};
console.log('Updated', students);
/* 
Updated [
  {
    id: '67de71e5-0eac-474f-ab51-850ba9b31ed5',
    name: 'Md Al-Amin',
    email: 'alamin@test.com'
  },
  {
    id: 'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e',
    name: 'Akib Ahmed',
    email: 'akib@test.com'
  },
  {
    id: 'ee729e84-a84e-4adf-b32c-4647a7114d5b',
    name: 'Elias Emon',
    email: 'elias@test.com'
  },
  {
    id: '0a2c956c-a9f4-48b9-83fa-551b432dfb2b',
    name: 'Fahim Faisal',
    email: 'fahim@test.com'
  }
]
*/
```

Nothing is updated because we are reassigning the object. Since we are reassigning, its reference is also changed. Due to the different references, our update is not working. Now let's see how we can update by finding the index.

```js
const idToUpdate = 'ee729e84-a84e-4adf-b32c-4647a7114d5b';
const updatedData = {
    name: 'Habiba Akhtar',
    email: 'habiba@test.com',
};

const updatedIndex = students.findIndex((item) => item.id === idToUpdate);
students[updatedIndex] = {
    ...students[updatedIndex],
    ...updatedData,
};
console.log('Updated', students);
```

In JavaScript, the three dots are called the spread operator. It means everything in the original object remains, and the new data is updated accordingly. When reassignment is needed, we use findIndex instead of find. This update is moderately complex, so its complexity is O(n).

- Delete

Deleting is relatively easy. We can use two methods: `splice` and `filter`. Both have a complexity of O(n). Here we are working with splice. We will demonstrate the filter operation in the next step. If we want to delete our updatedIndex, we write:

```js
students.splice(updatedIndex, 1);
```

- Filter

```js
const filteredStudents = students.filter((item) => item.id !== idToUpdate);
console.log(filteredStudents);
```

- Easily Traverse

Traversing an array is very easy. Suppose we want to know the names of the students. We can retrieve the names by traversing the array in three ways: `for` loop, `for in` loop, and `for of` loop. Examples of all three are given below.

```js
for (let i = 0; i < students.length; i++) {
    console.log(students[i].name);
}

for (let i in students) {
    console.log(students[i].name);
}

for (let student of students) {
    console.log(student.name);
}
```

Additionally, there are built-in methods for array traversal, such as `forEach`, `map`, `filter`, `every`, `reduce`, `some`, `find`, `findIndex`, etc. Thus, traversing an array is very easy, with a complexity of O(n).

### Object Over Array

Now let's convert our array of students into an object and attempt the same operations as we did with the array.


### Functions vs Methods

In the code snippets provided, there are two instances of the `startRecording` function:

```js
startRecording();

microphone.startRecording();
```

Here, the `startRecording` function exists both independently and within an object (`microphone`). While the independent function can be called directly, the function within the object must be called using the object name, like `microphone.startRecording()`. This is the basic difference: methods are functions that belong to objects, and standalone functions can be called directly.

## Object as a Data Structure

Let's say we want to store information about several students, each having a unique ID, name, and email. First, we create a function to generate a unique ID.

```js
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
```

This function is taken from Google. We can store student information using either an array or an object. Arrays and objects each have their pros and cons depending on the task. First, let's work with arrays.

### Array

We store all student information in an array.

```js
const students = [
    {
        id: uuidv4(),
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    {
        id: uuidv4(),
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    {
        id: uuidv4(),
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
];
```

Since we're not working with a UI, we don't want the ID to change each time. We generate the output once and store it:

```js
const students = [
    {
        id: '67de71e5-0eac-474f-ab51-850ba9b31ed5',
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    {
        id: 'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e',
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    {
        id: 'ee729e84-a84e-4adf-b32c-4647a7114d5b',
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
];
```

Storing data in an array provides several benefits:

1. Create a new one
2. Update
3. Delete
4. Filter
5. Easily Traverse

Let's go through each of these operations.

- Create a new one

This is the simplest operation. We can use two methods to insert data into an array. If we want to insert at the end, we use the `push` method. If we want to insert at the beginning, we use the `unshift` method. However, `unshift` is more expensive. Why? Because it shifts each element one position to the right, causing more operations. Its complexity is O(n), where n is the size of the array. On the other hand, the `push` method simply adds data to the end, with a complexity of O(1). O(n) depends on the ...

```js
students.push({
    id: '0a2c956c-a9f4-48b9-83fa-551b432dfb2b',
    name: 'Fahim Faisal',
    email: 'fahim@test.com',
});
```

Now, running our program will show the new data in the array.

- Update

We can update in two ways: finding the object with the `find` method and updating it, or finding the index with the `findIndex` method and updating it by index. There is a problem with updating by object, let's see.

```js
const idToUpdate = 'ee729e84-a84e-4adf-b32c-4647a7114d5b';
const updatedData = {
    name: 'Habiba Akhtar',
    email: 'habiba@test.com',
};

let updatedObj = students.find((item) => item.id === idToUpdate);
updatedObj = {
    id: idToUpdate,
    ...updatedData,
};
console.log('Updated', students);
/* 
Updated [
  {
    id: '67de71e5-0eac-474f-ab51-850ba9b31ed5',
    name: 'Md Al-Amin',
    email: 'alamin@test.com'
  },
  {
    id: 'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e',
    name: 'Akib Ahmed',
    email: 'akib@test.com'
  },
  {
    id: 'ee729e84-a84e-4adf-b32c-4647a7114d5b',
    name: 'Elias Emon',
    email: 'elias@test.com'
  },
  {
    id: '0a2c956c-a9f4-48b9-83fa-551b432dfb2b',
    name: 'Fahim Faisal',
    email: 'fahim@test.com'
  }
]
*/
```

Nothing is updated because we are reassigning the object. Since we are reassigning, its reference is also changed. Due to the different references, our update is not working. Now let's see how we can update by finding the index.

```js
const idToUpdate = 'ee729e84-a84e-4adf-b32c-4647a7114d5b';
const updatedData = {
    name: 'Habiba Akhtar',
    email: 'habiba@test.com',
};

const updatedIndex = students.findIndex((item) => item.id === idToUpdate);
students[updatedIndex] = {
    ...students[updatedIndex],
    ...updatedData,
};
console.log('Updated', students);
```

In JavaScript, the three dots are called the spread operator. It means everything in the original object remains, and the new data is updated accordingly. When reassignment is needed, we use findIndex instead of find. This update is moderately complex, so its complexity is O(n).

- Delete

Deleting is relatively easy. We can use two methods: `splice` and `filter`. Both have a complexity of O(n). Here we are working with splice. We will demonstrate the filter operation in the next step. If we want to delete our updatedIndex, we write:

```js
students.splice(updatedIndex, 1);
```

- Filter

```js
const filteredStudents = students.filter((item) => item.id !== idToUpdate);
console.log(filteredStudents);
```

- Easily Traverse

Traversing an array is very easy. Suppose we want to know the names of the students. We can retrieve the names by traversing the array in three ways: `for` loop, `for in` loop, and `for of` loop. Examples of all three are given below.

```js
for (let i = 0; i < students.length; i++) {
    console.log(students[i].name);
}

for (let i in students) {
    console.log(students[i].name);
}

for (let student of students) {
    console.log(student.name);
}
```

Additionally, there are built-in methods for array traversal, such as `forEach`, `map`, `filter`, `every`, `reduce`, `some`, `find`, `findIndex`, etc. Thus, traversing an array is very easy, with a complexity of O(n).

### Object Over Array

Now let's convert our array of students into an object and attempt the same operations as we did with the array.

```js
const students = {
    '67de71e5-0eac-474f-ab51-850ba9b31ed5': {
        id: '67de71e5-0eac-474f-ab51-850ba9b31ed5',
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e': {
        id: 'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e',
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    'ee729e84-a84e-4adf-b32c-4647a7114d5b': {
        id: 'ee729e84-a84e-4adf-b32c-4647a7114d5b',
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
};
```

Our object is ready. Now let's look at the operations one by one.

- Create a new one

In an array, we easily inserted data using the push method. But in an object, there's no such method. So how do we perform this operation? Let's see how it's done.

```js
const std = {
    id: uuidv4(),
    name: 'Feroz Khan',
    email: 'feroz@test.com',
};

students[std.id] = std;
```

This is the only way, and the easiest. You can create as much data as you want this way. Very easy, and its complexity is O(1).

- Update

Since this is not an array, neither find nor findIndex will work here. So how do we update? Very simple. Let's see.

```js
const idToBeUpdated = 'ee729e84-a84e-4adf-b32c-4647a7114d5b';
const updatedData = {
    name: 'HM Azizul',
    email: 'azizul@test.com',
};
students[idToBeUpdated] = {
    ...students[idToBeUpdated],
    ...updatedData,
};
```

Now if you run the program, you'll see your data has been updated. Since no built-in method is needed here, its complexity is O(1).

- Delete

Deleting from an object is very simple. Just use a keyword and it's done.

```js
delete students[idToBeUpdated];
```

That's it. Complexity is O(1).

- Get anything if you have the key

If we know the key of any object, we can get that object in a second. How? Just see-

```js
console.log(students['67de71e5-0eac-474f-ab51-850ba9b31ed5']);
```

That's it. And its complexity is also O(1).

- Traverse

We can easily traverse an object using the for in loop. For example, if we want to get the names of everyone in the object, how do we do it?

```js
for (let key in students) {
    console.log(students[key].name);
}
```

But this is an imperative way. When working with React, we can't use for in in jsx. We need a declarative way. For that, we mentioned two methods in the object discussion: `Object.keys()` and `Object.values()`. Let's see how we can apply them.

```js
Object.keys(students).forEach((key) => {
    const student = students[key];
    console.log(student.name);
});
```

Here we could have worked with values directly without taking key. Like

```js
Object.values(students).forEach((student) => {
    console.log(student.name);
});
```

Through this, we can turn an object into an array and do all the array operations. This doesn't require any extra memory since we aren't storing it anywhere. It clears through garbage collection after completing its work.

So, we see that the operations we could do with arrays, we can also do with objects, often more easily.


### Functions vs Methods

In the code snippets provided, there are two instances of the `startRecording` function:

```js
startRecording();

microphone.startRecording();
```

Here, the `startRecording` function exists both independently and within an object (`microphone`). While the independent function can be called directly, the function within the object must be called using the object name, like `microphone.startRecording()`. This is the basic difference: methods are functions that belong to objects, and standalone functions can be called directly.

## Object as a Data Structure

Let's say we want to store information about several students, each having a unique ID, name, and email. First, we create a function to generate a unique ID.

```js
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
```

This function is taken from Google. We can store student information using either an array or an object. Arrays and objects each have their pros and cons depending on the task. First, let's work with arrays.

### Array

We store all student information in an array.

```js
const students = [
    {
        id: uuidv4(),
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    {
        id: uuidv4(),
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    {
        id: uuidv4(),
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
];
```

Since we're not working with a UI, we don't want the ID to change each time. We generate the output once and store it:

```js
const students = [
    {
        id: '67de71e5-0eac-474f-ab51-850ba9b31ed5',
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    {
        id: 'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e',
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    {
        id: 'ee729e84-a84e-4adf-b32c-4647a7114d5b',
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
];
```

Storing data in an array provides several benefits:

1. Create a new one
2. Update
3. Delete
4. Filter
5. Easily Traverse

Let's go through each of these operations.

- Create a new one

This is the simplest operation. We can use two methods to insert data into an array. If we want to insert at the end, we use the `push` method. If we want to insert at the beginning, we use the `unshift` method. However, `unshift` is more expensive. Why? Because it shifts each element one position to the right, causing more operations. Its complexity is O(n), where n is the size of the array. On the other hand, the `push` method simply adds data to the end, with a complexity of O(1). O(n) depends on the ...

```js
students.push({
    id: '0a2c956c-a9f4-48b9-83fa-551b432dfb2b',
    name: 'Fahim Faisal',
    email: 'fahim@test.com',
});
```

Now, running our program will show the new data in the array.

- Update

We can update in two ways: finding the object with the `find` method and updating it, or finding the index with the `findIndex` method and updating it by index. There is a problem with updating by object, let's see.

```js
const idToUpdate = 'ee729e84-a84e-4adf-b32c-4647a7114d5b';
const updatedData = {
    name: 'Habiba Akhtar',
    email: 'habiba@test.com',
};

let updatedObj = students.find((item) => item.id === idToUpdate);
updatedObj = {
    id: idToUpdate,
    ...updatedData,
};
console.log('Updated', students);
/* 
Updated [
  {
    id: '67de71e5-0eac-474f-ab51-850ba9b31ed5',
    name: 'Md Al-Amin',
    email: 'alamin@test.com'
  },
  {
    id: 'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e',
    name: 'Akib Ahmed',
    email: 'akib@test.com'
  },
  {
    id: 'ee729e84-a84e-4adf-b32c-4647a7114d5b',
    name: 'Elias Emon',
    email: 'elias@test.com'
  },
  {
    id: '0a2c956c-a9f4-48b9-83fa-551b432dfb2b',
    name: 'Fahim Faisal',
    email: 'fahim@test.com'
  }
]
*/
```

Nothing is updated because we are reassigning the object. Since we are reassigning, its reference is also changed. Due to the different references, our update is not working. Now let's see how we can update by finding the index.

```js
const idToUpdate = 'ee729e84-a84e-4adf-b32c-4647a7114d5b';
const updatedData = {
    name: 'Habiba Akhtar',
    email: 'habiba@test.com',
};

const updatedIndex = students.findIndex((item) => item.id === idToUpdate);
students[updatedIndex] = {
    ...students[updatedIndex],
    ...updatedData,
};
console.log('Updated', students);
```

In JavaScript, the three dots are called the spread operator. It means everything in the original object remains, and the new data is updated accordingly. When reassignment is needed, we use findIndex instead of find. This update is moderately complex, so its complexity is O(n).

- Delete

Deleting is relatively easy. We can use two methods: `splice` and `filter`. Both have a complexity of O(n). Here we are working with splice. We will demonstrate the filter operation in the next step. If we want to delete our updatedIndex, we write:

```js
students.splice(updatedIndex, 1);
```

- Filter

```js
const filteredStudents = students.filter((item) => item.id !== idToUpdate);
console.log(filteredStudents);
```

- Easily Traverse

Traversing an array is very easy. Suppose we want to know the names of the students. We can retrieve the names by traversing the array in three ways: `for` loop, `for in` loop, and `for of` loop. Examples of all three are given below.

```js
for (let i = 0; i < students.length; i++) {
    console.log(students[i].name);
}

for (let i in students) {
    console.log(students[i].name);
}

for (let student of students) {
    console.log(student.name);
}
```

Additionally, there are built-in methods for array traversal, such as `forEach`, `map`, `filter`, `every`, `reduce`, `some`, `find`, `findIndex`, etc. Thus, traversing an array is very easy, with a complexity of O(n).

### Object Over Array

Now let's convert our array of students into an object and attempt the same operations as we did with the array.

```js
const students = {
    '67de71e5-0eac-474f-ab51-850ba9b31ed5': {
        id: '67de71e5-0eac-474f-ab51-850ba9b31ed5',
        name: 'Md Al-Amin',
        email: 'alamin@test.com',
    },
    'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e': {
        id: 'ebdf6b78-c32b-4b1d-8574-e8c655b05c1e',
        name: 'Akib Ahmed',
        email: 'akib@test.com',
    },
    'ee729e84-a84e-4adf-b32c-4647a7114d5b': {
        id: 'ee729e84-a84e-4adf-b32c-4647a7114d5b',
        name: 'Elias Emon',
        email: 'elias@test.com',
    },
};
```

Our object is ready. Now let's look at the operations one by one.

- Create a new one

In an array, we easily inserted data using the push method. But in an object, there's no such method. So how do we perform this operation? Let's see how it's done.

```js
const std = {
    id: uuidv4(),
    name: 'Feroz Khan',
    email: 'feroz@test.com',
};

students[std.id] = std;
```

This is the only way, and the easiest. You can create as much data as you want this way. Very easy, and its complexity is O(1).

- Update

Since this is not an array, neither find nor findIndex will work here. So how do we update? Very simple. Let's see.

```js
const idToBeUpdated = 'ee729e84-a84e-4adf-b32c-4647a7114d5b';
const updatedData = {
    name: 'HM Azizul',
    email: 'azizul@test.com',
};
students[idToBeUpdated] = {
    ...students[idToBeUpdated],
    ...updatedData,
};
```

Now if you run the program, you'll see your data has been updated. Since no built-in method is needed here, its complexity is O(1).

- Delete

Deleting from an object is very simple. Just use a keyword and it's done.

```js
delete students[idToBeUpdated];
```

That's it. Complexity is O(1).

- Get anything if you have the key

If we know the key of any object, we can get that object in a second. How? Just see-

```js
console.log(students['67de71e5-0eac-474f-ab51-850ba9b31ed5']);
```

That's it. And its complexity is also O(1).

- Traverse

We can easily traverse an object using the for in loop. For example, if we want to get the names of everyone in the object, how do we do it?

```js
for (let key in students) {
    console.log(students[key].name);
}
```

But this is an imperative way. When working with React, we can't use for in in jsx. We need a declarative way. For that, we mentioned two methods in the object discussion: `Object.keys()` and `Object.values()`. Let's see how we can apply them.

```js
Object.keys(students).forEach((key) => {
    const student = students[key];
    console.log(student.name);
});
```

Here we could have worked with values directly without taking key. Like

```js
Object.values(students).forEach((student) => {
    console.log(student.name);
});
```

Through this, we can turn an object into an array and do all the array operations. This doesn't require any extra memory since we aren't storing it anywhere. It clears through garbage collection after completing its work.

So, we see that the operations we could do with arrays, we can also do with objects, often more easily.

## Comparison of object and array operation costs

```js
const arr = [];
const arrToObj = {};
for (let i = 0; i < 5000000; i++) {
    const o = {
        id: i,
        value: i,
    };
    arr.push(o);
    arrToObj[i] = o;
}

console.time('array');
let id = 4999999;
const obj = arr.find((item) => item.id === id);
obj.value = 555;
console.timeEnd('array'); // 104.901ms

console.time('obj');
arrToObj[id].value = 999;
console.timeEnd('obj'); // 0.019ms
```

Array operation took 104.901 milliseconds while object operation took 0.019 milliseconds.

```js
console.time('array');
arr.unshift({
    id: 5000000,
    value: 5000000,
});
console.timeEnd('array'); // 15.084ms

console.time('obj');
arrToObj[5000000] = {
    id: 5000000,
    value: 5000000,
};
console.timeEnd('obj'); // 0.018ms
```

For the array, it took 15.084 milliseconds while for the object it took 0.018 milliseconds.

```js
console.time('array');
const index = arr.findIndex((item) => item.id === 4000000);
arr.splice(index, 1);
console.timeEnd('array'); // 93.135ms

console.time('obj');
delete arrToObj[4000000];
console.timeEnd('obj'); // 0.015ms
```

For the array, it took 93.135 milliseconds while for the object it took 0.015 milliseconds.

In all cases, the object is the winner. However, in some cases, we still need to work with arrays, such as when ordered data is required, i.e., maintaining a sequence.

## Resource for this lecture

All resources for this lecture can be found in [Lecture 5](../../resources/lecture-05/README.md) and [Lecture 6](../../resources/lecture-06/README.md).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)
