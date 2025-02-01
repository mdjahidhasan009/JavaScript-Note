# **Access Specifiers and Encapsulation in JavaScript**

## **1. Access Specifiers in JavaScript**
Unlike languages like Java, C++, or C#, JavaScript **does not have traditional access specifiers** such as `public`, 
`private`, and `protected`. However, JavaScript provides ways to achieve encapsulation using:
- **Private fields and methods using `#`** (introduced in ES2020)
- **Naming conventions like `_`** (not enforced by JavaScript, but used to indicate protected members)

---

## **2. Module Pattern and Encapsulation**
Since JavaScript does not have built-in access modifiers, developers use the **Module Pattern** to encapsulate variables
and methods using closures and Immediately Invoked Function Expressions (IIFE).

### **Example of Module Pattern**
```javascript
const CounterModule = (function () {
    // Private variable
    let count = 0;  

    // Private function
    function log() {
        console.log(`Current count: ${count}`);
    }

    return {
        // Public method to increment count
        increment: function () {
            count++;
            log();
        },
        
        // Public method to get count
        getCount: function () {
            return count;
        }
    };
})();

CounterModule.increment(); // Current count: 1
console.log(CounterModule.getCount()); // 1
console.log(CounterModule.count); // undefined (private variable)
```
✅ **Encapsulation achieved**: `count` and `log()` are private because they exist only inside the closure.

---

## **3. `#` (Private Fields and Methods in ES2020)**
JavaScript introduced the `#` syntax to define **truly private** fields and methods within a class. These cannot be 
accessed outside the class.

### **Example: Private Fields and Methods**
```javascript
class BankAccount {
  #balance = 0;
  #accountNumber;
  
  constructor(accountNumber) {
    this.#accountNumber = accountNumber;
  }
  
  #privateMethod() {
    console.log("This is a private method");
  }
  
  deposit(amount) {
    this.#balance += amount;
    this.#privateMethod();
  }
  
  withdraw(amount) {
    if (this.#balance >= amount) {
      this.#balance -= amount;
    } else {
      console.log("Insufficient balance!");
    }
  }
  
  getAccountNumber() {
    return this.#accountNumber;
  }
}

let myAccount = new BankAccount("123456");
console.log(myAccount.getAccountNumber()); // "123456"
myAccount.deposit(1000); // "This is a private method"
myAccount.withdraw(500);
console.log(myAccount.#balance); // ❌ Error: Private field '#balance' must be declared in an enclosing class
```
✅ **`#balance` and `#accountNumber` are truly private**—they **cannot be accessed outside** the class.
✅ **`#privateMethod()` is a private method** that can only be called inside the class.

---

## **4. `_` (Protected-like Convention for Fields and Methods)**
JavaScript does not support `protected` fields, but developers use `_` as a **naming convention** to indicate a variable 
or method should not be accessed outside the class.

⚠️ **Important:** This is **not enforced by JavaScript**—it’s just a **developer agreement**.

### **Example: Protected Fields and Methods Using `_`**
```javascript
class Vehicle {
  _speed = 0;
  
  _protectedMethod() {
    console.log("This is a protected method");
  }
  
  accelerate(amount) {
    this._speed += amount;
    this._protectedMethod();
  }
  
  brake(amount) {
    this._speed -= amount;
    if (this._speed < 0) {
      this._speed = 0;
    }
  }
  
  get speed() {
    return this._speed;
  }
}

class Car extends Vehicle {
  #make;
  constructor(make) {
    super();
    this.#make = make;
  }
  get make() {
    return this.#make;
  }
  honk() {
    console.log("Beep beep!");
  }
}

let myCar = new Car("Toyota");
console.log(myCar.make); // "Toyota"
myCar.accelerate(50);
console.log(myCar.speed); // 50
myCar.brake(20);
console.log(myCar.speed); // 30
myCar.honk();  // "Beep beep!"
console.log(myCar._speed); // ⚠️ Works, but should be avoided
```
✅ **`_speed` and `_protectedMethod()` can still be accessed outside the class, but the `_` prefix warns developers not 
to use them directly.**

---

## **5. Private Static Methods (`#` in Static Methods)**
Static methods can also be private using `#`, making them accessible only inside the class.

### **Example: Private Static Method**
```javascript
class Utility {
  static #privateStaticMethod() {
    return "Private Static Method";
  }
  static publicStaticMethod() {
    return this.#privateStaticMethod(); // ✅ Works inside class
  }
}

console.log(Utility.publicStaticMethod()); // "Private Static Method"
console.log(Utility.#privateStaticMethod()); // ❌ Error
```
✅ **Private static methods are truly private** and can only be accessed inside the class.

---

## **6. `_` vs `#`: Key Differences**

| Feature                       | `_protected` (Convention)                                    | `#private` (True Privacy)                         |
|-------------------------------|--------------------------------------------------------------|---------------------------------------------------|
| **Enforced by JavaScript?**   | ❌ No                                                         | ✅ Yes                                             |
| **Accessible Outside Class?** | ✅ Yes                                                        | ❌ No                                              |
| **Accessible in Subclasses?** | ✅ Yes                                                        | ❌ No                                              |
| **Best Use Case**             | Indicating a variable/method should not be accessed directly | True encapsulation to hide implementation details |

---

## **7. Best Practices for JavaScript Encapsulation**
✔️ **Use `#` for true private fields and methods** when encapsulation is required.  
✔️ **Use `_` as a convention** for protected-like members (but remember it is not enforced).  
✔️ **Use the Module Pattern (IIFE)** for encapsulation in non-class-based code.  
✔️ **Follow team coding conventions** to maintain readability and consistency.

---

## **8. Access Private Fields and Methods in Node.js and Browsers**
Private fields and methods using `#` are **supported in modern browsers** and Node.js versions that support ES2020
features. 

In both browsers and Node.js, you can not access private fields and methods using **reflection** (e.g., `Object.keys()`,
`Object.getOwnPropertyNames()`, `Object.getOwnPropertySymbols()`).

```js
class BankAccount {
  #balance = 0;
  #accountNumber;
  
  constructor(accountNumber) {
    this.#accountNumber = accountNumber;
  }
  
  #privateMethod() {
    console.log("This is a private method");
  }
  
  deposit(amount) {
    this.#balance += amount;
    this.#privateMethod();
  }
  
  withdraw(amount) {
    if (this.#balance >= amount) {
      this.#balance -= amount;
    } else {
      console.log("Insufficient balance!");
    }
  }
  
  getAccountNumber() {
    return this.#accountNumber;
  }
  
  // Exposing the internal properties using reflection (unsafe)
  static getPrivateFields(instance) {
    const keys = Object.getOwnPropertyNames(instance);
    return keys;
  }
}

// Usage
let myAccount = new BankAccount("123456");

console.log(myAccount.getAccountNumber());  // "123456"
myAccount.deposit(1000);
myAccount.withdraw(500);

// Directly accessing private field via reflection (unsafe)
const privateFields = Object.getOwnPropertyNames(myAccount);
console.log(privateFields); // []

// This won't give you the actual value of private fields directly, but you can access the internal properties
// because private fields are part of the object's internal state.


let myAccount2 = new BankAccount("1234567");

// Trying to access internal properties through reflection
const symbols = Object.getOwnPropertySymbols(myAccount2);
const properties = Object.getOwnPropertyNames(myAccount2);
console.log(symbols, properties); // [] []
```

But while we are trying to access the private fields directly on browser environment it returns the variable value.

```js
class Test {
    #private_variable = 10;

    #privateMethod() {
        console.log("This is a private method");
    }

    // Public method to access private variable
    getPrivateVariable() {
        return this.#private_variable;
    }

    // Public method to call private method
    callPrivateMethod() {
        this.#privateMethod();
    }
}

const test = new Test();

console.log(test.getPrivateVariable()); // ✅ Outputs: 10
test.callPrivateMethod();               // ✅ Outputs: "This is a private method"
console.log(test.#private_variable);    // ✅ Outputs: 10
console.log(test.#privateMethod());     // ✅ Outputs: "This is a private method"
```

But this is not the case in Node.js environment. It throws an error when trying to access the private fields directly.

```js
class Test {
    #private_variable = 10;

    #privateMethod() {
        console.log("This is a private method");
    }

    // Public method to access private variable
    getPrivateVariable() {
        return this.#private_variable;
    }

    // Public method to call private method
    callPrivateMethod() {
        this.#privateMethod();
    }
}

const test = new Test();

console.log(test.getPrivateVariable()); // ✅ Outputs: 10
test.callPrivateMethod();               // ✅ Outputs: "This is a private method"

try {
    console.log(test.#private_variable);    // ❌ Error
    console.log(test.#privateMethod());     // ❌ Error
} catch (error) {
    console.log(error.message);
}
```

### **Conclusion**
- JavaScript **does not have traditional access modifiers** like `private`, `protected`, or `public`.
- The **Module Pattern** using IIFE allows for private scopes.
- The **`#` syntax provides true private fields and methods** (ES2020+ feature).
- The **`_` prefix is only a convention** to indicate protected-like behavior but has no real enforcement.
- Private static methods can also be declared using `#`.

By using these techniques properly, we can achieve encapsulation and secure object-oriented design in JavaScript. 🚀

