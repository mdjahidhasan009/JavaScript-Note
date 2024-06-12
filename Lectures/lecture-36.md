
# Lecture 36 - React Functional Component, Props and State

%[https://youtu.be/4X1GkVnoECY]

## Introduction

In today's class and the next, the basic topics of React will be discussed. After that, we will jump into the project. So far, we have been using [create-react-app](https://create-react-app.dev/) to create React projects. But today, we will use a new technology called [vite](https://vitejs.dev/). Because Vite is much faster. If we go to their documentation, we can learn how to use it.

## Install React project using Vite

To create a React application using vite, we need to use the command `npm create vite@latest` or `yarn create vite`. We installed our application using yarn. When working with React, we should always keep the official [website](https://reactjs.org/) open. Because it's not necessary to remember everything, and we don't. We can look up the documentation whenever we need something.

## Project files analysis

If we look at our project, we will see that there is only one HTML file. This is why it is called a single-page application. When we did vanilla projects, we used to create different HTML files for each page. But here, there will always be only this one HTML file. Does that mean we won't create multiple pages? Of course, we can create as many pages as we want. But there will be only one HTML file. And this file will only contain the following code. Nothing else. Everything else will be controlled by JavaScript.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" type="image/svg+xml" href="/vite.svg" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Vite + React</title>
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="/src/main.jsx"></script>
	</body>
</html>
```

There will be just one `div` with the `root` id.

All our work will be done inside the `src` folder. We will not touch anything else in the project. Whatever we do, we will do it in this folder. Let's see what's inside the `src` folder. But first, let's run our application. We can run our application by writing the following command.

```sh
yarn dev
```

After running, you will see a link created for us. If we run that link in the browser, we will get a window like the one below.

![vite-first-run.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660459325645/NNeT_rrlc.png align="left")

Now let's go to the App.jsx file inside our `src` folder and delete all the code inside the `div`, then write the following code.

```jsx
<div className="App">
	<h1>Hello World</h1>
</div>
```

After saving, we will see the following page.

![vite-2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660459594016/R-_MRMcxs.png align="left")

When we create a project, there will be many things. We will delete everything except the `main.jsx` file in the `src` folder. We don't need them. We will create the application our way.

If you go to the browser, you will see a window like the one below. Don't be scared. It's showing broken because we deleted the files. We will fix that.

![vite-3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660459878320/tpAtQJKMo.png align="left")

We will not touch our main.jsx file. This is the boot file for a React application. A boot file means when a React application starts running, this file will run first. It's called main.jsx in Vite, index.js in create-react-app. Whatever the name, we will not touch it.

We can create an App.jsx file in the src folder. When should we use the jsx and js extensions? When there is no React work in a file, just JavaScript code, we will use the js extension. And when we create a React component, we will use the jsx extension.

## React Components

There are two types of components in React. Class-based components and functional components. Class-based components are old. Functional components are used now. But in the future, we will have to learn class-based components when working with old applications. Also, there are some things in React for which we will need class-based components. We will see that then. For now, our focus will be on functional components.

## Functional Component

What is a functional component? `A function that returns JSX is a functional component in React`.

For example -

```js
function App() {
	return;
}
```

This is a normal JavaScript function. It has no relation to React. But as soon as we write the following code, it will transform into a functional component.

```jsx
function App() {
	return <h1>Hello World</h1>;
}
```

That is, as long as it is not returning JSX, it is a normal function. The moment it returns JSX, it becomes a functional component.

## Conditions to become a functional component

When creating a functional component, we need to keep a few things in mind. These are -

- Name must be capital
- Must return a piece of HTML (JSX)
- It always accepts an Object as an argument - a functional component can have only one argument. Multiple arguments cannot be used. And that argument must be an object.
- We can't call or invoke this function - we can never call this function like App(). It's not our responsibility to call this function. It's React's responsibility. We will only use it as an HTML tag.
- We have to use the function as an HTML tag

## Export the App function

Let's export our App function. Because if we don't export it, the main file won't find it.

```jsx
function App() {
	return <h1>Hello World</h1>;
}

export default App;
```

Now if we go to the browser, we will see that the huge error is gone, and it is showing the `Hello World` we wrote in the app file.

![vite-4.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660462065745/nRjiHgmd1.png align="left")

## Working with main.jsx

If we look at the code in our main file, we will see something like this -

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
```

See, here App is written as a self-closing tag. It is not called. Here, `React.StrictMode` will give us various problems when we are in development mode. For example, if we go to the App file and write `console.log('Hello')` inside the function, we will see that it is running twice in the browser console. Once from the dev tool and once from the application. If we notice the image below, we will understand.

![console-1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660462443717/aYphRk_kJ.png align="left")

To get rid of this unwanted problem, we will refactor the main file as follows. We will keep React.StrictMode because we will need it in production.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ReactDOM.createRoot(document.getElementById('root')).render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

Now if we go to the browser console, we will see that our problem is gone. That is, it is printed only once.


## props

Let's write the following code in our app file.

```jsx
function App(props) {
	console.log(props);
	return <h1>Hello World</h1>;
}

export default App;
```

Props is an empty object. If there is nothing as props, it will return an empty object. And props will be available from where we use the component. In simple terms, whatever we write as attributes there, those are props.

Now we used our App function in main.jsx. If we go there and give `name="My App"` as an attribute in the App tag, we will see in the console that it has been added to the props object.

![console-3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660464237455/uBsaBY1jt.png align="center")

Now if we go to our app file and instead of writing Hello World in the h1 tag, if we wrote `{props.name}`, then it would show what we gave as an attribute in the main file in our browser.

![vite-5.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660464424924/_rDjJgk1s.png align="left")

Now if we didn't give 'My App' in the name attribute but gave 'React is awesome', it would print that. See -

![vite-6.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660464528443/isVW_FEBA.png align="left")

Again, if we didn't give the name attribute at all, it wouldn't show any error, but it wouldn't print anything either. See that -

![vite-7.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660464604916/jlDdbnBIX.png align="left")

## Working with Components

Now let's try to build something. Suppose we want to build a list. It will have a checkbox first, then some text. So we can build it by writing the following code.

```jsx
function App(props) {
	console.log(props);
	return (
		<div>
			<ul>
				<li>
					<input type="checkbox" />
					<span>Checkbox 1</span>
				</li>
			</ul>
		</div>
	);
}

export default App;
```

Now if we see the output in the browser, we will get the following output.

![vite-8.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660466232470/77SZr-8FV.png align="center")

But we don't want just one checkbox. We want six. Then we can copy and paste the li tag six times.

```jsx
function App(props) {
	console.log(props);
	return (
		<div>
			<ul>
				<li>
					<input type="checkbox" />
					<span>Checkbox 1</span>
				</li>
				<li>
					<input type="checkbox" />
					<span>Checkbox 1</span>
				</li>
				<li>
					<input type="checkbox" />
					<span>Checkbox 1</span>
				</li>
				<li>
					<input type="checkbox" />
					<span>Checkbox 1</span>
				</li>
				<li>
					<input type="checkbox" />
					<span>Checkbox 1</span>
				</li>
				<li>
					<input type="checkbox" />
					<span>Checkbox 1</span>
				</li>
			</ul>
		</div>
	);
}

export default App;
```

If we go to the browser, we will see we have got six checkboxes.

![vite-9.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660466370199/sTfEgFIvo.png align="center")

But if we just copy like this, we could have done it with HTML. Why did we come to React? As a React developer, our job is to create a component wherever the code is duplicated. Here we see the li tag is duplicated multiple times. So let's create a component for it. You know, generally, components are created in separate files. We will create it here in one file for understanding.

```jsx
const ListItem = () => (
	<li>
		<input type="checkbox" />
		<span>Checkbox 1</span>
	</li>
);
```

Now let's write this component as a tag six times in our App function.

```jsx
function App() {
	return (
		<div>
			<ul>
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
			</ul>
		</div>
	);
}
```

If we go to the browser, we will see the same output as before. Now a question may arise, what benefit can we get by creating a component? Suppose we want to add a delete button. We don't have to add it six times separately. We will just add it to our component, and it will be added to all. For example -

```jsx
const ListItem = () => (
	<li>
		<input type="checkbox" />
		<span>Checkbox 1</span>
		<button>Delete</button>
	</li>
);
```

See, a delete button has been added to all of them.

![vite-10.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660468527691/8mrf4mNuz.png align="left")

We can also style it if we want. In that case, we will just add style to our component function, and it will be applied to all.


```jsx
const ListItem = () => (
	<li
		style={{
			listStyle: 'none',
			display: 'flex',
			alignItems: 'center',
		}}
	>
		<input type="checkbox" />
		<p>Checkbox 1</p>
		<button style={{ 'margin-left': 'auto' }}>Delete</button>
	</li>
);
```

![vite-11.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660468541115/V6HCC50dn.png align="left")

This is the main purpose of creating our component.

But there is a problem here. The problem is that all the text is the same here. But we can have different texts. In that case, the solution is to use props.

## Working with props

We will no longer write the text we wrote inside the p tag. Instead, we will pass props. Let's see how we can write that -

```jsx
const ListItem = (props) => (
	<li
		style={{
			listStyle: 'none',
			display: 'flex',
			alignItems: 'center',
		}}
	>
		<input type="checkbox" />
		<p>{props.title}</p>
		<button style={{ 'margin-left': 'auto' }}>Delete</button>
	</li>
);
```

We have given props as an argument of the function and written props.title inside the p tag using {}. Now if we go to our browser, we will see nothing in place of the text.

![vite-12.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660468702380/gRy-fetK_.png align="left")

Because we didn't give the attribute title where we called this component function.

Now if we give the attribute title in the first list item tag of our app function like `<ListItem title="Checkbox 1" />`, we will see that it shows the text in the first one, but not in the others. If we give the title to all of them one by one, we will see that the text has been added to all of them.

```jsx
function App() {
	return (
		<div>
			<ul>
				<ListItem title="Checkbox 1" />
				<ListItem title="Checkbox 2" />
				<ListItem title="Checkbox 3" />
				<ListItem title="Checkbox 4" />
				<ListItem title="Checkbox 5" />
				<ListItem title="Checkbox 6" />
			</ul>
		</div>
	);
}
```

![vite-13.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660468924187/3-blyv09w.png align="left")

### Render list items dynamically

But there is still a problem. The problem is that our data will not come like this. It will come in a structured way. Suppose we have an array like the one below -

```js
const tasksList = [
	{
		id: 1,
		title: 'Checkbox 1',
		checked: false,
	},
	{
		id: 2,
		title: 'Checkbox 2',
		checked: false,
	},
	{
		id: 3,
		title: 'Checkbox 3',
		checked: false,
	},
	{
		id: 4,
		title: 'Checkbox 4',
		checked: false,
	},
	{
		id: 5,
		title: 'Checkbox 5',
		checked: false,
	},
	{
		id: 6,
		title: 'Checkbox 6',
		checked: false,
	},
];
```

The data source can be inside the application or come from the server. Wherever it comes from, our target is to render our components from that data. That is, in this case, how can we make our list items from this array? It is by mapping. In this case, the `map` method will be very useful to us. We can map and render as many list items as we need.

We no longer need to write the ListItem component repeatedly. We can render all the items in one line. Let's see how to do that.

```jsx
function App() {
	return (
		<div>
			<ul>
				{tasksList.map((item) => (
					<ListItem title={item.title} />
				))}
			</ul>
		</div>
	);
}
```

Now if you go to the browser, you will see that all the items are rendered just like before. Now if 1000 data is added here, we don't have to touch the UI. It will be added automatically. Again, if the data decreases, the UI will update automatically. That is, we don't have to do anything anymore. The UI will update automatically depending on the variation of the data. That is, the main thing here is to handle the data.

![vite-14.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660470149486/MQ05ZoC_C.png align="left")

If you notice here, you will see that a warning is coming in the console. The reason for this is that when we create an array dynamically, React's core system cannot understand who it is. So to identify it properly, we need to give a unique identifier as key.

```jsx
function App() {
	return (
		<div>
			<ul>
				{tasksList.map((item) => (
					<ListItem key={item.id} title={item.title} />
				))}
			</ul>
		</div>
	);
}
```


Now you will see the warning is gone.

Now we want some checkboxes to be checked and some to be unchecked. We will set some checked values to true in our array. Suppose checkboxes 1 and 5 will be in the checked state. First, we will pass a prop as checked inside the input tag in our ListItem component. And then we will call it from the App function.

```jsx
const ListItem = (props) => (
	<li
		style={{
			listStyle: 'none',
			display: 'flex',
			alignItems: 'center',
		}}
	>
		<input type="checkbox" checked={props.checked} />
		<p>{props.title}</p>
		<button style={{ marginLeft: 'auto' }}>Delete</button>
	</li>
);
```

```jsx
function App() {
	return (
		<div>
			<ul>
				{tasksList.map((item) => (
					<ListItem key={item.id} title={item.title} checked={item.checked} />
				))}
			</ul>
		</div>
	);
}
```

![vite-15.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660471625495/0v5f5XG80.png align="left")

What we wanted has been achieved.

### props.children

If we don't know what a user wants to put inside a component, we can use props.children. That means the user can add anything they want at this place. Suppose we want to add an edit button to our ListItem. In that case, we will update our component function with props.children.

```jsx
const ListItem = (props) => (
	<li
		style={{
			listStyle: 'none',
			display: 'flex',
			alignItems: 'center',
		}}
	>
		<input type="checkbox" checked={props.checked} />
		<p>
			{props.title} <span>{props.children}</span>
		</p>
		<button style={{ marginLeft: 'auto' }}>Delete</button>
	</li>
);
```

We took a span tag inside the p tag and gave props.children inside it. One thing to remember is that whatever we give as children, we cannot give it as an attribute. We have to give it between the opening and closing tags. Let's see how to write it.

```jsx
function App() {
	return (
		<div>
			<ul>
				{tasksList.map((item) => (
					<ListItem key={item.id} title={item.title} checked={item.checked}>
						<button>Edit</button>
					</ListItem>
				))}
			</ul>
		</div>
	);
}
```

You can see how we have added the button as a child here. Now if you go to the browser, you will see that the button is added to all of them.

![vite-.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660473447221/oIKd8b0Ya.png align="left")

### Use multiple children in a single parent in JSX

We must remember that in JSX, multiple tags cannot be used. All our code must be written inside a single parent. Multiple parents are not allowed. If you notice, we have kept our App component inside a div and the ListItem component inside an li tag.

## States

The concept that has made React difficult for beginners is the state. It's not that the state is very difficult, but it becomes difficult to understand if not understood properly. We will make a counter that will increase by 1 and decrease by 1. After making it, we will make a fun app with the counter.

### Working with states

Let's comment out the previous app component and create a new app component.

```jsx
function App() {
	let count = 0;
	return (
		<div>
			<h1>Count: {count}</h1>
			<div>
				<button>Increment</button>
				<button>Decrement</button>
			</div>
		</div>
	);
}
```

![counter-1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660474297514/XJcIvg2Ri.png align="left")

A very simple app. We will click the Increment button to increase the counter and click the Decrement button to decrease it. To do this, we need to add an onClick handler to the button. First, let's create two functions for increment and decrement.

```jsx
const increment = () => {
	count++;
};

const decrement = () => {
	count--;
};
```

Then we will pass these two functions as onClick handlers to the buttons.

```jsx
<div>
	<button onClick={increment}>Increment</button>
	<button onClick={decrement}>Decrement</button>
</div>
```

But if we click the button, we will see that it is not working. The reason is that in the case of React, the UI we see re-renders when the state, props, or any parent changes. In this case, our count value is indeed increasing or decreasing, but it is not showing because there is no system to update the state in our component. In this case, we need the state. The data that changes our UI is the data we need to keep in the state. That is, in one word, we need to keep the dynamic data in our state. Using state in a functional component is very simple. We can do it using a hook called useState. We will discuss hooks in detail later. There is no need to understand hooks right now. useState is a function to which we give a default value as an argument. We can use an array, object, number, null, or anything as the default value. Since we want our count to start from zero, we will write useState(0) like this. This useState returns an array. The first item in this array is what we want to show, which needs to be updated, in this case, it's count, and the next item is a function to update this count. That is, there will be two items in this array. Since it returns an array, we can write it as follows.

```jsx
const [count, setCount] = useState(0);
```

Now let's update our functions.

```jsx
const increment = () => {
	setCount(count + 1);
};

const decrement = () => {
	setCount(count - 1);
};
```

Now if we go to our browser, we will see that our two buttons are working.

To understand if the entire UI is re-rendering, we will write a condition. That is, if the count value goes to 10 or above 10, a paragraph will show, and if it is below 10, it will not show.


```jsx
function App() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <div>
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
            </div>
            {count >= 10 && (
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                    maxime, ratione reiciendis consequatur perferendis cupiditate
                    praesentium quia at repellendus fuga? Vero dolorum perferendis
                    accusantium nam sed incidunt magnam, fugiat recusandae?
                </p>
            )}
        </div>
    );
}
```

Now let's look at our browser.

![counter-2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660475988405/JCk7i1NSu.png align="left")
![counter-3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660475998780/icJ01VEtn.png align="left")

See, as long as it was 9, the paragraph did not print, but as soon as it reached 10, the paragraph appeared. So we can understand that the whole page is rendering.

Now if we keep clicking the decrement button, we will see that at some point it goes negative. But we don't want the count value to go negative. So we can give a condition in our decrement function. Again, we don't want the count to go above 10. In that case, we can give a condition in our increment function.

```jsx
const increment = () => {
    if (count < 10) {
        setCount(count + 1);
    }
};

const decrement = () => {
    if (count > 0) {
        setCount(count - 1);
    }
};
```

Now if we look at our browser, we will see that it can't go below 0 or above 10.

We can also disable our buttons based on the count.

```jsx
function App() {
    const [count, setCount] = useState(0);

    const increment = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <div>
                <button onClick={increment} disabled={count === 10}>
                    Increment
                </button>
                <button onClick={decrement} disabled={count === 0}>
                    Decrement
                </button>
            </div>
            {count >= 10 && <p>Limit Reached!</p>}
        </div>
    );
}
```

Now if we look, we will see that the decrement button is disabled as soon as it reaches 0 and the increment button is disabled as soon as it reaches 10. Using state, we can handle these things very easily.

Now let's change our UI a bit. Suppose we have a product on our website. The product is a keyboard. We have ten keyboards in stock. We want to create a system where we can increment and decrement how many products we want to buy.

```jsx
function App() {
    const [count, setCount] = useState(0);

    const increment = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <div>
            <p>Keyboard</p>
            <p>{count} / 10</p>
            <div>
                <button onClick={increment} disabled={count === 10}>
                    Increment
                </button>
                <button onClick={decrement} disabled={count === 0}>
                    Decrement
                </button>
            </div>
        </div>
    );
}
```

![product-1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660484288574/tglw3vQox.png align="left")

Now we want to buy a mouse, headphones, etc. along with the keyboard. How can we do that? If we copy and paste the code and just change the keyboard to the mouse, it will be seen that clicking any product's button updates the state of both products. Since the same UI and same functionalities will be there, we can create a separate component for it. One characteristic of the state is that it is limited to a single component. If a state is used in a specific component, no one else can access that state.

```jsx
const ProductListItem = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    return (
        <div>
            <p>Keyboard</p>
            <p>{count} / 10</p>
            <div>
                <button onClick={increment} disabled={count === 10}>
                    Increment
                </button>
                <button onClick={decrement} disabled={count === 0}>
                    Decrement
                </button>
            </div>
        </div>
    );
};
```

```jsx
function App() {
    return (
        <div>
            <ProductListItem />
            <ProductListItem />
        </div>
    );
}
```


Now if we go to our browser, we will see that only the state of the product whose button we click is being updated, not the other one. When we call a component once, a separate instance of the state is created for it, separate memory is created for it, everything is managed separately. What state it has is not known to the other component. Calling a component once means that everything inside this component has to be done. If there is a state, the state has to be taken, if there is a function, the function's work has to be done, if there is logic, its work has to be done. When that component is called again, the whole process starts again from the beginning. As a result, there is no relation between the previous component call and this component call. But here another problem has been created. Both are named keyboards. But we want one to be named Keyboard, another to be named Mouse, and another to be named Headphone, etc. Moreover, not all products will have a stock of 10. Some products may have 10, some may have 5, some may have 7. The solution to that problem is props. With props, we can dynamically set the name, stock, etc.

```jsx
const ProductListItem = ({ productName, stock }) => {
	const [count, setCount] = useState(0);

	const increment = () => {
		if (count < stock) {
			setCount(count + 1);
		}
	};

	const decrement = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	};
	return (
		<div>
			<p>{productName}</p>
			<p>
				{count} / {stock}
			</p>
			<div>
				<button onClick={increment} disabled={count === stock}>
					Increment
				</button>
				<button onClick={decrement} disabled={count === 0}>
					Decrement
				</button>
			</div>
		</div>
	);
};
```

```jsx
function App() {
	return (
		<div>
			<ProductListItem productName={'Keyboard'} stock={10} />
			<ProductListItem productName={'Mouse'} stock={5} />
		</div>
	);
}
```

Since props is an object, instead of writing props in our component, we destructured the object. Now our names and stock are coming differently. And as soon as the stock runs out, the increment button is disabled.

![product-2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660486333325/vdKe9xYsc.png align="center")

Now if I have a product that is currently out of stock but we want to show it in the UI, then we just have to set the stock value to 0. For example -

```jsx
<ProductListItem productName={'Headphone'} stock={0} />
```

![product-3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660486644043/9zRDNJyYZ.png align="left")

We can't increment or decrement the headphone. See how many lines of code it took us to do all this. That's the fun of React. A lot of work can be done very easily in a short time.

Now let's try to do the whole thing from the beginning. Suppose we have an array of three products. Our job is to render these products, make them workable, and generate an invoice.

```js
const productList = [
	{
		id: 'P1',
		productName: 'Keyboard',
		stock: 10,
		price: 2000,
	},
	{
		id: 'P2',
		productName: 'Mouse',
		stock: 5,
		price: 1500,
	},
	{
		id: 'P3',
		productName: 'Headphone',
		stock: 15,
		price: 2500,
	},
];
```

Now we will make a table. And create a component for the table row.

```jsx
const TableRow = ({ id, name, stock, price, quantity, total }) => {
	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			<td>{stock}</td>
			<td>{price}</td>
			<td>{quantity}</td>
			<td>{total}</td>
			<td>
				<button>+</button>
				<button>-</button>
			</td>
		</tr>
	);
};

const App = () => {
	return (
		<div>
			<h1>Product List</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Stock</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{productList.map((product) => (
						<TableRow
							key={product.id}
							id={product.id}
							name={product.name}
							stock={product.stock}
							price={product.price}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
```

![table-1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660488668205/LTVtms6j8.png align="left")

Our UI is ready. Now what can be done here is to keep the total and quantity calculated. We will take a state.


```jsx
const App = () => {
	const [products, setProducts] = useState(
		productList.map((item) => {
			return {
				...item,
				quantity: 0,
				total: 0,
			};
		})
	);

	return (
		<div>
			<h1>Product List</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Stock</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<TableRow
							key={product.id}
							id={product.id}
							name={product.name}
							stock={product.stock}
							price={product.price}
							quantity={product.quantity}
							total={product.total}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
```

![table-2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660489425352/_6ySKhzDi.png align="left")

Now let's complete our component function.

```jsx
const TableRow = ({
	id,
	name,
	stock,
	price,
	quantity,
	total,
	increment,
	decrement,
}) => {
	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			<td>{stock}</td>
			<td>{price}</td>
			<td>{quantity}</td>
			<td>{total}</td>
			<td>
				<button disabled={quantity === stock} onClick={() => increment(id)}>
					+
				</button>
				<button disabled={quantity === 0} onClick={() => decrement(id)}>
					-
				</button>
			</td>
		</tr>
	);
};
```

Now we will complete our App.

```jsx
const App = () => {
	const [products, setProducts] = useState(
		productList.map((item) => ({
			...item,
			quantity: 0,
			total: 0,
		}))
	);

	const incrementQuantity = (id) => {
		setProducts(
			products.map((product) => {
				if (id === product.id && product.stock > product.quantity) {
					product.quantity++;
					product.total = product.quantity * product.price;
				}
				return product;
			})
		);
	};

	const decrementQuantity = (id) => {
		setProducts(
			products.map((product) => {
				if (id === product.id && product.quantity > 0) {
					product.quantity--;
					product.total = product.quantity * product.price;
				}
				return product;
			})
		);
	};

	const total = products.reduce((acc, cur) => acc + cur.total, 0);

	return (
		<div>
			<h1>Product List</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Stock</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<TableRow
							key={product.id}
							{...product}
							increment={incrementQuantity}
							decrement={decrementQuantity}
						/>
					))}
				</tbody>
			</table>
			{total > 0 && <p>Total: {total}</p>}
		</div>
	);
};
```

Our UI will look like this.

![table-3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660492385981/_8PSwimoW.png align="left")

## Source Code

All the code from this lecture can be found at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-36/react-demo).
