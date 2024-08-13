# `switch` Case Statement
The switch case statement is used for decision-making purposes and can be more convenient than if-else statements in 
some cases. The syntax is as follows:

```js
switch (expression) {
    case value1:
        statement1;
        break;
    case value2:
        statement2;
        break;
    // ...
    case valueN:
        statementN;
        break;
    default:
        statementDefault;
}
```

This multi-way branch statement provides an easy way to dispatch execution to different parts of code based on the value of the expression.

Conventions to be followed for the usage of switch case:
* The expression can be of type either number or string.
* Duplicate values are not allowed for the expression.
* The `default` statement is optional. If the expression passed to `switch` does not match any case value, then the 
   statement within the `default` case will be executed.
* The `break` statement is used inside the `switch` to terminate a statement sequence.
* The `break` statement is optional. If it is omitted, the execution will continue into the next case.


## Using Expressions in Switch Cases
* **Switch Condition:** By assigning `true` as the switch condition, each case can be an expression that evaluates to 
  true or false. The first case that evaluates to true will be executed.
* **Versatility:** This approach is especially useful when you want to compare a variable against a range of values or 
  complex conditions.

```js
const weather = (function getWeather(temp) {
  switch (true) {
    case temp < 0:
      return "freezing";
    case temp < 10:
      return "cold";
    case temp < 24:
      return "cool";
    default:
      return "unknown";
  }
})(10);

console.log(weather); // "cold"
```
Explanation: In this example, the switch statement checks various temperature ranges:
* If temp < 0, it returns "freezing".
* If temp < 10, it returns "cold".
* If temp < 24, it returns "cool".
* If none of these conditions are met, it returns "unknown".


Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)