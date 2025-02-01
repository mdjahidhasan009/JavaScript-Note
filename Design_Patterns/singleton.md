
### Singleton Pattern in JavaScript

The singleton pattern is an often used JavaScript design pattern. It provides a way to wrap the code into a logical unit that can be accessed through a single variable. The Singleton design pattern is used when only one instance of an object is needed throughout the lifetime of an application. In JavaScript, the Singleton pattern has many uses. They can be used for NameSpacing, which reduces the number of global variables in your page (prevent from polluting the global space), and organizing the code in a consistent manner, which increases the readability and maintainability of your pages.

There are two important points in the traditional definition of the Singleton pattern:
1. There should be only one instance allowed for a class.
2. We should allow a global point of access to that single instance.

#### Definition

In JavaScript, we can create a singleton through an object literal. However, there are other ways, but that will be covered in another post.

A singleton object consists of two parts: The object itself, containing the members (both methods and attributes) within it, and a global variable used to access it. The variable is global so that the object can be accessed anywhere on the page, this is a key feature of the singleton pattern.

#### JavaScript: A Singleton as a Namespace

As stated above, singletons can be used to declare a Namespace in JavaScript. NameSpacing is a large part of responsible programming in JavaScript. Because everything can be overwritten, it is very easy to wipe out a variable by mistake, or a function, or even a class without even knowing it. A common example which happens frequently when you are working with another team member in parallel:

```javascript
function findUserName(id) { }

/* Later in the page another programmer added code */
var findUserName = $('#user_list');

/* You are trying to call :( */
console.log(findUserName());
```

One of the best ways to prevent accidentally overwriting a variable is to namespace your code within a singleton object.

```javascript
/*  Using Namespace */
var MyNameSpace = {
  findUserName: function(id) { },
  // Other methods and attributes go here as well
}

/* Later in the page another programmer added code */
var findUserName = $('#user_list');

/* You are trying to call and you make this time workable */
console.log(MyNameSpace.findUserName());
```

#### Singleton Design Pattern Implementation

```javascript
/* Lazy Instantiation skeleton for a singleton pattern */
var MyNameSpace = {};
MyNameSpace.Singleton = (function() {

  // Private attribute that holds the single instance
  var singletonInstance;  

  // All of the normal code goes here
  function constructor() {
    // Private members
    var privateVar1 = "Nishant";
    var privateVar2 = [1,2,3,4,5];

    function privateMethod1() {
      // code stuff
    }

    function privateMethod2() {
      // code stuff
    }

    return {
      attribute1: "Nishant",
      publicMethod: function() {
        alert("Nishant");// some code logic
      }
    }
  }

  return {
    // public method (Global access point to Singleton object)
    getInstance: function() {
      // instance already exists then return  
      if (!singletonInstance) {
        singletonInstance = constructor();
      }
      return singletonInstance;           
    }           
  }
})();   

// getting access of publicMethod
console.log(MyNameSpace.Singleton.getInstance().publicMethod());
```

The singleton implemented above is easy to understand. The singleton class maintains a static reference to the lone singleton instance and returns that reference from the static `getInstance()` method.

Sources:
* [123-Essential-JavaScript-Questions Public](https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions)