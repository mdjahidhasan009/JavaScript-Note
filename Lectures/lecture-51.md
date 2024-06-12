
# Lecture 51 - Track Zone Project | Create, Edit & List Custom Clock

## Introduction

Today we will set up the display for all clocks in our application. Along with that, we will build the system to create, update, and delete clocks. We will also calculate the time difference between our created clocks and the local clock. Let's first look at our component tree.

![component-tree.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1667807898913/O7RSx3Ggp.jpg)

To render all clocks, we need to pass data from the ClockActions component to ClockList. Since it cannot be passed directly, we need to first pass it to LocalClock, then to App, and finally from App to ClockList. Let's start working step by step.

## createClock function

We will create the `createClock` function in App.jsx. But before that, we need to pass the data from `ClockActions`. Let's first pass the createClock prop to ClockActions.

```jsx
// ClockActions

import { useState } from 'react';
import ClockForm from '../clock-form';

const ClockActions = ({ local = false, clock, updateClock, createClock }) => {
	// ...

	const handleClock = (values) => {
		createClock(values);
	};

	return (
		<div>
			// ...
			{isEdit && (
				<>
					<h3>Edit Clock</h3>
					<ClockForm
						handleClock={updateClock}
						edit={true}
						title={!local}
						values={clock}
					/>
				</>
			)}
			// ...
		</div>
	);
};

export default ClockActions;
```

Next, according to the component tree, ClockActions is above LocalClock. Let's modify it there.

```jsx
// LocalClock

import React, { useEffect } from 'react';
import useClock from '../../hooks/useClock';
import ClockActions from '../shared/clock-actions';
import ClockDisplay from '../shared/clock-display';

const LocalClock = ({ clock, updateClock, createClock }) => {
	// ...

	return (
		<div>
			// ...
			<ClockActions
				clock={clock}
				updateClock={updateClock}
				local={true}
				createClock={createClock}
			/>
		</div>
	);
};

export default LocalClock;
```

Now let's work on the App component.

```jsx
// App.jsx

import { useState } from 'react';
import { generate } from 'shortid';
import ClockList from './components/clock-list';
import LocalClock from './components/local-clock';

const LOCAL_CLOCK_INIT = {
	title: 'My Clock',
	timezone: '',
	offset: 0,
	date: null,
};

const App = () => {
	const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });
	const [clocks, setClocks] = useState([]);

	// ...

	const createClock = (clock) => {
		clock.id = generate();
		setClocks([...clocks, clock]);
	};

	return <div>// ...</div>;
};

export default App;
```

When many clocks are created, each clock needs a unique ID. We will install `shortid` for this purpose.

```sh
yarn add shortid
```

Then we will import the generate function from shortid. We will take a state called clocks. Then we will write the createClock function. The clock object will remain as it is, just the ID will be added. This way, we can create clocks.

## updateClock function

Now we will create the function to update the clock. Let's first write the function in App.jsx.

```jsx
const App = () => {
	const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });
	const [clocks, setClocks] = useState([]);
	// ...

	const updateClock = (updatedClock) => {
		const updatedClocks = clocks.map((clock) => {
			if (clock.id === updatedClock.id) {
				return updatedClock;
			}
			return clock;
		});
		setClocks(updatedClocks);
	};

	return <div>// ...</div>;
};

export default App;
```

## deleteClock function

Now we will create the function to delete the clock.

```jsx
// App.jsx

const App = () => {
	//...
	const deleteClock = (id) => {
		const updatedClocks = clocks.filter((clock) => clock.id !== id);
		setClocks(updatedClocks);
	};
	//...
};
```

## ClockListItem Component

To create the clock list, we need items. So let's create the list item first.

```jsx
// components/clock-list/clock-list-item.jsx

import { formatDistance } from 'date-fns';
import React from 'react';
import useClock from '../../hooks/useClock';
import ClockActions from '../shared/clock-actions';
import ClockDisplay from '../shared/clock-display';

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
	const { date } = useClock(clock.timezone, clock.offset);

	if (!date) return null;

	return (
		<div>
			<ClockDisplay
				date={date}
				offset={clock.offset}
				timezone={clock.timezone}
				title={clock.title}
			/>
			<ClockActions
				clock={clock}
				updateClock={updateClock}
				deleteClock={deleteClock}
			/>
		</div>
	);
};

export default ClockListItem;
```


ClockDisplay component requires a date object. So we used the useClock hook to create it.

Let's add an onClick event to the delete button in ClockActions.

```jsx
import { useState } from 'react';
import ClockForm from '../clock-form';

const ClockActions = ({
	local = false,
	clock,
	updateClock,
	createClock,
	deleteClock,
}) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isCreate, setIsCreate] = useState(false);

	// ...

	return (
		<div>
			<button onClick={() => setIsEdit(!isEdit)}>Edit</button>
			{local ? (
				<button onClick={() => setIsCreate(!isCreate)}>Create</button>
			) : (
				<button onClick={() => deleteClock(clock.id)}>Delete</button>
			)}
			// ...
		</div>
	);
};

export default ClockActions;
```

## ClockList Component

Now we will create our desired ClockList component.

```jsx
// components/clock-list/index.jsx

import React from 'react';
import ClockListItem from './clock-list-item';

const ClockList = ({ clocks, updateClock, deleteClock, localClock }) => {
	return (
		<div>
			<h3>Other Clocks</h3>
			<hr />
			{ClockList.length === 0 ? (
				<p>There is no clock, please create one</p>
			) : (
				<div>
					{clocks.map((clock) => (
						<ClockListItem
							key={clock.id}
							clock={clock}
							updateClock={updateClock}
							deleteClock={deleteClock}
							localClock={localClock}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ClockList;
```

## Time Difference

We want to show the time difference between our local clock and the created clocks. For that, there is a function called formatDistance in the `date-fns` library. We will use it in ClockListItem to show the time difference.

```jsx
const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
	const { date } = useClock(clock.timezone, clock.offset);

	if (!date) return null;

	return (
		<div>
			// ...
			<h3>Time difference: {formatDistance(localClock, date)}</h3>
			// ...
		</div>
	);
};

export default ClockListItem;
```

## Style ClockDisplay Component

We will add a little style to the ClockDisplay component. For that, we will create a file named `index.module.css` inside `components/shared/clock-display/` and write the following styles.

```css
.card {
	background-color: #ddd;
	border-radius: 5px;
	border: 1px solid #999;
	padding: 10px;
	margin-bottom: 10px;
}

.card h1 {
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	font-size: 1.2rem;
	margin-bottom: 0.5rem;
	color: #212121;
}
```

Then, we will import the CSS module in the ClockDisplay component and add it as a className.

```jsx
import { format } from 'date-fns';
import React from 'react';
import classes from './index.module.css';

const ClockDisplay = ({ date, title, timezone, offset }) => {
	let offsetHr = offset / 60;
	return (
		<div className={classes.card}>
			<h1>Title: {title}</h1>
			<h3>{format(date, 'yyyy-MM-dd hh:mm:ss aaa')}</h3>
			<p>
				{timezone}
				{offsetHr > 0 ? `+${Math.abs(offsetHr)}` : `-${Math.abs(offsetHr)}`}
			</p>
		</div>
	);
};

export default ClockDisplay;
```

## Final UI

Our final UI looks like this -

![final-ui.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1667811073432/eQi-ZakXW.png)

## Source Code

All the source code for this lecture can be found at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-51/track-zone).
