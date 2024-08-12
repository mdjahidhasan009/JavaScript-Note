# Generators
Generators are a special kind of function that return a lazy iterator. These are objects that you can loop over like a
list. However, unlike lists, generators do not store their contents in memory. Instead, they generate their contents on 
the fly.

## Different Kinds of Generators

### Generator Function Declaration
A generator function declaration uses the `function*` syntax and yields values in a sequence. When the generator function
is called, it returns a generator object.
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