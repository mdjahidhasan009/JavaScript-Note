# Decorator
Decorators are a design pattern that is used to separate modification or decoration of a class without modifying the
class itself. Decorators are used to add metadata to a class, method, accessor, property, or parameter. Decorators are a
feature of TypeScript and are not available in JavaScript.

Many libraries and frameworks use decorators to add functionality to classes, methods, and properties. Angular uses
decorators to define components, services, and modules. NestJS uses decorators to define controllers, services, and
modules.

* Class Decorator
* Method Decorator
  * Accessor Decorator like `get` and `set` 
* Accessor Decorator
* Property Decorator
* Parameter Decorator

## Usage
- Caching
- Error handling
- Data validation
- Logging
- Decoupling business logic from component(react component, angular component), service, or module(NestJS module)
- Dependency injection

## Decorator Composition
Decorators can be composed by applying multiple decorators to a single declaration. Decorators are applied in the order
they are listed in the source code.

**NOTE**: Decorators are applied from bottom to top.

```typescript
@decorator1
@decorator2
class MyClass {}
```

## Decorator Factories
A decorator factory is a function that returns a decorator. Decorator factories can be used to create decorators with
parameters.

```typescript
function decoratorFactory(value: string): ClassDecorator {
  return function (target: Function) {
    console.log(`Decorator factory called with ${value}`);
  };
}

@decoratorFactory('Hello')
class MyClass {}
``` 

### Example
Make a function reverse that reverses a string.

```typescript
function reverse(str: string): string {
  return str.split('').reverse().join('');
}

console.log(reverse('Hello')); // olleH
```

Now make do the same thing using a decorator.

First uncomment `experimentalDecorators` in `tsconfig.json` to enable decorators.

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```



```typescript
function 


class StringManager {
    print(str: string) {
        console.log(str);
    }
}

const stringManager = new StringManager();
stringManager.print('Hello');
```