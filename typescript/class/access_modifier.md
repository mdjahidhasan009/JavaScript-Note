# TypeScript Access Modifiers

TypeScript provides access modifiers to control the visibility and accessibility of class members (properties and methods). These modifiers determine where a member can be accessed from.

TypeScript supports three main access modifiers:

1.  **`public`**
    *   **Definition:** Members declared as `public` are accessible from anywhere. This includes access from within the class itself, from subclasses (child classes), and from instances (objects) of the class, even outside the class definition.
    *   **Default:** If you do not specify an access modifier for a class member, it is implicitly `public` by default.
    *   **Usage:** Use `public` for members that are intended to be part of the class's external API.

    ```typescript
    class MyClass {
      public name: string; // Explicitly public
      age: number; // Implicitly public

      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }

      public greet() { // Explicitly public method
        console.log(`Hello, my name is ${this.name}`);
      }
    }

    let instance = new MyClass("Alice", 30);
    console.log(instance.name); // Accessible
    instance.greet();          // Accessible
    ```

2.  **`protected`**
    *   **Definition:** Members declared as `protected` are accessible only from within the defining class and any subclasses (child classes) that inherit from it. They are **not** accessible on instances of the class from outside these class definitions.
    *   **Usage:** Use `protected` when you want to allow subclasses to access or override a member, but you want to prevent it from being accessed directly on instances from external code.

    ```typescript
    class Person {
      protected name: string;

      constructor(name: string) {
        this.name = name;
      }
    }

    class Employee extends Person {
      private department: string;

      constructor(name: string, department: string) {
        super(name);
        this.department = department;
      }

      public getElevatorPitch() {
        // Can access protected member 'name' from superclass
        return `My name is ${this.name} and I work in ${this.department}.`;
      }
    }

    let howard = new Employee("Howard", "Sales");
    console.log(howard.getElevatorPitch()); // Access through a public method
    // console.log(howard.name); // Error: Property 'name' is protected and only accessible within class 'Person' and its subclasses.
    ```

3.  **`private`**
    *   **Definition:** Members declared as `private` are accessible **only** from within the defining class itself. They cannot be accessed from subclasses or from instances outside the class.
    *   **Usage:** Use `private` for internal implementation details of a class that should not be exposed or manipulated from outside.
    *   **TypeScript vs. JavaScript Private:** It's important to note that TypeScript's `private` keyword provides compile-time checking. It doesn't prevent access at runtime in the generated JavaScript (unless you target newer ES versions and use JavaScript's native `#private` fields, denoted by a hash `#`).

    ```typescript
    class Wallet {
      private secretCode: string; // Only accessible within Wallet

      constructor(code: string) {
        this.secretCode = code;
      }

      public checkCode(attempt: string): boolean {
        // Can access private member within the class
        return this.authenticate(attempt);
      }

      private authenticate(attempt: string): boolean {
        // Can access private member within the class
        return attempt === this.secretCode;
      }
    }

    class SecureWallet extends Wallet {
        // Cannot access secretCode here
        // showCode() { console.log(this.secretCode); } // Error!
    }

    let myWallet = new Wallet("1234");
    console.log(myWallet.checkCode("1234")); // Access via public method
    // console.log(myWallet.secretCode); // Error: Property 'secretCode' is private and only accessible within class 'Wallet'.
    // myWallet.authenticate("1234"); // Error: Property 'authenticate' is private...
    ```

These access modifiers are fundamental tools for implementing encapsulation, a core principle of object-oriented programming, within your TypeScript classes.





































































Sources:
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript)