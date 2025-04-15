## Optional Parameters
Optional parameters in TypeScript allow you to define function parameters that are not required when calling the
function. This is done by appending a `?` to the parameter name in the function signature. Optional parameters can be
used to create more flexible functions that can accept a varying number of arguments.

```ts
function greet(name: string, age?: number): string {
    if (age) {
        return `Hello, ${name}. You are ${age} years old.`;
    } else {
        return `Hello, ${name}.`;
    }
}

console.log(greet("Alice")); // Output: Hello, Alice.
console.log(greet("Bob", 30)); // Output: Hello, Bob. You are 30 years old.
```


## Function Overloading
Function overloading allows you to define multiple *signatures* (declarations) for a single function name within the 
same scope. Each signature can differ in the **number**, **type**, or **order** of its parameters. This provides
multiple ways to call the same function, enhancing flexibility and expressiveness while maintaining strong type checking
at compile time.

### How it Works
1. **Overload Signatures:** You declare multiple function signatures one after another. These signatures define the
   different ways the function can be called (parameter types and return types). They do **not** contain any 
   implementation (no function body `{}`).
2. **Implementation Signature:** Immediately following the overload signatures, you provide **one** actual function 
   implementation.
3. **Compatibility:** The signature of this implementation function must be *general enough* to be compatible with *all*
   the overload signatures declared above it. Often, this means using union types (`|`), optional parameters (`?`), rest
   parameters (`...`), or sometimes the `any` type (though using more specific types like unions is generally preferred
   for better type safety *within* the implementation).
4. **Implementation Logic:** Inside the single function implementation body, you typically need to check the types or 
   number of arguments passed to determine which overload was intended and execute the appropriate logic. TypeScript 
   **does not** choose an implementation based on the call; it only checks if the call matches one of the *overload 
   signatures*. The single implementation body must handle all cases.
5. **Type Checking:** When you *call* the function, TypeScript checks if your call matches one of the *overload 
   signatures*. It does **not** look at the implementation signature for call-site type checking. This ensures that you
   can only call the function in the ways you explicitly defined in the overloads.

**Code Example: Function Overloading**

Let's create a `formatData` function that can accept either a `string` or a `Date` object and return a formatted string.

```typescript
// 1. Overload Signatures (Declarations without implementation)
function formatData(data: string): string; // Overload 1: Accepts a string
function formatData(data: Date): string;   // Overload 2: Accepts a Date object

// 2. Implementation Signature (Must be compatible with all overloads)
//    Here, `data` can be `string` OR `Date`. `string | Date` covers both overloads.
function formatData(data: string | Date): string {
    // 3. Implementation Logic (Check argument type to handle different cases)
    if (typeof data === 'string') {
        // Logic for string input
        return `Formatted string: ${data.toUpperCase()}`;
    } else if (data instanceof Date) {
        // Logic for Date input
        return `Formatted date: ${data.toLocaleDateString()}`;
    } else {
        // This part should ideally not be reachable if called correctly according
        // to overloads, but provides a fallback/error handling.
        // Note: With strict type checking, TypeScript knows `data` must be string or Date here.
        // We could assert the impossible state:
        const _exhaustiveCheck: never = data;
        return "Invalid data type"; // Or throw an error
    }
}

// 4. Calling the overloaded function (Type checking enforces valid calls)
let formattedString = formatData("hello world"); // Matches overload 1
let formattedDate = formatData(new Date());     // Matches overload 2

console.log(formattedString); // Output: Formatted string: HELLO WORLD
console.log(formattedDate);   // Output: Formatted date: [current locale date string, e.g., 10/27/2023]

// 5. Invalid Call (TypeScript will show an error)
// let formattedNumber = formatData(123); // Error: No overload matches this call.
```

---

## Function Overriding

While TypeScript supports function overloading, it also supports **function overriding**, although this concept applies 
specifically within the context of **Object-Oriented Programming (OOP)**, specifically **class inheritance**.

### What is Function Overriding?

Function overriding allows a **subclass (child class)** to provide a specific implementation for a method that is 
already defined in its **superclass (parent class)**. The method in the subclass *replaces* the implementation inherited
from the superclass when called on an instance of the subclass.

**Key Characteristics:**

1. **Inheritance:** Overriding requires an inheritance relationship (using the `extends` keyword).
2. **Same Name & Signature:** The method in the subclass must have the **same name** and a **compatible signature** 
   (same number of parameters, compatible parameter types, and a compatible return type) as the method in the
   superclass.
   *  *More Detail on Compatibility:* TypeScript allows for some flexibility based on covariance and contravariance 
      rules, especially with return types (subclass method can return a more specific type) and parameter types 
      (subclass method can accept broader types for parameters, though this is less common). However, for simplicity, 
      thinking of it as "same or compatible signature" is often sufficient initially.
3. **Polymorphism:** Overriding is a fundamental mechanism for achieving polymorphism (specifically, subtype 
   polymorphism), where objects of different classes can respond to the same method call in different ways.

**Code Example: Function Overriding**

```typescript
// Superclass (Parent Class)
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Method to be potentially overridden
    makeSound(): void {
        console.log("Some generic animal sound");
    }

    move(distanceInMeters: number = 0): void {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

// Subclass (Child Class) inheriting from Animal
class Dog extends Animal {
    // Constructor for the subclass (calls the superclass constructor)
    constructor(name: string) {
        super(name); // Call the parent constructor
    }

    // 1. Overriding the 'makeSound' method
    //    Same name 'makeSound', same signature (no parameters, void return)
    makeSound(): void {
        console.log("Woof! Woof!"); // Provides a specific implementation for Dog
    }

    // 2. We can also call the parent's implementation using 'super'
    speakAndMove(distance: number): void {
        this.makeSound();      // Calls the overridden Dog version
        super.makeSound();     // Explicitly calls the Animal version
        super.move(distance);  // Calls the inherited Animal version of move
    }

    // This would be an ERROR - trying to override with an incompatible signature
    // move(distanceInFeet: string): void { // Error: Signature mismatch
    //     console.log(`${this.name} moved ${distanceInFeet} feet.`);
    // }
}

// Using the classes
let genericAnimal = new Animal("Creature");
let myDog = new Dog("Buddy");

genericAnimal.makeSound(); // Output: Some generic animal sound
myDog.makeSound();         // Output: Woof! Woof! (Overridden method is called)

console.log("---");
myDog.speakAndMove(10);
// Output:
// Woof! Woof!
// Some generic animal sound
// Buddy moved 10m.

// Polymorphism example
let animalReference: Animal;

animalReference = genericAnimal;
animalReference.makeSound(); // Output: Some generic animal sound

animalReference = myDog;     // Reference an Animal, but points to a Dog object
animalReference.makeSound(); // Output: Woof! Woof! (Runtime determines Dog's method is called)
```

**Summary: Overloading vs. Overriding**

| Feature          | Function Overloading                       | Function Overriding                      |
|:-----------------|:-------------------------------------------|:-----------------------------------------|
| **Context**      | Within the same scope/class                | Between superclass and subclass          |
| **Mechanism**    | Multiple signatures, one implementation    | Subclass re-implements superclass method |
| **Signatures**   | **Different** (number/type of params)      | **Same** or **Compatible**               |
| **Relationship** | Different ways to call the *same* function | Specialized behavior in *derived* type   |
| **Primary Use**  | Flexibility in function calls, Type safety | Polymorphism, Inheritance                |
| **Applies To**   | Standalone functions, methods in classes   | Methods in classes (Inheritance)         |

