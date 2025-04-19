# `readonly`

The `readonly` modifier in TypeScript is used to mark certain properties or elements as immutable after their initial 
assignment. It's a compile-time check that signals intent and prevents accidental modification of values that shouldn't 
change.

* **Purpose:** Enforces immutability for specific parts of your data structures.
* **Scope:** Applies primarily to properties of objects (within interfaces, type aliases, classes), elements of arrays, 
  and elements of tuples.
* **Mechanism:** It's a compile-time feature. TypeScript will show an error if you try to reassign a `readonly` 
  property/element outside its initialization context (like object creation or a class constructor). It does **not** 
  affect the runtime behavior or provide deep immutability for nested objects by default.
* **`readonly` vs `const`:** `const` is used for variable declarations and prevents the *variable itself* from being
  reassigned. `readonly` is used for *properties/elements* and prevents the *property/element value* from being changed
  after initialization.

**Example Demonstrating `readonly` Use Cases:**

```typescript
// 1. Readonly Properties in Interfaces
interface Point {
    readonly x: number;
    readonly y: number;
    label?: string; // Optional, mutable property
}

const origin: Point = { x: 0, y: 0, label: "Origin" };
console.log(`Point: (${origin.x}, ${origin.y})`); // Reading is OK
origin.label = "Starting Point"; // Mutable property assignment is OK
// origin.x = 10; // Error! Cannot assign to 'x' because it is a read-only property.

// 2. Readonly Properties in Type Aliases
type Config = {
    readonly apiKey: string;
    readonly apiSecret: string;
    timeout: number; // Mutable property
};

const appConfig: Config = { apiKey: "abc-123", apiSecret: "xyz-789", timeout: 5000 };
console.log(`API Key: ${appConfig.apiKey}`); // Reading is OK
appConfig.timeout = 10000; // Mutable property assignment is OK
// appConfig.apiKey = "def-456"; // Error! Cannot assign to 'apiKey' because it is a read-only property.

// 3. Readonly Properties in Classes
class Animal {
    readonly species: string;
    name: string;

    constructor(species: string, name: string) {
        this.species = species; // OK to assign in constructor
        this.name = name;
    }

    rename(newName: string) {
        this.name = newName; // OK
        // this.species = "New Species"; // Error! Cannot assign to 'species' because it is a read-only property outside the constructor.
    }
}

const leo = new Animal("Panthera leo", "Leo");
console.log(`${leo.name} is a ${leo.species}`); // Reading is OK
leo.rename("Simba"); // OK
// leo.species = "Felis catus"; // Error! Cannot assign to 'species' outside the constructor.

// 4. Readonly Arrays
// Syntax 1: readonly T[]
const readOnlyNumbers: readonly number[] = [1, 2, 3, 4];
console.log(`Readonly numbers length: ${readOnlyNumbers.length}`); // Reading is OK
// readOnlyNumbers.push(5);        // Error! Property 'push' does not exist on type 'readonly number[]'.
// readOnlyNumbers[0] = 0;         // Error! Index signature in type 'readonly number[]' only permits reading.

// Syntax 2: ReadonlyArray<T>
const readOnlyStrings: ReadonlyArray<string> = ["hello", "readonly", "world"];
console.log(`First readonly string: ${readOnlyStrings[0]}`); // Reading is OK
// readOnlyStrings.pop();          // Error! Property 'pop' does not exist on type 'readonly string[]'.

// 5. Readonly Tuples
const readOnlyPair: readonly [string, number] = ["status", 200];
console.log(`Status code: ${readOnlyPair[1]}`); // Reading is OK
// readOnlyPair[0] = "error";      // Error! Index signature in type 'readonly [string, number]' only permits reading.
// readOnlyPair.length = 1;        // Error! Cannot assign to 'length' because it is a read-only property.

// 6. Readonly Index Signatures
interface ReadonlyStringMap {
    readonly [key: string]: string;
}

const headers: ReadonlyStringMap = {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123"
};
console.log(`Content-Type: ${headers["Content-Type"]}`); // Reading is OK
// headers["Accept"] = "application/xml"; // Error! Index signature in type 'ReadonlyStringMap' only permits reading.
// headers["Content-Type"] = "text/plain"; // Error!


// --- Important Distinction: const vs readonly ---
const myVarConst = { value: 10 };
// myVarConst = { value: 20 }; // Error: Cannot assign to 'myVarConst' because it is a constant.
myVarConst.value = 20;       // OK: 'const' only prevents variable reassignment, not property mutation.

const myVarReadonly: { readonly value: number } = { value: 10 };
// myVarReadonly = { value: 20 };    // Error: Cannot assign to 'myVarReadonly' because it is a constant.
// myVarReadonly.value = 20;         // Error: Cannot assign to 'value' because it is a read-only property.


// --- Shallow Nature ---
// 'readonly' is shallow by default. Nested objects are still mutable unless typed as readonly too.
interface Settings {
    readonly mainColor: string;
    user: { name: string }; // 'user' property can't be reassigned, but its 'name' can be changed.
}
const appSettings: Settings = { mainColor: "blue", user: { name: "Alice" } };
// appSettings.mainColor = "red"; // Error!
appSettings.user.name = "Bob"; // OK! The nested 'user' object itself is not readonly.
console.log(`User name: ${appSettings.user.name}`); // Output: Bob
```