`call`, `bind`, `apply` are used for controlling or change the context of function. Those are the methods of 
[`Function` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#instance_methods) in JavaScript.

# `call`

* `call` is a method that is used to call a function with a given `this` value and arguments(as a list) provided 
   individually. `function.call(thisArg, arg1,arg2,....,argn)`
* `thisArg` is the value of `this` provided for the call to function.
* `arg1,arg2,....,argn` are the arguments passed to the function, argument list is optional and can be empty they are
   comma-separated values.


### IIFE and Array Filtering
This code snippet demonstrates the use of an Immediately Invoked Function Expression (IIFE) and filtering characters 
from a string using `Array.prototype.filter`.

```javascript
(function() {
    var greet = 'Hello World';
    // In this case thisArg is 'greet' and arguments is the callback function
    var toGreet = [].filter.call(greet, function(element, index) {
        return index > 5;
    });
    console.log(toGreet); // Output: ['W', 'o', 'r', 'l', 'd']
}());
```

### Explanation:
- **IIFE**: The entire code is wrapped in an IIFE, which executes immediately after it's defined.
- **String to Array Filtering**: The `filter` method is used to filter characters from the string `'Hello World'` starting
  from index 6. The result is an array containing the characters `['W', 'o', 'r', 'l', 'd']`.

This code is equivalent to
```js
(function() {
    var greet = 'Hello World';
    var toGreet = greet.split('').filter(function(element, index) {
        return index > 5;
    });
    console.log(toGreet); // Output: ['W', 'o', 'r', 'l', 'd']
}());
```

```js
function Emp(id,name) {  
  this.id = id;  
  this.name = name;  
}

function PermanentEmp(id,name) {  
  Emp.call(this,id,name);  
}  
function TemporaryEmp(id,name) {  
  Emp.call(this,id,name);  
} 

var p_emp=new PermanentEmp(101,"John Martin");  
var t_emp=new TemporaryEmp(201,"Duke William")  
console.log(p_emp) // Output: PermanentEmp { id: 101, name: 'John Martin' }
console.log(t_emp) // Output: TemporaryEmp { id: 201, name: 'Duke William' }
```

Another Example
```js
function Car(type, fuelType){
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand) {
	Car.call(this, "convertible", "petrol");
	this.brand = brand;
	console.log(`Car details = `, this); // Car details =  { type: 'convertible', fuelType: 'petrol', brand: 'Brand1' }
}

function definePrice(price) {
	Car.call(this, "convertible", "diesel");
	this.price = price;
	console.log(`Car details = `, this); // Car details =  { type: 'convertible', fuelType: 'diesel', price: 100000 }
}

const newBrand = new setBrand('Brand1');
const newCarPrice = new definePrice(100000);
```
If you look carefully, you can see that we use the `call` function to invoke the `Car` function on two occasions. Firstly, 
in the `setBrand` and then in the `definePrice` functions.

In both of these functions, we invoke the `Car` function with `this` object representing to the respective functions 
themselves. For example, inside `setBrand`, we call the `Car` function with the `this` object belonging to its context. 
The case is similar for `definePrice`.


#### Calling Context with `call`

This code snippet demonstrates the use of `Function.prototype.call` to change the context of a function.

```javascript
(function() {
    var fooAccount = {
        name: 'John',
        amount: 6000,
        deductAmount: function(amount) {
            this.amount -= amount;
            return this.amount;
        }
    };
    var barAccount = {
        name: 'John',
        amount: 4000
    };
    var withdrawAmountBy = function(totalAmount) {
        return fooAccount.deductAmount.call(barAccount, totalAmount);
    };
    console.log(withdrawAmountBy(400)); // Output: 3600
    console.log(withdrawAmountBy(300)); // Output: 3300
    console.log(withdrawAmountBy(200)); // Output: 3100
}());
```

#### Explanation:
- **Object Definitions**: Again, similar objects `fooAccount` and `barAccount`.
- **`call` Method**: The `deductAmount` method of `fooAccount` is called with the context of `barAccount` using `call`.

### Example: Function Call Context and `this`

#### Code:
```javascript
const newEntity = (obj) => console.log(obj);

function mountEntity(){
    this.entity = newEntity;
    console.log(`Entity ${this.entity} is mounted on ${this}`);
}

mountEntity.call();
```

#### Output:
```
Entity (obj) => console.log(obj) is mounted on [object Window]
undefined
```

#### Explanation:
- `const newEntity = (obj) => console.log(obj);` defines an arrow function `newEntity` that logs its argument.
- `function mountEntity(){ ... }` defines a function `mountEntity` that assigns `newEntity` to `this.entity` and logs a message.
- `mountEntity.call();` calls `mountEntity` with `this` set to the global object (`window` in a browser environment).
- Inside `mountEntity`:
    - `this.entity` is assigned `newEntity`.
    - The template string logs `Entity (obj) => console.log(obj) is mounted on [object Window]`, because `this.entity` refers to the function definition and `this` refers to the global object.
- The function returns `undefined`.

### Example: Function Call Context and Immediate Execution

#### Code:
```javascript
const newEntity = (obj) => console.log(obj);

function mountEntity(){
    this.entity = newEntity;
    console.log(`Entity ${this.entity('a')} is mounted on ${this}`);
}

mountEntity.call();
```

#### Output:
```
a
Entity undefined is mounted on [object Window]
```

#### Explanation:
- The code structure is similar to Example 1, but with a key difference in the `console.log` statement.
- `const newEntity = (obj) => console.log(obj);` defines the arrow function `newEntity`.
- `function mountEntity(){ ... }` defines the `mountEntity` function.
- `mountEntity.call();` calls `mountEntity` with `this` set to the global object.
- Inside `mountEntity`:
    - `this.entity` is assigned `newEntity`.
    - `this.entity('a')` immediately invokes `newEntity` with the argument `'a'`.
    - `newEntity('a')` logs `a` to the console and returns `undefined` (since arrow functions without a return statement
       return `undefined`).
    - The template string logs `Entity undefined is mounted on [object Window]`, because `this.entity('a')` returns 
       `undefined` and `this` refers to the global object.
- The function returns `undefined`.

### Example: Min and Max Functions with `call`
```js
var marks = [50, 20, 70, 60, 45, 30];

function findMin(arr) {
    return Math.min.apply(null, arr);
}

function findMax(arr) {
    return Math.max.apply(null, arr);
}

console.log(findMin(marks)); // 20
console.log(findMax(marks)); // 70
```


### How to Create Your Own map Function using call Method

Now that we have all the necessary things, let's start off by creating our own map function. Let's first understand the things that we will need to build our own map function.

Here is the syntax of the map function:

```javascript
arr.map(func)
```

Where:
- `arr` is an array on which the map is called.
- `func` is the function that needs to run on each element of an array.

The basic functionality of a map function is simple:
- It is a function that walks through each element of an array and applies the function that is passed as an argument.
- The return type of a map is again an array with `func` being applied on each element.

Now we understand the requirements, so we can move on to create our own map function. Here is the code of our new map function:

```javascript
function newMap(func){
  let destArr = [];
  const srcArrLen = this.length;
  for(let i = 0; i < srcArrLen; i++){
    destArr.push(func.call(this, this[i]));
  }
  return destArr;
}
```

Let's understand the above function bit-by-bit:

1. This function accepts an argument called `func`. It's nothing but a function that needs to be called on each element of an array.
2. The other parts of the code are pretty self-explanatory. We will focus on the following line: `destArr.push(func.call(this, this[i]));`
    - This line does two things:
        1. Pushes the changes into the `destArr`
        2. Executes the `func` with the help of `call` method. Here the `call` method (as explained in the previous sections) will execute the `func` method with a new value to the `this` object present inside the `func` method.

Now let's take a look at how we are going to execute our `newMap` function. The below approach of adding a new method to the existing primitive data type is not recommended but still we will do it for the sake of this article.

**NOTE:** Do not follow the below approach in your production code. This can cause damage to the existing code.

```javascript
Object.defineProperty(Array.prototype, 'newMap', {
  value: newMap
});
```

`defineProperty` creates a new property inside the `Array.prototype`.

Once this is done, we are good to go with executing our new map function on an array.

```javascript
const arr = [1, 2, 3];
const newArr = arr.newMap(item => item + 1);
console.log(newArr); // [2, 3, 4]
```

#### Detailed Notes:

1. **Function Definition:**
    - The `newMap` function is defined to accept a function `func` as an argument. This `func` is the callback that will be applied to each element of the array.

2. **Destination Array:**
    - `let destArr = [];` initializes an empty array `destArr` which will hold the transformed elements.

3. **Source Array Length:**
    - `const srcArrLen = this.length;` stores the length of the array on which `newMap` is called. This ensures we only loop through the existing elements of the array.

4. **Loop Through Elements:**
    - `for (let i = 0; i < srcArrLen; i++) {}` loops through each element of the array.

5. **Call Method:**
    - `func.call(this, this[i])` calls the `func` with the current element (`this[i]`) as its argument and sets `this` to the current array. This allows the callback function to access the array if needed.

6. **Push to Destination Array:**
    - `destArr.push(func.call(this, this[i]));` pushes the result of the `func` call into the `destArr`.

7. **Return Transformed Array:**
    - `return destArr;` returns the new array with transformed elements.

8. **Adding to Array Prototype:**
    - `Object.defineProperty(Array.prototype, 'newMap', { value: newMap });` adds the `newMap` function to the `Array.prototype`, allowing all array instances to use this method.

9. **Executing newMap:**
    - `const newArr = arr.newMap(item => item + 1);` calls the `newMap` method on an array `arr` with a callback that increments each element by 1.

By understanding and implementing these steps, you can create a custom map function that mimics the behavior of the native `Array.prototype.map` method.

#### Summary:
- In both examples, `mountEntity.call();` sets `this` to the global object.
- In Example 1, the function definition of `newEntity` is logged.
- In Example 2, the invocation of `newEntity('a')` logs `a` and returns `undefined`, which is then logged in the 
  template string.

# `apply`

- `apply` is a method that is used to call a function with a given `this` value and arguments provided as an array.
- `apply` is similar to `call` but **takes arguments as an array**.
- `apply` is used to call a function with a given `this` value and arguments provided as an array (or an array-like object).

## Applying Context with `apply`

This code snippet demonstrates the use of `Function.prototype.apply` to change the context of a function.

```javascript
(function() {
    var fooAccount = {
        name: 'John',
        amount: 4000,
        deductAmount: function(amount) {
            this.amount -= amount;
            return this.amount;
        }
    };
    var barAccount = {
        name: 'John',
        amount: 6000
    };
    var withdrawAmountBy = function(totalAmount) {
        return fooAccount.deductAmount.apply(barAccount, [totalAmount]);
    };
    console.log(withdrawAmountBy(400)); // Output: 5600
    console.log(withdrawAmountBy(300)); // Output: 5300
    console.log(withdrawAmountBy(200)); // Output: 5100
}());
```

Another Example
```js
function Car(type, fuelType) {
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand) {
	Car.apply(this, ["convertible", "petrol"]); //Syntax with array literal
	this.brand = brand;
	console.log(`Car details = `, this); // Car details =  { type: 'convertible', fuelType: 'petrol', brand: 'Brand1' }
}

function definePrice(price) {
	Car.apply(this, new Array("convertible", "diesel")); //Syntax with array object construction
	this.price = price;
	console.log(`Car details = `, this); // Car details =  { type: 'convertible', fuelType: 'diesel', price: 100000 }
}

const newBrand = new setBrand('Brand1');
const newCarPrice = new definePrice(100000);
```


### Explanation:
- **Object Definitions**: Similar objects `fooAccount` and `barAccount`.
- **`apply` Method**: The `deductAmount` method of `fooAccount` is called with the context of `barAccount` using `apply`.

Another Example
```js
function addUp(){
		//Using arguments to capture the arbitrary number of inputs
    const args = Array.from(arguments);// args = [1,2,3,4,5,6] 
    this.x = args.reduce((prev, curr) => prev + curr, 0);
    console.log("this.x = ", this.x); // this.x = 21
}

function driverFunc(){
    const obj = {
        inps: [1,2,3,4,5,6]
    }
    addUp.apply(obj, obj.inps);
}

driverFunc();
```

# `bind`

- `bind` is used to create a new function that, when called, has its `this` keyword set to the provided value, with a
   given sequence of arguments preceding any provided when the new function is called.
- `bind` returns a new function with the context of `this` bound to the object passed as an argument.
- `bind` does not immediately call the function, it just returns the function with the context bound.
- `bind` is used to bind a function to a particular context.
- `bind` takes the object to which `this` should point to as the first argument, followed by the function arguments as 
   comma-separated values.
- `bind` is useful when we want to call a function later with a certain context.
- `bind` is used to set the value of `this` regardless of how the function is called.


## Binding Context with `bind`

This code snippet demonstrates the use of `Function.prototype.bind` to change the context of a function.

```javascript
(function() {
    var fooAccount = {
        name: 'John',
        amount: 4000,
        deductAmount: function(amount) {
            this.amount -= amount;
            return 'Total amount left in account: ' + this.amount;
        }
    };
    var barAccount = {
        name: 'John',
        amount: 6000
    };
    var withdrawAmountBy = function(totalAmount) {
        return fooAccount.deductAmount.bind(barAccount, totalAmount);
    };
    console.log(withdrawAmountBy(400)()); // Output: Total amount left in account: 5600
    console.log(withdrawAmountBy(300)()); // Output: Total amount left in account: 5300
}());
```

### Explanation:
- **Object Definitions**: `fooAccount` and `barAccount` objects are defined with properties.
- **`bind` Method**: The `deductAmount` method of `fooAccount` is bound to `barAccount` using `bind`, changing its `this` context to `barAccount`.


This code snippet demonstrates using `bind` to set the `this` context for a function.

```javascript
(function greetNewCustomer() {
    console.log('Hello ' + this.name); // Output: Hello John
}.bind({
    name: 'John'
})());
```

### Explanation:
- **Binding Context**: The `greetNewCustomer` function is immediately invoked with its `this` context bound to an object
  with the property `name: 'John'`, resulting in the output `Hello John`.

#### Real-world Example
Let's look at a classic example of how to use a bind function with the help of a class-based React component:

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
  }
  handleCode() {
    console.log("HANDLE CODE THIS = ", this.state);
  }
  render() {
    return <button onClick={this.handleCode}>Click Me</button>;
  }
}
```

Consider the above App component. It constitutes the following things:

* **constructor:** A function that gets called when a class is instantiated with a new keyword.
* **render:** A function that executes/renders the JSX code.
* **handleCode:** A class method that logs the state of the component.

If we click on the "Click Me" button then we will receive an error stating: `Cannot read properties of undefined (reading 'state')`.

Have you ever wondered why this issue occurs? 🤔🤔

You might be expecting that we should be able to access the state of the class since handleCode is a class method. But here is the catch:

* `this` inside the handleCode is not the same as that of the class’s `this`.
* Inside a class, `this` is a regular object that has non-static class methods as its properties. But `this` inside the
  handleCode will refer to a different context.
* To be honest, the value of `this` in this scenario depends on from where the function is being called. If you see, the
  handleCode is being called on the `onClick` event.
* But at this stage, we will get `undefined` for the context of `this` present inside the handleCode function.
* We're trying to call the state property of an undefined value. Therefore, this leads to the above error.

We can fix this by providing the right context of `this` inside the handleCode method. You can do this with the bind method.

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleCode = this.handleCode.bind(this); // bind this function
  }
  handleCode() {
    console.log("HANDLE CODE THIS = ", this.state);
  }
  render() {
    return <button onClick={this.handleCode}>Click Me</button>;
  }
}
```

The bind will create a new function and store it inside the `this` object with a new property as handleCode. Bind will make sure that the class’s `this` context gets applied to the `this` present inside the handleCode function.

### Notes:
* **Binding Methods:** When you pass a method as a callback, like `onClick={this.handleCode}`, the method loses its context. Using `bind` ensures the method retains its original `this` context.
* **Performance Consideration:** Binding methods in the constructor is a common practice because it avoids creating a new function on every render, which can be a performance issue.
* **Alternative Approach:** You can use arrow functions to automatically bind `this` context. For example, defining `handleCode` as an arrow function: `handleCode = () => { console.log("HANDLE CODE THIS = ", this.state); }` will achieve the same result without needing to explicitly bind `this` in the constructor.
* **React Hooks:** In functional components, you can use React hooks like `useState` and `useEffect` to manage state and lifecycle events, avoiding the need for `this` binding altogether.

By properly binding `this`, you ensure that the methods have access to the correct instance context, avoiding common pitfalls and errors related to `this` in JavaScript.

Another example
```js
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

var inviteEmployee1 = invite.bind(employee1);
var inviteEmployee2 = invite.bind(employee2);
inviteEmployee1("Hello", "How are you?"); // Hello John Rodson, How are you?
inviteEmployee2("Hello", "How are you?"); // Hello Jimmy Baily, How are you?
```

### Create Own `bind` Function
The custom bind function needs to be created on Function prototype inorder to use it as other builtin functions. This
custom function should return a function similar to original bind method and the implementation of inner function needs
to use apply method call.

The function which is going to bind using custom myOwnBind method act as the attached function(boundTargetFunction) and 
argument as the object for apply method call.
```js
Function.prototype.myOwnBind = function (whoIsCallingMe) {
  if (typeof this !== "function") {
    throw new Error(this + "cannot be bound as it's not callable");
  }
  const boundTargetFunction = this;
  return function () {
    boundTargetFunction.apply(whoIsCallingMe, arguments);
  };
};
```

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)
* [JavaScript Function call() method](https://www.javatpoint.com/javascript-function-call-method)
* [How to Use the Call, Apply, and Bind Functions in JavaScript – with Code Examples](https://www.freecodecamp.org/news/understand-call-apply-and-bind-in-javascript-with-examples/)
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)