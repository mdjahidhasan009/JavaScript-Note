# Abstract Classes 

Abstract classes in TypeScript are specialized classes that **cannot be instantiated directly**. Instead, they serve as
a **base class** for other classes (subclasses) to extend. Their primary purpose is to define a common structure,
properties, and methods (both implemented and unimplemented) that must be shared or implemented by derived classes.

**Key Characteristics:**

*   **Cannot be Instantiated:** You cannot create an object directly from an abstract class using
    `new AbstractClassName()`.
*   **Base for Inheritance:** They are designed to be extended by other concrete (non-abstract) classes.
*   **Mix of Members:** Abstract classes can contain:
    *   **Abstract Members:** Methods or properties declared with the `abstract` keyword. These members only define the
        signature (for methods) or type (for properties) but provide **no implementation** within the abstract class
        itself. Subclasses *must* provide concrete implementations for all inherited abstract members.
    *   **Concrete Members:** Regular methods and properties with full implementation, just like in a standard class.
        These are inherited directly by subclasses and can be used as-is (or overridden if needed and allowed).
*   **Enforcing Structure:** They enforce a certain structure and contract on any class that inherits from them, 
    ensuring subclasses implement essential functionalities defined by the abstract members.

Here's an example illustrating the concept:

```typescript
// Define the abstract base class 'Animal'
abstract class Animal {
  // Abstract property - must be implemented by subclasses
  abstract species: string;

  // Abstract method - must be implemented by subclasses
  abstract makeSound(): void;

  // Concrete method - inherited directly by subclasses
  move() {
    console.log("The animal is moving");
  }
}

// Concrete subclass 'Dog' extending 'Animal'
class Dog extends Animal {
  // Provide implementation for the abstract property 'species'
  species = "Dog";

  // Provide implementation for the abstract method 'makeSound'
  makeSound() {
    console.log("The dog barks");
  }
  // 'move' method is inherited automatically
}

// Concrete subclass 'Cat' extending 'Animal'
class Cat extends Animal {
  // Provide implementation for the abstract property 'species'
  species = "Cat";

  // Provide implementation for the abstract method 'makeSound'
  makeSound() {
    console.log("The cat meows");
  }
  // 'move' method is inherited automatically
}

// --- Usage ---
// const genericAnimal = new Animal(); // Error! Cannot create an instance of an abstract class.

const myDog = new Dog();
myDog.move();        // Inherited from Animal - Output: "The animal is moving"
myDog.makeSound();   // Implemented in Dog - Output: "The dog barks"
console.log(myDog.species); // Implemented in Dog - Output: "Dog"

const myCat = new Cat();
myCat.move();        // Inherited from Animal - Output: "The animal is moving"
myCat.makeSound();   // Implemented in Cat - Output: "The cat meows"
console.log(myCat.species); // Implemented in Cat - Output: "Cat"

```

In this example, `Animal` is an abstract class defining the blueprint for animals. It declares that all animals must
have a `species` and a way to `makeSound` (abstract members), while providing a common `move` behavior (concrete 
member). The `Dog` and `Cat` classes extend `Animal` and are forced by the compiler to provide their specific
implementations for `species` and `makeSound`, inheriting the `move` method directly.


### Resources
* [Most popular TypeScript interview questions and answers 2025](https://www.turing.com/interview-questions/typescript#intermediate-typescript-interview-questions-and-answers)