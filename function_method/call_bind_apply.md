# `call` in javascript
- `call` is a method that is used to call a function with a given `this` value and arguments provided individually.

## IIFE and Array Filtering

This code snippet demonstrates the use of an Immediately Invoked Function Expression (IIFE) and filtering characters from a string using `Array.prototype.filter`.

```javascript
(function() {
    var greet = 'Hello World';
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

### Explanation:
- **Object Definitions**: Similar objects `fooAccount` and `barAccount`.
- **`apply` Method**: The `deductAmount` method of `fooAccount` is called with the context of `barAccount` using `apply`.

## Calling Context with `call`

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

### Explanation:
- **Object Definitions**: Again, similar objects `fooAccount` and `barAccount`.
- **`call` Method**: The `deductAmount` method of `fooAccount` is called with the context of `barAccount` using `call`.

## Binding Function Context

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
