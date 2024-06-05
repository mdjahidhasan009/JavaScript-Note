
# Lecture 04 - Programming Fundamentals using JavaScript

In the last class, we discussed the fundamental concepts of programming languages. Today, we will learn about their origins. Understanding the origins will help us not worry about these topics anymore. The fundamentals of programming languages include:

- Variables
- Operators
- Conditions
- Loops
- Arrays
- Objects
- Functions
- Expression vs Statement

## Variables

We know that variables are placeholders. Beginners often face issues deciding where to use variables and where not to. There are some tricks for this. Before that, we need to understand what a variable does. In simple terms, a variable helps us make anything dynamic. That's its only purpose. It's like a container. The more containers we need, the more space (memory) it requires. So, why do we need extra memory? Can't we just use fewer variables? That way, our application will be lighter. But still, we need to use variables. For example, if we want to drink water, how does the water reach us? First, water is collected from the ground through pipes and pumps into a tank below the house. Then, another pump lifts it to a tank on the roof. From there, it's distributed to each house through piping. In the house, we collect the water in a filter through a tap. After filtering, we store the water in a jug or bottle. When we need to drink water, we pour it from the jug or bottle into a glass and drink. Our goal is to drink water, so why do we need to store it in so many places in between? If we couldn't store it in the tank, it wouldn't be possible to distribute it to each house. If we didn't filter it, we couldn't purify the water. So, variables are like this. They store data. Without variables, we couldn't reuse data.

```js
console.log('Abu Rayhan', 'Abu Rayhan'.length); // Abu Rayhan 10
```

In the example above, if we want to use another name, it's not possible. We would have to replace the current name. Because in static code, nothing can be changed at runtime. Now, the question might arise, what is runtime and compile time?

```js
console.log('Abu Rayhan', 'Abu Rayhan'.length); // Abu Rayhan 10
throw new Error('Something wrong'); // Error
```

Here, there's no error in the program. But while running, an error is encountered. This is called a runtime error. The time when the program runs is called runtime.

```js
console.log('Abu Rayhan', 'Abu Rayhan'.length);
121354644dsfsdf
```

In this case, the first code won't execute. It will directly show an error. Meaning, an error is found during compile time. This is called a compile-time error.

At runtime, we can change many things dynamically. We can take some input, fetch something from the internet, or click with a mouse. All these happen at runtime. But when we work with static data like in the first example, we can't change the data inside the log. That's why we need variables. Whenever we see data, we should use a variable.

```js
let name = 'Abu Rayhan';
console.log(name, name.length); // Abu Rayhan 10
```

Using variables has some advantages. The first advantage is that we took this data for Abu Rayhan. Now, if we want to take it for Zahid Hasan or HM Nayeem, we just need to change the data inside `name`. Another advantage is that `name` is used only in two places here. It could have been used in two thousand or two hundred thousand places. Now, if we need to change the data for some reason, is it possible to change it in two hundred thousand places? By using a variable, we only change it in one place, not in all two hundred thousand places.

Another example will make it clear how dynamically data can be changed at runtime using variables.

```js
const names = [
	'HM Nayeem',
	'Aditya Chakraborty',
	'Abu Rayhan',
	'Shaker Hossain',
	'Akib Ahmad',
	'Alvi Chowdhury',
];
let index = -1;
let person = names[++index];

setInterval(() => {
	person = names[index++];
	console.log(person, person.length);

	if (index === names.length) {
		index = 0;
	}
}, 1000);
```

Now, if we run the program, we will see that names are changing every second, one after another. When it reaches the end, it will start from the beginning again. It will continue infinitely. If we don't use variables and just use a static name, only that name will be printed repeatedly. The dynamic aspect will be gone. We program to make everything dynamic. So, wherever we see data, we should use a variable, no matter the extra memory it takes.

Now, let's talk about two important terms, `let` and `const`. When to use `let` and when to use `const`. When we see data that won't be updated later, we use `const`. That way, we can't update that data, even by mistake. If we try, it will throw an error. For data that has the chance to be updated later, we use `let`. In the example above, `names` is not updated anywhere, so we use `const`. But `index` and `person` are updated later, so we use `let` there. The rule is to assume everything as `const` initially. If we see any data being updated, we change it to `let` later. This way, we minimize the chances of making mistakes.

**So, variables are used to dynamically update data at runtime.**

## Operators

We are all familiar with operators. We have been doing addition, subtraction, multiplication, and division since childhood. We used some mathematical operators there. The operators in programming are the same. Operators in programming languages are used for mathematical calculations. That's all they do. Operators are essentially functions. In languages where operator overloading is available, we can create functions to perform the tasks of operators. For example,

```js
add();

mod();

lessThan();
```

We can create an `add` function for addition, use a `mod` function for modulus operation, and use `lessThan` to check if a value is smaller. But in JavaScript, operator overloading doesn't exist. So, we don't need to create functions. JavaScript already has these functions created symbolically for us, making our work easier. Instead of `add()`, we use `+`, instead of `mod()`, we use `%`, and instead of `lessThan`, we use `<`. There isn't much to explain about operators.

## Conditions

Conditions are considered the brain of a computer. Based on these conditions, the computer decides which task to perform. Though a computer has no decision-making power, we write various logics to guide it to make a decision. To write logic, we need conditions. We use conditions in our daily lives continuously. For example, if it's cloudy, I will take an umbrella; otherwise, I won't. This is a condition. Another example is if my office starts at 9, and if I can leave home by 8, I will take the bus; otherwise, I will take a taxi. This is another type of condition. Or, if today's class is about basics, I won't join; if it's advanced, I will join. Now, let's see how we can translate these conditions into code.

```js
if (studyBasic) {
	wontJoin();
}

if (studyAdvanced) {
	join();
}

if (teacherSpeaks) {
	silent();
}

if (!teacherSpeaks) {
	shout();
}
```

Let's try to understand this. If basics are taught, then I won't join today's class. If advanced topics are taught, then I will join. If the teacher speaks, we will all stay silent. If he doesn't speak, we will all talk together. We can find conditions like this in our daily activities. Everything is dependent on conditions. 50% of a programming language is conditions, and the other 50% is loops.

Now, conditions can be written in three ways, meaning there are three scenarios. Let's look at the code below first and then explain.

```js
// Scenario 1 - Single branch
// if condition
if (hasMoney) {
    buyPhone();
}

// Scenario 2 - Two branches
// if else condition
if (toss === 'head') {
    win();
} else {
    loss();
}

// Scenario 3 - Multiple branches
// else if
let a = 1,
    b = 2;
if (a > b) {
    big();
} else if (a < b) {
    small();
} else {
    same();
}
```

- Scenario - 1: This is a single branch. Here, more than one case is not possible. In such a case, we will use this scenario. It is called an `if condition`. It says, if there is money, buy a phone. If there isn't, nothing will happen. Only one case is needed here, so we will only use the `if condition`.

- Scenario - 2: This mainly depends on two branches, meaning it will have a maximum of two outcomes. It is called an `if else condition`. In such scenarios, more than two conditions are never possible. For example, if the toss is heads, I will win; otherwise, I will lose. There is no chance of having more than these two results.

- Scenario - 3: This is a multiple branch. If there is a possibility of more than two outcomes, we will use this. Such scenarios are called `else if conditions`. For example, if `a > b`, then a is bigger than b. If `a < b`, then a is smaller than b. Otherwise, they are equal. Here, there are more than two outcomes. So, we used multiple branches.

Conditions depend mainly on the outcome. Based on the number of outcomes, we will write the condition.

## Loop

A loop has one job: to do the same task repeatedly. For example, a client came and said Bangladesh is stepping into its 51st year. We will do something in our application to write 'We love Bangladesh' 51 times. We are very smart and wrote `console.log('We love Bangladesh')` 51 times, counting and writing for an hour, and showed it to the client. The client said no, not 51 times. Since Bangladesh became independent in 1971, we want it 1971 times. Now I spent three days counting and writing the same code an...

```js
console.log('We love Bangladesh
'.repeat(3000000));
```

I am over the moon. Thanking JavaScript in my mind for this function. The client is very happy after seeing it. But after a while, he says, well, it printed 3 million times. How will the user know it was printed 3 million times? It would be better if there was a number before each. Now how do I do that dynamically? The solution provided by programming languages is loops. Using loops, we can easily repeat the same task as many times as we want.

```js
for (let i = 1; i <= 3000000; i++) {
    console.log(i, 'We love Bangladesh');
}
```

Now all problems are solved. Loops have made repetitive tasks much easier. Imagine the block inside the curly braces of the loop is a new js file. We can write any valid js code here. But remember, the code inside this block will execute multiple times.

Primarily, there are 3 types of loops in JavaScript. Later, for different tasks, the number of loops increased. Even though there are multiple types of loops, any problem can be solved using just one loop.

- for loop
  - range
  - for in
  - for of
- while loop
- do while loop

### For Loop

With a for loop, we can do both while and do while tasks. Now, why did the for loop come, and what does it do? Let's take our previous example. The client has specified to print 3 million times. That means I know the range. I know the starting point, and I also know where to stop. In such cases, we will always use a for loop. Meaning, in cases where the starting and ending points are known, we will use a for loop. There are 3 types of loops within a for loop. One is range-related, which we saw. Another is...

### While Loop

With a while loop, we can also do the tasks of for and do while loops. Now, why did it come, and what does it do? Suppose the client told us to run the loop randomly. It doesn't have to start from 1. There will just be a random number, and beside it, the words 'We love Bangladesh'. There is no description of how long it has to run. An infinite loop can't be run either. The client said, do one thing. Whenever the number reaches 71, stop printing. The example below will make it clearer:

```js
while (true) {
    let num = Math.ceil(Math.random() * 100);
    console.log(num, 'We love Bangladesh');
    if (num === 71) break;
}
```

The difference from a for loop is that a for loop had 3 parts: initialize, condition, increment/decrement. But a while loop has only one part, which is the condition. And the condition means it will either be true or false. Meaning, when we don't know the range, but only the condition, we will use a while loop.

### Do While Loop

With a do while loop, we can't do the tasks of for or do while loops. It is a special type of loop. Why is it used? Suppose in the example of the while loop, the condition is false instead of true. Then it won't show output even once. I want it to show output at least once, whether the condition is true or false. In that case, we will use a do while loop. This is also possible with a while loop, but do while does the job a bit better. Let's see an example.

```js
do {
    console.log('It will run at least once');
} while (false);
```

## Loop Concept

Although its condition is false, it will still show the output at least once. This is the concept of this loop.

## Array

One of the most neglected data structures and also one of the most powerful. Using arrays, we can create many complex data structures like graphs, heaps, stacks, and queues. To work with 200,000-300,000 data points, an array is a very powerful and perfect data structure. The question is why arrays exist and what their purpose is. Suppose we want to store the names of several people. We can do this with variables.

```js
const name1 = 'Rayhan';
const name2 = 'Alvi';
const name3 = 'Anik';
const name4 = 'Arjun';
const name5 = 'Ayman';
```

Now we want to convert these names to lowercase. To do this, we would have to convert each one individually.

```js
console.log(name1, name1.toLowerCase());
console.log(name2, name2.toLowerCase());
console.log(name3, name3.toLowerCase());
console.log(name4, name4.toLowerCase());
console.log(name5, name5.toLowerCase());
```

Here, we only have 5 names, but what if there were 500,000 names? Converting each one individually would be impossible. We need a way to store all the names in a single variable. Let’s try doing it.

```js
const persons = 'Rayhan, Alvi, Anik, Arjun, Ayman';
```

Now, the problem is that these have all become part of one big string. How do we separate them? Let’s try storing them separately.

```js
const persons = 'Rayhan', 'Alvi', 'Anik', 'Arjun', 'Ayman';
```

But now if we try to run the program, we will get a big error. To solve this problem, we have a data structure called an array. Simply by putting `[]` before and after the example above, we can make it an array.

```js
const persons = ['Rayhan', 'Alvi', 'Anik', 'Arjun', 'Ayman'];
```

Now, how do we retrieve data from here? Each array element has a position number called an index. Indexing starts from 0. So, the index of the first position is 0, the index of the second position is 1, and so on. Thus, we get both a name and a number from the array. The advantage of having a number is that we can easily do calculations here. And this is the power of arrays. Let’s see how we can retrieve data from an array.

```js
const persons = ['Rayhan', 'Alvi', 'Anik', 'Arjun', 'Ayman'];
console.log(persons[0]);
console.log(persons[1]);
console.log(persons[2]);
console.log(persons[3]);
console.log(persons[4]);
```

In this way, we can retrieve all the names. Here, everything is the same except for the index. So we can run a loop here.

```js
const persons = ['Rayhan', 'Alvi', 'Anik', 'Arjun', 'Ayman'];

for (let i = 0; i < 5; i++) {
    console.log(persons[i]);
}
```

If we run the program now, all the names will be printed beautifully. However, there is a problem. To understand the problem, let’s add two more names.

```js
const persons = ['Rayhan', 'Alvi', 'Anik', 'Arjun', 'Ayman', 'Ayuub', 'Bidyut'];

for (let i = 0; i < 5; i++) {
    console.log(persons[i]);
}
```

Now, if we run the program, the loop will stop at `Ayman` because our loop range is set to be less than index 5. To solve this problem, we can dynamically set it to `persons.length`. This way, no matter how much the length of the array increases, it will dynamically update. If we redo the first example using arrays and loops, it will look like this:

```js
const persons = ['Rayhan', 'Alvi', 'Anik', 'Arjun', 'Ayman', 'Ayuub', 'Bidyut'];

for (let i = 0; i < 5; i++) {
    console.log(students[i], students[i].toLowerCase());
}
```

So you can understand how powerful arrays are. Arrays are closely linked with loops. Using arrays and loops, we can do many tasks easily and quickly.

What types of data can we store in arrays? In most programming languages, there are limitations to what data can be stored in arrays. Generally, only one data type can be stored in an array. However, JavaScript gives full freedom. In JavaScript, any data type can be stored in an array. You can even store different data types in a single array. Let’s take a look to understand better.

```js
const nums = [1, 2, 3, 4, 5, 6];
const bools = [true, true, false, false];
const nulls = [null, null, null];
const undefineds = [undefined, undefined, undefined];
const arrayOfArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const mixed = [true, null, 'Str', 5, [12, 2, 4]];
```


## Array with Objects and Functions

Arrays can also store objects and functions. Since we haven't discussed objects and functions yet, we won't show that here. Even though you can store different data types in an array, we should store only the same data type in an array. For instance, if you create an array of student names and include their addresses and phone numbers, it will be difficult to find a name. Therefore, it's advisable to store the same type of data in an array.

Arrays have some functionalities. We can think of arrays as a database, an in-memory database where we can create, read, update, and delete data. This entire operation is called **CRUD - Create, Read, Update, Delete** operation. All data structures in the world revolve around CRUD operations. There is more to discuss about arrays, but to do that, we need to discuss objects first.

## Object

We wrote the names of some students in an array. But if we want to store their email, age, and whether they are present in the current class, there is a problem with using arrays. Let's try to understand the problem.

```js
const student = ['Abu', 'Rayhan', 'rayhan@example.com', 25, true];
sendEMail(students[0]);

function sendEmail(email) {
    console.log('Sending Email to ', email);
}
```

Now let's see what problems may arise here. First, there's no way to understand what type of information each element holds, meaning the code isn't readable. When we send an email, we need to remember which index holds the email information. It's somewhat manageable with 5 data points, but with 5,000, it becomes very difficult to remember. Let's try writing this differently to solve this issue.

```js
const student = {
    firstName: 'Abu',
    secondName: 'Rayhan',
    email: 'rayhan@example.com',
    age: 25,
    attend: true,
};

sendEMail(students.email);

function sendEmail(email) {
    console.log('Sending Email to ', email);
}
```

Even though we've written more, the code is now readable and informative. We no longer need to remember the index; just append a dot (.) after the variable name followed by the property name. This is much more readable and informative than the previous version.

Now, we can store the information of many students in an array. How can we do that? Let's see.

```js
const student1 = {
    firstName: 'Abu',
    secondName: 'Rayhan',
    email: 'rayhan@example.com',
    age: 25,
    attend: true,
};

const student2 = {
    firstName: 'Alvi',
    secondName: 'Chowdhury',
    email: 'alvi@example.com',
    age: 25,
    attend: true,
};

const student3 = {
    firstName: 'Akib',
    secondName: 'Ahmad',
    email: 'akib@example.com',
    age: 25,
    attend: true,
};

const allStudents = [student1, student2, student3];

for (let i = 0; i < allStudents.length; i++) {
    sendEmail(allStudents[i].email);
}

function sendEmail(email) {
    console.log('Sending email to', email);
}
```

We will create separate objects for each student and then store each object in an array. This example also shows that arrays can store objects. Now, we want to send an email to all students at once. We can easily send emails to everyone by looping through the array and following the above code. First, we need to access the data in the array using the index number, and then use the dot notation to get the property name. This small example shows how we can dynamically handle programs using arrays and objects. No matter how big an application you build, this is what you'll end up doing.

## Functions

We create functions to perform tasks repeatedly, similar to loops. We use loops to repeat the same task multiple times. Similarly, we use functions to repeat the same task. So why use functions when we have loops?

We can use functions wherever we want, in our way. We can call functions as we like. Functions can be reused because they have a name, but loops do not. Therefore, we cannot use loops anywhere we want. Moreover, once a loop starts, we either need to break it or let it run until it ends. We don't have control over the loop. But we can use functions wherever needed and control them as required. If we take a few lines from the previous example:

```js
for (let i = 0; i < allStudents.length; i++) {
    // sendEmail(allStudents[i].email);
    console.log('Sending email to', allStudents[i].email);
}

// function sendEmail(email) {
//     console.log('Sending email to', email);
// }
```


We could do the same task without writing a function. But the line inside the loop won't work anywhere else outside the loop. However, a function can be called anywhere. Suppose we need the full name somewhere else, should we run the loop again? No, we'll use a function. In this case, let's use a built-in function.

```js
allStudents.forEach((item) => console.log('Email ', item.email));
allStudents.forEach((item) =>
    console.log('Full Name ', item.firstName, item.secondName)
);
```

Here, instead of running the loop repeatedly, we used the `forEach` function. The biggest advantage of a function is that it can be used multiple times anywhere.

When to use a function and when to use a loop? Use a function when you need to perform the same task in two different places. Use a loop if it's in one place. For example, if we send an email and need the full name in the email, we can complete the task with a loop. But if we send an email in one place and need the full name for a student list elsewhere, a loop won't work. We'll need to use a function. This may be difficult to understand initially, but with practice, it will become clearer over time.

Here are the rules for writing a function:

```js
function nameOfFunction() {
    console.log('Hello', 'Elias');
}

nameOfFunction(); // Hello Elias
nameOfFunction(); // Hello Elias
nameOfFunction(); // Hello Elias
```

Here, every time we call the function, it gives the same output. If this same output is needed in different places, we will create a function like this. Now, I want to dynamically place a name. Whatever name I input should appear. For this, we need to take a variable inside the parentheses. This is called a parameter. Let's see it in action.

```js
function nameOfFunction(name) {
    console.log('Hello', name);
}

nameOfFunction('Murshed'); // Hello Murshed
nameOfFunction('Fahim'); // Hello Fahim
nameOfFunction(); // Hello undefined
```

When we call the function, we'll place the name as an argument in place of the parameter. The parameter is the variable given when writing the function. The argument is the value passed when calling the function. If we don't pass anything, it shows `undefined`. Here, we can add a simple message to prompt the user to provide a name if not given, handling an error case.

```js
function nameOfFunction(name) {
    if (!name) {
        console.log('Please provide your name');
    } else {
        console.log('Hello', name);
    }
}

nameOfFunction('Murshed'); // Hello Murshed
nameOfFunction('Fahim'); // Hello Fahim
nameOfFunction(); // Please provide your name
```

I hope everyone understands this example. Here's another example to illustrate why we need functions. Suppose we want to generate a random number between 1 and 10. Let's write a formula for generating a random number.

```js
const randomNumber = Math.floor(Math.random() * 10);
```

Now if we want between 1 and 100

```js
const randomNumber = Math.floor(Math.random() * 100);
```

We need to write it this way. If we want between 1 and 1000

```js
const randomNumber = Math.floor(Math.random() * 1000);
```

We need to write it this way. Instead of writing it so many times, let's create a function for it.

```js
function generateRandomNumber(max) {
    const randomNumber = Math.floor(Math.random() * max);
    return randomNumber;
}

console.log(generateRandomNumber(10));
console.log(generateRandomNumber(100));
console.log(generateRandomNumber(1000));
```

Now I can generate random numbers as many times as I want. Now I want to generate a random number between two numbers.

```js
function generateRandomNumber(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

console.log(generateRandomNumber(5, 10));
console.log(generateRandomNumber(85, 100));
```

This shows how functions make our tasks easier.


## Expression vs Statement

Before understanding this topic, let's look at some examples.

```js
const name1 = 'Rayhan'; // Statement
const name2 = 'Alvi'; // Statement
const name3 = 'Anik'; // Statement
const name4 = 'Arjun'; // Statement
const name5 = 'Ayman'; // Statement

const students = [
    'Rayhan',
    'Alvi',
    'Anik',
    'Arjun',
    'Ayman',
    'Ayuub',
    'Bidyut',
]; // Statement

console.log(students[0]); // Expression
console.log(students[1]); // Expression
console.log(students[2]); // Expression
console.log(students[3]); // Expression
console.log(students[4]); // Expression

for (let i = 0; i < students.length; i++) {
    console.log(students[i], students[i].toLowerCase()); // Expression
} // Statement

name1.sendEmail(); // Expression
name2.sendEmail(); // Expression
name3.sendEmail(); // Expression
name4.sendEmail(); // Expression
name5.sendEmail(); // Expression

const nums = [1, 2, 3, 4, 5, 6]; // Statement
const bools = [true, true, false, false]; // Statement
const nulls = [null, null, null]; // Statement
const undefineds = [undefined, undefined, undefined]; // Statement
const arrayOfArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]; // Statement
const mixed = [true, null, 'Str', 5, [12, 2, 4]]; // Statement

const student1 = {
    firstName: 'Abu',
    secondName: 'Rayhan',
    email: 'rayhan@example.com',
    age: 25,
    attend: true,
}; // Statement

const student2 = {
    firstName: 'Alvi',
    secondName: 'Chowdhury',
    email: 'alvi@example.com',
    age: 25,
    attend: true,
}; // Statement

const student3 = {
    firstName: 'Akib',
    secondName: 'Ahmad',
    email: 'akib@example.com',
    age: 25,
    attend: true,
}; // Statement

const allStudents = [student1, student2, student3]; // Statement

for (let i = 0; i < allStudents.length; i++) {
    sendMail(allStudents[i].email); // Expression
} // Statement

function sendMail(email) {
    console.log('Sending email to', email);
} // Statement

allStudents.forEach((item) => console.log('Email ', item.email)); // Expression
allStudents.forEach((item) =>
    console.log('Full Name ', item.firstName, item.secondName)
); // Expression

function nameOfFunction(name) {
    if (!name) {
        console.log('Please provide your name');
    } else {
        console.log('Hello', name);
    }
} // Statement

nameOfFunction('Murshed'); // Expression
nameOfFunction('Fahim'); // Expression
nameOfFunction(); // Expression

function generateRandomNumber(min = 1, max) {
    const randomNumber = Math.floor(Math.random() * min + (max - min)); // Statement
    return randomNumber; // Expression
} // Statement

console.log(generateRandomNumber(5, 10)); // Expression
```

The basic difference between an expression and a statement is that an expression always returns something, produces data, and can be stored somewhere. In this sense, a function call is a type of expression. On the other hand, a statement does not produce data, cannot be stored anywhere, and does not return anything. Writing a function is a statement, while calling a function is an expression. Because writing a function does not return anything until it is called. Again, if an arrow function is written, it is an expression because it is stored in a variable.

## When to Use Array and When to Use Object?

Use an object for singular terms and an array for plural terms. For example, a phone - object, many phones - array; person - object, people - array; member - object, members - array. Where there is information about one person or one thing, use an object. Where there are multiple people or multiple objects or things, use an array. Just keep this in mind. You will never confuse arrays and objects in your life.

## What to Focus on for Mastering JavaScript?

- Arrays
- Objects
- Functions and Functional Programming
- Basic OOP
