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



Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)