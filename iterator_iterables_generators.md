# Iterator
An iterator is an **object** that implements a method called `next()`, that returns an object with two properties: 
* `value` (the next value in the sequence) and 
* `done` (a boolean that indicates whether the iterator has reached the end of the sequence).


### Simple implementation of an iterator
```js
function makeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;
  
  return {
      next() {
          let result;
          if(nextIndex < end) {
              result = { value: nextIndex, done: false };
              nextIndex += step;
              iterationCount++;
              return result;
          }
          
              return { value: iterationCount, done: true };
      }
  }
}

const myIterator = makeIterator(1, 10, 1);
let result = myIterator.next();

while(!result.done) {
  console.log(result.value);
  result = myIterator.next();
}

const myIterator2 = makeIterator(1, 10, 1);

for(let value of myIterator2) {
  console.log(value);
}
```

**Output**
```
1
2
3
4
5
6
7
8
9
Uncaught TypeError: myIterator2 is not iterable
    at <anonymous>:30:18
```

The problem is this that our iterator is not iterable. So built-in JavaScript functions like `for...of` loop or
`Array.from()` will not work with it. To make it iterable, we need to add a `Symbol.iterator` method to the iterator 
object that returns the object itself.




# Iterable
An iterable is an object that implements the `Symbol.iterator` method, which returns an iterator object. This iterator
object can be used to loop over the values in the iterable.

In the previous example, we can make the iterator object iterable by adding a `Symbol.iterator` method that returns the
iterator object itself.

### Making an iterator object iterable
```js
function makeIterator(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    return {
        next() {
            let result;
            if(nextIndex < end) {
                result = { value: nextIndex, done: false };
                nextIndex += step;
                iterationCount++;
                return result;
            }

            return { value: iterationCount, done: true };
        },
        [Symbol.iterator]() {
            return this;
        }
    }
}

const myIterator = makeIterator(1, 10, 1);
let result = myIterator.next();

while(!result.done) {
    console.log(result.value);
    result = myIterator.next();
}

console.log('Using for...of loop');

const myIterator2 = makeIterator(1, 10, 1);

for(let value of myIterator2) {
    console.log(value);
}
````

**Output**
```
1
2
3
4
5
6
7
8
9
Using for...of loop
1
2
3
4
5
6
7
8
9
```





# Generators
Generators are a special kind of function that return a lazy iterator. These are objects that you can loop over like a
list. However, unlike lists, generators do not store their contents in memory. Instead, they generate their contents on 
the fly.

Generators are defined using the `function*` syntax and `yield` values in a sequence. It is come with iterator and 
iterable together by default.

## `yield` Keyword
The `yield` keyword is used to pause and resume the execution of a generator function. When a generator function is 
called, it returns a generator object that can be used to iterate over the yielded values. The `next()` method is used
to resume it and return the next value in the sequence.

Creating previous example using generator function.

```js
function* makeIterator(start = 0, end = Infinity, step = 1) {
    for(let i = start; i < end; i += step) {
        yield i;
    }
}

const myIterator = makeIterator(1, 10, 1);

for(let value of myIterator) {
    console.log(value);
}
```

```js
function* myGenFunc() {
  yield 1;
  yield 2;
}
const genObj = myGenFunc();
console.log(genObj.next()); // { value: 1, done: false }
console.log(genObj.next()); // { value: 2, done: false }
console.log(genObj.next()); // { value: undefined, done: true }
```

## Different Kinds of Generators

### Generator Function Declaration
A generator function declaration uses the `function*` syntax and yields values in a sequence. When the generator 
function is called, it returns a generator object.
```js
function* myGenFunc() {
  yield 1;
  yield 2;
  yield 3;
}
const genObj = myGenFunc();
```
##### Example
In this example, myGenFunc is a generator function that yields three values. Calling myGenFunc() returns a generator 
object genObj that can be used to iterate over the yielded values.

### Generator Function Expression
Generator function expressions are similar to generator function declarations but are defined as expressions. They use
the function* syntax within an expression.
```js
const myGenFunc = function* () {
  yield 1;
  yield 2;
  yield 3;
};
const genObj = myGenFunc();
```
##### Example
Here, myGenFunc is defined as a generator function expression. It behaves similarly to the generator function 
declaration, returning a generator object genObj upon invocation.

### Generator Method Definitions in Object Literals
Generators can also be defined as methods within object literals. These methods use the * syntax and yield values in a 
sequence.
```js
const myObj = {
    *myGeneratorMethod() {
        yield 1;
        yield 2;
        yield 3;
    },
};
const genObj = myObj.myGeneratorMethod();
```
##### Example
In this example, myGeneratorMethod is a generator method defined within the myObj object literal. It yields three values,
and calling myObj.myGeneratorMethod() returns a generator object genObj.

### Generator Method Definitions in Classes
Generators can also be defined as methods within classes. These methods use the * syntax and are invoked on instances 
of the class.
```js
class MyClass {
  *myGeneratorMethod() {
    yield 1;
    yield 2;
    yield 3;
  }
}
const myObject = new MyClass();
const genObj = myObject.myGeneratorMethod();
```
##### Example
In this example, myGeneratorMethod is a generator method defined within the MyClass class. Creating an instance of 
MyClass and calling myObject.myGeneratorMethod() returns a generator object genObj.

### Generator as a Computed Property
Generators can be defined as computed properties in object literals using the * syntax along with a computed property
name.
```js
const SomeObj = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

console.log(Array.from(SomeObj)); // [ 1, 2, 3 ]
```
##### Example
Here, the generator function is defined as a computed property [Symbol.iterator], which allows SomeObj to be iterated 
over using methods like Array.from(). The generator yields three values in sequence.


### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)
* [What are JavaScript Generators and Iterators?](https://www.youtube.com/watch?v=6D7XOGXbyfs)
* [What are Generator Functions in Javascript? | Javascript Interview Questions](https://www.youtube.com/watch?v=xC6-kXz8D8I)
* [Learn JavaScript Generators In 12 Minutes](https://www.youtube.com/watch?v=IJ6EgdiI_wU)