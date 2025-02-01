# Memoization
Memoization is a functional programming technique used to improve the performance of functions by caching their
previously computed results. When a memoized function is called, it checks if the result for the given parameters is
already in the cache. If it is, the cached result is returned. If not, the function is executed, and the result is
stored in the cache for future use.

```js
const memoizeAdditionTwenty = () => {
  let cache = {};
  return (value) => {
    if (value in cache) {
      console.log("Fetching from cache");
      return cache[value]; // Accessing cache using square bracket notation
    } else {
      console.log("Calculating result");
      let result = value + 20;
      cache[value] = result;
      return result;
    }
  };
};

// Returned function from memoizeAdditionTwenty
const additionTwenty = memoizeAdditionTwenty();

console.log(additionTwenty(20)); // Output: 40 calculated
console.log(additionTwenty(20)); // Output: 40 cached
```

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)