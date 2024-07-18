## Attribute
Attributes are **defined on the HTML markup**. They provide additional information about HTML elements and are always
represented as strings. Attributes are part of the initial HTML document and are used to configure or initialize elements.
```html
<input type="text" value="Name:">
```
In this example, the input element has two attributes: `type` and `value`.
#### Accessing Attributes
Attributes can be accessed using methods like `getAttribute` and `setAttribute`.
```js
const input = document.querySelector("input");
console.log(input.getAttribute("value")); // Outputs: "Name:"
```

## Properties
Properties are **defined on the DOM (Document Object Model)**. They represent the current state of HTML elements and can 
be of any data type (string, number, boolean, object, etc.). Properties are live and can change as the user interacts 
with the web page.
```html
const input = document.querySelector("input");
console.log(input.value); // Outputs: "Name:"
```

## Changing the Style of an HTML Element in JavaScript
### Using the `style` Property
The style property allows you to set inline styles directly on an HTML element. This method is useful for applying styles 
dynamically or when you need to change individual style properties.
```html
<!DOCTYPE html>
<html>
<head>
  <title>Change Style Example</title>
</head>
<body>
  <h1 id="title">Hello World</h1>
  <button onclick="changeStyle()">Change Style</button>

  <script>
    function changeStyle() {
      document.getElementById("title").style.fontSize = "30px";
      document.getElementById("title").style.color = "blue";
    }
  </script>
</body>
</html>
```
In this example, clicking the button will change the font size of the `h1` element to `30px` and the text color to `blue`.

### Using the `classList` Property
The className property allows you to change the entire class of an element. This method is useful when you want to apply
a set of predefined styles defined in a CSS class.
```html
<!DOCTYPE html>
<html>
<head>
  <title>Change Class Example</title>
  <style>
    .custom-title {
      font-size: 30px;
      color: blue;
    }
  </style>
</head>
<body>
  <h1 id="title">Hello World</h1>
  <button onclick="changeClass()">Change Class</button>

  <script>
    function changeClass() {
      document.getElementById("title").className = "custom-title";
    }
  </script>
</body>
</html>
```
In this example, clicking the button will apply the styles defined in the `.custom-title` CSS class to the `h1` element.

Sources:
* [javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)