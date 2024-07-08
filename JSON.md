# JSON

JSON is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse
and generate. It is based on a subset of the JavaScript Programming Language, Standard ECMA-262 3rd Edition - December 
1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers
2000. of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties
2001. make JSON an ideal data-interchange language.

## Parsing
Converting a string to a JSON object.

```js
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const obj = JSON.parse(jsonString);
console.log(obj) // { name: 'John', age: 30, city: 'New York' }
console.log(obj.name) // John
```

## Stringify
Converting a JSON object to a string. This is useful when you want to send data to a server.

```js
const obj = { name: 'John', age: 30, city: 'New York' };
const jsonString = JSON.stringify(obj);
console.log(jsonString) // {"name":"John","age":30,"city":"New York"}
```

### Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)