
## Table of contents

- [Function](#function)
- [Function composition](#function-composition)
- [Function as a value](#functional-as-a-value)
- [Function Construction](#function-construction)
- [Resource for this lecture](#resource-for-this-lecture)
- [Source Code](#source-code)

## Function

A function is a machine. The tasks that can be performed by writing code in a file can also be done through functions. Functions are mainly used for repetitive tasks. If it's for repetition, then why not use loops? We use loops for repetition as well. We use functions because functions give us control. We can't use loops just anywhere as needed. A loop will keep running once started. With loops, we can control only when to start, stop, and skip. But with functions, we can use them as we please, wherever we need.

Beginners often don't understand when to use functions while solving problems. We tend to write everything inside one function. We consider functions as machines rather than robots. Each function is like a helper robot created to perform small tasks. So, wherever there is a question of doing a task, we need to write a function. Let's think about our daily routine. For example, we wake up in the morning, freshen up in the washroom, have breakfast, go to school/college/office, return home, have dinner, and finally go to sleep. If we break it down into points, it looks like this:

```txt
== Daily Routine ==
awake from sleep
go to washroom
take breakfast
go to school/college/office
Return from office
Take dinner
Go to sleep
```

Let's say these tasks are for a person named Mizan. If we write the code procedurally for Mizan, it will look like this:

```txt
'Mizan', awake from sleep
'Mizan', go to washroom
'Mizan', take breakfast
'Mizan', go to school/college/office
'Mizan', Return from office
'Mizan', Take dinner
'Mizan', Go to sleep
```

Now we need to write the same tasks for Akib. We wrote it for Akib as well.

```txt
'Akib', awake from sleep
'Akib', go to washroom
'Akib', take breakfast
'Akib', go to school/college/office
'Akib', Return from office
'Akib', Take dinner
'Akib', Go to sleep
```

The same tasks apply to Fahim. But he works from home, so there's no need for going to or coming back from the office.

```txt
'Fahim', awake from sleep
'Fahim', go to washroom
'Fahim', take breakfast
'Fahim', work from home
'Fahim', Take dinner
'Fahim', Go to sleep
```

These tasks are also true for Javed. He doesn't go to school, college, or office. He only studies at home.

```txt
'Javed', awake from sleep
'Javed', go to washroom
'Javed', take breakfast
'Javed', Study
'Javed', Take dinner
'Javed', Go to sleep
```

Now, if we have to do this for everyone, we need to rewrite the code for each person. If we can create a template where everything is the same except the name, it will save us a lot of time, effort, and resources. Let's create a function. Let's see how to do it.

```js
/**
 * * Name: Human_Lifecycle
 * * Param: human_name
 * * :human_name, awake from sleep
 * * :human_name, go to washroom
 * * :human_name, take breakfast
 * * :human_name, go to school/college/office
 * * :human_name, Return from office
 * * :human_name, Take dinner
 * * :human_name", Go to sleep
 */
```

Here, we named our function Human_Lifecycle and took human_name as a parameter. Now, wherever we previously had the name, we replaced it with the parameter. Now we can call this function for as many people as we want with just one line of code.

```js
// Call Human_Lifecycle for 'Abu Musa'
// Call Human_Lifecycle for 'Easin Islam'
// Call Human_Lifecycle for 'Saiful Islam'
// Call Human_Lifecycle for 'Akib Ahmed'
// Call Human_Lifecycle for 'Alamin Mir'
```


Now, see that we are doing the same tasks for everyone but with less time and less code than before.

But now another problem has arisen. For example, not everyone does all the tasks. Some may go to the office, some work from home, some do not work at all but only study. In that case, this function will not work for everyone. Moreover, each task here is separate. There is no relation between one task and another. And it is also necessary to specify how each task will be done. For example, going to sleep has no relation to going to the washroom. I can go to the washroom without sleeping. Similarly, there is no relation between having dinner and going to sleep. It may happen that I am not hungry today and I sleep without eating. So, here we can create separate functions for each task and call the function for the task that is needed. So, we will write the functions not as above but as follows:

First, let's create a function for sleep.

```js
/**
 * Function: Sleep
 * Param: name
 * Definition: How to sleep
 */
```

Here, we named the function Sleep and took `name` as a parameter, which means who is sleeping, and the definition is how to sleep.

```js
/**
 * Function: Awake
 * Param: name
 * Definition: How to awake
 */
```

Here, we created a function for waking up in the same way as before.

```js
/**
 * Function: Eat
 * Param: name
 * Param: Time
 * Definition: How to eat
 */
```

Here, we created a function for eating. Along with `name`, we took `time` as a parameter because we will understand whether they are having breakfast, lunch, or dinner from this parameter.

```js
/**
 * Function: Go_To
 * Param: name
 * Param: Destination
 * Param: Transport_system
 * Definition: How to go
 */
```

Next, let's assume they are going to school, college, or office. We created a function for that. Here, we took three parameters: who is going, where they are going, and how they are going, whether they are walking, going by bus, or using their own car.

```js
/**
 * Function: Work
 * Param: name
 * Definition: How to work
 */
```

Next, someone can work from home or at the office, but they are working. In that case, we took a function named Work.

```js
/**
 * Function: Study
 * Param: name
 * Definition: How to study
 */
```

Like Work, we also took a function named Study.

Now we will create three functions. One for job holders, one for students, and another for remote workers.

```js
/**
 * Function: Job_Holder_Lifecycle
 * Param: name
 * Param: Transport_system
 * Definition:
 * - Awake -> name
 * - Eat -> name, 'breakfast'
 * - Go_To -> name, 'office', Transport_system
 * - Work -> name
 * - Eat -> name, 'lunch'
 * - Go_To -> name, 'home', Transport_system
 * - Eat -> name, 'dinner'
 * - Sleep -> name
 */

/**
 * Function: Student_Lifecycle
 * Param: name
 * Param: Transport_system
 * Definition:
 * - Awake -> name
 * - Eat -> name, 'breakfast'
 * - Go_To -> name, 'institution', Transport_system
 * - Study -> name
 * - Eat -> name, 'lunch'
 * - Go_To -> name, 'home', Transport_system
 * - Eat -> name, 'dinner'
 * - Sleep -> name
 */

/**
 * Function: Remote_Workers_Lifecycle
 * Param: name
 * Definition:
 * - Awake -> name
 * - Eat -> name, 'breakfast'
 * - Work -> name
 * - Eat -> name, 'lunch'
 * - Work -> name
 * - Eat -> name, 'dinner'
 * - Sleep -> name
 */
```


I hope everyone has understood very well what we did here. There might be a bit of confusion about why we are still taking `name` and `transport_system` as parameters but using others statically. For example, breakfast will always be breakfast at that time. In the morning, one will not have lunch. That's why we used it statically. But we don't know for whom we will use this, and how they will go, so we still keep these two parameters as they are. Now let's call the functions.

```js
// Students_Lifecycle -> 'Faruk'
// Students_Lifecycle -> 'Elias'
// Students_Lifecycle -> 'Faisal'

// Job_Holder_Lifecycle -> 'Musa'
// Job_Holder_Lifecycle -> 'Akib'

// Remote_Workers_Lifecycle -> 'Bipon'
```

We were able to call the function needed for each person very nicely. So, we got a small idea of how to create functions for each task and what things to keep in mind.

First, let's see the structure of how to write a function in JavaScript.

```js
function name_of_the_function(/** Input something  */) {
    // Function body
    // any valid js code
    // return a result
}
```

This is the basic structure of a function. First, we write the `function` keyword. Then we give a name to the function. Then we give `()` within which we give our parameters. The parameters we wrote in the pseudocode. Then within `{}` we write the function body. Inside the function body, we can write any valid JavaScript code. And at the end, the function will return something. Even if it does not return anything, it will return `undefined`. Apart from this structure, there are three other ways to write a function structure. We won't go into details. We will just see the structures. One is an Anonymous Function, meaning a function with no name.

```js
function (/** Input something  */) {
    // Function body
    // any valid js code
    // return a result
}
```

Another is writing as a function expression and storing it in a variable. For example:

```js
const name_of_the_function = function (/** Input something  */) {
    // Function body
    // any valid js code
    // return a result
};
```

Another is the arrow function which came in JavaScript ES6.

```js
const name_of_the_function = (/** Input something  */) => {
    // Function body
    // any valid js code
    // return a result
};
```

We will use our basic structure for now. Now, there are two steps for functions.

1. Define a function
2. Invoke a function

First, let's see how to define a function.

```js
function testFunction() {
    const a = 10;
    const b = 20;
    const result = a + b + Math.max(a, b);
    console.log(result);
}
```

This is defining a function. Now let's see how to call or invoke a function.

```js
testFunction(); // 50
```

But there is a problem with this system. For example, every time this function is called, it will give the same output. I can't provide any value from outside to this function as I wish. Also, we cannot access any data of the function body from outside. Variables inside the function are local variables, and outside the function, they are global variables. We will discuss this later. If we write the variables we took inside the function within `()`, we will call them parameters. Now, whatever we take as parameters, we can give as input from outside. It will be clearer by seeing the code below:


When we call the function, the values we provide are called arguments. And the parameters are what we put within the parentheses when defining the function. If we do not provide any arguments, it will take the default values given. If we provide arguments, it will take those. We may also choose not to provide any default values. It is entirely up to us. I hope the concept of function, function body, function definition, and function call is clear. Now let's see how we can convert our pseudocode into co...

```js
function testFunction(a = 10, b = 20) {
    const result = a + b + Math.max(a, b);
    console.log(result);
}

testFunction(); // 50
testFunction(100, 200); // 500
```

Here, the values we provide while calling the function are arguments. And the parameters are what we put within the parentheses while defining the function. If we do not provide any arguments, it will take the default values given. If we provide arguments, it will take those. We may also choose not to provide any default values. It is entirely up to us. I hope the concept of function, function body, function definition, and function call is clear. Now let's see how we can convert our pseudocode into cod...

```js
/**
 * Function: Sleep
 * Param: name
 * Definition: How to sleep
 */

function sleep(name) {
    console.log(`${name} is sleeping`);
}

/**
 * Function: Awake
 * Param: name
 * Definition: How to awake
 */

function awake(name) {
    console.log(`${name} is awake`);
}

/**
 * Function: Eat
 * Param: name
 * Param: Time
 * Definition: How to eat
 */

function eat(name, time) {
    console.log(`${name} is taking ${time}`);
}

/**
 * Function: Go_To
 * Param: name
 * Param: Destination
 * Param: Transport_system
 * Definition: How to go
 */

function goTo(name, destination, transport) {
    console.log(`${name} is going to ${destination} by ${transport}`);
}

/**
 * Function: Work
 * Param: name
 * Definition: How to work
 */

function work(name) {
    console.log(`${name} is working`);
}

/**
 * Function: Study
 * Param: name
 * Definition: How to study
 */

function study(name) {
    console.log(`${name} is studying`);
}

/**
 * Function: Job_Holder_Lifecycle
 * Param: name
 * Param: Transport_system
 * Definition:
 * - Awake -> name
 * - Eat -> name, 'breakfast'
 * - Go_To -> name, 'office', Transport_system
 * - Work -> name
 * - Eat -> name, 'lunch'
 * - Go_To -> name, 'home', Transport_system
 * - Eat -> name, 'dinner'
 * - Sleep -> name
 */

function jobHolderLifecycle(name, transport) {
    awake(name);
    eat(name, 'breakfast');
    goTo(name, 'office', transport);
    work(name);
    eat(name, 'lunch');
    goTo(name, 'home', transport);
    eat(name, 'dinner');
    sleep(name);
}
```


/**
 * Function: Student_Lifecycle
 * Param: name
 * Param: Transport_system
 * Definition:
 * - Awake -> name
 * - Eat -> name, 'breakfast'
 * - Go_To -> name, 'institution', Transport_system
 * - Study -> name
 * - Eat -> name, 'lunch'
 * - Go_To -> name, 'home', Transport_system
 * - Eat -> name, 'dinner'
 * - Sleep -> name
 */

function studentLifecycle(name, transport) {
    awake(name);
    eat(name, 'breakfast');
    goTo(name, 'institution', transport);
    work(name);
    eat(name, 'lunch');
    goTo(name, 'home', transport);
    eat(name, 'dinner');
    sleep(name);
}

/**
 * Function: Remote_Workers_Lifecycle
 * Param: name
 * Definition:
 * - Awake -> name
 * - Eat -> name, 'breakfast'
 * - Work -> name
 * - Eat -> name, 'lunch'
 * - Work -> name
 * - Eat -> name, 'dinner'
 * - Sleep -> name
 */

function remoteWorkersLifecycle(name) {
    awake(name);
    eat(name, 'breakfast');
    work(name);
    eat(name, 'lunch');
    work(name);
    eat(name, 'dinner');
    sleep(name);
}

console.log('Jobholders Lifecycle');
console.log('**********************');
jobHolderLifecycle('Shayed Hasan', 'bus');
console.log('-----------------------');
jobHolderLifecycle('Sh Pabel', 'bus');
console.log('-----------------------');
jobHolderLifecycle('Tarikul Islam', 'bus');
console.log('-----------------------');

console.log('Remote Workers Lifecycle');
console.log('**********************');
remoteWorkersLifecycle('Nahian Sikder');
console.log('-----------------------');
remoteWorkersLifecycle('Mizan Rahman');
console.log('-----------------------');

console.log('Students Lifecycle');
console.log('**********************');
studentsLifecycle('Faruk', 'rickshaw');
console.log('--------------------');
studentsLifecycle('Elias', 'rickshaw');
console.log('--------------------');
studentsLifecycle('Faisal', 'rickshaw');
console.log('--------------------');
```

I hope everyone has understood functions. In this way, we were able to create functions for small tasks and use them wherever we needed. We didn't have to write all the code repeatedly.

## Function composition

Everyone is a bit confused about the return statement. When to use return in a function, why to return, etc. We will understand this with the term function composition. The term may sound scary to some, but it is actually basic math. When we used to do function math in school like f(g(x)), it means we have a function g that returns some result when we input x, which we use in another function f. It means using the result of one function in another function, this is called function composition. It is a bit...

```js
function sum(a, b) {
    console.log(a + b);
}

function subtract(a, b) {
    console.log(a - b);
}

function times(a, b) {
    console.log(a * b);
}

sum(10, 20); // 30
sub(10, 20); // -10
times(10, 20); // 200
```


They are giving me the result perfectly. There is no problem here. The problem will start with the code below.

```js
function sum(a, b) {
    console.log(a + b);
}

function subtract(a, b) {
    console.log(a - b);
}

function times(a, b) {
    console.log(a * b);
}

const a = 10;
const b = 20;

const r1 = sum(a, b); // 30
console.log('R1', r1); // 'R1' undefined
const r2 = subtract(a, b); // -10
console.log('R2', r2); // 'R2' undefined
const r = times(r1, r2); // NaN
console.log(r); // undefined
```

Why did we get such a result here? When we want to store the result of a function in a variable, the function must return something. Here, our functions are not returning anything. console.log() does not return anything. So if it doesn't return anything, where did the undefined come from? We need to remember that if we do not specify what to return in a JavaScript function, it will return undefined by default. So, r1 stored undefined, and r2 stored undefined. Now, if we multiply undefined with undefined,...

```js
function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function times(a, b) {
    return a * b;
}

const a = 10;
const b = 20;

const r1 = sum(a, b);
console.log('R1', r1); // 'R1' 30
const r2 = subtract(a, b);
console.log('R2', r2); // 'R2' -10
const r = times(r1, r2);
console.log(r); // -300
```

We can also write it this way without taking so many variables.

```js
const r = Math.abs(times(sum(a, b), subtract(a, b)));
console.log(r); // 300
```

Math.abs() is used to get the result in positive. If we consider Math.abs() = f(), times() = g(), sum(a, b) = x, sub(a, b) = y, the appearance becomes f(g(x, y)). This is function composition. Basic mathematics from childhood. I hope you understand.

So far, what we have learned:

- Function definition
- Function Invoking
- Function Parameters/Arguments
- Return result from function

We have a basic understanding of functions. Now we will move on to functional programming.

## Function as a value

If asked what functional programming is in JavaScript, in one word, it is 'Function is a first class citizen'. Now, what is meant by `first class citizen`? Is it something very high class? It's not like that at all. For a programming language to be considered a functional programming language, it must fulfill the condition, 'We can treat function as value'. If we can treat a function as a value in any language, then we can call that language a functional programming language. In functional programming,...

- we can store functions in a variable
- we can store functions inside an object/array
- we can pass functions as an argument
- we can also return a function from another function

For those who come from OOP, functional programming may seem useless. But as days go by, you will fall in love with it. Its biggest advantage is that in OOP, we have to program imperatively. It means writing all the code from start to finish. But in functional programming, we do it declaratively. It means I don't need to know a lot of business logic. Just knowing what is needed is enough. Another big advantage is that programming in OOP is very expensive. Expensive doesn't mean you have to buy it with m...

```js
function testFunction() {
    console.log('I am a test function');
}

const fn = testFunction;
console.log(fn);
fn(); // I am a test function
```

First, we defined a function. It does not return anything. So if we add () at the end of testFunction while storing it in a variable, it will return undefined. But I want to store the function, not its result. So we need to write only testFunction without (). Now if we call fn instead of testFunction, the result will be 'I am a test function'. So we can store the function as a value in a variable.

Now, since we were able to store it in a variable, we can also store it inside an object or an array.

```js
const arr = [fn, testFunction];
const obj = {
    fn: testFunction,
};
```


We can also pass functions as arguments.

```js
function fnArgument(fn) {
    return fn();
}
fnArgument(testFunction);
```

We can even return another function from one function.

```js
function returnFn() {
    return testFunction;
}
```

So, we saw that we can do everything with functions as values. But just as we could define objects and arrays with new Object(), new Array(), if we can't create functions with new Function(), why should we consider it a function? Because in JavaScript, there is a constructor for creating every value. Now let's construct a function.

## Function Construction

Before understanding function construction, let's look at the function below.

```js
function strToObj(str) {
    let obj = {};
    for (let s of str) {
        if (s !== ' ') {
            obj[s] = s;
        }
    }
    return obj;
}
console.log(strToObj('HM Nayem')); // { H: 'H', M: 'M', N: 'N', a: 'a', y: 'y', e: 'e', m: 'm' }
```

Now we will create this function using the constructor.

```js
const fn = new Function(
    'str',
    `let obj = {};
    for (let s of str) {
        if (s !== ' ') {
            obj[s] = s;
        }
    }
    return obj;`
);

console.log(fn('HM Nayem')); // { H: 'H', M: 'M', N: 'N', a: 'a', y: 'y', e: 'e', m: 'm' }
```

The constructor creates the function just like the previous one did. You can pass as many arguments as you want in new Function(). But remember that the last argument must be the function body, i.e., what is inside {}. Here we used our function parameters as the first argument and the function body as the second argument. When running the program, it gives the same output. So, we can create functions using the constructor. There is no obstacle to calling a function a first-class citizen. It provides a sig...

Meta programming is a great concept. Its advantage is that you can dynamically generate new code at runtime. You can create your own syntax. If you don't like a syntax in JavaScript, you can create your own. Suppose you want to define an array like this `const [] number: arr` instead of `const arr = []`. You can do that with meta programming. To learn more about meta programming, read [Meta Programming](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming).

Another significant advantage of function constructors is that since you can create functions this way, you can generate functions at runtime.

Suppose we have a CMS on our server. Our target is to create the function body there and send it to the client. We create an object like this.

```js
const fData = {
    params: ['a', 'b'],
    body: ['const r = a + b', 'return r'],
};
```

Now each line in the body is separate. We need to bring them together. We can do that with the reduce method.

```js
const fBody = fData.body.reduce((acc, cur) => {
    acc += cur + ';';
    return acc;
}, '');
```

We discussed reduce in detail in the last class. Understand it well from there. Now let's construct a sum function using the constructor.

```js
const tf = new Function(...fData.params, fBody);
console.log(tf(100, 200)); // 300
```

How powerful it is! We can create a library that generates functions from JSON. You can prepare the necessary functions with the CMS and provide them. You can dynamically change the function behavior. We dynamically generated a function from JSON.

Another example. Suppose we want to construct a function to extract the first name from a full name.

```js
const greetFn = new Function(
    'name',
    'email',
    `
    const fName = name.split(' ')[0];
    console.log('Hello,', fName, 'Is that your email?', email);
    console.log('Yeah, this is mine.');
    return fName;
    `
);
```


console.log(typeof greetFn); // function
console.log(greetFn.toString());
/* 
function anonymous(name,email) {
        const fName = name.split(' ')[0];
        console.log('Hello,', fName, 'Is that your email?', email);
        console.log('Yeah, this is mine.');
        return fName;
}
*/
const fName = greetFn('HM Nayem', 'nayem@gmail.com');
/* 
Hello, HM Is that your email? nayem@gmail.com
Yeah, this is mine.
*/
console.log('First Name:', fName); // First Name: HM
```

I hope everyone understands by looking at the code. The type of greetFn shows function. We did not create the function like this, but they created it in their way. And it gives the output as expected.

What we did so far is not functional programming. We just proved that a function is a value. And to be a functional programming language, a function must be treated as a value.

Now let's see something interesting. We stored the arguments, parameters, and function body of some operations in an array.

```js
const operations = [
    {
        args: [10, 20],
        params: ['a', 'b'],
        body: 'console.log("a + b",a + b)',
    },
    {
        args: [10, 20],
        params: ['a', 'b'],
        body: 'console.log("a - b",a - b)',
    },
    {
        args: [10, 20],
        params: ['a', 'b'],
        body: 'console.log("a * b",a * b)',
    },
];
```

Now, if we run the forEach method and try to create functions for each operation using the function constructor and see the output, let's see what happens.

```js
operations.forEach((operation) => {
    const fn = new Function(...operation.params, operation.body);
    fn(...operation.args);
});
/* 
a + b 30
a - b -10
a * b 200
*/
```

Now, I hope you understand how powerful this term is. However, we will not use this in any real application development because it has security flaws. When we take the function body from the server, we have to keep this side open. If a hacker can change my API, their code can come into my system and mess it up. We did this just for fun and understanding. It has no use in real application development.

We have discussed functions in detail. I hope everyone understands it well.

## Resource for this lecture

All resources for this lecture can be found in [Lecture 8](../../resources/lecture-08/README.md).

## Source Code

All source code for this lecture can be found at this [link](../../src/lecture-08/app.js).

## AUTHOR

[Aditya Chakraborty](https://github.com/adityackr)
