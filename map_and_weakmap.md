# Map
Map in javascript is a collection of key-value pairs. It is similar to an object but the key can be of any type. The key
can be a string, number, object, or even a function. The key-value pair is stored in the order of insertion. The keys are
unique in the map. The map is iterable and can be looped through using the `for...of` loop.

## Creating a Map
A map can be created using the `new Map()` constructor. The map can be initialized with an array of key-value pairs.

```js
const map = new Map();
map.set('name', 'John');
map.set(1, 'One');
map.set({}, 'Object');
map.set(function() {}, 'Function');
```

## Getting the Size of a Map
The size of the map can be obtained using the `size` property.

```js
console.log(map.size); // 4
```

## Getting a Value from a Map
The value of a key can be obtained using the `get()` method.

```js
console.log(map.get('name')); // John
```

## Checking if a Key Exists in a Map
The `has()` method can be used to check if a key exists in the map.

```js
console.log(map.has('name')); // true
```

## Deleting a Key from a Map
The `delete()` method can be used to delete a key from the map.

```js
map.delete('name');
console.log(map.has('name')); // false
```

## Clearing a Map
The `clear()` method can be used to remove all the key-value pairs from the map.

```js
map.clear();
console.log(map.size); // 0
```

## Iterating through a Map
The map can be iterated using the `for...of` loop.

```js
for (const [key, value] of map) {
  console.log(key, value);
}
```

## Iterating through a Map using forEach
The map can be iterated using the `forEach()` method.

```js
map.forEach((value, key) => {
  console.log(key, value);
});
```

## Converting a Map to an Array
The map can be converted to an array using the `Array.from()` method.

```js
const array = Array.from(map);
console.log(array); // [['name', 'John'], [1, 'One'], [Object, 'Object'], [Function, 'Function']]
```

## Comparing Object and Map in JavaScript
Objects and Maps in JavaScript provide mechanisms to store key-value pairs, but they have important differences that make
Maps preferable in certain situations. Here are the key differences between Objects and Maps:

1. **Key Types**
    * **Object**: The keys in an object are always strings. If you try to use a non-string key, it will be converted to a
      string. 
    * **Map**: The keys in a map can be of any type, including objects, functions, and primitive values.
    ```js
        // Object keys
        let obj = {};
        obj['key'] = 'value'; // String key
        obj[Symbol('sym')] = 'value'; // Symbol key
        
        // Map keys
        let map = new Map();
        map.set('key', 'value'); // String key
        map.set(42, 'value'); // Number key
        map.set({}, 'value'); // Object key
        map.set(function() {}, 'value'); // Function key
    ```
2. **Key Order**
   * **Object**: Keys are not ordered. When iterating over an Object, the order of keys is not guaranteed.
   * **Map**: Keys are ordered by the order of insertion. When iterating over a Map, keys are returned in the order they 
     were added.
   ```js
      let obj = {a: 1, b: 2};
      console.log(Object.keys(obj)); // Output might not be in order of insertion
    
      let map = new Map();
      map.set('a', 1);
      map.set('b', 2);
      console.log([...map.keys()]); // Output: ['a', 'b']
    ```
3. **Size Property**
    * **Object**: You have to manually determine the number of properties.
    * **Map**: The size property provides the number of key-value pairs.
    ```js
        let obj = {a: 1, b: 2};
        console.log(Object.keys(obj).length); // Output: 2

        let map = new Map();
        map.set('a', 1);
        map.set('b', 2);
        console.log(map.size); // Output: 2
     ```
4. **Iterating**
    * **Object**: Iteration requires obtaining the keys and then iterating over them.
     * **Map**: Map is directly iterable and can be iterated with for...of loops.
    ```js
        let obj = {a: 1, b: 2};
        for (let key in obj) {
           console.log(key, obj[key]);
       }

       let map = new Map();
       map.set('a', 1);
       map.set('b', 2);
       for (let [key, value] of map) {
           console.log(key, value);
      }
     ```
5. **Prototype**
   * **Object**: An Object has a prototype, so there are default keys that can collide with your keys.
   * **Map**: Map does not have a prototype, so there are no default keys
   ```js
      let obj = Object.create(null); // No prototype
      obj['key'] = 'value';
      console.log(obj); // Output: { key: 'value' }

      let map = new Map();
      map.set('key', 'value');
      console.log(map); // Output: Map(1) { 'key' => 'value' }
    ``` 
6. **Performance**
    * **Object**: May not perform as well in scenarios involving frequent addition and removal of key pairs.
    * **Map**: May perform better in scenarios involving frequent addition and removal of key pairs.
    ```js
        let obj = {};
        obj['key1'] = 'value1';
        delete obj['key1'];

        let map = new Map();
        map.set('key1', 'value1');
        map.delete('key1');
    ```
   

# WeakMap
The WeakMap object is a collection of key/value pairs in which the keys are weakly referenced. In this case, keys must
be objects and the values can be arbitrary values. The syntax looks like the following:

```js
new WeakMap([iterable]);
```

```js
var ws = new WeakMap();
var user = {};
ws.set(user);
ws.has(user); // true
ws.delete(user); // removes user from the map
ws.has(user); // false, user has been removed
```

* `set(key, value)`: Sets the value for the key in the WeakMap object. Returns the WeakMap object.
* `delete(key)`: Removes any value associated to the key.
* `has(key)`: Returns a Boolean asserting whether a value has been associated to the key in the WeakMap object or not.
* `get(key)`: Returns the value associated to the key, or undefined if there is none. Let's see the functionality of all 
  the above methods in an example,

```js
var weakMapObject = new WeakMap();
var firstObject = {};
var secondObject = {};
// set(key, value)
weakMapObject.set(firstObject, "John");
weakMapObject.set(secondObject, 100);
console.log(weakMapObject.has(firstObject)); //true
console.log(weakMapObject.get(firstObject)); // John
weakMapObject.delete(secondObject);
```

## WeakMap vs Map
The main difference is that references to key objects in Map are strong while references to key objects in WeakMap are
weak. i.e, A key object in WeakMap can be garbage collected if there is no other reference to it. Other differences are,

* Maps can store any key type Whereas WeakMaps can store only collections of key objects
* WeakMap does not have size property unlike Map
* WeakMap does not have methods such as clear, keys, values, entries, forEach.
* WeakMap is not iterable.

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)