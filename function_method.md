### Drawback of Declaring Methods Directly in JavaScript Objects
One of the primary drawbacks of declaring methods directly in JavaScript objects is that it is memory inefficient. When 
you declare methods inside the constructor of an object, a new copy of the method is created for each instance of that 
object. This can lead to increased memory usage, especially when creating many instances of the object.

Example:
```js
var Employee = function (name, company, salary) {
  this.name = name || "";       
  this.company = company || "";
  this.salary = salary || 5000;

  // Method declared directly inside the constructor
  this.formatSalary = function () {
      return "$ " + this.salary;
  };
};

// Alternatively, we can add the method to Employee's prototype:
Employee.prototype.formatSalary2 = function() {
    return "$ " + this.salary;
};

// Creating objects
var emp1 = new Employee('Yuri Garagin', 'Company 1', 1000000);
var emp2 = new Employee('Dinesh Gupta', 'Company 2', 1039999);
var emp3 = new Employee('Erich Fromm', 'Company 3', 1299483);
```

Explanation:<br/>
* **Direct Method Declaration:** In the example above, the `formatSalary` method is declared directly inside the `Employee` 
  constructor. As a result, each instance (`emp1`, `emp2`, `emp3`) will have its own copy of the `formatSalary` method. 
  This can lead to significant memory overhead if many instances are created.
* **Prototype Method Declaration:** Conversely, the `formatSalary2` method is added to the `Employee.prototype`. This 
  means that all instances of `Employee` share a single copy of the `formatSalary2` method. This approach is more memory
  efficient because the method is only stored once in memory, regardless of how many instances are created.

**Benefits of Using the Prototype:**<br/>
1. **Memory Efficiency:** Only one copy of the method exists in memory, regardless of the number of instances.
2. **Consistency:** Methods defined on the prototype are shared across all instances, ensuring consistent behavior.
3. **Performance:** Reduces memory footprint, which can improve performance, especially in applications with many object instances.