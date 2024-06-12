
## Lecture 29 [Frontend 2] - Understand React in A Different Way

To understand React, we first need to understand what frontend work entails. The primary tasks of the frontend are twofold:

- Display the data we want to show to the user through tags like headings, paragraphs, images, etc.
- Accept the feedback given by the user through forms.

Currently, frontend development is becoming increasingly complex due to user feedback or interactivity. We often forget that we need to collect data from the user initially. Our primary objective is to understand how to engineer the data display. Frameworks like React or Angular have gained popularity in the market primarily for showing data to the user. Let's look at the page below.

![Product Hunt](./images/product_hunt.png)

If we are asked how to design this page, our answer will be something like this. First, we will do the markup in an HTML file, then write CSS. Initially, we will create the navbar. Then we will create the left section and the right section. For each page, we will write separate HTML. This is the preliminary decision we made. This is web design. It is not called web development.

In web development, our thinking has to be different. We have to think about the finer details. There is a concept in web development called [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/). This concept will be useful for many in the future. We all need to understand what atomic design is first. When we design a web, there is no pressure on us. We don't know how a developer will use the template. So, we copy-paste similar tasks wherever they are. But in real life, writing a simple search bar can require 500-700 lines of code. Web designers may be surprised why so much code is needed for this simple thing. Because it involves accessibility, various features. For example, when you click on the search bar, it expands to cover the entire width; when you press the Esc button, it returns to its previous state; when you type something, it shows suggestions with each keystroke, and many more features. There is a vast difference between designing a website and developing it. So when we develop web applications, we have to think about many small things, and the more we can repeat these small things, the better the application we can hope for. Suppose the search bar on my homepage is the same as the one on another page. We can write that 700/800 lines of code once and reuse it instead of copy-pasting it multiple times. The concept of code reuse or dividing into small components is why frontend frameworks became popular. Not for clicks or interactions. We will create a component once and reuse it wherever needed. When we design the web or write code with HTML and CSS, we reuse it by copy-pasting. The main problem with copy-pasting is that if there is a change in one place, if you paste that code in 1000 places, you will have to go to those 1000 places and change it. But if you create a component, changing the main component will automatically change it everywhere. This concept of code reuse or dividing into small components is the current trend in frontend development. Various design patterns have emerged to further develop this concept, one of which is the mentioned atomic design pattern. This pattern is based on five things:

- Atoms: Atom means a small thing in an application. It can be a text, a button, or an input field.

![atoms](./images/atoms.jpg)

- Molecules: When multiple atoms combine, they form a molecule. Look at the picture below, there is a text, an input field, and a button. These three atoms combine to create a search component. This is a molecule.

![molecules](./images/molecule.jpg)

- Organisms: Multiple molecules combine to form an organism. For example, a navbar. A navbar has many molecules. There is a logo, links, dropdowns, profile pictures, and a search bar. These are each a molecule. These molecules combine to form a navbar. We call it an organism.

![Organisms](./images/organism-examples.jpg)

- Templates: A template means we can indicate where the content will be without using the actual content. For example, we can show where an image will be, its size, where a paragraph will be, its size, three sections, etc. This is called a template. The picture below will help you understand.

![Templates](./images/template1.jpg)

- Pages: When we place content on the template, it becomes a page.

![Pages](./images/page1.jpg)

The concept of atomic design is the basis for most design systems. It is now a very popular concept in the development field.

Let's go to the code now. We create the index.html and app.js files and connect the script file to the HTML.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modern App</title>
    <script src="./app.js" defer></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```js
// app.js
window.onload = function () {
  main();
};

function main() {}
```

In modern frontend development, the HTML file has no function. Whether you use a framework or decide to build a web application with vanilla JavaScript without using any framework, when it comes to building a web application, our HTML file is no longer needed. Now, the question may arise, if it has no function, where do the HTML codes come from when we inspect? These codes can be dynamically created using JavaScript. There are APIs for the DOM. These can be used to create content. You can use these APIs, or if you decide to use frameworks like React, Vue, or Angular, they will call these APIs for you and give you a different flavor of frontend development. Ultimately, everyone uses the DOM's API behind the scenes. How to work with the DOM's API? If we open our HTML file in the browser using a live server, we will see a blank screen.

![blank](./images/blank.png)

But I want to see an h1 element. To do that, we will write something in our JavaScript file.

```js
// app.js

window.onload = function () {
  main();
};

function main() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Hello World';

  document.body.appendChild(h1);
}
```

If we look at the output in our browser, we will see the text "Hello World."

![h1](./images/h1.png)

We haven't touched the HTML file at all. We are dynamically creating content with JavaScript. Now let's write a paragraph.

```js
// app.js

window.onload = function () {
  main();
};

function main() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Hello World';

  const p = document.createElement('p');
  p.innerText = `Officia duis anim ea ullamco proident et adipisicing nisi ad labore. Mollit id id anim velit laborum cupidatat aute veniam. Exercitation non elit magna elit aliquip dolore excepteur reprehenderit ea id dolor. Adipisicing pariatur amet mollit excepteur nulla dolore deserunt ipsum sit tempor magna dolore commodo mollit.`;

  document.body.appendChild(h1);
  document.body.appendChild(p);
}
```

We will see a paragraph appear on our page.

![p](./images/p.png)

Now, we want to group the h1 and p or place them inside a div. For that, we need to create a div.

```js
// app.js

window.onload = function () {
	main();
};

function main() {
	const div = document.createElement('div');

	const h1 = document.createElement('h1');
	h1.innerText = 'Hello World';

	const p = document.createElement('p');
	p.innerText = `Officia duis anim ea ullamco proident et adipisicing nisi ad labore. Mollit id id anim velit laborum cupidatat aute veniam. Exercitation non elit magna elit aliquip dolore excepteur reprehenderit ea id dolor. Adipisicing pariatur amet mollit excepteur nulla dolore deserunt ipsum sit tempor magna dolore commodo mollit.`;

	div.appendChild(h1);
	div.appendChild(p);

	document.body.appendChild(div);
}
```

Even though we won't see any change in the browser, if we inspect, we will see that a div has been created, and both the h1 and p tags are inside it.

![div](./images/div.png)

We can make this task more dynamic. We'll create two functions. One for the container and another for the text.

```js
function Container(children) {
	const div = document.createElement('div');
	children.forEach((child) => div.appendChild(child));

	return div;
}

function Text(tag, value) {
	const text = document.createElement(tag);
	text.innerText = value;
	return text;
}
```

Now, we'll delete everything we wrote inside the main function and use these functions instead.

```js
window.onload = function () {
	main();
};

function main() {
	const app = Container([
		Text('h1', 'Hello World'),
		Text('p', 'This is a simple paragraph'),
	]);
	document.getElementById('root').appendChild(app);
}

function Container(children) {
	const div = document.createElement('div');
	children.forEach((child) => div.appendChild(child));

	return div;
}

function Text(tag, value) {
	const text = document.createElement(tag);
	text.innerText = value;
	return text;
}
```

If we look at the output now, we will see the same output as before.

![dynamic](./images/dynamic.png)

This is somewhat how we used to write before React's JSX came. Now, you don't have to write code for each container or text you want to create. You can dynamically create content on the page using these functions. We can also add styles if we want.

```js
window.onload = function () {
	main();
};

function main() {
	const app = Container([
		Text('h1', 'Hello World'),
		Text('p', 'This is a simple paragraph'),
		Container([Text('h3', 'WOW'), Text('h3', 'NICE')], {
			display: 'flex',
			gap: '2rem',
		}),
	]);
	document.getElementById('root').appendChild(app);
}

function Container(children, style = {}) {
	const div = document.createElement('div');
	Object.keys(style).map((key) => {
		div.style[key] = style[key];
	});
	children.forEach((child) => div.appendChild(child));

	return div;
}

function Text(tag, value) {
	const text = document.createElement(tag);
	text.innerText = value;
	return text;
}
```

![style](./images/style.png)

We have an idea of how frameworks work. We also saw how we can dynamically generate HTML code using JavaScript without touching HTML. If we understand the concepts, we can create frameworks ourselves.

We have brought our UI into a JavaScript function instead of HTML. We have to keep in mind that the UI is no longer in HTML; it is now within a JavaScript function.

Now we will do what we did with React. First, we create our React application. To do this, we write `npx create-react-app first-app` or `yarn create react-app first-app` in the command line.

We don't need to understand the file structure now. We will just see if the code we wrote before matches with React.

We will delete everything in the App.js file in the src folder and write the following code.

```js
// App.js

import React from 'react';

function App() {
	return React.createElement('div', null, [
		React.createElement('h1', null, 'Hello React'),
		React.createElement('p', null, 'React is all about JavaScript'),
	]);
}

export default App;
```

Now, we run our application by writing `yarn start` or `npm start`. It will automatically run in the browser. When we go there, we will see the output below.

![react-1](./images/react-1.png)

The code we wrote manually before is almost the same. There we wrote `document.createElement`, here we write `React.createElement`. This means the JSX code we write has no real basis. These are made to make it easier for us to write. But that JSX code is converted to functions in some way. Now, since this is a small application, writing this way is not a problem. But in large applications where thousands of lines of code are written, it becomes difficult to understand if written this way. So, React has ...

```js
function App() {
	return (
		<div>
			<h1>Hello React</h1>
			<p>React is really awesome</p>
		</div>
	);
}

export default App;
```

![react-2](./images/react-2.png)

See how easily we can write. Even though this code won't display directly in the browser, it will first be converted to JavaScript and then shown in the browser. We don't need to do that conversion ourselves. React, Webpack, and Babel will do it for us. We don't even need to think about it.

We said that now UI means function, and this proves it. Let's create another function in this file. We want to add a button. Let's write a function for that button.

```js
function Button() {
	return <button>This is a button</button>;
}

function App() {
	return (
		<div>
			<h1>Hello React</h1>
			<p>React is really awesome</p>
			<Button />
		</div>
	);
}

export default App;
```

We will write the function. But we will include it in our code as a tag. Now, if we see the output, we will see that a button has been added.

![react-3](./images/react-3.png)

This means we will create as many functions as there are UIs. By combining small UIs, we will create a large UI. For example, we can also create functions for the h1 and p tags if we want.


```js
function Button() {
    return <button>This is a button</button>;
}

function Title() {
    return <h1>Hello React</h1>;
}

function Body() {
    return <p>React is really awesome</p>;
}

function App() {
    return (
        <div>
            <Title />
            <Body />
            <Button />
        </div>
    );
}

export default App;
```

![react-4](./images/react-4.png)

Look, the same output is coming. That means hopefully, now no one has any doubts that each UI element is a separate function.

Why React? We have got the answer. Compare the code of the project we did using DOM manipulation with this; the DOM manipulation code is much more complex, and here it's so simple. React is the best solution to free us from the problems we would face while doing it with DOM manipulation. So, we got the answer to why React.

Now we need to know what React is, how we will work with React, and what tools we will need on our PC to work with React.

First, let's know what React is. If you go to React's official [site](https://reactjs.org/), you will see it says `A JavaScript library for building user interfaces`. If you go to Angular's [site](https://angular.io/), you will see it is a framework, and if you go to Vue's [site](https://vuejs.org/), you will see it is also a framework. But React is called a library. So, what is the difference between a library and a framework? The basic difference is that we can control a library and use it as we like. But a framework controls us; we can't do things in our own way in a framework. In a framework, we can't use any package outside its scope. We have to use only the packages or libraries mentioned for specific tasks. But in the case of a library, we are free. If we see a good library or package outside the conventional library, we can use it. Another disadvantage of a framework is that since everything is built-in, we have to learn everything, meaning its learning curve is much bigger. In the case of a library, the learning curve is relatively smaller.

To work with React, we need three tools:

- [NodeJS](https://nodejs.org/en/) - This must be installed.
- [Babel Js](https://babeljs.io/) - If we want to set up React custom, we need to install this. But we won't set up React custom.
- [Webpack](https://webpack.js.org/) - We will work with numerous files in our project. We need this to bundle those numerous files into small files. If we want to create a custom React environment, we need Webpack and Babel.

As beginners, we won't set up React's environment custom. We will create our React app the same way we did before. The create-react-app tool will create an environment for us using Babel and Webpack behind the scenes.

Now let's look at React's file structure. Here in node_modules, our necessary packages are installed. Then there's the public directory. We can put the favicon there. We will keep the index.html file there, which is the only HTML file. Then there are some logos. Then there is manifest.json. This will be useful when we create a progressive web app or a Chrome extension. Then there's robots.txt. These are not needed for beginners. Then we go to the src directory. Here, App.js is our root file. Although it is not our entry file. Our entry file is the index.js file. This is the file where we boot. If we go to this file, we will see it looks like this:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

We will remove React.StrictMode from here. Because as beginners, we won't work with StrictMode. Because we don't even know what StrictMode might be. So, we will refactor it a bit like this:

```js
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

We will delete App.js and create an App.jsx file. .jsx means we will understand that we have worked with components in this file, and .js means we have written pure JavaScript code here. Another advantage is that we will get all the shorthand benefits of HTML here. For example, if we write .something and press enter, a div with a class name will be created, and so on. Another thing to keep in mind is that our custom component file name should always start with a capital letter. Now, what is the benefit of components? If we had four buttons in our previous code in App.jsx, and they were styled, and if they were not in the form of components and we had written them four times by copying and pasting, then if we ever had to change any style, we would have to search and change all four. Because of components, we will change only that one component function, and it will change everywhere else automatically. Now, if we want each button to have a different name, we can do that dynamically.

```js
function Button({ text }) {
    return <button style={{ marginRight: '1rem' }}>{text}</button>;
}

function Title() {
    return <h1>Hello React</h1>;
}

function Body() {
    return <p>React is really awesome</p>;
}

function App() {
    return (
        <div>
            <Title />
            <Body />
            <Button text="Button A" />
            <Button text="Button B" />
            <Button text="Button C" />
        </div>
    );
}

export default App;
```

![react-5](./images/react-5.png)

See how easily we can do it. That means hopefully, now you have an idea of why we work with small components. This is modern web development.

## Acknowledgement

All images related to atomic design collected from [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/).

## Source Code

- [Source Code for this lecture](../../src/lecture-29/)

## Author

- [Aditya Chakraborty](https://github.com/adityackr)
