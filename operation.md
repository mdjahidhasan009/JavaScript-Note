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
   
### Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)