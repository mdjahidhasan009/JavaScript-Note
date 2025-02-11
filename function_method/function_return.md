# JavaScript Return Statements and Function Behavior

## Example 1: Return Statement
What would be the output of the following code?

```javascript
(function(){
    function sayHello(){
        var name = "Hi John";
        return 
        {
            fullName: name
        }
    }
    console.log(sayHello().fullName); //Uncaught TypeError: Cannot read property 'fullName' of undefined
})();
```

### Explanation:
The `return` statement is followed by a newline. JavaScript interprets this as an automatic semicolon insertion (ASI),
so the function effectively returns `undefined`.

we can fix this by writing the return statement on the same line as `return`:

```js
(function(){
    function sayHello(){
        var name = "Hi John";
        
        return {
            fullName: name
        }
    }
    console.log(sayHello().fullName); // Output: Hi John
})();
```

## Example 2: Comma Operator
What would be the output of the following code?

```javascript
function getNumber(){
    return (2,4,5);
}

var numb = getNumber();
console.log(numb); // Output: 5
```

### Explanation:
The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand, which 
is `5`.

## Example 3: Return Statement Without Value
What would be the output of the following code?

```javascript
function getNumber(){
    return;
}

var numb = getNumber();
console.log(numb); // Output: undefined
```

### Explanation:
A `return` statement without a value returns `undefined`.

```javascript
function mul(x){
    return function(y){
        return [x * y, function(z){
            return x * y + z;
        }];
    }
}

console.log(mul(2)(3)[0]); // Output: 6
console.log(mul(2)(3)[1](4)); // Output: 10
```

### Explanation:
This example involves nested functions and demonstrates how returning an array from a nested function can be used to 
access different values.

1. **Function Definition**:
    - `mul(x)` is a function that takes a parameter `x` and returns another function.
    - This returned function takes a parameter `y` and returns an array.

2. **Returning an Array**:
    - The array returned contains two elements:
        - The first element is the product of `x` and `y`.
        - The second element is a function that takes a parameter `z` and returns the sum of `x * y` and `z`.

3. **Calling `mul(2)(3)[0]`**:
    - `mul(2)` returns a function that takes `y`.
    - Calling this returned function with `3` returns an array `[2 * 3, function(z) { return 2 * 3 + z; }]`.
    - Accessing the first element of this array, `mul(2)(3)[0]`, returns `2 * 3`, which is `6`.

4. **Calling `mul(2)(3)[1](4)`**:
    - `mul(2)(3)` returns the same array as before.
    - Accessing the second element of this array, `mul(2)(3)[1]`, returns the function `function(z) { return 2 * 3 + z; }`.
    - Calling this function with `4`, `mul(2)(3)[1](4)`, computes `2 * 3 + 4`, which is `10`.

### Step-by-Step Breakdown:
1. **mul(2)**:
    - `x` is `2`.
    - Returns: `function(y) { return [2 * y, function(z) { return 2 * y + z; }]; }`.

2. **mul(2)(3)**:
    - `y` is `3`.
    - Returns: `[2 * 3, function(z) { return 2 * 3 + z; }]` which is `[6, function(z) { return 6 + z; }]`.

3. **mul(2)(3)[0]**:
    - Access the first element of the array `[6, function(z) { return 6 + z; }]`.
    - Result: `6`.

4. **mul(2)(3)[1](4)**:
    - Access the second element of the array `[6, function(z) { return 6 + z; }]`, which is `function(z) { return 6 + z; }`.
    - Call this function with `4`.
    - Result: `6 + 4` which is `10`.

## Example 5: Nested Functions and Object Return
What would be the output of the following code?

```javascript
function mul(x) {
    return function(y) {
        return {
            result: x * y,
            sum: function(z) {
                return x * y + z;
            }
        };
    };
}
console.log(mul(2)(3).result); // Output: 6
console.log(mul(2)(3).sum(4)); // Output: 10
```

### Explanation:
- `mul(2)(3).result` returns `2 * 3` which is `6`.
- `mul(2)(3).sum(4)` returns `2 * 3 + 4` which is `10`.

## Example 6: Deeply Nested Functions
What would be the output of the following code?

```javascript
function mul(x) {
    return function(y) {
        return function(z) {
            return function(w) {
                return function(p) {
                    return x * y * z * w * p;
                };
            };
        };
    };
}
console.log(mul(2)(3)(4)(5)(6)); // Output: 720
```

### Explanation:
The function multiplies all the arguments together: `2 * 3 * 4 * 5 * 6` which equals `720`.

## Example 7: Context and Arrow Functions
What would be the output of the following code?

```javascript
function getName1(){
    console.log(this.name);
}

Object.prototype.getName2 = () => {
    console.log(this.name);
}

let personObj = {
    name: "Tony",
    print: getName1
}

personObj.print(); // Output: Tony
personObj.getName2(); // Output: undefined
```
### Answer:
Tony undefined

### Explanation:
- `getName1()` works fine because it's being called from `personObj`, so it has access to `this.name`.
- `getName2()` is added to `Object.prototype` making it available to all objects through inheritance, but because it's
  an arrow function defined in the global scope, its this is permanently bound to the global context regardless of how 
  it's called.
- `getName2` is an arrow function, which doesn't have its own `this`, so it uses the `this` value from the enclosing
  context, which is likely the global object (where `this.name` is `undefined`).

## Example 8: Infinite Loop and setTimeout
What would be the output of the following code?

```javascript
let a = true;
let c = 0;

setTimeout(() => {
    a = false;
}, 2000);

while(a){
    console.log('Hello');
}
```

### Answer:
The above program will print `Hello` infinitely.

### Explanation:
JavaScript is a single-threaded language. The `setTimeout` will wait for `2000` milliseconds on a separate thread, but
the `while` loop continuously runs on the main thread, preventing `a` from being set to `false`.

## Example 9: setInterval and setTimeout
What would be the output of the following code?

```javascript
let c = 0;

let id = setInterval(() => {
    console.log(c++);
}, 200);

setTimeout(() => {
    clearInterval(id);
}, 2000);
```

### Answer:
The above program will print `0` to `9` sequentially.

### Explanation:
- `setInterval` logs the value of `c` every `200` milliseconds.
- `setTimeout` stops the interval after `2000` milliseconds, resulting in `10` logs (from `0` to `9`).
