
# Lecture 9 - Functional Programming in JavaScript

## Table of contents

- [Introduction](#introduction)
- [Pure Function and side effects](#pure-function-and-side-effects)
- [Higher Order Function](#higher-order-function)
- [Hidden Concepts](#hidden-concepts)
  - [Scope](#scope)
  - [Closure](#closure)
  - [Execution context](#execution-context)
  - [Hoisting](#hoisting)
- [Callback](#callback)
- [IIFE (Immediate Invoke Function Expression)](#iife-immediate-invoke-function-expression)
- [Resource for this lecture](#resource-for-this-lecture)
- [Source Code](#source-code)

## Introduction

In the last class, we discussed functions. Today we will learn about functional programming. Let's look at today's agenda.

- Pure Function + Side Effects + Immutability
- Higher Order Function
- Function Scope + Closure + Hoisting
- Callback
- IIFE (Immediate Invoke Function Expression)

There will be no discussion about recursion or currying in this class. We will learn about them when we need to work with them in the future.

Before discussing functional programming, we need to know what functional programming is. According to Wikipedia, 'In computer science, functional programming is a programming paradigm where programs are constructed by applying and composing functions.' It means that functional programming is a paradigm where programs are constructed by applying and composing functions. There are two types of functional programming languages: Pure and Impure. Programming languages that do not support anything other than ...

```js
// function statement
function func() {}

// Function expression
const myFn = function () {};

// Fat Arrow function
const myFatArrowFn = () => {};
```

Now let's try to understand the concepts of functional programming. If you go to [Functional Programming Languages: Concepts & Advantages](https://hackr.io/blog/functional-programming), you will see that there are five concepts mentioned. These are -

- Pure Functions
- Recursion
- Referential Transparency
- Functions are First-Class and Can be Higher-Order
- Immutability

Among these, we will discuss Pure Functions and Immutability today. We won't discuss recursion today. We saw in the last class that functions are first-class citizens. Today we will discuss higher-order functions. Referential Transparency means that if we store a function in a variable, its value can never be changed. Although this does not apply to JavaScript, we can change it using the function as a value. For more details, you can read the articles [Functional Programming Languages: Concepts & Advanta...

## Pure Function and side effects

Pure functions and pure functional languages are two completely different terms. Do not confuse the two. Let's consider pure water as an example of a pure function. It is completely pure, and drinking it will have no side effects. A pure function is similar. A function that has no side effects. The output it gives today will be the same 100 years from now. But we know that we use functions to get different outputs. So how is the same output possible? Let's look at an example.

```js
function sum(a, b) {
    return a + b;
}

sum(10, 20); // 30
```

This function is a pure function. How? This function does not change or update anything. It only works with the variables provided within it. It cannot change the value of any external variable. It means there are no side effects. This is one aspect. Another aspect is that if the arguments remain the same, like sum's arguments are 10 and 20, then its output will be 30 today and will be the same 30 after 100 years. Now a question may arise, what is this side effect? To understand this, let's look at the e...

```js
let limit = 100;
function changeLimit(limit) {
    limit = 500;
}

changeLimit(limit);
console.log(limit); // 100
```

This is a pure function because it does not change the external limit variable. It means it has no side effects. If there are no side effects, we call it a pure function. Now let's write the function in another way.

```js
let limit = 100;
function changeLimit() {
    limit = 500;
}

changeLimit(limit);
console.log(limit); // 500
```

Now the function changes the value of the variable. It means it has side effects, so it is an impure function. Let's see another example.

```js
const arr = [1, 2, 3];
function add(arr, data) {
    arr = [...arr, data];
    return arr;
}
```

This is a pure function because it is immutable; it returns a new array. It does not change the array I provided. It means there are no side effects. So it is a pure function. Now let's write this function in another way.


```js
const arr = [1, 2, 3];
function add(data) {
    arr.push(data);
}
```

This is a completely impure function because it directly updates the data of the arr variable. It means there are side effects.

Now, a question for you: Is the following function pure or impure?

```js
function log(msg) {
    console.log(msg);
}
```

At first glance, this might seem like a pure function, but it is an impure function because it logs to the console. So, any function that has console.log() is likely impure.

## Higher order function

Wherever the term higher order function comes up, it is associated with the term first-class citizen. First-class citizen means that we can treat functions as values. We understood this in a previous lecture. From that, we know that functions in JavaScript are values.

For a function to be higher order, it must meet two conditions:

- Function can be passed as an argument.
- Function can be returned from another function.

Due to these two conditions, experts understand how powerful functions in JavaScript can be.

To work with functional programming, the function must be pure. First, let's create a very simple higher order function. We will create a function for addition.

```js
function sum(a, b) {
    const r = a + b;
    return r;
}
```

Although this is a pure function, it is not a higher order function because it does not return a function or accept a function as an argument. Now, we need to understand how converting this to a higher order function will benefit us. Why should we forcibly make a function higher order? Suppose we create a function that generates two random numbers and performs some mathematical operations with those two numbers. But I will pass a value as an argument.

```js
function randomSum(max) {
    const random1 = Math.floor(Math.random() * max);
    const random2 = Math.floor(Math.random() * max);
    return random1 + random2;
}

function randomSub(max) {
    const random1 = Math.floor(Math.random() * max);
    const random2 = Math.floor(Math.random() * max);
    return random1 - random2;
}

function randomSqrSum(max) {
    const random1 = Math.floor(Math.random() * max);
    const random2 = Math.floor(Math.random() * max);
    return random1 * random1 + random2 * random2;
}
```

But here we see that the operation to generate random numbers is the same in all functions. We follow the DRY (Don't Repeat Yourself) principle. But it is repeated many times here. So, we thought of creating a function for those two lines.

```js
function generateTwoNumbers(max) {
    const random1 = Math.floor(Math.random() * max);
    const random2 = Math.floor(Math.random() * max);

    return {
        random1,
        random2,
    };
}
```

Now, we will use this function in our previous functions to solve our problem.

```js
function randomSum(max) {
    const { random1, random2 } = generateTwoNumbers(max);
    return random1 + random2;
}

function randomSub(max) {
    const { random1, random2 } = generateTwoNumbers(max);
    return random1 - random2;
}

function randomSqrSum(max) {
    const { random1, random2 } = generateTwoNumbers(max);
    return random1 * random1 + random2 * random2;
}
```

We solved our problem. But two days later, our client said they need more functions for multiplication, division, and others. Now we have to write functions again. The first line is the same for everyone. Only the mathematical operation is different. If we leave the responsibility of writing the mathematical operation to the user and create a function, then no matter how many requirements come in the future, we can create it without repeating any code. We will leave the operation part as a function passed...

```js
function randomOperation(max, operation) {
    const { random1, random2 } = generateTwoNumbers(max);
    return operation(random1, random2);
}
```


We solved our problem. But two days later, our client said they needed more functions for multiplication, division, and others. Now we have to write functions again. The first line is the same for everyone. Only the mathematical operation is different. If we leave the responsibility of writing the mathematical operation to the user and create a function, then no matter how many requirements come in the future, we can create it without repeating any code. We will leave the operation part as a function pas...

```js
function generateTwoRandNumber(max, cb) {
    const random1 = Math.floor(Math.random() * max);
    const random2 = Math.floor(Math.random() * max);
    const result = cb(random1, random2);
    return result;
}
```

Here, instead of writing the operation directly, we give the two random numbers we generated to the user and say, "You create your function, but just pass my two numbers as arguments to the function." Now we store the result of that function in the result variable and return it. Now, whatever operation the client wants, we can provide it quickly. Suppose the first requirement is just to print the two numbers.

```js
generateTwoRandNumber(100, (rand1, rand2) => console.log(rand1, rand2));
```

Then the requirement comes to add any two numbers within 1000.

```js
generateTwoRandNumber(1000, (rand1, rand2) => rand1 + rand2);
```

In this way, we can perform any operation we want very easily.

```js
generateTwoRandNumber(10, (rand1, rand2) => rand1 * rand2);
generateTwoRandNumber(10, (rand1, rand2) => rand1 * rand1 + rand2 * rand2);
```

Since we can pass a function as an argument according to the first condition of a higher order function, this is a higher order function.

Now let's come to our second condition. Why do we need to return another function from a function? Let's look at the examples below. Suppose we are asked to create a function to square a number.

```js
function sqr(a) {
    return a * a;
}
```

Now, if we are asked to create a function to cube a number, we will create a function to cube a number.

```js
function cube(a) {
    return a * a * a;
}
```

But the real task here is to calculate the power. It means the main task is to determine the power of a number. So, instead of writing so many functions, we can create a function for power.

```js
function power(p) {
    return function (n) {
        let result = 1;
        for (let i = 1; i <= p; i++) {
            result *= n;
        }
        return result;
    };
}
```

Here, we take p as the power and the function we return takes the number for which we want to calculate the power as n. Now let's see the operation.

```js
const sqr = power(2);
const cube = power(3);
const power8 = power(8);

console.log('SQR', sqr); // SQR [Function (anonymous)]
console.log('cube', cube); // cube [Function (anonymous)]
console.log('power8', power8); // power8 [Function (anonymous)]
```

Here, it is returning a function whose argument is a number. So we can do the following. We give the variables the number as an argument and get the square, cube, and 8th power.

```js
console.log('SQR', sqr(2)); // SQR 4
console.log('cube', cube(2)); // cube 8
console.log('power8', power8(2)); // power8 256
```

Mainly, we return another function from a function to dynamically generate a function and provide an abstract layer for the whole system. In other words, we use higher-order functions.

## Hidden Concepts

There are some hidden concepts in JavaScript. You will not see them directly or use them directly for coding. That is why they are called hidden concepts. These are -

- Scope
- Closure
- Execution Context
- Hoisting

### Scope

Let's take the function inside the power function and bring it outside to see what it looks like.

```js
const f = function (n) {
    let result = 1;
    for (let i = 1; i <= p; i++) {
        result *= n;
    }
    return result;
};
function power(p) {
    return f;
}
```


Here it will throw an error, `Reference error: p is not defined`. Because JavaScript supports lexical scoping. That means, what is accessible and where it is accessible is mainly called the scope. Now, what variable or what function is accessible where is set when lexing happens. Now, what is lexing? The code we write is not understood by the computer at all. Computers understand machine code, meaning binary. Only when our written code is broken down into machine code and given to the computer will the ...

```js
function power(p) {
    const f = function (n) {
        let result = 1;
        for (let i = 1; i <= p; i++) {
            result *= n;
        }
        return result;
    };
    return f;
}
```

If we `console.log(sqr.toString())`, it will return a function. Now, if we copy this function and store it under another name and call it, it will throw an error. But why? This thing is a bit difficult to explain in writing. To understand this, watch the video from [1:18:21](https://youtu.be/wMy2IZ12mxM?t=4701) to [1:34:06](https://youtu.be/wMy2IZ12mxM?t=5646). Then you will understand well.

Now, this lexical scoping follows some rules. Variables can mainly be written in two ways. One is globally, and the other is locally. Based on this, scopes are primarily of two types.

- Global
- Local

Global mainly means that we will not take any variables in a function; we will just create a file and declare variables there. Local variables are declared inside a function.

```js
const a = 10;
function mostOuter() {
    function outer() {
        console.log(a);
    }
}
```

Here, during lexing, when it finds a, it will check if a is in its block. If not, it will go to the outer block. If it still doesn't find it, it will look globally. This is how the lexical scoping concept works. In this example, a is a global variable. This scope is called global scope.

```js
function mostOuter() {
    function outer() {
        const a = 10;
        console.log(a);
    }
}
```

Here, a is a local variable because it is inside a function. It cannot be accessed globally. This type of scope is called local scope.

In addition to these two, there is another scope. That is block scope. Wherever there is a block, a scope is created. A block is written inside {}. What is written inside it cannot be accessed from outside. This is block scope.

```js
{
    const notScoped = 'not scoped';
}
console.log(notScoped); // Error
```

Again, lexing is applicable within this block scope. For example:

```js
{
    const notScoped = 'scoped';
    {
        {
            {
                console.log(notScoped); // scoped
            }
        }
    }
}
```

It means it didn't find `notScoped` in its block, so it went to its outer block. It kept going until it found it in the last block. This is the concept of lexing.

To understand the scope, you can watch the video [JavaScript Scope in Story](https://youtu.be/nRJPxro5GtY).

### Closure

A closure is a memory that we can use after a function is exhausted. For example, we get 2 as the value of p after calling the sqr function. We will get it only when the function is completely finished. This is closure. To understand it better, you can watch the video [Closure in Story](https://youtu.be/zSlSfqQTeFE).

### Execution Context

Let's create some functions.

```js
function A(a) {
    console.log('I am A');
}

function B() {
    A();
}

function C() {
    B();
    B();
}
function D() {
    C();
    A();
}

D();
/* 
I am A
I am A
I am A
*/
```


Which function will be called after which depends on the call stack. A stack is a data structure. Its principle is `Last In First Out (LIFO)`. It means the last one to come will be the first to go. When we stack plates after washing them, the first plate we place is at the bottom, and the last plate we place is on top. When we take a plate, we take it from the top, meaning we take the last plate we placed first. The plate we placed first at the bottom is taken last. The call stack works this way. In thi...

Reading this might make your head spin. To understand it well, watch the video from [2:00:33](https://youtu.be/wMy2IZ12mxM?t=7233) to [2:24:39](https://youtu.be/wMy2IZ12mxM?t=8679).

### Hoisting

```js
function randomSum(max) {
    const random1 = Math.floor(Math.random() * max);
    const random2 = Math.floor(Math.random() * max);
    t();
    function t() {
        console.log(test);
    }
    var test = 'something';
    t();
    return random1 + random2;
}

const r = randomSum(15);
```

When JavaScript sees a function, it first reads everything without executing anything. Then, wherever it finds a function, it creates a reference, and wherever it finds var, it assigns undefined. In the above function, t is called once before the test is declared and once after. The first output will be undefined, and the second will be 'something'. This is because JavaScript initially sets the value of test to undefined in the creational phase. When it goes to execute, it gives undefined the first time ...

If we write the t function as an expression instead of this way:

```js
var t = function () {
    console.log(test);
};
```

Then it will give us an error `TypeError: t is not a function`. This is because in the creational phase, seeing var, it sets the value of t to undefined. And undefined cannot be called. Point to be noted, hoisting is only applicable for var (before ES6 version), it will not work for let and const. In ES6 version, there is no term hoisting. So, if we call before defining, it will give us an error.

## Callback

A callback function means we will pass another function as an argument to a function. The function passed as an argument is the callback function. In the example of generateTwoNumbers() above, a callback function is shown.

## IIFE (Immediate Invoke Function Expression)

If we write a function and immediately call it, it is called Immediate Invoke Function Expression (IIFE). For example:

```js
(function (name) {
    console.log(name);
})('Nayem');

(() => {
    console.log('Test');
})();
```

Now, instead of writing this way, we could have written it globally like just `console.log('Nayem')` and `console.log('test')`. Why write it this way? When we declare something globally, it is publicly exposed. Anyone can access it. I want to keep my data secure. If I keep it inside a function, it remains secure. This is why we use IIFE.

## Resource for this lecture

You will find all resources for this lecture in [Lecture 9](../../resources/lecture-09/README.md).

## Source Code

You will find all source code for this lecture at this [link](../../src/lecture-09/app.js).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)
