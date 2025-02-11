# Set
Set is a collection of unique values.

Syntax
```js
new Set([iterable]);
```

```js
var set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(4);
set.add(5);
set.add(5); // duplicate values are ignored
console.log(set); // Set { 1, 2, 3, 4, 5 }
```

```js
console.log([...new Set([1, 2, 4, 4, 3])]); // [1, 2, 4, 3]
```

# WeakSet
WeakSet is used to store a collection of weakly(weak references) held objects. 

Syntax
```js
new WeakSet([iterable]);
```

```js
var ws = new WeakSet();
var user = {};
ws.add(user);
ws.has(user); // true
ws.delete(user); // removes user from the set
ws.has(user); // false, user has been removed
```

* `add(value)`: A new object is appended with the given value to the weakset
* `delete(value)`: Deletes the value from the WeakSet collection.
* `has(value)`: It returns true if the value is present in the WeakSet Collection, otherwise it returns false.

```js
var weakSetObject = new WeakSet();
var firstObject = {};
var secondObject = {};
// add(value)
weakSetObject.add(secondObject);
console.log(weakSetObject.has(firstObject)); //false

weakSetObject.add(firstObject);
console.log(weakSetObject.has(firstObject)); //true
console.log(weakSetObject.has(secondObject)); //true
weakSetObject.delete(secondObject);
console.log(weakSetObject.has(secondObject)); //false
```

## Difference Between Set and WeakSet
The main difference is that references to objects in Set are strong while references to objects in WeakSet are weak. i.e,
An object in WeakSet can be garbage collected if there is no other reference to it. Other differences are

* Sets can store any value Whereas WeakSets can store only collections of objects
* WeakSet does not have size property unlike Set
* WeakSet does not have methods such as clear, keys, values, entries, forEach.
* WeakSet is not iterable.

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)