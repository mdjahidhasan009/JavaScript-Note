
# Lecture 49 - Track Zone Project | Display and Edit Local Time

## Introduction

In today's lecture, we will set up a basic UI for the local clock and add some functionalities.

## Modify the _useClock_ hook

We might face some issues later with the hook we created. Since we can't dynamically create hooks, we will modify our hook so that we can reuse it everywhere. The hook from the last lecture was -

```js
import { addMinutes } from 'date-fns';
import { useEffect, useState } from 'react';

const init = {
    id: '',
    title: '',
    timezone: {
        type: '',
        offset: '',
    },
    date_utc: null,
    date: null,
};

const TIMEZONE_OFFSET = {
    PST: -7 * 60,
    EST: -4 * 60,
    EDT: -4 * 60,
    BST: 1 * 60,
    MST: -6 * 60,
};

const useClock = (timezone, offset = 0) => {
    const [state, setState] = useState({ ...init });
    const [utc, setUtc] = useState(null);

    useEffect(() => {
        let d = new Date();
        const localOffset = d.getTimezoneOffset();
        d = addMinutes(d, localOffset);
        setUtc(d);
    }, []);

    useEffect(() => {
        if (utc !== null && timezone) {
            offset = TIMEZONE_OFFSET[timezone] ?? offset;
            const newUtc = addMinutes(utc, offset);
            setState({
                ...state,
                date_utc: utc,
                date: newUtc,
            });
        } else {
            setState({
                ...state,
                date_utc: utc,
                date: utc,
            });
        }
    }, [utc]);

    return {
        clock: state,
    };
};

export default useClock;
```

First, we will remove the _init_ object. Because we will get id and title from where we will render. We are receiving the timezone and offset as arguments from outside. We will also receive the date from outside, and we have taken a state for date_utc, so we don't need this object. We need to create three new states and change the related codes. Let's see the code first and then explain.

```js
import { addMinutes } from 'date-fns';
import { useEffect, useState } from 'react';

const TIMEZONE_OFFSET = {
    PST: -7 * 60,
    EST: -4 * 60,
    EDT: -4 * 60,
    BST: 1 * 60,
    MST: -6 * 60,
};

const useClock = (timezone, offset) => {
    const [localDate, setLocalDate] = useState(null);
    const [localTimezone, setLocalTimezone] = useState(null);
    const [localOffset, setLocalOffset] = useState(0);
    const [utc, setUtc] = useState(null);

    useEffect(() => {
        let d = new Date();
        const lo = d.getTimezoneOffset();
        d = addMinutes(d, lo);
        setUtc(d);
        setLocalOffset(lo);
    }, []);

    useEffect(() => {
        if (utc !== null) {
            if (timezone) {
                offset = TIMEZONE_OFFSET[timezone] ?? offset;
                const newUtc = addMinutes(utc, offset);
                setLocalDate(newUtc);
            } else {
                const newUtc = addMinutes(utc, -localOffset);
                const dateStrArr = newUtc.toUTCString().split(' ');
                setLocalDate(newUtc);
                setLocalTimezone(dateStrArr.pop());
            }
        }
    }, [utc, timezone, offset]);

    return {
        date: localDate,
        dateUtc: utc,
        offset: offset || -localOffset,
        timezone: timezone || localTimezone,
    };
};

export default useClock;
```

First, we took three states for local date, local timezone, and local offset.

```jsx
const useClock = (timezone, offset) => {
    const [localDate, setLocalDate] = useState(null);
    const [localTimezone, setLocalTimezone] = useState(null);
    const [localOffset, setLocalOffset] = useState(0);
    const [utc, setUtc] = useState(null);

    // ...

    return {
        date: localDate,
        dateUtc: utc,
        offset: offset || -localOffset,
        timezone: timezone || localTimezone,
    };
};
```

Then we modified the _useEffect_ hook for updating utc date and local offset.

```js
useEffect(() => {
    let d = new Date();
    const lo = d.getTimezoneOffset();
    d = addMinutes(d, lo);
    setUtc(d);
    setLocalOffset(lo);
}, []);
```

First, we took the date. Then we got the local timezone offset. For Bangladesh, we will get `-360`. I explained why it is negative in the last lecture. Then using `addMinutes` from `date-fns`, we got the time according to that offset. That date and time is our utc date. We updated that state. And updated the state of the local offset.

Next, our task is how to update the local date and local timezone. For that, we will write the following code.

```js
useEffect(() => {
    if (utc !== null) {
        if (timezone) {
            offset = TIMEZONE_OFFSET[timezone] ?? offset;
            const newUtc = addMinutes(utc, offset);
            setLocalDate(newUtc);
        } else {
            const newUtc = addMinutes(utc, -localOffset);
            const dateStrArr = newUtc.toUTCString().split(' ');
            setLocalDate(newUtc);
            setLocalTimezone(dateStrArr.pop());
        }
    }
}, [utc, timezone, offset]);
```

If `utc !== null`, then if the timezone is selected, we will update the offset. Then we will get the new utc date. We will update it as the local date. And if there is no new timezone, we will get the date according to the local offset. Then we got the timezone using `newUtc.toUTCString().split(' ').pop()`. Then we updated the local date and local timezone.

## Working with App component

We can write our app component as follows.

```jsx
import { useState } from 'react';
import LocalClock from './components/local-clock';

const LOCAL_CLOCK_INIT = {
    title: 'My Clock',
    timezone: '',
    offset: 0,
    date: null,
};

const App = () => {
    const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });

    const updateLocalClock = (data) => {
        setLocalClock({
            ...localClock,
            ...data,
        });
    };

    return (
        <div>
            <LocalClock clock={localClock} updateClock={updateLocalClock} />
        </div>
    );
};

export default App;
```


Since we will render the data in the _LocalClock_ component, we need to lift the state to update the local clock. So we created the _updateLocalClock_ function.

## Working with _ClockDisplay_ component

We need to display the clock in the local clock component. For that, we will create a component named _ClockDisplay_ inside the shared folder.

```jsx
import { format } from 'date-fns';
import React from 'react';

const ClockDisplay = ({ date, title, timezone, offset }) => {
	let offsetHr = offset / 60;
	return (
		<div>
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

We get the offset in minutes, so we divided it by 60 to get it in hours. We will use the `format` method from `date-fns` for date formatting.

## _LocalClock_ Component

Now we will work with the _LocalClock_ component.

```jsx
import React, { useEffect } from 'react';
import useClock from '../../hooks/useClock';
import ClockActions from '../shared/clock-actions';
import ClockDisplay from '../shared/clock-display';

const LocalClock = ({ clock, updateClock }) => {
	const { date, offset, timezone } = useClock(clock.timezone, clock.offset);

	useEffect(() => {
		updateClock({
			date,
			timezone,
			offset,
		});
	}, [date]);

	return (
		<div>
			{date && (
				<ClockDisplay
					date={date}
					offset={offset}
					timezone={timezone}
					title={clock.title}
				/>
			)}
		</div>
	);
};

export default LocalClock;
```

First, we created the clock using the hook. We know that our component will re-render when the date object changes, so we updated our local clock using the _useEffect_ hook. Then if the date is not undefined, the clock display component will render.

## _ClockActions_ Component

Now we will work on the edit, create, and delete buttons. Along with that, we will create the form that will be shown when clicking these buttons. However, today we will not create a separate form component. We will write it inside this component.

```jsx
import { useState } from 'react';

const defaultOffsets = [
	-11.5, -11, -10.5, -10, -9.5, -9, -8.5, -8, 0, 1, 2, 3, 4, 5, 5.5, 6, 6.5,
];

const ClockActions = ({ local = false, clock, updateClock }) => {
	const [isEdit, setIsEdit] = useState(false);

	const handleChange = (e) => {
		let { name, value } = e.target;

		if (name === 'offset') {
			value = parseInt(value) * 60;
		}
		updateClock({
			[name]: value,
		});
	};

	return (
		<div>
			<button onClick={() => setIsEdit(!isEdit)}>Edit</button>
			{local ? <button>Create</button> : <button>Delete</button>}
			{isEdit && (
				<div>
					<input
						type="text"
						name="title"
						value={clock.title}
						onChange={handleChange}
					/>

					<select
						name="timezone"
						value={clock.timezone}
						onChange={handleChange}
					>
						<option value="GMT">GMT</option>
						<option value="UTC">UTC</option>
						<option value="PST">PST</option>
						<option value="EST">EST</option>
						<option value="EDT">EDT</option>
						<option value="BST">BST</option>
						<option value="MST">MST</option>
					</select>
					{(clock.timezone === 'GMT' || clock.timezone === 'UTC') && (
						<select
							name="offset"
							value={clock.offset / 60}
							onChange={handleChange}
						>
							{defaultOffsets.map((offset) => (
								<option key={offset} value={offset}>
									{offset}
								</option>
							))}
						</select>
					)}
				</div>
			)}
		</div>
	);
};

export default ClockActions;
```

First, we took some offsets just for work purposes. We will improve this later. Then we took a state for editing. When the edit button is clicked, it will toggle. That is, if it is _true_, it will become _false_, and if it is _false_, it will become _true_.

Then if it is a local clock, it will show the create button, and if it is a custom clock, it will show the delete button. The form after that should be easy to understand. Just a note about the offset. If the clock is GMT or UTC, it will not show the offset field. For other timezones, it will show the offset field.

We will work on the create and delete buttons in the next lecture.

Now we will use this ClockActions component in our local clock component.

```jsx
import React, { useEffect } from 'react';
import useClock from '../../hooks/useClock';
import ClockActions from '../shared/clock-actions';
import ClockDisplay from '../shared/clock-display';

const LocalClock = ({ clock, updateClock }) => {
	const { date, offset, timezone } = useClock(clock.timezone, clock.offset);

	useEffect(() => {
		updateClock({
			date,
			timezone,
			offset,
		});
	}, [date]);

	return (
		<div>
			// ...
			<ClockActions clock={clock} updateClock={updateClock} local={true} />
		</div>
	);
};

export default LocalClock;
```

## Source Code

All the source code for this lecture can be found at this [link](https://github.com/mrhm-dev/full-stack-army/tree/master/src/lecture-49/track-zone).
