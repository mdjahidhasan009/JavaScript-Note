## Proper Tail Call

First, we should know about tail call before talking about "Proper Tail Call". A tail call is a subroutine or function
call performed as the final action of a calling function. Whereas Proper tail call(PTC) is a technique where the program
or code will not create additional stack frames for a recursion when the function call is a tail call.

For example, the below classic or head recursion of factorial function relies on stack for each step. Each step need to 
be processed upto `n * factorial(n - 1)`

```js
function factorial(n) {
if (n === 0) {
return 1;
}
return n * factorial(n - 1);
}
console.log(factorial(5)); //120
```

But if you use Tail recursion functions, they keep passing all the necessary data it needs down the recursion without
relying on the stack.

```js
function factorial(n, acc = 1) {
if (n === 0) {
return acc;
}
return factorial(n - 1, n * acc);
}
console.log(factorial(5)); //120
```

The above pattern returns the same output as the first one. But the accumulator keeps track of total as an argument 
without using stack memory on recursive calls.


### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)