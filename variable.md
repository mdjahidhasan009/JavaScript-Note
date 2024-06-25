# `not defined`
Will throw `error` when we try to access a variable that is not defined/declared in the scope. Also, function execution 
will be stopped at that point.

```js
console.log(x); // ReferenceError: x is not defined
```
But if we use `typeof` operator, it will return `undefined` instead of `ReferenceError`.

```js
console.log(typeof x); // undefined
```

# `undefined`
We get while we defined a variable but not assigned any value to it. Also, `console.log` do not throw any error. It's 
**primitive value not an object**.

```js
let a; // declaring a
console.log(a); // undefined
console.log(typeof a === 'undefined'); // true
```
`typeof undefined` is `undefined`.
```js
console.log(typeof undefined); // undefined
```
Similar as with `null`, negating undefined gives true, but comparing it to either true or false gives false.
```js
console.log(!undefined); // true
console.log(undefined == false); // false
console.log(undefined === false); // false
console.log(undefined == true); // false
console.log(undefined === true); // false
```

# `null`
`null` is a special value in JavaScript that represents an empty value. It is a **primitive value and not an object**.
But, `typeof null` return `object` which is a bug in JavaScript. It is used to represent an empty value. `null` is only 
equal to `undefined` and itself. It is not equal to any other value.

```js
console.log(null == null); // true
console.log(null === null); // true
console.log(null == undefined); // true
console.log(null === undefined); // false
```

Negative or `!null` is `true` and `null` is `false`. But `null == false` return `false` and `null == true` return `false`.

```js
console.log(!null); // true
console.log(null == false); // false
console.log(null === false); // false
console.log(null == true); // false
console.log(null === true); // false
```
In basic math, `null` is `0`. But, `null` is not equal to `0`.

```js
console.log(null == 0); // false
console.log(null === 0); // false
```

```js
console.log(null + 5); // 5
console.log(null - 2); // -2
console.log(null * 27) // 0
console.log(null / 2); // 0
console.log(null % 3); // 0
```
### `null >= 0 && null <= 0` but `null !== 0`
In JavaScript, the comparisons involving null and 0 can be surprising due to the different rules for type coercion and 
comparison. Let's break down why null >= 0 && null <= 0 is true, but null == 0 is false.

**Type Coercion in Comparisons**<br/><br/>
**Relational Comparisons (>= and <=)**<br/>
When performing relational comparisons (like >= and <=), JavaScript converts `null` to a number:

* `null` is coerced to 0 in numeric contexts.
* Therefore, `null >= 0` is evaluated as `0 >= 0`, which is `true`.
* Similarly, `null <= 0` is evaluated as `0 <= 0`, which is `true`.
```js
console.log(null >= 0); // true
console.log(null <= 0); // true
```

**Equality Comparison (==)**<br/>
When performing equality comparisons with ==, JavaScript follows different rules:

* `null` is only equal to `undefined` and `null` itself.
* `null` is not coerced to 0 in this context.

Thus, `null == 0` is `false` because `null` is not coerced to `0`, and `null` is only equal to `undefined` and itself.

```js
console.log(null == 0); // false
console.log(null == null); // true
console.log(null == undefined); // true
```

**Why the Difference?**
* **Relational Comparison (>= and <=):** Involves type coercion where null is converted to 0.
* **Equality Comparison (==):** Does not involve coercion of null to 0; instead, null is only considered equal to null 
  and undefined.

**Example to Demonstrate**
```js
console.log(null >= 0); // true, because null is coerced to 0
console.log(null <= 0); // true, because null is coerced to 0
console.log(null == 0); // false, because null is only loosely equal to undefined, not 0

// Additional examples:
console.log(null === 0); // false, strict equality without type coercion
console.log(null == null); // true, null is equal to null
console.log(null == undefined); // true, null is loosely equal to undefined
console.log(Number(null)); // 0, type coercion converts null to 0 in numeric context
```

## `undefined` vs `null`
**Similarities**
* Both when negated are giving true (falsy values), but none of them equals true or false
* They represent something non existing…

**Differences:**
* … null represents “nothing”, fully non existing. undefined something which isn’t defined
* undefined has its own data type (undefined), null is only an object
* null is treated as 0 in basic arithmetic operations, undefined returns NaN

```js
console.log(undefined == null); // true
console.log(undefined === null); // false
console.log(!undefined === !null); // true
```
The first statement: `undefined == null`, gives us true since JavaScript tries its best to convert both values into the 
same type.

The second one: `undefined === null`, is different, this time we’re telling “Please, also compare data types” (basically 
check if both of this things are the same) and JavaScript turns out to be clever enough to see the difference so it says 
“false”.

`!undefined` is `true` and `!null` is true. So, `!undefined === !null` is `true`.

# `NaN`
`NaN` is a special value in JavaScript that represents an **unrepresentable value**. It is a property of the global object.
It is returned when a mathematical operation is not possible. **It is not equal to any value, including itself.**

```js
console.log(NaN === NaN); // false
console.log(NaN !== NaN); // true
console.log(isNaN(NaN)); // true
console.log(isNaN(null)); // false
```
But, if we use `typeof` operator, it will return `number` instead of `NaN`. Because, `NaN` is a special value of `number`.

Some operations that return `NaN`:
- `0 / 0`
- `Infinity - Infinity`
- `Math.sqrt(-1)`
- `parseInt('string')`
- `Number(undefined)`
- `Number('12a')`
- `Number('a12')`
- `Number('12.34.56')`
- `Number('12.34e-')`
- `"hello" - 5`
- `12 / "hello"`

But if we use `+` sign instant of `-`
```js
console.log("hello" + 5); // hello5
console.log(true + 'false'); // truefalse
```
Also, same as `null` if we add `true` or `false` we those values are converted to `1` and `0` respectively.

```js
console.log(true + 5); // 6
console.log(false + 5); // 5
console.log(true * 55); // 55
console.log(false * 55); // 0
console.log(false / 55); // 0
console.log(true / 55); // 0.01818181818181818
console.log(true * false) // 0
```

## `parseInt` and `Number`
`Number()` and `parseInt()` are two **functions** that convert a value to a number. `Number` is a **constructor function** and
`parseInt` is a **global function**. `Number` is used to **convert a value to a number** so empty string "", `false`, 
`null` becomes `0` and `true` becomes `1` and `Number('some string')` become `NaN` Note: but `Number(undefined)` is `NaN`. 
`parseInt` is used to **convert a string to an integer**. `parseInt` stops parsing when it encounters a non-numeric character.
```
console.log(Number(null)); // 0
console.log(Number('')); // 0
console.log(Number(' ')); // 0

console.log(parseInt(null)); // NaN
console.log(parseInt('')); // NaN
console.log(parseInt(' ')); // NaN

console.log(parseFloat(null)); // NaN
console.log(parseFloat('')); // NaN
console.log(parseFloat(' ')); // NaN

console.log(Number(10)); // 10
console.log(Number('10')); // 10
console.log(Number('10.5')); // 10.5

console.log(Number('20px')); // NaN

console.log(parseInt('20px')); // 20
console.log(parseInt('20px', 16)); // 32
console.log(parseInt('20px', 10)); // 20

console.log(Number(true)); // 1
console.log(Number(false)); // 0

console.log(parseInt(true)); // NaN
console.log(parseInt(false)); // NaN
```


But, `parseInt(null)` and `parseInt('')` return `NaN`. Also `parseFloat(null)` and `parseFloat('')` return `NaN`.
Also, `parseInt('20px')` return `20` and `parseInt('20px', 16)` return `32`. But `parseInt('20px', 10)` return `20`.
Because, `parseInt` stops parsing when it encounters a non-numeric character.

But, `Number('20px')` return `NaN`.

<br/><br/>

When dealing with numeric variables in JavaScript, it's important to understand the behavior of `NaN` (Not-a-Number). 
Consider the following two conditional statements:

```js
if (x <= 100) { ... }
if (!(x > 100)) { ... }
```
For most values of `x`, these statements will produce the same result. However, there are specific values of `x` for 
which these statements do not yield the same outcome. Specifically, when `x` is `NaN`:

* `NaN <= 100` is `false`
* `NaN > 100` is also `false`

This discrepancy occurs because `NaN` is not comparable to any numeric value, including itself. As a result, both 
comparisons return `false`, causing the logical negation in the second statement to yield a different result.

This behavior also applies to any value of `x` that, when converted to a number, results in `NaN`, such as `undefined`, 
`[1, 2, 5]`, `{a: 22}`, etc.

Therefore, when working with numeric variables, it is crucial to handle `NaN` appropriately. `NaN` cannot be equal to, 
less than, or greater than any other numeric value. The most reliable way to check if a value is `NaN` is by using the 
`isNaN()` function:

```js
if (isNaN(x)) {
// Handle the case where x is NaN
}
```
This approach ensures that you accurately detect and manage NaN values in your code.

Sources:
* [Understanding null, undefined and NaN.](https://codeburst.io/understanding-null-undefined-and-nan-b603cb74b44c)
* [Why does Number(null) return 0, and parseFloat(null) return NaN?](https://stackoverflow.com/questions/55459023/why-does-numbernull-return-0-and-parsefloatnull-return-nan)
* [Why `null >= 0 && null <= 0` but not `null == 0`?](https://stackoverflow.com/questions/2910495/why-null-0-null-0-but-not-null-0)