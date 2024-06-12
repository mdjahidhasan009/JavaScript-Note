
# Lecture 39 - Refactor The Operation and History Project

%[https://youtu.be/6Q6CrZQY5go]

## Introduction

In the last lecture, we will refactor the project we did. In other words, in the last class, we wrote all the code in one file. Today we will see how we can reuse it by creating different components.

## Breakdown the app into components

First, we need to see which components can be reusable. Let's take a look at our UI a little earlier.

![l39-01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661831449861/F1EMKneXR.png align="left")

We can see that we have two input fields first, identical. So input fields can be reused. Then there is the button. Each button looks the same. So we can reuse them. Then the history items can be reused. Again, the button we created can also be reused as a restore button.

Now the biggest issue is the data. Now all our data is in the app component. Now we need to understand which data we need to keep in our app and which we need to take out. For example, we need the input state in our app component. Then we will show the result, so we will need the result state in the app. Then there is the history. Since history will be created through operations, will be shown in history, and when restored will come to input, this state needs to be kept in our app. Then there is the restored history state. This is the most painful thing. We will work on that later.

Now let's try to understand the structure.

![React-state-lifting.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1661832917060/jp3Y1rNT2.jpg align="left")

First, the data will be created from the input and stored in the app. Then the operation will consume that data and create new data. And history will consume the data received from the operation.

Now we will create our components from here. We will create a directory called components inside the src folder. In this directory, we will create four directories named ui, inputs, operations, and history. Now we will create our components one by one.

## Working with ui components

### NumberField Component

First, we work with our smallest ui. First, we will create a file named NumberField.jsx in it. Then here we will write the following code.

```jsx
const NumberField = ({ value, onChange, name }) => {
    const style = {
        padding: '0.25rem',
        borderRadius: '0.1rem',
        border: '1px solid gray',
        background: '#fff',
        outline: 'none',
    };
    return (
        <input
            style={style}
            type="number"
            value={value}
            onChange={onChange}
            name={name}
        />
    );
};

export default NumberField;
```

Now we will import and use this component in App.jsx.

```jsx
import NumberField from './components/ui/NumberField';

const App = () => {
    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h1>Result: {result}</h1>
            <div>
                <p>Inputs</p>
                <NumberField
                    value={inputState.a}
                    onChange={handleInputChange}
                    name="a"
                />
                <NumberField
                    value={inputState.b}
                    onChange={handleInputChange}
                    name="b"
                />
            </div>
        </div>
    );
};
```

Now if we do not give props here, it will still show. But we don't want that. We want it to give us an error or warning if we don't give props. There is an option to mention prop types in TypeScript. But since we are working with JavaScript, we will use the [prop-types](https://www.npmjs.com/package/prop-types) library here. We will install it and import it into Numberfield.jsx. Along with that, we will write some code.

```jsx
import PropTypes from 'prop-types';

const NumberField = ({ value, onChange, name }) => {
    const style = {
        padding: '0.25rem',
        borderRadius: '0.1rem',
        border: '1px solid gray',
        background: '#fff',
        outline: 'none',
    };
    return (
        <input
            style={style}
            type="number"
            value={value}
            onChange={onChange}
            name={name}
        />
    );
};

NumberField.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default NumberField;
```


If we use `<NumberField />` without props, it shows us a warning.

![l39-02.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661836846067/CmGrxnX0q.png align="left")

Our component has been made reusable.

### Button Component

Now we will make the buttons in our application reusable. For that, we will create a file named Button.jsx inside src/components/ui.

```jsx
import PropTypes from 'prop-types';

const Button = ({ text, onClick, disabled, customStyle }) => {
    const disabledStyle = {
        backgroundColor: '#999',
        color: '#333',
        cursor: 'not-allowed',
    };

    const style = {
        padding: '0.25rem 1rem',
        backgroundColor: '#ddd',
        color: '#212121',
        borderRadius: '0.10rem',
        cursor: 'pointer',
        border: 'none',
        ...customStyle,
        ...(disabled && disabledStyle),
    };
    return (
        <button style={style} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    customStyle: PropTypes.object,
};

Button.defaultProps = {
    customStyle: {},
    disabled: false,
};

export default Button;
```

Here we have defined prop types. Along with that, we have defined the default values for customStyle and disabled.

Our Button component is also done. And at the same time, we are done with the ui. Now we will work on the input component.

## Working with inputs components

We created a file named InputSection.jsx inside src/components/inputs.

```jsx
import PropTypes from 'prop-types';
import NumberField from '../ui/NumberField';

const InputSection = ({ inputs, handleInputChange }) => {
    return (
        <div
            style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#efefef',
                borderRadius: '0.10rem',
            }}
        >
            <h3
                style={{
                    fontFamily: 'Arial',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    color: '#212121',
                    margin: 0,
                    marginBottom: '1rem',
                }}
            >
                Inputs
            </h3>
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'space-between',
                }}
            >
                <NumberField value={inputs.a} onChange={handleInputChange} name="a" />
                <NumberField value={inputs.b} onChange={handleInputChange} name="b" />
            </div>
        </div>
    );
};

InputSection.propTypes = {
    inputs: PropTypes.shape({
        a: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired,
    }).isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

export default InputSection;
```

Now we will use this in App.jsx.

```jsx
import InputSection from './components/inputs/InputSection';

const App = () => {
    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h1>Result: {result}</h1>
            <InputSection inputs={inputState} handleInputChange={handleInputChange} />
        </div>
    );
};
```

Our UI will look like this.

![l39-03.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661840383707/RSQ_XgzFn.png align="left")

We are done with the input. Now we will work on the operations.


## Working with operations components

We will create a file named OperationSection.jsx inside src/components/operations as we always do. We need an ID here. So, we will install the [shortid](https://www.npmjs.com/package/shortid) package.

```jsx
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Button from '../ui/Button';

const OperationSection = ({ handleArithmeticOps, handleClearOps }) => {
	const operations = [
		{
			id: shortid.generate(),
			text: '+',
			onClick: () => handleArithmeticOps('+'),
		},
		{
			id: shortid.generate(),
			text: '-',
			onClick: () => handleArithmeticOps('-'),
		},
		{
			id: shortid.generate(),
			text: '*',
			onClick: () => handleArithmeticOps('*'),
		},
		{
			id: shortid.generate(),
			text: '/',
			onClick: () => handleArithmeticOps('/'),
		},
		{
			id: shortid.generate(),
			text: '%',
			onClick: () => handleArithmeticOps('%'),
		},
		{
			id: shortid.generate(),
			text: '**',
			onClick: () => handleArithmeticOps('**'),
		},
		{
			id: shortid.generate(),
			text: 'Clear',
			onClick: handleClearOps,
		},
	];
	return (
		<div>
			<p>Operations</p>
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				{operations.map((operation) => (
					<Button
						text={operation.text}
						onClick={operation.onClick}
						key={operation.id}
					/>
				))}
			</div>
		</div>
	);
};

OperationSection.propTypes = {
	handleArithmeticOps: PropTypes.func.isRequired,
	handleClearOps: PropTypes.func.isRequired,
};

export default OperationSection;
```

Since all the buttons are of the same type, we took an array of button data objects and then mapped them. Then we will import and use it in App.jsx.

```jsx
import InputSection from './components/inputs/InputSection';
import OperationSection from './components/operations/OperationSection';

const App = () => {
	return (
		<div style={{ width: '50%', margin: '0 auto' }}>
			<h1>Result: {result}</h1>
			<InputSection inputs={inputState} handleInputChange={handleInputChange} />
			<OperationSection
				handleArithmeticOps={handleArithmeticOps}
				handleClearOps={handleClearOps}
			/>
		</div>
	);
};
```

Thus, we are done working on the operation component. What remains is the history component. We will work on it now.

## Working with history component

We have two tasks here - History and HistoryItem. We will first work on HistoryItem. For that, we will create a file named HistoryItem.jsx inside src/components/history.

```jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '../ui/Button';

const HistoryItem = ({ historyItem, disabled, handleRestoreBtn }) => {
	const [show, setShow] = useState(false);

	const handleToggle = () => {
		setShow(!show);
	};

	return (
		<li key={historyItem.id}>
			<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
				<p>
					Operation: {historyItem.inputs.a} {historyItem.operation}{' '}
					{historyItem.inputs.b}, Result: {historyItem.result}
				</p>
				<div>
					<Button text={show ? 'Hide' : 'Show'} onClick={handleToggle} />
				</div>
			</div>
			{show && (
				<>
					<small>
						{historyItem.date.toLocaleDateString()}{' '}
						{historyItem.date.toLocaleTimeString()}
					</small>
					<br />
					<Button
						text="Restore"
						onClick={() => handleRestoreBtn(historyItem)}
						disabled={disabled}
					/>
				</>
			)}
		</li>
	);
};

HistoryItem.propTypes = {
	historyItem: PropTypes.shape({
		id: PropTypes.number.isRequired,
		inputs: PropTypes.shape({
			a: PropTypes.number.isRequired,
			b: PropTypes.number.isRequired,
		}).isRequired,
		operation: PropTypes.string.isRequired,
		result: PropTypes.number.isRequired,
		date: PropTypes.object.isRequired,
	}),
	disabled: PropTypes.bool.isRequired,
	handleRestoreBtn: PropTypes.func.isRequired,
};

HistoryItem.defaultProps = {
	disabled: false,
};

export default HistoryItem;
```
Now, we will create a file named HistorySection.jsx in src/components/history.

```jsx
import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem';

const HistorySection = ({ histories, restoredHistory, handleRestoreBtn }) => {
    return (
        <div>
            <p>History</p>
            {histories.length === 0 ? (
                <p>
                    <small>There is no history</small>
                </p>
            ) : (
                <ul>
                    {histories.map((historyItem) => (
                        <HistoryItem
                            key={historyItem.id}
                            disabled={restoredHistory === historyItem.id}
                            historyItem={historyItem}
                            handleRestoreBtn={handleRestoreBtn}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

HistoryItem.propTypes = {
    histories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            inputs: PropTypes.shape({
                a: PropTypes.number.isRequired,
                b: PropTypes.number.isRequired,
            }).isRequired,
            operation: PropTypes.string.isRequired,
            result: PropTypes.number.isRequired,
            date: PropTypes.object.isRequired,
        })
    ),
    restoredHistory: PropTypes.number.isRequired,
    handleRestoreBtn: PropTypes.func.isRequired,
};

export default HistorySection;
```

Now, we will import HistorySection into App.jsx.

```jsx
import HistorySection from './components/history/HistorySection';
import InputSection from './components/inputs/InputSection';
import OperationSection from './components/operations/OperationSection';

const App = () => {
    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h1>Result: {result}</h1>
            <InputSection inputs={inputState} handleInputChange={handleInputChange} />
            <OperationSection
                handleArithmeticOps={handleArithmeticOps}
                handleClearOps={handleClearOps}
            />
            <HistorySection
                histories={histories}
                handleRestoreBtn={handleRestoreBtn}
                restoredHistory={restoredHistory}
            />
        </div>
    );
};
```

## Our Final UI

Our final UI will look like this -

![l39-04.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661845310859/2S9ro-xHU.png align="left")

## Source Code

You can find all the source code for this lecture at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-39/react-demo).
