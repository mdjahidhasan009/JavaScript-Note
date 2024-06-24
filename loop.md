# `for`

# `while`

# `do ... while`

# `for ... in`

# `for ... of`
Allows the use of `break`, `continue`, and `return` statements.


# ``forEach``
`forEach` is a method that is used to iterate over every element of an array. It takes a function as an argument and calls that function 
for each element in the array. However, unlike traditional `for` or `while` loops, `forEach` is designed to execute the 
function for every element, without a built-in mechanism to stop or break the loop prematurely.

### `break` in `forEach` loop
If you try to use `break` inside a `forEach`, you'll encounter a syntax error because break is not applicable within a 
callback function.
```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(number => {
  if (number > 3) {
    break; // Syntax Error: Illegal break statement
  }
  console.log(number);
});
```

### `return` in `forEach` loop
In other loops or functions, the `return` statement exits the loop or function, returning a value if specified.

In the context of `forEach`, `return` does not break out of the loop. Instead, it merely exits the current iteration of the 
callback function and moves on to the next element in the array.
```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(number => {
  if (number === 3) {
    return; // Exits only the current iteration
  }
  console.log(number);
});
```
Output
```
1
2
4
5
```

## Breaking a forEach Loop Using Exceptions 
We can break out of a `forEach` loop by throwing an exception. This is not recommended as it can lead to unexpected behavior
and make the code harder to read and maintain.
```js
const numbers = [1, 2, 3, 4, 5];
try {
  numbers.forEach(number => {
    if (number > 3) {
      throw new Error('Loop stopped');
    }
    console.log(number);
  });
} catch (e) {
  console.log('Loop was stopped due to an exception.');
}
// Output: 1, 2, 3, Loop was stopped due to an exception.
```

# Array.prototype.some()

# Array.prototype.every()

# Array.prototype.filter()

# Array.prototype.map()

# Array.prototype.reduce()

# Array.prototype.reduceRight()

# Array.prototype.find()

# Array.prototype.findIndex()

# Array.prototype.includes()

# Array.prototype.indexOf()

# Array.prototype.lastIndexOf()

# Array.prototype.keys()

# Array.prototype.values()

# Array.prototype.entries()

# Array.prototype.flat()

# Array.prototype.flatMap()

# Array.prototype.sort()

# Array.prototype.reverse()

# Array.prototype.copyWithin()

# Array.prototype.fill()

# Array.prototype.splice()

# Array.prototype.slice()

# Array.prototype.concat()

# Array.prototype.join()

# Array.prototype.toString()

# Array.prototype.toLocaleString()

# Array.prototype.push()

# Array.prototype.pop()

# Array.prototype.shift()

# Array.prototype.unshift()


### Sources
- [JavaScript Interview: Can You Stop or Break a forEach Loop?](https://javascript.plainenglish.io/javascript-interview-can-you-stop-or-break-a-foreach-loop-9608ba2a1710)