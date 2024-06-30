# `this`

In JavaScript, the `this` keyword refers to an object. The `this` keyword refers to different objects depending on how 
it is used as this is an keyword that is dynamically scoped. It is not assigned a value until a function where it is used
is actually called. Also, we can not assign a value to `this` directly. 

<details>
<summary>In an object's method, `this` refers to the object. </summary> 

In the example above, `this` refers to the `person` object as it used at the `fullName` method of the `person` object.

```js
    var person = {
        firstName: "John",
        lastName : "Doe",
        id       : 5566,
        fullName : function() {
            return this.firstName + " " + this.lastName;
        }
    };
```
</details>

<details>
<summary>Alone, `this` refers to the global object. </summary>

Because this is running in the global scope. In a browser window the global object is [object Window]:
    
```js
    var x = this;
```
</details>

<details>
<summary>In a function, `this` refers to the global object. </summary>

In this example, `this` refers to the global object because the function is not defined within an object.

```js
    function myFunction() {
        return this;
    }
```
</details>

<details>
<summary>In a function, in strict mode, `this` is `undefined`. </summary>

In strict mode, `this` is `undefined` because strict mode does not allow default binding.

```js
    "use strict";
    function myFunction() {
        return this;
    }
```
</details>

<details>
<summary>In an event, `this` refers to the element that received the event. </summary>

In this example, `this` refers to the button element that received the `onclick` event.

```html
    <button onclick="this.style.display='none'">
        Click to Remove Me!
    </button>
```
</details>

<details>
<summary>Methods like `call()`, `apply()`, and `bind()` can refer `this` to **any object**. </summary>

In this example, `this` refers to the `barAccount` object because the `deductAmount` method of the `fooAccount` object 
is bound to the `barAccount` object using the `bind` method.

```js
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
```
</details>


### Resources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)