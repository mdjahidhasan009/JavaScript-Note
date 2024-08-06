# Type Coercion
Type coercion in JavaScript refers to the automatic or implicit conversion of values from one data type to another. This
often happens in the context of expressions and operators.

JavaScript is a dynamically typed language, which means that variables are not bound to a specific data type. This allows
for flexibility but can also lead to unexpected behavior when different data types interact.

### Implicit Type Coercion
Implicit type coercion occurs when values are automatically converted between types without the programmer's direct input.
Example: `1 + '2'` results in `'12'` (number `1` is converted to string `'1'`).

### Explicit Type Coercion/ Type Casting
Explicit type coercion, also known as type casting, occurs when a value is explicitly converted from one type to another.
Example: `Number('123')` converts the string `'123'` to the number `123`.

### Common Coercion Example
```js
console.log(1 + '2'); // Output: '12'
console.log(1 - '2'); // Output: -1
console.log(1 * '2'); // Output: 2
console.log(4 + true); // Output: 5
console.log(4 - false); // Output: 4
console.log(4 * false); // Output: 0
console.log('1' < 2); // Output: true
console.log('1' > 2); // Output: false
console.log('1' == 1); // Output: true
console.log(Boolean('')); // Output: false
console.log(Boolean(0)); // Output: false
console.log(Boolean('0')); // Output: true
console.log(Boolean('false')); // Output: true
```

# Order of Operations / Operator Precedence
The order of operations, also known as operator precedence, dictates the sequence in which operators are evaluated in
expressions. JavaScript follows a specific order, similar to arithmetic rules in mathematics.

* **Parentheses `()`**: Expressions inside parentheses are evaluated first.
* **Multiplication `**`, Division `/`, Modulus `%`**: Left-associative (evaluated from left to right).
* **Addition `+`, Subtraction `-`**: Left-associative (evaluated from left to right).
* **Relational `<`, `<=`, `>`, `>=`**: Left-associative.
* **Equality `==`, `!=`, `===`, `!==`**: Left-associative.
* **Logical AND `&&`**: Left-associative.
* **Logical OR `||`**: Left-associative.
* **Assignment `=`, `+=`, `-=`, etc.**: Right-associative (evaluated from right to left).

### `+` vs `'-'`, `*`, `/`
As `+` is used for both addition and also string concatenation, it has a lower precedence than `-`, `*`, and `/`. This
means that `-`, `*`, and `/` operations are performed before `+` operations. For example, `1 + 2 * 3` is evaluated as
`1 + (2 * 3)`. Also `1 + '2'` is evaluated as `'12'`. But `1 - '2'` is evaluated as `1 - 2`. 

**Example 1**
```js
var result1 = 1 + 2 + '3';
console.log(result1); // Outputs: "33"
```
Since all operations are `+` and the expression is evaluated from left to right, the addition of 1 and 2 is performed first,
followed by the concatenation with '3'.
* First Operation: `1 + 2`
   * Both operands are numbers. Result: `3`.
* Second Operation: `3 + '3'`
  * The first operand is a number (`3`), and the second operand is a string (`'3'`).
  * Due to type coercion, the number `3` is converted to the string `'3'`.
  * String concatenation is performed: `'3' + '3'` results in `'33'`.

**Example 2**
```js
var result2 = '3' + 2 + 1;
console.log(result2); // Outputs: "321"
```
Again, the operations are evaluated from left to right, leading to the concatenation of `'3'`, `2`, and `1`.
* First Operation: `'3' + 2`
  * The first operand is a string (`'3'`), and the second operand is a number (`2`).
  * Due to type coercion, the number `2` is converted to the string `'2'`.
  * String concatenation is performed: `'3' + '2'` results in `'32'`.
* Second Operation: `'32' + 1`
  * The first operand is a string (`'32'`), and the second operand is a number (`1`).
  * Due to type coercion, the number `1` is converted to the string `'1'`.
  * String concatenation is performed: `'32' + '1'` results in `'321'`.

**Examples**
```js
var result3 = '5' - 3;
console.log(result3); // Outputs: 2

var result4 = '10' * 2;
console.log(result4); // Outputs: 20
```


# Associativity Rule
Consider the following code:
```javascript
var z = 1, y = z = typeof y;
console.log(y);
```
Output
```js
undefined
```

In JavaScript, operators with the same precedence are processed based on their associativity property. The assignment 
operator (`=`) has **right-to-left associativity**. This means that expressions are evaluated from right to left.

#### Sequence of Evaluation

1. **Declaration and Initialization:**
   ```javascript
   var z;
   z = 1;
   var y;
   ```
2. **Right-to-Left Evaluation:**
    - The expression `typeof y` is evaluated first. Since `y` is declared but not initialized, `typeof y` results in the string `"undefined"`.
    - The result of `typeof y` is assigned to `z`, so `z` now holds the value `"undefined"`.
    - Finally, the value of `z` is assigned to `y`. Therefore, `y` also holds the value `"undefined"`.

3. **Final Values:**
   ```javascript
   z = typeof y; // z is "undefined"
   y = z; // y is "undefined"
   ```

4. **Console Output:**
   ```javascript
   console.log(y); // Output: "undefined"
   ```
   
## Explanation of `!--` Notation
The !-- notation is not a special operator in JavaScript. Instead, it is a combination of two standard operators used 
one after the other:

1. Logical NOT (`!`): This operator inverts the boolean value of an expression.
2. Prefix Decrement (`--`): This operator decreases the value of its operand by one.
When used together, the `!--` notation first decrements the value by one and then applies the logical NOT to the result.
```js
let x = 2;
let result = !--x;

console.log(x);       // Outputs: 1
console.log(result);  // Outputs: false
```
   
### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)