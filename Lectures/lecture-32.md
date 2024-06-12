
# Lecture 32 [Frontend 5] - React State and Its Lifecycle

%[https://youtu.be/F7zCmo7XM4Q]

## Introduction

Today we will discuss state and its lifecycle. But first, let's talk a bit about `jsx`. Because we have learned quite a bit about React so far. If we can learn `jsx` well, we can move forward a lot. There is a lot to learn about `jsx`.

## Short-circuit in JavaScript

There is a term called short-circuit in JavaScript. Whether we know it or not, we have all used it. Short-circuit evaluation is done using JavaScript's or (||) and and (&&) operators. Normally we use these operators in our conditions. Like `if(a || b)` or `if(a && b)` like this. When we use these in conditions, it cannot be called short-circuit evaluation. Then these are just logical operators. Short-circuit evaluation will be done elsewhere if we use these. For example, let's go to the `pages/About.jsx` file of the code we did in our last class. Then we will write the following code.

```js
const [count, setCount] = useState(0);

const o = count || 50;
```

Here `const o = count || 50;` is short-circuit evaluation. We will use this a lot in React. It means if the value of `count` is `falsy` or `0`, then the value of `o` will be `50`, and if it is not `falsy` or `0`, then the value of `o` will be the value of `count`. Now if we run the application and go to the browser and look at the console, we will see that it shows 50.

![short-circuit.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659335503128/ZK11M9OfS.png align="center")

Because initially the state of `count` is `0` which is a `falsy` value, so the value of `o` is showing 50. Now if we click on the `Increment` button to change the state, we will see that as the state changes, the value of our `o` also changes.

![sc-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659335787448/NbrLHQcUu.png align="center")

It means if the value on the left side is any `falsy` value, then the right side value will be our real value and it will be assigned to our variable. And if the value on the left side is `truthy`, then our real value will be the left side value and that will be stored in our variable. This is the only concept of short-circuit. There is no other concept.

Now we will see an example of short-circuit using the `&&` operator. The `||` operator is used when we want to conditionally assign a value to a variable. But when we want to decide whether to execute some code or not, we will use the `&&` operator. Then the `||` operator will not work. For example -

```js
count && console.log('Count has a value', count);
```

It means if the value of `count` is there, i.e., it returns true, then the right side part will be executed. Otherwise, it will not. On the right side, there can be functions, conditions, expressions, etc. Usually, we work with expressions. Now if we go to our console and see, it will not print. Because the value of `count` is not `truthy`. That's why it will not be seen.

![sc-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659336774827/z5Bgcu6EF.png align="center")

But if we increment, then this line will start printing.

![sc-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659336846706/e6aCTNM2v.png align="center")

With these two concepts, another concept has been added. It is the `nullish coalescing` operator or `??`. It means if the left part is `null` or `undefined`, then it returns the right part. For example, in our example, if I want to get the value `0` as well, it is not possible with `||`. Because it will skip as soon as it sees a `falsy` value. The solution to this problem is this `??` operator. It will only go to the right part if the left part is `null` or `undefined`. For any other value, it will return the left part value. Now if we write our code with this operator, like -

```js
const o = count ?? 50;
```

Then going to the console, we will see it prints `0`, which we did not get using `||`.

![sc-05.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659337428003/zFwmrzGoS.png align="center")

We will see these working in different places in different ways. Especially it is widely used inside `jsx`.

Basically, `||` and `&&` are called **short-circuit evaluation**.

## JSX

We learned about JSX in the previous classes. It is basically a function. We are calling a JavaScript function behind the scenes. But to make it easier for us to write, read, and understand, we use JSX like HTML. Below is a detailed discussion about jsx in point form.

- If we write the following code -

```jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

Then behind the scenes, it will look like this -

```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

It means what we would write in the format React.createElement(component, props, …children), we can write it very beautifully with jsx.

- We could not use self-closing tags as we liked in html. But in jsx, if we do not have any children, we can use self-closing tags. We can do it for our own components, as well as for html tags.

```jsx
<div className="sidebar" />
```

- For any element, React first checks if it is a React element. Then it will check if it is a custom component. If we create a component in another file, we must import it into our working file. That means it has to be within the scope.

```jsx
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

- We can consider React components as first-class citizens of JavaScript. We can put it in a variable, put it in a function, put it in an object, or even give it as an argument to a function.

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}
```


function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

Here you can see `MyComponents` is an object. Inside it, there is a function named `DatePicker`. We can use it in jsx using dot notation as shown in the code above.

- The component we create must start with a capital letter.

- We can pass another component as props inside a component if we want.

- We can dynamically select components at runtime. For example, we want to create a course player. It will have videos, articles, assignments, quizzes, etc. Now, the component to be rendered depends on what the user wants to see. We can do this dynamically at runtime. For example -

```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

Here, instead of using `const SpecificStory = components[props.storyType];`, if we directly write `return <components[props.storyType] story={props.story} />;`, it would be wrong. Because the component's name cannot start with a lowercase letter. So, we first took that component into a variable with a capital letter. Then we used that variable name.

- We can pass any expression as props inside jsx. It can be a function, an array map, an operation, a date, in short, any expression can be passed. To understand the difference between expression and statement well, read the article [Expression vs. Statement](https://aditya-blogs.hashnode.dev/expression-vs-statement). In short, the basic difference between expression and statement is that an expression eventually returns something, produces data, and can be stored somewhere. In that sense, a function cal...

- If we do not give any value to a prop, it will take `true` by default. For example -

```jsx
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

Both of the above lines are the same. If we do not set any value, it will automatically take it as true.

- If we have multiple props, we can put all the props inside an object and pass them all at once using the JavaScript spread operator (...). For example -

```jsx
function App() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

- What we pass as props inside a custom component is called children props.

To know more about JSX, visit the official React site [JSX in depth](https://reactjs.org/docs/jsx-in-depth.html).

Now we will go to the help page of the app we created in the last class. And we will learn all today's work by doing it on this page.

## Conditional Rendering

First, we will learn how to conditionally render inside jsx. First, we take a state inside our Help.jsx.

```jsx
import { useState } from 'react';
import Layout from '../components/layout/Layout';

const Help = () => {
  const [name, setName] = useState('');

  return (
    <Layout>
      <h1>Hello, I am Help page</h1>
    </Layout>
  );
};

export default Help;
```

Now we will render conditionally. We will render if there is a name, then the name will come after Hello in the `h1` tag. And if there is no name, `Guest` will come. Now let's write our condition.

```jsx
import { useState } from 'react';
import Layout from '../components/layout/Layout';

const Help = () => {
  const [name, setName] = useState('');

  return (
    <Layout>
      <h1>Hello {name ? name : 'Guest'}, I am Help page</h1>
    </Layout>
  );
};

export default Help;
```

Now since there is no name, our output will come with Guest.

![cr-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659366224144/h5TaqWecY.png align="center")

Now if we give `’HM Nayem’` instead of the initial value `’’` of the state, then the name will come instead of Guest.

```jsx
import { useState } from 'react';
import Layout from '../components/layout/Layout';

const Help = () => {
  const [name, setName] = useState('HM Nayem');

  return (
    <Layout>
      <h1>Hello {name ? name : 'Guest'}, I am Help page</h1>
    </Layout>
  );
};

export default Help;
```

![cr-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659366413248/8QvM85Oxv.png align="center")

Now we will create a system where there will be no name initially. After some time, it will take a name.


```jsx
import { useState } from 'react';
import Layout from '../components/layout/Layout';

const Help = () => {
	const [state, setState] = useState({});

	setTimeout(() => {
		setState({ name: 'HM Nayem' });
	}, 1 * 1000);

	console.log('Rendering');

	return (
		<Layout>
			<h1>Hello {state.name ? state.name : 'Guest'}, I am Help page</h1>
		</Layout>
	);
};

export default Help;
```

Now if we go to our browser and look at the console, we will see that it keeps rendering every second and the word "Rendering" keeps printing repeatedly.

![cr-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659367084110/iZKm_BWnQ.png align="center")

We saw conditional rendering using JavaScript's ternary operation. Now let's see it through short-circuit evaluation.

```jsx
import { useState } from 'react';
import Layout from '../components/layout/Layout';

const Help = () => {
	const [name, setName] = useState('');

	return (
		<Layout>
			{name && <h1>Hello {name}, I am Help page</h1>}
			{!name && <h1>Hello Guest, I am Help page</h1>}
		</Layout>
	);
};

export default Help;
```

We want it to show `<h1>Hello Guest, I am Help page</h1>` if there is no name, and `<h1>Hello {name}, I am Help page</h1>` if there is a name. Since there is no name here, it will show the picture below.

![cr-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659367537762/kVrT3fLgP.png align="center")

And if there is a name, it will show like below.

![cr-05.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659367608825/XqTh2u48k.png align="center")

We will see this kind of appearance inside jsx frequently.

Now let's see using the ternary operator. Initially, we used the ternary operator only for one part. Now we will use it for the whole `h1` tag.

```jsx
import { useState } from 'react';
import Layout from '../components/layout/Layout';

const Help = () => {
	const [name, setName] = useState('');

	return (
		<Layout>
			{name ? (
				<h1>Hello {name}, I am Help page</h1>
			) : (
				<h1>Hello Guest, I am Help page</h1>
			)}

		</Layout>
	);
};

export default Help;
```

You will see the same output as before.

We can do this conditional rendering in any part of jsx. For example, we can do it when selecting a class name, selecting attributes, using styles, providing values, deciding which component will render, etc. Conditional rendering is one of the strengths of React for rendering dynamic data.

Suppose we have data of three users.

```js
const data = [
	{
		name: 'Abdullah Turky',
		email: 'turky@test.com',
	},
	{
		name: 'Arjun Roy',
		email: 'arjun@test.com',
	},
	{
		name: 'Fahim Faisal',
		email: 'fahim@test.com',
	},
];
```

We want to show these three names in a list.

```jsx
<ul>
	<li>{data[0].name}</li>
	<li>{data[1].name}</li>
	<li>{data[2].name}</li>
</ul>;
```

You will see the names of our three users displayed.

![cr-06.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659368454023/rglcO6mYD.png align="center")

Since we are doing the same task repeatedly, instead of taking the `li` tag so many times, we can use JavaScript's array map method.

```jsx
<ul>
	{
	data.map((item) => (
		<li>
			{item.name}, ({item.email})
		</li>
	));
}
</ul>;
```

Our output will be like this-

![cr-07.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659368767895/78V6eVgPG.png align="center")

If we do it dynamically like this, if our data increases, we will not have to do anything. It will render dynamically. For example, if we add two more pieces of data, we will see it has automatically come to our UI.


```js
const data = [
	{
		name: 'Abdullah Turky',
		email: 'turky@test.com',
	},
	{
		name: 'Arjun Roy',
		email: 'arjun@test.com',
	},
	{
		name: 'Fahim Faisal',
		email: 'fahim@test.com',
	},
	{
		name: 'Faruk Ahmed',
		email: 'faruk@test.com',
	},
	{
		name: 'Firoz Ahmed',
		email: 'firoz@test.com',
	},
];
```
Now if we go to our browser, we will see these data have appeared there.

![cr-08.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659410617919/ZlWPoJYSD.png align="center")

Now, what if there is no data? If there is no data, nothing will be shown. But in that case, nothing can be understood. Because if there is no data, we need to inform that there is no data here. That means we can conditionally render the `ul` tag. That is, if there is data, it will show the user's list and if not, it will give us a message that there is no data.

```jsx
{
	data.length > 0 ? (
		<ul>
			{data.map((item) => (
				<li>
					{item.name}, ({item.email})
				</li>
			))}
		</ul>
	) : (
		<p>There is no data</p>
	);
}

```
If there is no data, it will show as below.

![cr-09.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659410967789/Bu-GFi84s.png align="center")

And if there is data, it will show the data as before.

If you understand this concept, then you are ready to do the project. There are a few more concepts like event handling. It's not very difficult. Those of us who know DOM have already worked with event handling.

## State and its Lifecycle

We discussed state in the last class. Now we will know about its lifecycle. There is a bit of a difference between the lifecycle of class-based components and functional components. The lifecycle of class-based components is described on React's official [website](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/). Since we will mostly use functional components, we will discuss the lifecycle of state in functional components step by step.

- The first step is to render a component. After rendering, all the code of that component will be executed and try to print the jsx on the screen.
- The second step is to check if there is any change after rendering and call its hooks. The advantage of functional components is that there is only one hook, which is `useEffect`.
- The third step is re-rendering. We discussed three reasons for re-rendering in the last class, they are - if props change, if state changes, and if the parent component re-renders. If re-rendering happens, the whole process will be repeated by going back to the first step. That means if a system is made here where the state is continuously updating, then the whole process will continue for a lifetime. Which we saw earlier in the `setTimeout` example.
- There is one last step, which is the component will be destroyed.

Look at the diagram below to get a clear idea.
![state-lifecycle.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1659416081502/poPnDKkep.jpg align="center")

This is the lifecycle of a functional component.

## useEffect Hook:

The `useEffect` hook is very important to maintain this lifecycle. If we look at the [diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) of class-based components, we will see there were four hooks we had to maintain separately: componentDidMount, componentWillUnmount, componentDidUpdate, shouldComponentUpdate. The `useEffect` hook in functional components does the work of all these four hooks. So we can say, the most powerful tool or hook in React is the `useEffect` hook. If we...

### Function of useEffect hook

Let's look at the code we wrote at the very beginning.

```jsx
import { useState } from 'react';
import Layout from '../components/layout/Layout';

const Help = () => {
	const [state, setState] = useState({});

	setTimeout(() => {
		setState({ name: 'HM Nayem' });
	}, 1 * 1000);

	console.log('Rendering');

	return (
		<Layout>
			<h1>Hello {state.name ? state.name : 'Guest'}, I am Help page</h1>
		</Layout>
	);
};

export default Help;
```

Here `setTimeout` is updating the state repeatedly within the component. But `setTimeout` will work once, and `setInterval` will work repeatedly. Then it should finish rendering once here. But it didn't. Because it is triggering the state. As a result, it is updating repeatedly. And if it updates, it keeps calling the Help function repeatedly doing all the work. The mistake we made here is that we wrote this `setTimeout` inside the body of the function. As a result, it turned into an infinite loop. Th...

The logic for our code should have been like the diagram below.

![logic.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1659422016355/0qBxeCSsl.jpg align="center")

We left out the middle side effect part. As a result, it turned into an infinite flow. The `useEffect` hook works to break such a flow. Let's see how we can work with `useEffect`.

```jsx
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';

const Help = () => {
	const [name, setName] = useState('');
	// const [state, setState] = useState({});

	useEffect(() => {
		console.log('Use Effect Called');
	});

	// setTimeout(() => {
	// 	setState({ name: 'HM Nayem' });
	// }, 1 * 1000);

	// console.log('Rendering');

	const data = [
		{
			name: 'Abdullah Turky',
			email: 'turky@test.com',
		},
		{
			name: 'Arjun Roy',
			email: 'arjun@test.com',
		},
		{
			name: 'Fahim Faisal',
			email: 'fahim@test.com',
		},
		{
			name: 'Faruk Ahmed',
			email: 'faruk@test.com',
		},
		{
			name: 'Firoz Ahmed',
			email: 'firoz@test.com',
		},
	];

	// const data = [];

	return (
		<Layout>
			{/* {name && <h1>Hello {name}, I am Help page</h1>}
			{!name && <h1>Hello Guest, I am Help page</h1>} */}

			{name ? (
				<h1>Hello {name}, I am Help page</h1>
			) : (
				<h1>Hello Guest, I am Help page</h1>
			)}

			{data.length > 0 ? (
				<ul>
					{data.map((item) => (
						<li>
							{item.name}, ({item.email})
						</li>
					))}
				</ul>
			) : (
				<p>There is no data</p>
			)}
		</Layout>
	);
};

export default Help;
```


If we go to the browser and check the console, we will see it has been called once. The number of times useEffect is called depends on the purpose we are using it for and how we are using it. Now, if we uncomment the commented parts of the above code, we will see that "Rendering" and "Use Effect called" are being printed repeatedly. Now we understand that the "Rendering" part is happening due to setTimeout like before. But why is "Use Effect called" being printed repeatedly? We saw in the lifecycle diagram that this hook will be called as many times as it renders. So it is being called repeatedly here. We can stop this. That is, if we make it independent, meaning if we say it has no dependency, then it will become independent. And we can do that by passing an empty array as the second argument.

```js
useEffect(() => {
	console.log('Use Effect Called');
}, []);
```

Now if we see, "Rendering" is being called repeatedly but "Use Effect called" has been called once and stopped. Now if we give state as a dependency, it will mean our hook is dependent on this state. That is, if it changes, this hook will keep getting called.

```js
const [state, setState] = useState({});
useEffect(() => {
	console.log('Use Effect Called');
}, [state]);
```

Now if we check the browser, we will see that "Rendering" and "Use Effect called" are being printed repeatedly as before. Because giving a dependency means our hook will be called based on the change of that state. So as many times as the state changes, the hook will be called that many times. Now let's write our setTimeout function inside our hook like this.

```js
const Help = () => {
	const [name, setName] = useState(‘’);
	const [state, setState] = useState({name: ‘’});

	useEffect(() => {
		setTimeout(() => {
			setState({ name: 'HM Nayem' });
		}, 1 * 1000);
		console.log('Set timeout');
	}, [state]);

	console.log('Rendering');
}
```

Now if we go to the browser, we will see "Set timeout" and "Rendering" are being called repeatedly. It means we still didn't get any benefit. If we had given an empty array as a dependency, the whole thing would have changed. In that case, "Set timeout" and "Rendering" would have been called only once, not repeatedly. Now if we write our code a bit like below, that is, use state.name instead of name in jsx and increase the setTimeout time to 3 seconds, we will see our component renders after 3 seconds, ...

```jsx
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';

const Help = () => {
	const [state, setState] = useState({name: ''});

	useEffect(() => {
		setTimeout(() => {
			setState({ name: 'HM Nayem' });
		}, 3000);
		console.log('Set timeout');
	}, []);

	console.log('Rendering');

	return (
		<Layout>
			{/* {name && <h1>Hello {name}, I am Help page</h1>}
			{!name && <h1>Hello Guest, I am Help page</h1>} */}

			{state.name ? (
				<h1>Hello {state.name}, I am Help page</h1>
			) : (
				<h1>Hello Guest, I am Help page</h1>
			)}
		</Layout>
	);
};

export default Help;
```

This is the power of useEffect. We can return a function in useEffect if we want, we will learn about that later.

## Clock Application

Now let's create an application. We will create a file named ClockPage.jsx in our pages folder.

```jsx
import Layout from '../components/layout/Layout';

const ClockPage = () => {
	return (
		<Layout>
			<h1>Clock</h1>
		</Layout>
	);
};

export default ClockPage;
```

Now we need to link this page in our App.jsx and Layout.jsx. Then let's write jsx in our ClockPage.

```jsx
import Layout from '../components/layout/Layout';

const ClockPage = () => {
	return (
		<Layout>
			<h1>Clock</h1>
			<h1>
				{10} : {15} : {20}
			</h1>
		</Layout>
	);
};

export default ClockPage;
```

So the appearance of our page will look like this -

![clock-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659425941804/_bPU57NYK.png align="left")

Now we need to change the state every second. To do this, we will install the [date-fns](https://date-fns.org/) package.

Now if we write the code below, we will see the time updating every second in our browser console.

```jsx
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';

const ClockPage = () => {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		setTimeout(() => {
			setDate(new Date());
		}, 1000);
	}, [date]);

	console.log(date);

	return (
		<Layout>
			<h1>Clock</h1>
			<h1>
				{10} : {15} : {20}
			</h1>
		</Layout>
	);
};

export default ClockPage;
```

Now we will create a function outside the component function to get data from the date. We will create a function for time formatting and use them in our jsx.

```js
import * as DateFns from 'date-fns';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';

const getTimes = (date) => {
	return {
		hours: DateFns.getHours(date),
		minutes: DateFns.getMinutes(date),
		seconds: DateFns.getSeconds(date),
	};
};

const formatTime = (time) => {
	return time < 10 ? `0${time}` : time;
};

const ClockPage = () => {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		setTimeout(() => {
			setDate(new Date());
		}, 1000);
	}, [date]);

	const time = getTimes(date);

	return (
		<Layout>
			<h1>Clock</h1>
			<h1>
				{formatTime(time.hours)} : {formatTime(time.minutes)} :{' '}
				{formatTime(time.seconds)}
			</h1>
		</Layout>
	);
};

export default ClockPage;
```


Our clock is ready.

![clock-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659427489201/JCHnqe-d0.png align="left")

## Tasks Application

We will do another small project. First, we will create a file named Tasks.jsx in the pages folder and link it in App.jsx and Layout.jsx. The tasks of this application are given below -

- Create new task
- Display all tasks
- Filter tasks by complete, incomplete and all
- Delete tasks
- Edit tasks

If we design the architecture of our app a bit, it will be easier for us to work. Let's give it a try.

![todo-architecture.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1659431764377/wXr6lfMby.jpg align="center")

Let's describe it step by step.

- Everything will be with our App or Tasks. There will be two states: tasks and visibility. Tasks will initially be an empty array, and by visibility, we mean what the filtering will be based on - complete, incomplete, or all. Initially, we assume all.
- This app will have three components: Create, Filter, and ShowList.
- All tasks will come from the app as props to ShowList. ShowList will pass each single task as props to the ListItem component.
- Visibility will come as props from the app in the Filter.
- The task state will remain in Create. Because where it is being created, the task state will be there. Now this task state can be sent from Create to the app through state lifting. But we know that in React, data always passes from top to bottom of the component tree. It cannot be sent from bottom to top. It can be sent from bottom to top through state lifting.

Let's see what functions we need to create for our app.

- addTask(task) - This function will be called whenever we press the Create Task button in the Create component. The fun part is that this function will execute in our app, but it will be invoked from the Create component. The Create component will not know what is happening in the app's state. It will just send the addTask function.
- editTask(task) - To edit a task. It will be with ShowList and it will forward it to ListItem.
- deleteTask(taskId) - To delete a task. It will also be with ShowList and forward it to ListItem.
- setVisibility(text) - For filtering. It will be with the Filter. It will be invoked from here and executed in the app.

Our architecture is done. Now let's try to create it.

```jsx
// Tasks.jsx

import { useState } from 'react';
import Layout from '../components/layout/Layout';
import CreateTask from '../components/tasks/CreateTask';

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [visibility, setVisibility] = useState('all');

	return (
		<Layout>
			<h1>TODO List</h1>
			<CreateTask />
		</Layout>
	);
};

export default Tasks;
```

```jsx
// components/tasks/CreateTsks.jsx

import { useState } from 'react';

const CreateTask = () => {
	const [text, setText] = useState('sample task');

	return (
		<div>
			<input
				type="text"
				placeholder="type your task"
				value={text}
				onChange={(event) => setText(event.target.value)}
			/>
			<button
				onClick={() => {
					alert(text);
				}}
			>
				Create Task
			</button>
		</div>
	);
};

export default CreateTask;
```

Wherever there is any input, we want to keep control of the data in our hands. Same here. So we will keep the control of our input in our hands. Here we have passed the state's data as the value in the input field, which is called single-way binding. Because data is coming from the state to the input field. But data is not being updated from the input. So it is called single-way binding. But we have to do two-way binding. For that, we have to handle the event with onChange. Now when we click the button...

```jsx
const addNewTask = (text) => {
console.log(text)
}
```

Now how will we call this function from our component? Of course, by passing it as props.

```jsx
// Tasks.jsx

<Layout>
	<h1>TODO List</h1>
	<CreateTask addNewTask={addNewTask} />
</Layout>;
```


```jsx
// CreateTask.jsx

import { useState } from 'react';

const CreateTask = ({ addNewTask }) => {
	const [text, setText] = useState('sample task');

	return (
		<div>
			<input
				type="text"
				placeholder="type your task"
				value={text}
				onChange={(event) => setText(event.target.value)}
			/>
			<button
				onClick={() => {
					addNewTask(text);
					setText('');
				}}
			>
				Create Task
			</button>
		</div>
	);
};

export default CreateTask;
```

Now if we go to the browser and click on the Create Task button, it will call the addNewTask function from Tasks.jsx and log to the console.

![todo-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659434717353/_XkZYKQwo.png align="center")

This is called state lifting. That is, we created the function in our app but called it where the state is and sent it to the app as an argument. That is, we lifted the state up.

Now we need to create a task object. We will put that object in the addNewTask function. Before that, we will install a package called `shortid` for generating IDs and import it in Tasks.jsx.

```jsx
const addNewTask = (text) => {
	const task = {
		text,
		isCompleted: false,
		createdAt: new Date(),
		id: shortid.generate(),
	};
	console.log(task);
};
```

Now if we check the shape of our task in the browser, it will look like the picture below.

![todo-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659435307361/MOYahtIO2.png align="center")

But the problem here is if we click the button with an empty input, it will be added as an empty text. But that can't be allowed. We will validate it where our input field is, that is, in our component.

```jsx
<button
	onClick={() => {
		if (text) {
			addNewTask(text);
			setText('');
		} else {
			alert('Invalid input');
		}
	}}
>
	Create Task
</button>;
```

So if we have text and if we don't, the appearance will be like the pictures below.

![todo-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659435614821/S56Nn1pMi.png align="center")
![todo-05.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659435621023/E24BKxltn.png align="center")

Now this task object will remain in the state. Let's see how we can keep it there.

```js
const addNewTask = (text) => {
	const task = {
		text,
		isCompleted: false,
		createdAt: new Date(),
		id: shortid.generate(),
	};
	setTasks([task, ...tasks]);
};
```

Now we need to show these tasks. For that, we need to create a component named ShowTasks.jsx.

```jsx
const ShowTasks = ({ tasks }) => {
	return (
		<div>
			{tasks.length > 0 ? (
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>{task.text}</li>
					))}
				</ul>
			) : (
				<p>No task found</p>
			)}
		</div>
	);
};

export default ShowTasks;
```
When we map, React doesn't understand what to do. It considers all items the same, so we have to give a unique `key` to each item. Now let's import it in our Tasks.jsx and use it.

```jsx
import { useState } from 'react';
import shortid from 'shortid';
import Layout from '../components/layout/Layout';
import CreateTask from '../components/tasks/CreateTask';
import ShowTasks from '../components/tasks/ShowTasks';

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [visibility, setVisibility] = useState('all');

	const addNewTask = (text) => {
		const task = {
			text,
			isCompleted: false,
			createdAt: new Date(),
			id: shortid.generate(),
		};
		setTasks([task, ...tasks]);
	};

	return (
		<Layout>
			<h1>TODO List</h1>
			<CreateTask addNewTask={addNewTask} />
			<ShowTasks tasks={tasks} />
		</Layout>
	);
};

export default Tasks;
```

Initially, our app will look like this since we don't have any tasks.

![todo-06.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659436528508/FuKwZ1wAc.png align="left")

After adding a task, it will look like this.

![todo-07.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1659436599365/dKmsuMxOx.png align="center")

> The remaining tasks from the architecture diagram we created are your tasks. Try to complete this application. Take it as a challenge for yourself.

## Source Code:

All source code of this lecture can be found at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-32).
