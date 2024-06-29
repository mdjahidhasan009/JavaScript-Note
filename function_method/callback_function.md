# CallBack Function
## Example 6: Simulating a Promise-like Object

This code snippet demonstrates simulating a Promise-like object with a `then` method.

```javascript
function getDataFromServer(apiUrl){
    var name = "John";
    return {
        then: function(fn){
            fn(name);
        }
    }
}

getDataFromServer('www.google.com').then(function(name){
    console.log(name); // Output: John
});
```

### Explanation:
- **Simulating a Promise**: The `getDataFromServer` function returns an object with a `then` method, which immediately
  invokes the provided callback with the `name` variable.
- **Logging Name**: The `then` method is called with a function that logs the name, resulting in the output `John`.

## Example 7: Overriding Array `sort` Method (Incorrect Implementation)

This code snippet demonstrates overriding the `Array.prototype.sort` method incorrectly.

```javascript
(function(){
    var arrayNumb = [2, 8, 15, 16, 23, 42];
    Array.prototype.sort = function(a, b){
        return a - b;
    };
    arrayNumb.sort();
    console.log(arrayNumb); // Output: [2, 8, 15, 16, 23, 42]
})();
```

### Explanation:
- **Incorrect Override**: The `Array.prototype.sort` method is overridden with a function that expects two arguments (`a` and `b`), which is incorrect for overriding `Array.prototype.sort`.
- **Sorting Array**: Despite the incorrect override, the original `sort` method's behavior is preserved and the array is sorted correctly.

## Example 8: Correct Array `sort` Implementation with Custom Function

This code snippet demonstrates sorting an array with a custom compare function.

```javascript
(function(){
    var numberArray = [2, 8, 15, 16, 23, 42];
    numberArray.sort(function(a, b){
        if(a == b){
            return 0;
        } else {
            return a < b ? -1 : 1;
        }
    });
    console.log(numberArray); // Output: [2, 8, 15, 16, 23, 42]
})();
```

### Explanation:
- **Custom Sort Function**: The `sort` method is used with a custom compare function that returns `0` if elements are equal, `-1` if `a` is less than `b`, and `1` otherwise.
- **Sorting Array**: The array is correctly sorted in ascending order.

## Example 9: Simplified Array `sort` Implementation

This code snippet demonstrates sorting an array using a simplified compare function.

```javascript
(function(){
    var numberArray = [2, 8, 15, 16, 23, 42];
    numberArray.sort(function(a, b){
        return a - b;
    });
    console.log(numberArray); // Output: [2, 8, 15, 16, 23, 42]
})();
```

### Explanation:
- **Simplified Sort Function**: The `sort` method is used with a simplified compare function that directly returns the difference between `a` and `b`.
- **Sorting Array**: The array is correctly sorted in ascending order.
