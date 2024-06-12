
# Lecture 38 - JSON to JSX to JSON Thinking with A Small Project

%[https://youtu.be/3JUvn3uoUBI]

## Introduction

So far we have transformed data from JSON to JSX. We took data from JSON and displayed it as components. But what we have done does not really require learning React. We can take data from the backend and show it on the HTML page using ejs template engine, PHP, Django, applying various conditions, logic, loops, map everything. We do not need to learn React with such effort to do this part. Then you may ask why we learned it with such effort? We learned it because it is a bonus part of React. Without learning this, we would not understand the real work of React. Everything we are learning will be used in the future. But React did not come only for these. Because this work has been done by PHP for years. So why did React come?

## Why learn React anew

We now feel more comfortable using the web than installing and using applications. It is very annoying to download an application, install it, and keep it regularly updated. Instead, it is much easier to go to the web browser and use the web app by entering the link. We can also give examples of some important web apps that we use every day. For example - Google Docs, Google Slides, Google Sheets, Figma, Canva, etc. As days go by, people are leaning more towards web apps than using apps on their PCs. Because if you install it on the PC, it gets access to my PC. There can be many security issues in this regard. But a website in the browser cannot directly access our PC. In that case, we are assured. Now using it on the web is not a big deal. The main thing is to maintain that the user can use the app comfortably. For example, a photo editing app may have hundreds of features. They will not be on the server. They have to be on the frontend. That means its full access should be with the user. The user will edit by clicking as they wish. Now if it has to work with load on every click, then why would the user use that app? The user experience is very bad. The user wants instant action. I will click and the work will be done instantly. Also, whatever we are doing is being instantly saved in the database with every click. We do not even realize it. We do not have to think about saving separately. It is being saved instantly. We get this experience in desktop applications. Now we want to get that experience in the case of web apps as well. In short, users now do not want to read any static page. They want to interact. They want to post on Facebook, instantly like, comment, share. In other words, the demand for users is increasing day by day. As user demand has increased, the development world has also had to change a lot. This user interactivity is the most difficult task. Showing data to the user is not a difficult task. Taking data from the user is difficult. We need React for this work. Because the data that the user will create is not created on our server. They will be created on the frontend i.e. in the browser. Now someone's browser is not connected to the server. We can connect through API. But even if we do, the work that is happening in the browser needs to be exactly the same on our server. That means we need a simple system to save our state on the backend. That system is provided to us by React and similar frontend frameworks. Simply put, React did not come to build websites, it came to build web apps. In most cases, we build websites using React. We practice by building websites. Which is wrong. As a practice project, we also have to build such a project where there will be a lot of user interaction.

Now what do we mean by user interaction? Suppose we clicked a button. It did something. We need to take that click event. Suppose something specific happened after clicking the button. We need to have a reference to that specific thing. Then suppose an animation will run. How it will run, how it will end, how long it will run, we need to have control over it. Then somewhere data was changed due to the click. We need to keep that in mind as well. Just clicking is not the task. We are showing data, storing it, showing any data as per requirement, these things are user interactivity. That means giving the user what they want, whatever it takes to give it, is user interactivity. We are actually learning React to do this interactivity.

## Work of Frontend Developers

As a frontend developer, our main tasks are two.

- Transform data from JSON to JSX.
- Store the data created by the user in the database.

These are mainly the tasks of the frontend. The frontend frameworks mainly came to do these two tasks.

## Project Time

First, we will scaffold our React application through [vite](https://vitejs.dev/).

## Creating UI

First, we will write the code for our UI.

```jsx
// App.jsx

const App = () => {
    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h1>Result: 0</h1>
            <div>
                <p>Inputs</p>
                <input type="number" />
                <input type="number" />
            </div>
            <div>
                <p>Operations</p>
                <button>+</button>
                <button>-</button>
                <button>*</button>
                <button>/</button>
                <button>Clear</button>
            </div>
            <div>
                <p>History</p>
            </div>
        </div>
    );
};

export default App;
```

![ui-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661752109496/FKkdDlmGl.png align="center")

After each operation, we will show that operation's history below. Each history will have a restore button. We can restore that operation later if we want. That means we will track our operation.

## What are the tasks of the application

We divide the tasks that may exist in the application.

- Handle User Input Fields - When we go to the browser, we will see that we can write in our input fields. That means the input fields are uncontrolled. Our task is to bring these fields under our control. As soon as we can bring them under our control, they will become controlled components.
- Handle operations - Our result will be generated based on input and operations. So we do not have to handle the result separately. If we had handled the result at the beginning, we would have made a mistake.
- Handle a list of histories
- Render history list
- Restore the history

Now we will start our work one by one.

### Handle User Input Fields

Based on our past class experience, we understand that we need to take state for the input fields. Now since there are two fields, we can take the states into two variables or take them as objects in one variable. If we take them in one variable, it will be easier to work with that data. If we keep them in two variables, we will have to do all the work in two ways. So we will take the states in one variable as objects.

```jsx
import { useState } from 'react';

const initialInputState = {
    a: 0,
    b: 0,
};

const App = () => {
    const [inputState, setInputState] = useState({ ...initialInputState });
    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h1>Result: 0</h1>
            <div>
                <p>Inputs</p>
                <input type="number" value={inputState.a} />
                <input type="number" value={inputState.b} />
            </div>
            <div>
                <p>Operations</p>
                <button>+</button>
                <button>-</button>
                <button>*</button>
                <button>/</button>
                <button>Clear</button>
            </div>
            <div>
                <p>History</p>
                <p>
                    <small>There is no history</small>
                </p>
            </div>
        </div>
    );
};

export default App;
```


Here, the reason for taking the object separately outside is that there is a clear option here, meaning when we click on the clear button, the data will return to its initial state. In that case, we have to use this object twice. So we took it in a variable. And the purpose of using the spread operator while defining the state is to ensure that our main object remains intact after any data change. We want to avoid any risk. Then we gave these values as the value of our input fields. Now, if we look at our UI, we will see that 0 has appeared in our input fields. Apart from that, an error has also appeared in the console.

![ui-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661754239203/BS-79olih.png align="center")

It says `A component is changing an uncontrolled input to be controlled.`. How did it become controlled? Because we have bound it with state. And whenever we bring any field under our control, the browser gives up all authority over it to us. In that case, we have to write how to update that data. Otherwise, if you try, you will see that the data will not be updated in any way. That warning is given to us by React in the console. We can do this using the `onChange` handler. We will first create a function. Then we will set it as the onChange handler for the two input fields.

```jsx
const App = () => {
	const [inputState, setInputState] = useState({ ...initialInputState });

	const handleInputChange = (e) => {
		console.log(e.target);
	};
	return (
		<div style={{ width: '50%', margin: '0 auto' }}>
			<h1>Result: 0</h1>
			<div>
				<p>Inputs</p>
				<input
					type="number"
					value={inputState.a}
					onChange={handleInputChange}
				/>
				<input
					type="number"
					value={inputState.b}
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<p>Operations</p>
				<button>+</button>
				<button>-</button>
				<button>*</button>
				<button>/</button>
				<button>Clear</button>
			</div>
			<div>
				<p>History</p>
				<p>
					<small>There is no history</small>
				</p>
			</div>
		</div>
	);
};
```

But there is a problem here. Let's see what it is in the browser.

![ui-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661755100140/7gKoP1nLF.png align="left")

No matter which input we change, the same target always comes. So how do we know which input field is changing? That can be done very easily. We can give different names to our input fields using the name attribute. That is -

```jsx
<div>
	<p>Inputs</p>
	<input
		type="number"
		value={inputState.a}
		onChange={handleInputChange}
		name="a"
	/>
	<input
		type="number"
		value={inputState.b}
		onChange={handleInputChange}
		name="b"
	/>
</div>
```

And in our function, instead of using e.target, we will use e.target.name.

```jsx
const handleInputChange = (e) => {
	console.log(e.target.name);
};
```

Now if we go to the browser, we will see the name of the input that is changing.

![ui-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661755714381/C5eFmb0SF.png align="left")

Now let's write the main logic of our function. Our main task is to update the state. But the previous data should not be lost. Let's see how we can get new data along with the previous data. There are many solutions to this. We will see them one by one.

#### Solution 01

```jsx
const handleInputChange = (e) => {
	setInputState({
		...inputState,
		[e.target.name]: parseInt(e.target.value),
	});
};
```

Now to see if the state is changing correctly, we will use a Chrome extension called [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). After installing it, you will see the following picture. Click on Component from there.

![react-tools.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661756324832/3PDcIwW8T.png align="center")

If you notice, the initial state values are shown in the marked area in the picture below.

![ui-05.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661756384401/ckaGme9Fh.png align="left")

Then if we change the input field, the state will also change.

![ui-06.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661756422395/qm4-XUS1V.png align="left")

This is a very nice solution. But this code is a bit complex. If a beginner joins our company, they might get scared seeing this code. So we can see if we can make a simpler solution without using this one.

#### Solution 02

We can create two separate handler functions.

```jsx
const handleInputA = (e) => {
	setInputState({
		...inputState,
		a: parseInt(e.target.value),
	});
};

const handleInputB = (e) => {
	setInputState({
		...inputState,
		b: parseInt(e.target.value),
	});
};
```

In this case, our work will be done, and the code will look much simpler, but there is a big problem here: code duplication. If we need to debug or change something, we have to go to each function to do it. So this is also not a good solution. We can do one more thing.


#### Solution 03

```jsx
const handleInputChange = (key, value) => {
	setInputState({
		...inputState,
		[key]: parseInt(value),
	});
};
```

And we can write the onChange handler in our input tag -

```jsx
<div>
	<p>Inputs</p>
	<input
		type="number"
		value={inputState.a}
		onChange={(e) => handleInputChange('a', e.target.value)}
		name="a"
	/>
	<input
		type="number"
		value={inputState.b}
		onChange={(e) => handleInputChange('b', e.target.value)}
		name="b"
	/>
</div>
```

So, the first solution we did was actually good. Because here again, we have to write a function within onChange. So, this is also not a good solution.

#### Solution 04

```jsx
const handleInputChange = (inp) => {
	setInputState({
		...inputState,
		...inp,
	});
};
```

```jsx
<div>
	<p>Inputs</p>
	<input
		type="number"
		value={inputState.a}
		onChange={(e) => handleInputChange({ a: parseInt(e.target.value) })}
		name="a"
	/>
	<input
		type="number"
		value={inputState.b}
		onChange={(e) => handleInputChange({ b: parseInt(e.target.value) })}
		name="b"
	/>
</div>
```

So, we understand that a problem can be solved in many ways. But the best approach is the first solution. We will use that.

### Handle operations

First, we will handle the clear operation.

```jsx
const handleClearOps = () => {
	setInputState({ ...initialInputState });
};

<div>
	<p>Operations</p>
	<button>+</button>
	<button>-</button>
	<button>*</button>
	<button>/</button>
	<button onClick={handleClearOps}>Clear</button>
</div>;
```

Now, when you click the clear button, it will reset the input fields to their initial state.

Now, we will create a function for the other operations.

```jsx
const handleArithmeticOps = (operation) => {
	console.log(operation);
};
```

Now, we will add this handler function to all the buttons.

```jsx
<div>
	<p>Operations</p>
	<button onClick={() => handleArithmeticOps('+')}>+</button>
	<button onClick={() => handleArithmeticOps('-')}>-</button>
	<button onClick={() => handleArithmeticOps('*')}>*</button>
	<button onClick={() => handleArithmeticOps('/')}>/</button>
	<button onClick={handleClearOps}>Clear</button>
</div>
```

Now, if we go to the browser, we will see that whichever button we click, it will print the operation in the console.

![ui-07.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661760586494/etGuxDtDg.png align="left")

Now, a question might arise, why didn't we get the operation with innerText? Because there is a problem here. Suppose we change the button name to 'Add'. If we worked with innerText or textContent, our output would be Add. Could we perform an operation with Add? This is why we do not do this. We will create the function this way. Now, we will complete our function.

```jsx
const handleArithmeticOps = (operation) => {
	const f = new Function(
		'operation',
		`return ${inputState.a} ${operation} ${inputState.b}`
	);
	console.log(f(operation));
};
```

Now, if we check, we will see that our operations are working perfectly.

![ui-08.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661761482947/tnpSBa9ZU.png align="left")

Now, the work is not finished yet. Because the result we got needs to be shown at the top. The state is changing here. So, we need to take a state within the App function.

```jsx
const [result, setResult] = useState(0);
```

Now, we will replace 0 in our `h1` tag with the result.

```jsx
<h1>Result: {result}</h1>
```

Then we will update the state of the result in our handleArithmeticOps function.

```jsx
const handleArithmeticOps = (operation) => {
	const f = new Function(
		'operation',
		`return ${inputState.a} ${operation} ${inputState.b}`
	);
	setResult(f(operation));
};
```


Now let's see each operation one by one.

![plus.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661762640825/qGg1_0Ahg.png align="left")

![minus.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661762651794/TIGBOU4da.png align="left")

![multiply.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661762661549/CWU7HUetd.png align="left")

![divide.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661762666920/h0tgq0WW0.png align="left")

But when clicking the clear button, notice the input clears, but the result does not.

![clear.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661762712269/F17cy-yDH.png align="left")

Therefore, we need to add `setResult(0)` in the `handleClearOps` function.

```jsx
const handleClearOps = () => {
	setInputState({ ...initialInputState });
	setResult(0);
};
```

Now, when clicking the clear button, the result will also return to its initial state, which is 0.

We could have also used `eval` instead of creating a custom function inside `handleArithmeticOps`.

```jsx
const handleArithmeticOps = (operation) => {
	setResult(eval(`${inputState.a} ${operation} ${inputState.b}`));
};
```

You can check and see that we get the correct output either way. Using either a custom function or `eval` both work. The advantage is if we want to add another operation, for example, finding the modulus.

```jsx
<div>
	<p>Operations</p>
	<button onClick={() => handleArithmeticOps('+')}>+</button>
	<button onClick={() => handleArithmeticOps('-')}>-</button>
	<button onClick={() => handleArithmeticOps('*')}>*</button>
	<button onClick={() => handleArithmeticOps('/')}>/</button>
	<button onClick={() => handleArithmeticOps('%')}>%</button>
	<button onClick={handleClearOps}>Clear</button>
</div>
```

Then, there is no need to modify the function. We will get the modulus correctly.

![mod.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661763497286/LHX66WsEh.png align="left")

If we were using a switch case, then we would have to update the function with each new operation. That is not dynamic.

### Handle a list of histories

In this part, we want to show the details of what we did, a timestamp, and a system to return to that state. For example:

```jsx
<div>
	<p>History</p>
	<p>
		<small>There is no history</small>
		<ul>
			<li>
				<p>Operations: 10 + 30, Result = 40</p>
				<small>8/29/2022</small>
				<button>Restore</button>
			</li>
		</ul>
	</p>
</div>
```

![history-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661764348205/cr6haka4i.png align="left")

First, we need to extract JSON. We will create an object in `handleArithmeticOps`.

```jsx
const handleArithmeticOps = (operation) => {
	const f = new Function(
		'operation',
		`return ${inputState.a} ${operation} ${inputState.b}`
	);
	setResult(f(operation));

	// setResult(eval(`${inputState.a} ${operation} ${inputState.b}`));

	const history = {
		id: getId.next().value,
		inputs: { ...inputState },
		operation,
		result,
		date: new Date(),
	};

	console.log(history);
};
```

We will generate IDs using a generator outside the App function.

```jsx
function* generateId() {
	let id = 0;

	while (true) {
		yield id++;
	}
}

const getId = generateId();
```

Now, if we click on the operation buttons, we will see the following output in the console.

![history-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661766439460/naRNpHw-A.png align="left")

Next, we will add a system that alerts us if there is invalid input.

```jsx
const handleArithmeticOps = (operation) => {
	if (!inputState.a || !inputState.b) {
		alert('Invalid Input');
		return;
	}

	const f = new Function(
		'operation',
		`return ${inputState.a} ${operation} ${inputState.b}`
	);
	setResult(f(operation));

	// setResult(eval(`${inputState.a} ${operation} ${inputState.b}`));

	const history = {
		id: getId.next().value,
		inputs: { ...inputState },
		operation,
		result,
		date: new Date(),
	};
	console.log(history);
};
```

Now, we need to store this history object. For that, we will take a state.

```jsx
const App = () => {
	const [histories, setHistories] = useState([]);
};
```

Next, we will write the code to update the state.


```jsx
const handleArithmeticOps = (operation) => {
	if (!inputState.a || !inputState.b) {
		alert('Invalid Input');
		return;
	}

	const f = new Function(
		'operation',
		`return ${inputState.a} ${operation} ${inputState.b}`
	);
	const result = f(operation);
	setResult(result);

	// setResult(eval(`${inputState.a} ${operation} ${inputState.b}`));

	const history = {
		id: getId.next().value,
		inputs: { ...inputState },
		operation,
		result,
		date: new Date(),
	};
	setHistories({ history, ...histories });
};
```

Now let's modify our JSX code a bit.

```jsx
<div>
	<p>History</p>
	{histories.length === 0 ? (
		<p>
			<small>There is no history</small>
		</p>
	) : (
		<ul>
			{histories.map((historyItem) => (
				<li key={historyItem.id}>
					<p>
						Operations: {historyItem.inputs.a} {historyItem.operation}{' '}
						{historyItem.inputs.b}, Result = {historyItem.result}
					</p>
					<small>
						{historyItem.date.toLocaleDateString()}{' '}
						{historyItem.date.toLocaleTimeString()}
					</small>

					<button>Restore</button>
				</li>
			))}
		</ul>
	)}
</div>
```

### Render history list

Now let's render this list one by one.

![render-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661768417990/iZ8A6yzKU.png align="left")

![render-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661768423522/Z4pgXffwU.png align="left")

![render-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661768432142/nB_snmgSQ.png align="left")

![render-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661768440049/1vPn6c5I8.png align="left")

![render-05.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661768449236/t2kb9F0I0.png align="left")

![render-06.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661768457437/Ub6A2IfIH.png align="left")

### Restore the history

Naturally, we will need a handler function.

```jsx
const [restoredHistory, setRestoredHistory] = useState(null);

const handleRestoreBtn = (history) => {
	setInputState({ ...history.inputs });
	setResult(history.result);
	setRestoredHistory(history.id);
};
```

Now we will add this function to our button as an onClick handler and write the disable logic.

```jsx
<button
	onClick={() => handleRestoreBtn(history)}
	disabled={restoredHistory !== null && restoredHistory === history.id}
>
	Restore
</button>
```

Now see that our restore button is working correctly.

![restore-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661770115079/E3bOpKYqu.png align="left")

![restore-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661770125903/CMwmXhhZo.png align="left")

## Source Code

All the source code for this lecture can be found at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-38/react-demo).
