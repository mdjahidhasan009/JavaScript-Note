Module pattern is a designed pattern used to wrap a set of variables and functions together in a single scope returned
as an object. JavaScript doesn't have access specifiers similar to other languages(Java, Python, etc) to provide private
scope. It uses IIFE (Immediately invoked function expression) to allow for private scopes. i.e., a closure that protect
variables and methods.

The module pattern looks like below,
```js
(function () {
  // Private variables or functions goes here.

  return {
    // Return public variables or functions here.
  };
})();
```
Let's see an example of a module pattern for an employee with private and public access,
```js
const createEmployee = (function () {
  // Private
  const name = "John";
  const department = "Sales";
  const getEmployeeName = () => name;
  const getDepartmentName = () => department;

  // Public
  return {
    name,
    department,
    getName: () => getEmployeeName(),
    getDepartment: () => getDepartmentName(),
  };
})();

console.log(createEmployee.name);
console.log(createEmployee.department);
console.log(createEmployee.getName());
console.log(createEmployee.getDepartment());
```
Note: It mimic the concepts of classes with private variables and methods.

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)